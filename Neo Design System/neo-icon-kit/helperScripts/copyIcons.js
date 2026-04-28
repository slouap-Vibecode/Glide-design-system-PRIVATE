#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");

function emptyOrCreateDirectory(directory) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(directory)) {
      fsExtra.emptyDir(directory, (error, files) => {
        if (error) {
          reject(new Error(`Failed to read icons destination directory: ${error}`));
        } 
        console.log(`Emptied existing icons destination directory ${directory}`);
        resolve();
      });
    } else {
      fs.mkdir(directory, (error) => {
        if (error) {
          reject(new Error(`Failed to create icons destination directory: ${error}`));
        }
        console.log(`Created icons destination directory ${directory}`);
        resolve();
      });
    }
  })
}

function copyIconsToDirectory(sourceDirectory, destinationDirectory) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(sourceDirectory)) {
      fsExtra.copy(sourceDirectory, destinationDirectory, (error) => {
        if (error) {
          reject(new Error(`Failed to copy ${sourceDirectory} to ${destinationDirectory}, error: ${error}`));
        }
        console.log(`Copied ${sourceDirectory} to ${destinationDirectory}`);
        resolve();
      });
    } else {
      reject(new Error(`Failed finding icons source directory ${sourceDirectory}`));
    }
  });
}

async function copyIconsFromNeoIconKitToApp(sourceDirectoryPath, destinationDirectoryPath) {

  if (!sourceDirectoryPath) {
    console.error("sourceDirectoryPath argument must be provided to identify neo icon kit source path");
  }

  if (!destinationDirectoryPath) {
    console.error("destinationDirectoryPath argument must be provided to identify neo icon kit destination path");
  }

  const sourceDirectory = path.resolve(__dirname, sourceDirectoryPath);
  const destinationDirectory = path.resolve(process.cwd(), destinationDirectoryPath);

  try {
    await emptyOrCreateDirectory(destinationDirectory);
    const copyToDestinationPromise = copyIconsToDirectory(sourceDirectory, destinationDirectory);

    copyToDestinationPromise
      .then(() => {
        console.log(`Neo icon kit icons import to app folder "${destinationDirectory}" completed`);
      }).catch((error) => {
        console.error(`Neo icon kit icons import to app folder "${destinationDirectory}" failed: ${error}`);
      });
      
  } catch (error) {
    console.error(`Failed to copy icons from neo icon kit to local project directory "${destinationDirectory}": ${error}`);
  }
}

copyIconsFromNeoIconKitToApp("../icons", process.argv[2]);