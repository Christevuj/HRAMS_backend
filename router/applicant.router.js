const multer = require('multer');
const { CreateApplicantRegistry, CreateUserAccount, LoginUser } = require('../controller/applicant/controller');
const router = require('express').Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });


const multipleUpload = upload.fields([
    { name: 'transcriptRecord', maxCount: 1 },
    { name: 'diploma', maxCount: 1 },
    { name: 'applicationLetter', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]);


router.post('/submit-applicant-registry',multipleUpload,CreateApplicantRegistry)
router.post('/register-account',multer().none(),CreateUserAccount)
router.post('/login-account',multer().none(),LoginUser)


module.exports = router;
