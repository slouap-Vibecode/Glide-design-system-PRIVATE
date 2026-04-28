# Neo Design System MCP Server

A comprehensive Model Context Protocol (MCP) server that exposes the Neo Design System for AI-assisted development. This server provides intelligent component discovery, icon search, code generation, and design token access for Claude Code and other AI development tools.

## Features

### 🧩 Component Discovery
- **Intelligent Search**: Find Neo components using natural language queries
- **Category Filtering**: Filter by component categories (form, action, layout, etc.)
- **Complexity Levels**: Filter by simple, medium, or complex components
- **Rich Metadata**: Access props, events, slots, and usage examples

### 🎨 Icon Management
- **Keyword Search**: Find icons using semantic keywords and descriptions
- **Category Organization**: Browse 833+ icons across organized categories
- **Visual Previews**: Base64-encoded SVG previews for AI context
- **Smart Matching**: Intelligent semantic scoring for contextual icon suggestions

### 🏗️ Code Generation
- **Vue Component Code**: Generate Neo-compliant Vue component implementations
- **Prop Configuration**: Apply component props with proper TypeScript interfaces
- **Context Awareness**: Generate contextually appropriate code examples
- **Best Practices**: Follow Neo Design System patterns and conventions

### 🎯 Design Tokens
- **Token Discovery**: Access color, typography, spacing, and other design tokens
- **Usage Context**: Get recommendations based on usage scenarios
- **Semantic Mapping**: Find appropriate tokens for specific design needs
- **LESS & CSS Variables**: Support for both LESS variables and CSS custom properties

## Installation

### Prerequisites
- Node.js 18 or later
- Neo Design System component kit and icon kit (local installation)

### Install the MCP Server

```bash
# Install globally
npm install -g neo-design-system-mcp-server

# Or install in your project
npm install neo-design-system-mcp-server
```

### Configure Claude Code

Add the MCP server to your Claude Code configuration:

**`.claude/config.json`:**
```json
{
  "mcpServers": {
    "neo-design-system": {
      "command": "neo-design-system-mcp",
      "env": {
        "NEO_COMPONENT_KIT_PATH": "./Neo Design System/neo-component-kit-ai-enhanced",
        "NEO_ICON_KIT_PATH": "./Neo Design System/neo-icon-kit"
      }
    }
  }
}
```

### Local Development Setup

If you're working with local Neo Design System repositories:

```bash
# Clone this repository
git clone <repo-url>
cd neo-design-system-mcp-server

# Install dependencies
npm install

# Build the server
npm run build

# Set environment variables
export NEO_COMPONENT_KIT_PATH="../Neo Design System/neo-component-kit-ai-enhanced"
export NEO_ICON_KIT_PATH="../Neo Design System/neo-icon-kit"

# Run the server
npm start
```

## Usage Examples

### Component Discovery

```typescript
// Find all button components
search_components({
  query: "button",
  category: "action",
  limit: 5
})

// Find form input components
search_components({
  query: "user input form field",
  category: "form",
  complexity: "simple"
})

// Find layout components
search_components({
  category: "layout",
  limit: 10
})
```

### Icon Search

```typescript
// Find navigation icons
find_icons({
  keywords: "arrow navigation back forward",
  category: "navigation",
  limit: 10
})

// Find action icons
find_icons({
  keywords: "edit delete save create",
  category: "action"
})

// Find status icons
find_icons({
  keywords: "success error warning check"
})
```

### Code Generation

```typescript
// Generate a primary button
generate_component_code({
  component: "nck-button",
  props: {
    label: "Save Changes",
    type: "filled",
    leftIcon: "save"
  },
  context: "form submission"
})

// Generate a form input
generate_component_code({
  component: "nck-text-input",
  props: {
    label: "Email Address",
    type: "email",
    required: true
  },
  context: "user registration form"
})
```

### Design Token Access

```typescript
// Get all color tokens
get_design_tokens({
  type: "colors"
})

// Get typography tokens
get_design_tokens({
  type: "typography",
  usage: "heading text large display"
})

// Get all design tokens
get_design_tokens({
  type: "all"
})
```

## MCP Resources

The server exposes several resources that can be accessed directly:

- `neo://components` - All Neo components with metadata
- `neo://icons` - Complete icon library with search capabilities
- `neo://tokens` - Design tokens (colors, typography, spacing, etc.)
- `neo://ai-metadata` - AI-optimized metadata for components

## Architecture

### Component Extraction
- Parses Vue 3 component files and TypeScript interfaces
- Extracts props, events, slots, and documentation
- Integrates with existing AI metadata from `ai-metadata.json`
- Provides semantic categorization and complexity analysis

### Icon Processing
- Scans SVG files across organized category directories
- Generates searchable keywords and metadata
- Creates Base64 previews for AI consumption
- Supports semantic search with contextual scoring

### Design Token Parsing
- Processes LESS variable files (`colorsVariables.less`, etc.)
- Extracts CSS custom properties
- Provides semantic mapping and usage recommendations
- Supports both literal and semantic color systems

### Search Engine
- Intelligent text matching with semantic scoring
- Context-aware component and icon recommendations
- Code generation following Neo Design System patterns
- Design token suggestions based on usage scenarios

## Development

### Build Commands

```bash
npm run build        # Build TypeScript to JavaScript
npm run dev          # Watch mode for development
npm run clean        # Clean build directory
npm start            # Start the MCP server
```

### File Watching

The server automatically watches for changes in:
- Component files (`src/components/**/*.vue`)
- Interface files (`src/components/**/*.ts`)
- Icon files (`icons/**/*.svg`)
- Design token files (`src/styles/**/*.less`)
- AI metadata (`ai-metadata.json`)

### Testing

```bash
# Test component extraction
node build/index.js --test-components

# Test icon extraction
node build/index.js --test-icons

# Test design token extraction
node build/index.js --test-tokens
```

## API Reference

### Tools

#### `search_components`
Find Neo Design System components using natural language queries.

**Parameters:**
- `query` (string, optional): Search query for component functionality
- `category` (string, optional): Component category filter
- `complexity` (string, optional): Complexity level (simple, medium, complex)
- `limit` (number, optional): Maximum results (default: 10)

#### `find_icons`
Search for icons using keywords and categories.

**Parameters:**
- `keywords` (string, optional): Search keywords
- `category` (string, optional): Icon category filter
- `limit` (number, optional): Maximum results (default: 20)

#### `generate_component_code`
Generate Vue component code using Neo Design System patterns.

**Parameters:**
- `component` (string, required): Component name (e.g., "nck-button")
- `props` (object, optional): Component props to apply
- `context` (string, optional): Usage context for code generation

#### `get_design_tokens`
Access Neo Design System design tokens.

**Parameters:**
- `type` (string, required): Token type (colors, typography, spacing, radius, shadows, animation, all)
- `usage` (string, optional): Usage context for recommendations

### Resources

All resources return JSON data and can be accessed via the `neo://` URI scheme.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues, questions, or contributions, please use the GitHub repository issue tracker.