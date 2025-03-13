const pool = require("../../middleware/db.js");
const { initEnv } = require("../../middleware/utils.js");
initEnv();

module.exports = {
  getAllApplicants: async (accountId, entryId) => {
    const connection = await pool.promise().getConnection();
    try {
      await connection.beginTransaction();

      let whereClause = "WHERE u.userType = 'applicant'";
      const queryParams = [];

      if (accountId) {
        whereClause += " AND u.accountId = ?";
        queryParams.push(accountId);
      }
      if (entryId) {
        whereClause += " AND ae.id = ?";
        queryParams.push(entryId);
      }

      const sql = `
        SELECT 
          u.accountId,
          u.fullName,
          u.email,
          u.userType,
          ae.id AS entryId,
          ae.lastName,
          ae.firstName,
          ae.middleName,
          ae.emailAddress,
          ae.contactNumber,
          ae.completeAddress,
          ae.educationDegree,
          ae.applyingFor,
          ae.createdAt AS entryCreatedAt,
          ae.status,
          ae.department,

          -- Use GROUP_CONCAT to manually build JSON array
          IFNULL(
            CONCAT(
              '[',
              GROUP_CONCAT(
                CONCAT(
                  '{"id":', IFNULL(ad.id, '0'),
                  ',"fileName":"', IFNULL(ad.fileName, ''), 
                  '","fileUrl":"', IFNULL(ad.fileUrl, ''), 
                  '","fileType":"', IFNULL(ad.type, ''), '"}'
                ) SEPARATOR ','
              ),
              ']'
            ),
            '[]'
          ) AS documents

        FROM users u
        JOIN application_entry ae 
          ON u.accountId = ae.account_id
        LEFT JOIN applicant_document ad 
          ON ae.id = ad.applicantId_Entry
        ${whereClause}
        GROUP BY 
          u.accountId, 
          u.fullName,
          u.email,
          u.userType,
          ae.id,
          ae.lastName,
          ae.firstName,
          ae.middleName,
          ae.emailAddress,
          ae.contactNumber,
          ae.completeAddress,
          ae.educationDegree,
          ae.applyingFor,
          ae.createdAt,
          ae.status,
          ae.department
        ORDER BY ae.id DESC
      `;

      const [rows] = await connection.query(sql, queryParams);
      await connection.commit();

      // Parse the "documents" JSON string in Node
      const results = rows.map((row) => ({
        ...row,
        documents: row.documents ? JSON.parse(row.documents) : [],
      }));

      return { success: 1, results };
    } catch (error) {
      console.error(error);
      if (connection) await connection.rollback();
      return { success: 0, results: error.message };
    }
  },
  updateApplicantStatus: async (entryId, newStatus) => {
    const connection = await pool.promise().getConnection();
    try {
      await connection.beginTransaction();
      const sql = `
        UPDATE application_entry 
        SET status = ? 
        WHERE id = ?
      `;

      const [result] = await connection.query(sql, [newStatus, entryId]);
      await connection.commit();

      // result.affectedRows tells us if a row was actually updated
      if (result.affectedRows === 0) {
        return { success: 0, results: "No rows updated (invalid entryId?)" };
      }

      return { success: 1, results: "Status updated successfully." };
    } catch (error) {
      console.error(error);
      if (connection) await connection.rollback();
      return { success: 0, results: error.message };
    }
  },
  getAllJobs: async () => {
    const connection = await pool.promise().getConnection();
    try {
      await connection.beginTransaction();

      const sql = `
        SELECT *
        FROM jobs
        ORDER BY createdAt DESC
      `;

      const [rows] = await connection.query(sql);
      await connection.commit();

      return { success: 1, results: rows };
    } catch (error) {
      console.error(error);
      if (connection) await connection.rollback();
      return { success: 0, results: error.message };
    }
  },
};
