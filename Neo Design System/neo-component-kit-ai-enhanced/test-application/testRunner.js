const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const backstop = require("backstopjs");
const { cleanSuccessfulReportsForCi } = require("../cleanSuccessfulReportsForCi");
let isCi = false
const initalDirectory = process.cwd();

function getBackstopRunner(testDir) {
  const testName = testDir.replaceAll(path.join(__dirname, "automatic_tests"), "").substring(1);
  console.log("RUNNING "+testName);
  return backstop("test");
}

function getAllTestDirectories() {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, "automatic_tests"), (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

async function runAllTheTests() {
  let testsDirectories = await getAllTestDirectories();
  const testResult = { succeeded: [], failed: [] };
  for (let i = 0; i < testsDirectories.length; i++) {
    const testName = testsDirectories[i];
    try {
      const result = await runTest(
        path.join(__dirname, "automatic_tests", testName)
      );
      if (result) {
        testResult.succeeded.push(testName);
      } else {
        testResult.failed.push(testName);
      }
    } catch (e) {
      console.error(testName, " fails to be executed");
      console.error(e);
      testResult.failed.push(testName);
    }
  }
  server.close();
  console.log("Tests passed with success: ", testResult.succeeded);
  console.log("Tests failing: ", testResult.failed);

  const formattedTestResult = updateTestResult(testResult);

  let cleanOrNothingPromise = Promise.resolve();

  if (isCi) {
    cleanOrNothingPromise = cleanSuccessfulReportsForCi(formattedTestResult);
  }

  cleanOrNothingPromise.finally(() => {
    if (testResult.failed.length === 0) {
      console.log("All tests passed successfully");
      process.exit(0);
    } else {
      console.error("Some tests failed");
      process.exit(1);
    }
  });
}

function runTest(testDir) {
  process.chdir(testDir);
  return getBackstopRunner(testDir)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function runSpecificTest(testName, dockerTest) {
  const testsDirectories = await getAllTestDirectories();
  if (testsDirectories.includes(testName)) {
    const result = await runTest(
      path.join(__dirname, "automatic_tests", testName)
    );
    server.close();
    if (result) {
      console.log(testName, "successfully passed");
      updateTestResult({ succeeded: [testName] });
      process.exit(0);
    } else {
      console.log(testName, "failed");
      updateTestResult({ failed: [testName] });
      process.exit(1);
    }
  } else {
    server.close();
    console.error(testName, "tests don't exist.");
    process.exit(1);
  }
}

async function approveAllTheTests() {
  console.log("Running approval");
  const testsDirectories = await getAllTestDirectories();
  const approvalResult = { succeeded: [], failed: [] };
  for (let i = 0; i < testsDirectories.length; i++) {
    const testName = testsDirectories[i];
    try {
      const result = await approveTest(
        path.join(__dirname, "automatic_tests", testName)
      );
      if (result) {
        approvalResult.succeeded.push(testName);
      } else {
        approvalResult.failed.push(testName);
      }
    } catch (e) {
      console.error(testName, " fails to be approved");
      console.error(e);
      approvalResult.failed.push(testName);
    }
  }
  server.close();
  console.log("Approval passed with success: ", approvalResult.succeeded);
  console.log("Approval failing: ", approvalResult.failed);

  if (approvalResult.failed.length === 0) {
    console.log("All approval passed successfully");
    process.exit(0);
  } else {
    console.error("Some approval failed");
    process.exit(1);
  }
}

async function approveSpecificTest(testName) {
  const testsDirectories = await getAllTestDirectories();
  if (testsDirectories.includes(testName)) {
    const result = await approveTest(
      path.join(__dirname, "automatic_tests", testName)
    );
    server.close();
    if (result) {
      console.log(testName, "successfully approved.");
      process.exit(0);
    } else {
      console.log(testName, "failed to be approved.");
      process.exit(1);
    }
  } else {
    server.close();
    console.error(testName, "tests don't exist.");
    process.exit(1);
  }
}

function approveTest(testDir) {
  process.chdir(testDir);
  return backstop("approve")
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function openInteractiveReport(testName) {
  const testsDirectories = await getAllTestDirectories();
  if (testsDirectories.includes(testName)) {
    process.chdir(path.join(__dirname, "automatic_tests", testName));
    return backstop("remote")
  } else {
    server.close();
    console.error(testName, "test config doesn't exist.");
    process.exit(1);
  }

}

function updateTestResult(result) {
  process.chdir(initalDirectory);
  let currentResult = {};
  const currentDate = new Date().toISOString();
  if (fs.existsSync("testResult.json")) {
    currentResult = JSON.parse(
      fs.readFileSync("testResult.json", { encoding: "utf-8" })
    );
  }
  if (Array.isArray(result.succeeded)) {
    result.succeeded.forEach((testName) => {
      currentResult[testName] = {
        passed: true,
        lastRunOn: currentDate
      };
    });
  }
  if (Array.isArray(result.failed)) {
    result.failed.forEach((testName) => {
      currentResult[testName] = {
        passed: false,
        lastRunOn: currentDate
      };
    });
  }
  fs.writeFileSync("testResult.json", JSON.stringify(currentResult, null, 4), {
    encoding: "utf-8",
  });
  return currentResult;
}

app.all("/{*splat}", (req, res, next) => {
  res.setHeader("TEST-RUNNER-SERVER", 1);
  next();
});
app.use("/", express.static(path.join(__dirname, "dist")));

const server = app.listen(8080, () => {
  console.log("Test server launched");
  const argument = process.argv[2];
  if (argument === "--approve") {
    const approvalScope = process.argv[3];
    if (approvalScope) {
      approveSpecificTest(approvalScope);
    } else {
      approveAllTheTests();
    }
  } else if (argument === "--report") {
    const reportScope = process.argv[3];
    if (reportScope) {
      openInteractiveReport(reportScope);
    } else {
      console.error("You need to precise for which component you want to open the report");
      process.exit(1);
    }
  } else if (argument === "--ci") {
    isCi = true;
    runAllTheTests(true);
  } else if (argument) {
    runSpecificTest(argument);
  } else {
    runAllTheTests();
  }
});
