const fs = require("fs").promises;
const childProcess = require("child_process");


fs.rename(".npmrc", ".npmrc.tmp")
    .then(() => {
        childProcess.exec("npm audit --json > audit.json", async (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            await fs.rename(".npmrc.tmp", ".npmrc");
        });
    });
