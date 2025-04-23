const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { getAllApplicants, updateApplicantStatus, getAllJobs } = require("./service");
const { createJobService } = require("./service");
module.exports = {
    fetchAllApplicants: async (req, res) => {
    try {
        const { entryId } = req.query; // entryId can remain in req.query if it's passed as a query parameter
        handleResponse(res, getAllApplicants( entryId));
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

      createJob: async (req, res) => {
        try {
          const { position, department, requirements, status, type } = req.body;
    
          // Validate required fields
          if (!position || !department || !requirements || !status || !type) {
            return res.status(400).json({
              success: false,
              message: "Missing required fields: position, department, requirements, status, or type.",
            });
          }
    
          // Call the service to create the job
          handleResponse(res, createJobService(req.body));
        } catch (error) {
          console.error("Error creating job:", error);
          return errorException(error, res);
        }
      },
    };