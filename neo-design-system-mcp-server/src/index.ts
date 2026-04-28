#!/usr/bin/env node

import { NeoDesignSystemMcpServer } from './server';

async function main() {
  const server = new NeoDesignSystemMcpServer();

  const transport = process.argv.includes('--stdio')
    ? process.stdin
    : process.argv.includes('--sse')
    ? { type: 'sse', url: process.argv[process.argv.indexOf('--sse') + 1] }
    : process.stdin;

  await server.run({ transport });
}

// Check if this module is being run directly
if (require.main === module) {
  main().catch((error) => {
    console.error('MCP server failed:', error);
    process.exit(1);
  });
}