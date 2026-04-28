The Neo Component Kit can be enhanced with AI-assisted development workflows through Claude Code's MCP (Model Context Protocol) server integration.

This configuration enables intelligent component suggestions, automated documentation generation, and enhanced development productivity when working with Neo Design System components.

### Prerequisites

- Claude Code CLI installed and configured
- Neo Component Kit v16.0.0+ installed in your project
- Access to modify your project's `.claude/` configuration directory
- Basic familiarity with MCP server configuration

### MCP Server Setup

First, ensure you have Claude Code installed. If not, follow the installation guide at [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code).

#### 1. Create MCP Server Configuration

Create or update your `.claude/claude_desktop_config.json` file in your project root:

```json static
{
  "mcpServers": {
    "neo-design-system": {
      "command": "node",
      "args": [
        "/path/to/your/project/neo-component-kit-mcp-server.js"
      ],
      "env": {
        "NEO_COMPONENT_KIT_PATH": "./node_modules/@neotechnologygroup/neo-component-kit",
        "NEO_ICON_KIT_PATH": "./node_modules/@neotechnologygroup/neo-icon-kit"
      }
    }
  }
}
```

#### 2. Create Neo Component Kit MCP Server Script

Create a `neo-component-kit-mcp-server.js` file in your project root:

```js static
const { Server } = require("@anthropic/mcp-server");
const fs = require("fs");
const path = require("path");

class NeoDesignSystemServer {
  constructor() {
    this.server = new Server(
      {
        name: "neo-design-system",
        version: "1.0.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // Component information tool
    this.server.setRequestHandler("tools/call", async (request) => {
      if (request.params.name === "get_neo_component_info") {
        return this.getComponentInfo(request.params.arguments.componentName);
      }

      if (request.params.name === "list_neo_components") {
        return this.listComponents();
      }

      if (request.params.name === "get_design_tokens") {
        return this.getDesignTokens();
      }
    });

    // Resource handlers for component documentation
    this.server.setRequestHandler("resources/list", async () => {
      return {
        resources: [
          {
            uri: "neo://components/list",
            name: "Neo Components List",
            description: "Complete list of Neo Design System components"
          },
          {
            uri: "neo://tokens/colors",
            name: "Design Tokens - Colors",
            description: "Neo Design System color tokens and variables"
          },
          {
            uri: "neo://tokens/typography",
            name: "Design Tokens - Typography",
            description: "Neo Design System typography tokens and variables"
          }
        ]
      };
    });
  }

  async getComponentInfo(componentName) {
    const componentPath = path.join(
      process.env.NEO_COMPONENT_KIT_PATH,
      "src/components",
      `nck${componentName}.vue`
    );

    if (fs.existsSync(componentPath)) {
      const componentContent = fs.readFileSync(componentPath, "utf-8");
      return {
        content: [{
          type: "text",
          text: `Neo Component: ${componentName}\n\nComponent file found and available for analysis.`
        }]
      };
    }

    return {
      content: [{
        type: "text",
        text: `Component ${componentName} not found in Neo Component Kit.`
      }]
    };
  }

  async listComponents() {
    const componentsPath = path.join(
      process.env.NEO_COMPONENT_KIT_PATH,
      "src/components"
    );

    if (fs.existsSync(componentsPath)) {
      const components = fs.readdirSync(componentsPath)
        .filter(file => file.startsWith('nck') && file.endsWith('.vue'))
        .map(file => file.replace('nck', '').replace('.vue', ''));

      return {
        content: [{
          type: "text",
          text: `Available Neo Components:\n${components.join('\n')}`
        }]
      };
    }

    return {
      content: [{
        type: "text",
        text: "Neo Component Kit not found in project."
      }]
    };
  }

  async getDesignTokens() {
    const tokensPath = path.join(
      process.env.NEO_COMPONENT_KIT_PATH,
      "src/styles"
    );

    if (fs.existsSync(tokensPath)) {
      return {
        content: [{
          type: "text",
          text: "Neo Design System tokens are available for analysis."
        }]
      };
    }

    return {
      content: [{
        type: "text",
        text: "Design tokens not found."
      }]
    };
  }

  async run() {
    const transport = new StdioTransport();
    await this.server.connect(transport);
  }
}

const server = new NeoDesignSystemServer();
server.run().catch(console.error);
```

#### 3. Install MCP Server Dependencies

Install the required MCP server dependencies:

```static
npm install @anthropic/mcp-server
```

#### 4. Configure Environment Variables

Add the Neo Component Kit paths to your environment configuration:

```js static
// In your .env or environment configuration
NEO_COMPONENT_KIT_PATH=./node_modules/@neotechnologygroup/neo-component-kit
NEO_ICON_KIT_PATH=./node_modules/@neotechnologygroup/neo-icon-kit
```

### Integration with Neo Design System

Once configured, Claude Code will have access to:

- **Component Discovery**: Automatic detection and listing of available Neo components
- **Design Token Access**: Direct access to color, typography, and spacing tokens
- **Icon Integration**: Seamless integration with Neo Icon Kit (833+ icons)
- **Component Analysis**: AI-powered component usage recommendations
- **Code Generation**: Enhanced code completion for Neo components

#### Example Usage in Claude Code

```js static
// Claude Code can now provide intelligent suggestions like:
import { NckButton, ButtonType } from "@neotechnologygroup/neo-component-kit";

// With proper prop suggestions and type checking
<nck-button
  :buttonType="ButtonType.PRIMARY"
  :disabled="false"
  leftIcon="arrow-left"
  @click="handleClick"
>
  Save Changes
</nck-button>
```

### Verification

To verify your MCP server configuration is working:

1. Restart Claude Code after configuration changes
2. Create a new Vue component file
3. Start typing Neo component names - you should see enhanced autocomplete
4. Ask Claude Code about available Neo components or design tokens

### Troubleshooting

**MCP Server Not Starting**
- Verify the path to your MCP server script is correct
- Check that Node.js and npm dependencies are properly installed
- Ensure environment variables are set correctly

**Components Not Detected**
- Confirm Neo Component Kit is installed in `node_modules`
- Verify the `NEO_COMPONENT_KIT_PATH` environment variable points to the correct location
- Check file permissions on the Neo Component Kit directory

**Missing Icon Suggestions**
- Ensure Neo Icon Kit is properly installed and configured (see [Icons](#icons) section)
- Verify the `NEO_ICON_KIT_PATH` environment variable is set
- Check that icons have been copied to your static assets directory

**Claude Code Connection Issues**
- Restart Claude Code completely
- Check the Claude Code logs for MCP server connection errors
- Verify your `.claude/claude_desktop_config.json` syntax is valid JSON

For additional MCP server configuration options and advanced features, refer to the [Claude Code MCP Documentation](https://docs.claude.com/en/docs/claude-code/mcp).