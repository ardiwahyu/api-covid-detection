const multer  = require('multer');
const path = require('path');

const uploadFolder = __dirname + '../../../uploads';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.wav' && ext !== '.mp3') {
            return callback(new Error('Only sounds are allowed'))
        }
        callback(null, true)
    }
});

module.exports = { upload }