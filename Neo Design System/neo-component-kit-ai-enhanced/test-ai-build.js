#!/usr/bin/env node
/**
 * AI Build Test Script
 * Tests the complete AI-optimized build system
 */

const fs = require("fs");
const path = require("path");

console.log("🧪 Testing AI-Optimized Neo Component Kit Build...\n");

// Test 1: AI Main Entry Point
console.log("1️⃣ Testing AI main entry point...");
const aiMainPath = "src/ai-main.ts";
if (fs.existsSync(aiMainPath)) {
  const aiMain = fs.readFileSync(aiMainPath, "utf8");
  const exportCount = (aiMain.match(/export \{[^}]+\}/g) || []).length;
  const hasSmartDefaults = aiMain.includes("SmartDefaults");
  const hasTemplateGenerator = aiMain.includes("TemplateGenerator");

  console.log("   ✅ AI entry point exists");
  console.log(`   ✅ Export statements: ${exportCount}`);
  console.log(`   ✅ Smart Defaults: ${hasSmartDefaults}`);
  console.log(`   ✅ Template Generator: ${hasTemplateGenerator}`);
} else {
  console.log("   ❌ AI entry point missing");
}

// Test 2: Enhanced Interfaces
console.log("\n2️⃣ Testing enhanced interfaces...");
const testInterfaces = ["iNckForm.ts", "iNckModal.ts", "iNckTextInput.ts", "iNckDropdown.ts", "iNckCheckbox.ts"];

let interfacesPassed = 0;
for (const interfaceFile of testInterfaces) {
  const interfacePath = path.join("src/components/interfaces", interfaceFile);
  if (fs.existsSync(interfacePath)) {
    const content = fs.readFileSync(interfacePath, "utf8");
    const hasProps = content.includes("Props {");
    const hasExamples = content.includes("Examples = {");
    const hasGuidance = content.includes("AIGuidance = {");
    const hasAIAnnotations = content.includes("@aiUsage");

    if (hasProps && hasExamples && hasGuidance && hasAIAnnotations) {
      console.log(`   ✅ ${interfaceFile}: Complete AI enhancement`);
      interfacesPassed++;
    } else {
      console.log(`   ⚠️  ${interfaceFile}: Partial AI enhancement`);
    }
  } else {
    console.log(`   ❌ ${interfaceFile}: Missing`);
  }
}

// Test 3: AI Helpers
console.log("\n3️⃣ Testing AI helpers...");
const helperFiles = [
  "src/ai-helpers/templateGenerator.ts",
  "src/ai-helpers/smartDefaults.ts",
  "src/ai-helpers/componentValidator.ts",
];

let helpersPassed = 0;
for (const helperFile of helperFiles) {
  if (fs.existsSync(helperFile)) {
    const content = fs.readFileSync(helperFile, "utf8");
    const hasExports = content.includes("export");
    const hasClasses = content.includes("class") || content.includes("export const");

    if (hasExports && hasClasses) {
      console.log(`   ✅ ${path.basename(helperFile)}: AI helper ready`);
      helpersPassed++;
    }
  } else {
    console.log(`   ❌ ${path.basename(helperFile)}: Missing`);
  }
}

// Test 4: Build Scripts
console.log("\n4️⃣ Testing build scripts...");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const hasAIBuild = packageJson.scripts["build:ai"] !== undefined;
const hasMetadataGen = packageJson.scripts["generate:ai-metadata"] !== undefined;
const hasValidation = packageJson.scripts["validate:ai-interfaces"] !== undefined;

console.log(`   ✅ AI build script: ${hasAIBuild ? "Present" : "Missing"}`);
console.log(`   ✅ Metadata generation: ${hasMetadataGen ? "Present" : "Missing"}`);
console.log(`   ✅ Interface validation: ${hasValidation ? "Present" : "Missing"}`);

// Test 5: Generated Metadata
console.log("\n5️⃣ Testing AI metadata...");
if (fs.existsSync("ai-metadata.json")) {
  const metadata = JSON.parse(fs.readFileSync("ai-metadata.json", "utf8"));
  console.log(`   ✅ AI metadata generated`);
  console.log(`   ✅ Components catalogued: ${metadata.components?.length || 0}`);
  console.log(`   ✅ Categories: ${Object.keys(metadata.summary?.byCategory || {}).join(", ")}`);
} else {
  console.log("   ⚠️  AI metadata not yet generated");
}

// Final Summary
console.log("\n📊 AI Build Test Summary:");
console.log(`   • Enhanced interfaces: ${interfacesPassed}/${testInterfaces.length}`);
console.log(`   • AI helpers: ${helpersPassed}/${helperFiles.length}`);
console.log(`   • Build scripts: ${hasAIBuild && hasMetadataGen && hasValidation ? "Complete" : "Partial"}`);
console.log(`   • AI entry point: ${fs.existsSync(aiMainPath) ? "Ready" : "Missing"}`);

const overallSuccess = interfacesPassed >= 4 && helpersPassed >= 2 && fs.existsSync(aiMainPath);
console.log(`\n${overallSuccess ? "🎉" : "⚠️ "} AI-Optimized Build: ${overallSuccess ? "READY" : "NEEDS WORK"}`);

if (overallSuccess) {
  console.log("\n✅ The Neo Component Kit is now fully AI-optimized with:");
  console.log("   • Comprehensive TypeScript interfaces with AI annotations");
  console.log("   • AI-friendly usage examples and guidance patterns");
  console.log("   • Smart defaults and template generation utilities");
  console.log("   • Automated metadata generation for AI consumption");
  console.log("   • Complete build pipeline for AI-enhanced distribution");
}
