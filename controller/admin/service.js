const pool = require("../../middleware/db.js");
const { initEnv } = require("../../middleware/utils.js");
initEnv();

module.exports = {
  getAllApplicants: async (entryId) => {
    const connection = await pool.promise().getConnection();
    try {
      await connection.beginTransaction();

      let whereClause = "WHERE 1=1";
      const queryParams = [];

      if (entryId) {
        whereClause += " AND ae.id = ?";
        queryParams.push(entryId);
      }

      const sql = `
        SELECT 
          ae.id AS entryId,
          TRIM(CONCAT_WS(' ', ae.firstName, ae.middleName, ae.lastName)) AS fullName,
          ae.emailAddress AS email,
          ae.contactNumber,
          ae.completeAddress,
          ae.educationDegree,
          ae.applyingFor,
          ae.createdAt AS entryCreatedAt,
          ae.status,
          ae.department,

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

        FROM application_entry ae
        LEFT JOIN applicant_document ad 
          ON ae.id = ad.applicantId_Entry
        ${whereClause}
        GROUP BY 
          ae.id,
          ae.firstName,
          ae.middleName,
          ae.lastName,
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

      const results = rows.map((row) => ({
        ...row,
        documents: row.documents ? JSON.parse(row.documents) : [],
      }));

      return { success: 1, results };
    } catch (error) {
      console.error(error); // Keep this log for debugging errors
      if (connection) await connection.rollback();
      return { success: 0, results: error.message };
    } finally {
      connection.release();
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

      if (result.affectedRows === 0) {
        return { success: 0, results: "No rows updated (invalid entryId?)" };
      }

      return { success: 1, results: "Status updated successfully." };
    } catch (error) {
      console.error(error); // Keep this log for debugging errors
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
      console.error(error); // Keep this log for debugging errors
      if (connection) await connection.rollback();
      return { success: 0, results: error.message };
    }
  },

  createJobService: async (data) => {
    const connection = await pool.promise().getConnection();
    try {
      await connection.beginTransaction();

      const { position, department, requirements, status, type } = data;

      // Insert the job into the database
      const insertQuery = `
        INSERT INTO jobs (position, department, requirements, status, type)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await connection.query(insertQuery, [
        position,
        department,
        requirements,
        status,
        type,
      ]);

      // Fetch the inserted job
      const selectQuery = "SELECT * FROM jobs WHERE jobId = ?";
      const [rows] = await connection.query(selectQuery, [result.insertId]);

      await connection.commit();

      return { success: true, message: "Job created successfully.", job: rows[0] };
    } catch (error) {
      if (connection) await connection.rollback();
      console.error("Error creating job:", error);
      throw error;
    } finally {
      connection.release();
    }
  },
};