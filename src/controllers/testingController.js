'use strict'

const { status, successMessage, errorMessage } = require('../helpers/payload');
const PythonShell = require('python-shell').PythonShell;
const {spawn} = require('child_process');

module.exports = {
    postSoundToTest: async (req, res) => {
        const testDir = __dirname + '/detection/testing.py';

        var options = {args: [req.file.filename]};
          
        const python = spawn('python', [testDir, req.file.filename]);
        var results
        python.stdout.on('data', function (data) {
            results = data.toString().split('\r\n');
        })
        python.on('close', (code) => {
            successMessage.file = req.file;
            successMessage.value = parseFloat(results[0]);
            successMessage.status = results[1];
            res.send(successMessage);
        })
    }
}