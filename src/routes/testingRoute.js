const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/fileUpload');
const { postSoundToTest } = require('../controllers/testingController');
  
router.post('/testing', upload.single('sound_file'), postSoundToTest);

module.exports = router;