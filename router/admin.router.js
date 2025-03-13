    const { fetchAllApplicants, changeApplicantStatus, AllOpenJobs } = require('../controller/admin/controller');
    const multer = require('multer');

    const router = require('express').Router();

    router.get('/applicant-list/:accountId?',multer().none(),fetchAllApplicants)
    router.get('/job-list',multer().none(),AllOpenJobs)
    router.put("/applicant-status",multer().none(), changeApplicantStatus);
    module.exports = router;