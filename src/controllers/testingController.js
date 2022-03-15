'use strict'

const { status, successMessage, errorMessage } = require('../helpers/payload');
const PythonShell = require('python-shell').PythonShell;
const {spawn} = require('child_process');

module.exports = {
    postSoundToTest: async (req, res) => {
        const testDir = '/app/src/controllers/detection/testing.py';

        var options = {args: [req.file.filename]};
          
        const python = spawn('python', [testDir, req.file.filename]);
        var results = []
        python.stdout.on('data', function (data) {
            results = data.toString().split('\r\n');
        })
        python.on('close', (code) => {
            successMessage.file = req.file;
            successMessage.code_py = code;
            // successMessage.value = parseFloat(results[0]);
            successMessage.status = results;
            res.send(successMessage);
        })
    }
}