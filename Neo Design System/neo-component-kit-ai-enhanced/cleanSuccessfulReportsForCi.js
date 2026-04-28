const path = require("path");
const fs = require("fs").promises;

function getTestResultFromFile() {
  let result = null;
  try {
    result = require("./test-application/testResult.json");
  } catch (e) {
    console.error("Failed to open result file. Soft fail enabled, we skip this step");
  }
  return result;
}

function cleanSuccessfulReportsForCi(result) {
  if (!result) {
    result = getTestResultFromFile();
  }

  if (!result) {
    return;
  }

  const deletionPromises = [];

  for (const testName in result) {
    if (result[testName].passed !== false) {
      const pathToDelete = path.join(__dirname, "test-application/automatic_tests", testName);
      console.log("Will delete", pathToDelete);
      const deletionPromise = fs.rmdir(pathToDelete, { recursive: true, force: true });
      deletionPromises.push(deletionPromise);
    }
  }

  return Promise.all(deletionPromises)
    .catch((e) => {
      console.log("Error when cleaning reports", e);
    })
    .finally(() => {
      console.log("deletion done");
      // we don't care about result, it just to clean, if it doesn't clean impact is just a bigger file
    });
}

// only run if this script is called directly
if (require.main === module) {
  cleanSuccessfulReportsForCi();
}

module.exports = { cleanSuccessfulReportsForCi };
