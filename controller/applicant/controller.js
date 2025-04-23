const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { uploadFileToCloudinary } = require("../../middleware/multer_cloudinary");
const { saveApplicantEntry, saveUser, loginUser } = require("./service");


module.exports = {
  CreateApplicantRegistry: async (req, res) => {
    try {
      const data = req.body;
      const files = req.files;




      console.log("Request Body:", data);
      console.log("Uploaded Files:", files);




      // Ensure required fields are present
      if (!data.lastName || !data.firstName || !files.resume) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }




      // Upload files to Cloudinary
      data.files = [];
      for (const fieldName in files) {
        const fileArray = files[fieldName];
        for (const file of fileArray) {
          const url = await uploadFileToCloudinary(file, "applicant_registry");
          const fileType = file.mimetype;
          data.files.push({ url, fieldName, fileType });
        }
      }




      // Save applicant data to the database
      const result = await saveApplicantEntry(data);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error in CreateApplicantRegistry:", error);
      return errorException(error, res);
    }
  },


  CreateUserAccount: async(req,res) => {
    try {
      const data = req.body;
      handleResponse(res,saveUser(data))
    } catch (error) {
      console.log(error);
      return errorException(error, res);
    }
  },
  LoginUser: async (req, res) => {
    try {
      const data = req.body;
      handleResponse(res,loginUser(data));
    } catch (error) {
      console.log(error);
      return errorException(error, res);
    }
  }
};
