const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { uploadFileToCloudinary } = require("../../middleware/multer_cloudinary");
const { saveApplicantEntry, saveUser, loginUser } = require("./service");

module.exports = {
  CreateApplicantRegistry: async(req, res) => {
    try {
      const data = req.body;
      const files = req.files;
      data.files = [];
      for (const fieldName in files) {
        const fileArray = files[fieldName];
        for (const file of fileArray) {
          const url = await uploadFileToCloudinary(file, "applicant_registry");
          const fileType = file.mimetype;
          data.files.push({ url, fieldName, fileType });
        }
      }
      handleResponse(res, saveApplicantEntry(data))
    } catch (error) {
      console.log(error);
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
