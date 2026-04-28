#!/usr/bin/env node
/**
 * AI Interface Validation Script
 * Validates that all component interfaces meet AI optimization standards
 */

const fs = require("fs");
const path = require("path");

// Required AI annotations for components
const REQUIRED_AI_ANNOTATIONS = ["@aiUsage", "@aiCategory", "@aiComplexity"];

// Required AI tags for props
const REQUIRED_PROP_TAGS = ["@example", "@aiUsage"];

// Valid categories and complexities
const VALID_CATEGORIES = ["form", "action", "overlay", "layout", "feedback", "navigation", "data"];
const VALID_COMPLEXITIES = ["simple", "medium", "complex"];

/**
 * Validate a single interface file
 */
function validateInterfaceFile(filePath, fileName) {
  const content = fs.readFileSync(filePath, "utf8");
  const issues = [];
  const componentName = fileName.replace("iNck", "nck-").replace(".ts", "");

  console.log(`🔍 Validating ${fileName}...`);

  // Check if file has AI optimization
  const hasAIOptimization = REQUIRED_AI_ANNOTATIONS.some((annotation) => content.includes(annotation));

  if (!hasAIOptimization) {
    console.log(`   ⏭️  Skipping ${fileName} (no AI optimization detected)`);
    return { issues: [], skipped: true };
  }

  // Check required AI annotations at interface level
  for (const annotation of REQUIRED_AI_ANNOTATIONS) {
    if (!content.includes(annotation)) {
      issues.push(`Missing required annotation: ${annotation}`);
    }
  }

  // Validate category
  const categoryMatch = content.match(/@aiCategory\s+(\w+)/);
  if (categoryMatch) {
    const category = categoryMatch[1];
    if (!VALID_CATEGORIES.includes(category)) {
      issues.push(`Invalid category "${category}". Must be one of: ${VALID_CATEGORIES.join(", ")}`);
    }
  }

  // Validate complexity
  const complexityMatch = content.match(/@aiComplexity\s+(\w+)/);
  if (complexityMatch) {
    const complexity = complexityMatch[1];
    if (!VALID_COMPLEXITIES.includes(complexity)) {
      issues.push(`Invalid complexity "${complexity}". Must be one of: ${VALID_COMPLEXITIES.join(", ")}`);
    }
  }

  // Check for Props interface
  const propsInterfacePattern = new RegExp(`export interface I${fileName.replace(".ts", "")}Props`);
  const hasPropsInterface = propsInterfacePattern.test(content);

  if (!hasPropsInterface) {
    issues.push("Missing Props interface with AI documentation");
  } else {
    // Validate props have proper documentation
    const propsMatch = content.match(/export interface I\w+Props \{([\s\S]+?)\}/);
    if (propsMatch) {
      const propsContent = propsMatch[1];

      // Check each prop has required documentation
      const propMatches = propsContent.matchAll(/\s+(\w+)[\?:]?\s*:([^;]+);/g);
      const propNames = Array.from(propMatches, (match) => match[1]);

      for (const propName of propNames) {
        // Find the JSDoc comment for this prop
        const propDocPattern = new RegExp(`/\\*\\*([\\s\\S]*?)\\*/\\s*${propName}[\\?:]?\\s*:`);
        const propDocMatch = content.match(propDocPattern);

        if (!propDocMatch) {
          issues.push(`Prop "${propName}" missing JSDoc documentation`);
          continue;
        }

        const propDoc = propDocMatch[1];

        // Check for @example
        if (!propDoc.includes("@example")) {
          issues.push(`Prop "${propName}" missing @example annotation`);
        }

        // Check for @aiUsage or @aiRequired
        if (!propDoc.includes("@aiUsage") && !propDoc.includes("@aiRequired")) {
          issues.push(`Prop "${propName}" missing @aiUsage or @aiRequired annotation`);
        }
      }
    }
  }

  // Check for Examples export
  const examplesPattern = new RegExp(`export const \\w+Examples = \\{`);
  if (!examplesPattern.test(content)) {
    issues.push("Missing Examples export for AI rapid prototyping");
  } else {
    // Validate examples have @aiContext
    const exampleMatches = content.matchAll(/(\w+):\s*`([^`]+)`/g);
    let exampleCount = 0;

    for (const match of exampleMatches) {
      exampleCount++;
      const exampleName = match[1];

      // Check if this example has @aiContext
      const contextPattern = new RegExp(`@aiContext[^*]+\\*/\\s*${exampleName}:`);
      if (!contextPattern.test(content)) {
        issues.push(`Example "${exampleName}" missing @aiContext annotation`);
      }
    }

    if (exampleCount < 2) {
      issues.push("Should provide at least 2 usage examples for AI learning");
    }
  }

  // Check for AI Guidance export
  const guidancePattern = new RegExp(`export const \\w+AIGuidance = \\{`);
  if (!guidancePattern.test(content)) {
    issues.push("Missing AI Guidance export");
  } else {
    // Validate guidance has required sections
    const requiredGuidanceSections = ["accessibility", "antiPatterns"];

    for (const section of requiredGuidanceSections) {
      const sectionPattern = new RegExp(`${section}:\\s*\\{`);
      if (!sectionPattern.test(content)) {
        issues.push(`AI Guidance missing required "${section}" section`);
      }
    }
  }

  // Check TypeScript interface completeness
  const hasExposedInterface = content.includes("Exposed") || content.includes("exposed");
  const hasMainInterface = new RegExp(`export interface I${fileName.replace(".ts", "")}\\s+extends`).test(content);

  if (!hasMainInterface) {
    issues.push("Missing main component interface");
  }

  // Report results
  if (issues.length === 0) {
    console.log(`   ✅ ${fileName} passed validation`);
  } else {
    console.log(`   ❌ ${fileName} has ${issues.length} issues:`);
    issues.forEach((issue) => console.log(`      • ${issue}`));
  }

  return { issues, skipped: false };
}

/**
 * Validate all AI-optimized interfaces
 */
function validateAIInterfaces() {
  console.log("🤖 Validating AI-optimized component interfaces...\n");

  const componentsDir = path.join(__dirname, "..", "src", "components", "interfaces");
  const results = {
    total: 0,
    validated: 0,
    skipped: 0,
    passed: 0,
    failed: 0,
    issues: {},
  };

  try {
    const interfaceFiles = fs
      .readdirSync(componentsDir)
      .filter((file) => file.startsWith("iNck") && file.endsWith(".ts"))
      .sort();

    results.total = interfaceFiles.length;

    for (const file of interfaceFiles) {
      const filePath = path.join(componentsDir, file);
      const validation = validateInterfaceFile(filePath, file);

      if (validation.skipped) {
        results.skipped++;
      } else {
        results.validated++;

        if (validation.issues.length === 0) {
          results.passed++;
        } else {
          results.failed++;
          results.issues[file] = validation.issues;
        }
      }
    }

    // Print summary
    console.log("\n📊 Validation Summary:");
    console.log(`   • Total interface files: ${results.total}`);
    console.log(`   • AI-optimized files: ${results.validated}`);
    console.log(`   • Skipped (no AI optimization): ${results.skipped}`);
    console.log(`   • Passed validation: ${results.passed}`);
    console.log(`   • Failed validation: ${results.failed}`);

    if (results.failed > 0) {
      console.log("\n❌ Files with validation issues:");
      Object.entries(results.issues).forEach(([file, fileIssues]) => {
        console.log(`   ${file}:`);
        fileIssues.forEach((issue) => console.log(`      • ${issue}`));
      });

      console.log("\n💡 To fix these issues:");
      console.log("   1. Add missing AI annotations (@aiUsage, @aiCategory, @aiComplexity)");
      console.log("   2. Document all props with @example and @aiUsage");
      console.log("   3. Provide usage examples with @aiContext");
      console.log("   4. Add AI Guidance with accessibility and anti-patterns");

      process.exit(1);
    } else {
      console.log("\n✅ All AI-optimized interfaces passed validation!");
    }

    return results;
  } catch (error) {
    console.error("❌ Error validating interfaces:", error);
    process.exit(1);
  }
}

/**
 * Generate validation report
 */
function generateValidationReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: results.total,
      aiOptimizedFiles: results.validated,
      validationPassed: results.failed === 0,
      passedFiles: results.passed,
      failedFiles: results.failed,
      skippedFiles: results.skipped,
    },
    issues: results.issues,
    recommendations: [
      "All form components should have comprehensive prop documentation",
      "Examples should cover common use cases with proper @aiContext",
      "AI Guidance should include accessibility and anti-patterns",
      "Props should have @example and @aiUsage annotations",
      "Interfaces should follow consistent naming patterns",
    ],
  };

  const reportPath = path.join(__dirname, "..", "ai-validation-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}`);

  return report;
}

// Main execution
if (require.main === module) {
  const results = validateAIInterfaces();
  generateValidationReport(results);
}

module.exports = { validateAIInterfaces, validateInterfaceFile };
