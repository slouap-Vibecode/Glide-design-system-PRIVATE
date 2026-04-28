# Claude Code Integration Guide

This guide shows how to integrate the Neo Design System MCP server with Claude Code for AI-assisted development.

## Quick Setup

### 1. Install the MCP Server

```bash
# Option A: Install globally
npm install -g neo-design-system-mcp-server

# Option B: Install locally in your project
npm install neo-design-system-mcp-server
```

### 2. Configure Claude Code

Add the following configuration to your project's `.claude/config.json`:

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

### 3. Verify Setup

Restart Claude Code and verify the integration:

```bash
# Check if the MCP server is loaded
# In Claude Code, you should see "neo-design-system" in the MCP servers list
```

## Configuration Options

### Environment Variables

You can customize the MCP server behavior using environment variables:

```json
{
  "mcpServers": {
    "neo-design-system": {
      "command": "neo-design-system-mcp",
      "env": {
        "NEO_COMPONENT_KIT_PATH": "/path/to/neo-component-kit-ai-enhanced",
        "NEO_ICON_KIT_PATH": "/path/to/neo-icon-kit",
        "NEO_MCP_CACHE_DIR": "./.neo-cache",
        "NEO_MCP_ENABLE_WATCHER": "true"
      }
    }
  }
}
```

### Path Configuration

#### Absolute Paths
```json
{
  "env": {
    "NEO_COMPONENT_KIT_PATH": "/Users/username/projects/Neo Design System/neo-component-kit-ai-enhanced",
    "NEO_ICON_KIT_PATH": "/Users/username/projects/Neo Design System/neo-icon-kit"
  }
}
```

#### Relative Paths (from project root)
```json
{
  "env": {
    "NEO_COMPONENT_KIT_PATH": "./Neo Design System/neo-component-kit-ai-enhanced",
    "NEO_ICON_KIT_PATH": "./Neo Design System/neo-icon-kit"
  }
}
```

#### Node Modules (if published)
```json
{
  "env": {
    "NEO_COMPONENT_KIT_PATH": "./node_modules/@neotechnologygroup/neo-component-kit",
    "NEO_ICON_KIT_PATH": "./node_modules/@neotechnologygroup/neo-icon-kit"
  }
}
```

## Usage Examples

### Component Discovery

Ask Claude Code questions like:

- "Show me all button components in the Neo Design System"
- "Find form input components for user registration"
- "What layout components are available?"
- "Generate a primary action button with an icon"

### Icon Search

- "Find icons for navigation"
- "Show me error and success state icons"
- "What icons are available for file operations?"
- "Generate an icon for user settings"

### Code Generation

- "Create a Neo button component for form submission"
- "Generate a card component with header and actions"
- "Build a form input with validation"
- "Create a modal dialog using Neo components"

### Design Tokens

- "What color should I use for primary actions?"
- "Show me the typography scale"
- "What spacing tokens are available?"
- "Generate CSS using Neo design tokens"

## Troubleshooting

### MCP Server Not Loading

1. **Check paths**: Ensure `NEO_COMPONENT_KIT_PATH` and `NEO_ICON_KIT_PATH` point to valid directories
2. **Verify installation**: Run `neo-design-system-mcp --help` to check if the command is available
3. **Check permissions**: Ensure Claude Code has read access to the Neo Design System directories
4. **Restart Claude Code**: After configuration changes, restart Claude Code completely

### Path Issues

```bash
# Test if paths are correct
ls "$NEO_COMPONENT_KIT_PATH/src/components"  # Should list component files
ls "$NEO_ICON_KIT_PATH/icons"               # Should list icon directories
```

### Cache Issues

```bash
# Clear MCP cache if needed
rm -rf ./.neo-mcp-cache
```

### Debug Mode

Enable debug logging by setting:

```json
{
  "env": {
    "NEO_MCP_DEBUG": "true"
  }
}
```

## Integration Examples

### Project Structure with Neo Design System

