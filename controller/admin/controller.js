const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { getAllApplicants, updateApplicantStatus, getAllJobs } = require("./service");

module.exports = {
    fetchAllApplicants: async (req, res) => {
        try {
            const { accountId, entryId } = req.query;
            console.log(req.params)
            handleResponse(res, getAllApplicants(accountId, entryId));
        } catch (error) {
          console.error(error);
          return errorException(error, res);
        }
      },
      changeApplicantStatus: async (req, res) => {
        try {
          const { entryId, newStatus } = req.body;
          handleResponse(res, updateApplicantStatus(entryId, newStatus));
        } catch (error) {
          console.error(error);
          return errorException(error, res);
        }
      },
      AllOpenJobs: async (req, res) => {
        try {
          handleResponse(res, getAllJobs());
        } catch (error) {
          console.error(error);
          return errorException(error, res);
        }
      },
};
