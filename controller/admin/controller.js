const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { getAllApplicants, updateApplicantStatus, getAllJobs } = require("./service");

module.exports = {
    fetchAllApplicants: async (req, res) => {
    try {
        const { accountId } = req.params; // Correctly access accountId from req.params
        const { entryId } = req.query; // entryId can remain in req.query if it's passed as a query parameter
        console.log("accountId:", accountId);
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