```
my-project/
├── .claude/
│   └── config.json                 # MCP server configuration
├── Neo Design System/              # Local Neo Design System
│   ├── neo-component-kit-ai-enhanced/
│   └── neo-icon-kit/
├── src/
│   ├── components/                 # Your project components
│   └── pages/
└── package.json
```

### Multi-Project Setup

If you have multiple projects using Neo Design System:

```json
{
  "mcpServers": {
    "neo-design-system": {
      "command": "neo-design-system-mcp",
      "env": {
        "NEO_COMPONENT_KIT_PATH": "../../shared/Neo Design System/neo-component-kit-ai-enhanced",
        "NEO_ICON_KIT_PATH": "../../shared/Neo Design System/neo-icon-kit"
      }
    }
  }
}
```

### Monorepo Setup

For monorepos with shared Neo Design System:

```json
{
  "mcpServers": {
    "neo-design-system": {
      "command": "neo-design-system-mcp",
      "env": {
        "NEO_COMPONENT_KIT_PATH": "../../packages/neo-component-kit",
        "NEO_ICON_KIT_PATH": "../../packages/neo-icon-kit"
      }
    }
  }
}
```

## Advanced Configuration

### Custom Cache Directory

```json
{
  "env": {
    "NEO_MCP_CACHE_DIR": "./custom-cache-dir"
  }
}
```

### Disable File Watching

For better performance in large projects:

```json
{
  "env": {
    "NEO_MCP_ENABLE_WATCHER": "false"
  }
}
```

### Multiple MCP Servers

You can run multiple design system servers:

```json
{
  "mcpServers": {
    "neo-design-system": {
      "command": "neo-design-system-mcp",
      "env": {
        "NEO_COMPONENT_KIT_PATH": "./Neo Design System/neo-component-kit-ai-enhanced",
        "NEO_ICON_KIT_PATH": "./Neo Design System/neo-icon-kit"
      }
    },
    "other-design-system": {
      "command": "other-design-system-mcp",
      "env": {
        "OTHER_COMPONENT_PATH": "./other-design-system"
      }
    }
  }
}
```

## Best Practices

### 1. Use Relative Paths
Use relative paths in your configuration for better portability across development environments.

### 2. Version Control Configuration
Include `.claude/config.json` in version control so all team members have the same MCP server setup.

### 3. Environment-Specific Configuration
Use different configurations for different environments:

```json
{
  "mcpServers": {
    "neo-design-system": {
      "command": "neo-design-system-mcp",
      "env": {
        "NEO_COMPONENT_KIT_PATH": "${NEO_COMPONENT_KIT_PATH:-./Neo Design System/neo-component-kit-ai-enhanced}",
        "NEO_ICON_KIT_PATH": "${NEO_ICON_KIT_PATH:-./Neo Design System/neo-icon-kit}"
      }
    }
  }
}
```

### 4. Cache Management
The MCP server creates a cache directory (`.neo-mcp-cache` by default). Add this to your `.gitignore`:

```gitignore
.neo-mcp-cache/
```

### 5. Team Setup
Document the setup process for your team in your project README:

```markdown
## Neo Design System Integration

1. Ensure you have the Neo Design System in the correct location
2. Install the MCP server: `npm install -g neo-design-system-mcp-server`
3. Restart Claude Code to load the MCP server
```

## Performance Tips

- Use SSD storage for better file system performance
- Consider disabling file watching in very large projects
- Use local installations rather than network paths
- Clear the cache periodically if you notice performance issues

## Security Considerations

- The MCP server only reads files, it doesn't modify your Neo Design System
- Ensure file permissions allow Claude Code to read the Neo Design System directories
- The server creates a local cache but doesn't send any data externally

## Support

If you encounter issues:

1. Check the Claude Code console for error messages
2. Verify your path configuration
3. Test the MCP server command directly: `neo-design-system-mcp --help`
4. Consult the main README for troubleshooting steps