#!/usr/bin/env node
/**
 * AI Metadata Generation Script
 * Generates comprehensive metadata for AI consumption from Neo Component Kit
 */

const fs = require("fs");
const path = require("path");

// Component categories and their priorities
const COMPONENT_CATEGORIES = {
  form: { priority: "high", description: "Form input and validation components" },
  action: { priority: "high", description: "Interactive components for user actions" },
  overlay: { priority: "medium", description: "Modal dialogs, popovers, and overlays" },
  layout: { priority: "medium", description: "Layout and container components" },
  feedback: { priority: "medium", description: "User feedback and notification components" },
  navigation: { priority: "medium", description: "Navigation and wayfinding components" },
  data: { priority: "medium", description: "Data display and manipulation components" },
};

/**
 * Extract AI-friendly metadata from component interfaces
 */
function extractComponentMetadata(interfaceContent, componentName) {
  const metadata = {
    name: componentName,
    category: null,
    complexity: "medium",
    description: "",
    usage: "",
    examples: [],
    props: [],
    methods: [],
    aiGuidance: {},
    patterns: {},
  };

  // Extract @aiCategory, @aiComplexity, @aiUsage from JSDoc
  const aiCategoryMatch = interfaceContent.match(/@aiCategory\s+(\w+)/);
  const aiComplexityMatch = interfaceContent.match(/@aiComplexity\s+(\w+)/);
  const aiUsageMatch = interfaceContent.match(/@aiUsage\s+(.+)/);

  if (aiCategoryMatch) metadata.category = aiCategoryMatch[1];
  if (aiComplexityMatch) metadata.complexity = aiComplexityMatch[1];
  if (aiUsageMatch) metadata.usage = aiUsageMatch[1];

  // Extract description from interface JSDoc
  const descriptionMatch = interfaceContent.match(/\*\s*(.+?)\s*\*\s*@aiUsage/s);
  if (descriptionMatch) {
    metadata.description = descriptionMatch[1].replace(/\s*\*\s*/g, " ").trim();
  }

  // Extract props with AI annotations
  const propsMatches = interfaceContent.matchAll(/\s+\*\s+(.+?)\s*@example\s+(.+?)\s*.*?(\w+):\s*(.+?);/gs);
  for (const match of propsMatches) {
    const [, description, example, propName, propType] = match;

    // Check if prop is AI required
    const aiRequiredMatch = interfaceContent.match(new RegExp(`@aiRequired\\s+true.*?${propName}:`));
    const aiSuggestionsMatch = interfaceContent.match(new RegExp(`@aiSuggestions\\s+(\\{[^}]+\\}).*?${propName}:`));

    metadata.props.push({
      name: propName,
      type: propType.trim(),
      description: description.trim(),
      example: example.trim(),
      required: !!aiRequiredMatch,
      suggestions: aiSuggestionsMatch ? JSON.parse(aiSuggestionsMatch[1]) : null,
    });
  }

  // Extract examples
  const examplesMatch = interfaceContent.match(/export const \w+Examples = \{([\s\S]+?)\} as const;/);
  if (examplesMatch) {
    const exampleContent = examplesMatch[1];
    const exampleMatches = exampleContent.matchAll(/(\w+):\s*`([^`]+)`/g);

    for (const [, exampleName, exampleCode] of exampleMatches) {
      // Extract context from preceding comment
      const contextMatch = exampleContent.match(new RegExp(`@aiContext\\s+([^*]+)\\s*\\*/\\s*${exampleName}:`));

      metadata.examples.push({
        name: exampleName,
        code: exampleCode.trim(),
        context: contextMatch ? contextMatch[1].trim() : "",
      });
    }
  }

  // Extract AI guidance
  const guidanceMatch = interfaceContent.match(/export const \w+AIGuidance = \{([\s\S]+?)\} as const;/);
  if (guidanceMatch) {
    try {
      // Simplified extraction of guidance structure
      const guidanceContent = guidanceMatch[1];

      // Extract accessibility requirements
      const accessibilityMatch = guidanceContent.match(/accessibility:\s*\{[\s\S]+?required:\s*\[([\s\S]+?)\]/);
      if (accessibilityMatch) {
        metadata.aiGuidance.accessibility = accessibilityMatch[1]
          .split(",")
          .map((item) => item.replace(/["\s]/g, "").trim())
          .filter((item) => item);
      }

      // Extract anti-patterns
      const antiPatternsMatch = guidanceContent.match(/antiPatterns:\s*\{([\s\S]+?)\}/);
      if (antiPatternsMatch) {
        const antiPatterns = {};
        const patterns = antiPatternsMatch[1].matchAll(/(\w+):\s*"([^"]+)"/g);
        for (const [, key, value] of patterns) {
          antiPatterns[key] = value;
        }
        metadata.aiGuidance.antiPatterns = antiPatterns;
      }
    } catch (error) {
      console.warn(`Warning: Could not parse AI guidance for ${componentName}`);
    }
  }

  return metadata;
}

/**
 * Generate comprehensive AI metadata
 */
function generateAIMetadata() {
  console.log("🤖 Generating AI metadata for Neo Component Kit...");

  const componentsDir = path.join(__dirname, "..", "src", "components", "interfaces");
  const aiMetadata = {
    version: "1.0.0",
    generated: new Date().toISOString(),
    system: {
      name: "Neo Design System Component Kit",
      description: "AI-optimized Vue 3 component library with comprehensive TypeScript interfaces",
      categories: COMPONENT_CATEGORIES,
    },
    components: [],
    summary: {
      totalComponents: 0,
      byCategory: {},
      byComplexity: {},
      highPriorityComponents: [],
    },
  };

  // Read all interface files
  try {
    const interfaceFiles = fs
      .readdirSync(componentsDir)
      .filter((file) => file.startsWith("iNck") && file.endsWith(".ts"));

    for (const file of interfaceFiles) {
      const componentName = file.replace("iNck", "nck-").replace(".ts", "").toLowerCase();
      const filePath = path.join(componentsDir, file);
      const content = fs.readFileSync(filePath, "utf8");

      // Skip files without AI-optimized content
      if (!content.includes("@aiUsage") && !content.includes("@aiCategory")) {
        continue;
      }

      const metadata = extractComponentMetadata(content, componentName);
      aiMetadata.components.push(metadata);

      // Update summary statistics
      aiMetadata.summary.totalComponents++;

      if (metadata.category) {
        aiMetadata.summary.byCategory[metadata.category] = (aiMetadata.summary.byCategory[metadata.category] || 0) + 1;
      }

      aiMetadata.summary.byComplexity[metadata.complexity] =
        (aiMetadata.summary.byComplexity[metadata.complexity] || 0) + 1;

      if (metadata.category && COMPONENT_CATEGORIES[metadata.category]?.priority === "high") {
        aiMetadata.summary.highPriorityComponents.push(componentName);
      }
    }

    // Sort components by category and name
    aiMetadata.components.sort((a, b) => {
      if (a.category !== b.category) {
        return (a.category || "").localeCompare(b.category || "");
      }
      return a.name.localeCompare(b.name);
    });

    // Write metadata file
    const outputPath = path.join(__dirname, "..", "ai-metadata.json");
    fs.writeFileSync(outputPath, JSON.stringify(aiMetadata, null, 2));

    console.log(`✅ AI metadata generated successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   • Total AI-optimized components: ${aiMetadata.summary.totalComponents}`);
    console.log(`   • High-priority components: ${aiMetadata.summary.highPriorityComponents.length}`);
    console.log(`   • Categories: ${Object.keys(aiMetadata.summary.byCategory).join(", ")}`);
    console.log(`   • Output: ${outputPath}`);

    return aiMetadata;
  } catch (error) {
    console.error("❌ Error generating AI metadata:", error);
    process.exit(1);
  }
}

/**
 * Validate generated metadata
 */
function validateMetadata(metadata) {
  console.log("🔍 Validating AI metadata...");

  const issues = [];

  // Check each component has required fields
  for (const component of metadata.components) {
    if (!component.category) {
      issues.push(`${component.name}: Missing category`);
    }
    if (!component.description) {
      issues.push(`${component.name}: Missing description`);
    }
    if (!component.usage) {
      issues.push(`${component.name}: Missing usage information`);
    }
    if (component.examples.length === 0) {
      issues.push(`${component.name}: No usage examples provided`);
    }

    // Check props have proper AI annotations
    const requiredProps = component.props.filter((p) => p.required);
    if (requiredProps.length === 0 && component.category === "form") {
      issues.push(`${component.name}: Form component should have at least one required prop`);
    }
  }

  if (issues.length > 0) {
    console.warn("⚠️  Validation issues found:");
    issues.forEach((issue) => console.warn(`   • ${issue}`));
  } else {
    console.log("✅ Metadata validation passed!");
  }

  return issues.length === 0;
}

// Main execution
if (require.main === module) {
  const metadata = generateAIMetadata();
  validateMetadata(metadata);
}

module.exports = { generateAIMetadata, extractComponentMetadata };
