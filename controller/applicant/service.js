const pool = require("../../middleware/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util = require("util");
const { initEnv } = require("../../middleware/utils.js");
const queryAsync = util.promisify(pool.query).bind(pool);
initEnv();


module.exports = {
  saveApplicantEntry: async (data) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();

        // Validate required fields
        if (!data.lastName || !data.firstName || !data.email || !data.job || !data.department) {
            throw new Error("Missing required fields: lastName, firstName, email, job, or department.");
        }

        // Insert applicant entry into `application_entry` table
        const insertInfoQuery = `
            INSERT INTO application_entry
            (lastName, firstName, middleName, emailAddress, contactNumber, completeAddress, educationDegree, applyingFor, createdAt, status, department)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'PENDING', ?)
        `;
        const [entryResult] = await connection.query(insertInfoQuery, [
            data.lastName,
            data.firstName,
            data.middleName || null,
            data.email,
            data.contactNumber || null,
            data.address || null,
            data.degree || null,
            data.job,
            data.department,
        ]);

        const applicantId = entryResult.insertId;

        // Insert applicant documents into `applicant_document` table
        if (data.files && data.files.length > 0) {
            const insertFileQuery = `
                INSERT INTO applicant_document (applicantId_Entry, fileName, fileUrl, type)
                VALUES (?, ?, ?, ?)
            `;
            for (const file of data.files) {
                await connection.query(insertFileQuery, [
                    applicantId,
                    file.fieldName,
                    file.url,
                    file.fileType,
                ]);
            }
        }

        await connection.commit();
        return { success: 1, results: "Applicant entry saved successfully." };
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error saving applicant entry:", error.message);
        return { success: 0, results: error.message };
    } finally {
        connection.release();
    }
},


  saveUser: async (data) =>{
    const connection = await pool.promise().getConnection();
    try {
      await connection.beginTransaction();
      const insertQuery = "INSERT INTO users(fullName,email,password,userType,profile,createdAt) VALUES(?,?,?,?,?,?)";


      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);


      await connection.query(insertQuery,[
        data.fullName,
        data.email,
        hashedPassword,
        'applicant',
        '',
        new Date().toISOString()
      ])
      await connection.commit();
      return { success: 1, results: "User registered successfully." };
    } catch (error) {
      console.log(error)
      if (connection) await connection.rollback();
      return { success: 0, results: error.message };
    }
  },
  loginUser: async (data) => {
    try {
      const { email, password } = data;
     
      const selectQuery = "SELECT * FROM users WHERE email = ?";
      const users = await queryAsync(selectQuery, [email]);


      if (users.length === 0) {
        return { success: 0, results: "Invalid email or password." };
      }


      const user = users[0];


      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: 0, results: "Invalid email or password." };
      }


      const token = jwt.sign(
        { id: user.id, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );


      return {
        success: 1,
        results: "Login successful.",
        token,
        user
      };
    } catch (error) {
      return { success: 0, results: error.message };
    }
  }
};
