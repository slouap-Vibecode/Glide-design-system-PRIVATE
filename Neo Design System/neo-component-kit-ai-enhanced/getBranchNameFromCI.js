const branchName = process.argv[2];
const splittedBranchName = branchName.split("/");
process.stdout.write(splittedBranchName[splittedBranchName.length - 1]);
