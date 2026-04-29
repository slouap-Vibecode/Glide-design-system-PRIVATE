/**
 * generate-token-manifest.js
 *
 * Scans every .vue file in src/components/ and extracts all CSS custom property
 * references matching var(--nck-*) from the <style> blocks.
 * Outputs documentation/token-manifest.json, keyed by component name.
 *
 * Run: node documentation/scripts/generate-token-manifest.js
 */

'use strict'

const fs = require('fs')
const path = require('path')

const componentsDir = path.resolve(__dirname, '../../src/components')
const outputFile = path.resolve(__dirname, '../token-manifest.json')

// Recursively find all .vue files
function findVueFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...findVueFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.vue')) {
      files.push(full)
    }
  }
  return files
}

/**
 * Convert a filename like "nckButton" or "NckTabsContainer" to "nck-button" / "nck-tabs-container".
 */
function fileNameToComponentKey(basename) {
  return basename
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase → kebab
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // ABCDef → Ab-cdef edge cases
    .toLowerCase()
    .replace(/^nck-?/, 'nck-') // ensure nck- prefix
    .replace(/^-+/, '') // strip leading dash if any
}

const files = findVueFiles(componentsDir)
const manifest = {}

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8')

  // Extract content from all <style> blocks (there can be more than one)
  const styleBlocks = [...content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1])
  const styleContent = styleBlocks.join('\n')

  // Extract all var(--nck-...) references
  const tokenRefs = [...styleContent.matchAll(/var\((--nck-[a-z0-9-]+)/g)].map((m) => m[1])

  if (!tokenRefs.length) continue

  const baseName = path.basename(filePath, '.vue')
  const key = fileNameToComponentKey(baseName)

  // Deduplicate while preserving order
  const unique = [...new Set(tokenRefs)]

  // Merge if the key was already seen (e.g. two files map to the same key — unlikely but safe)
  if (manifest[key]) {
    manifest[key] = [...new Set([...manifest[key], ...unique])]
  } else {
    manifest[key] = unique
  }
}

// Sort keys alphabetically for stable output
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))

fs.writeFileSync(outputFile, JSON.stringify(sorted, null, 2) + '\n')

const componentCount = Object.keys(sorted).length
const tokenCount = Object.values(sorted).flat().length
console.log(
  `[token-manifest] ${componentCount} components, ${tokenCount} total token references → ${outputFile}`,
)
