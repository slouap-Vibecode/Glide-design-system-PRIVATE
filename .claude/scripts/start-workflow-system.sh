#!/bin/bash

# Neo Design System Workflow System Launcher
# One-command setup and launch for the complete workflow system

echo "🚀 Neo Design System Workflow System"
echo "===================================="

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CLAUDE_SCRIPTS_DIR="$PROJECT_ROOT/.claude/scripts"

cd "$PROJECT_ROOT"

# Check if this is the first run
if [ ! -f "$CLAUDE_SCRIPTS_DIR/.workflow-system-setup" ]; then
    echo "📦 First-time setup detected..."

    # Install dependencies
    echo "🔧 Installing dependencies..."
    if command -v npm >/dev/null 2>&1; then
        npm install chokidar 2>/dev/null || {
            echo "⚠️  chokidar not installed globally, installing locally..."
            cd "$PROJECT_ROOT/internal-component-kit-master"
            npm install chokidar --save-dev
            cd "$PROJECT_ROOT"
        }
        echo "✅ Dependencies installed"
    else
        echo "❌ npm not found - please install Node.js and npm"
        exit 1
    fi

    # Setup git hooks
    echo "🪝 Setting up git hooks..."
    if [ -d "$PROJECT_ROOT/.git" ]; then
        bash "$CLAUDE_SCRIPTS_DIR/setup-git-hooks.sh"
        echo "✅ Git hooks installed"
    else
        echo "⚠️  Not a git repository - git hooks skipped"
    fi

    # Mark as setup complete
    echo "setup_complete=$(date)" > "$CLAUDE_SCRIPTS_DIR/.workflow-system-setup"

    echo ""
    echo "🎉 Initial setup complete!"
    echo ""
fi

# Check system health
echo "🔍 Checking system health..."

# Check Node.js
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found"
    exit 1
fi

# Check npm
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm: $NPM_VERSION"
else
    echo "❌ npm not found"
    exit 1
fi

# Check chokidar
if node -e "require('chokidar')" 2>/dev/null; then
    echo "✅ chokidar: installed"
else
    echo "❌ chokidar not found - installing..."
    npm install chokidar --save-dev
fi

# Check component kit
if [ -d "$PROJECT_ROOT/internal-component-kit-master" ]; then
    echo "✅ Neo Component Kit: found"
else
    echo "⚠️  Neo Component Kit not found at expected location"
fi

echo ""
echo "🎯 Workflow System Status:"
echo "   📁 Project: $PROJECT_ROOT"
echo "   🤖 File Watcher: Ready"
echo "   🪝 Git Hooks: $([ -f "$PROJECT_ROOT/.git/hooks/pre-commit" ] && echo "Active" || echo "Not installed")"
echo "   📝 Logs: .claude/scripts/"
echo ""

# Offer startup options
echo "🚀 Choose startup option:"
echo "   1) Start file watcher (monitors changes and suggests workflows)"
echo "   2) Run system health check"
echo "   3) Show usage examples"
echo "   4) Exit"
echo ""

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔍 Starting Neo Design System File Watcher..."
        echo "   - Monitors Vue components, styles, and configs"
        echo "   - Suggests appropriate workflows automatically"
        echo "   - Press Ctrl+C to stop"
        echo ""
        node "$CLAUDE_SCRIPTS_DIR/workflow-watcher.js"
        ;;
    2)
        echo ""
        echo "🏥 Running system health check..."

        # TypeScript check
        if [ -d "$PROJECT_ROOT/internal-component-kit-master" ]; then
            cd "$PROJECT_ROOT/internal-component-kit-master"
            echo "🔍 Checking TypeScript compilation..."
            npm run typecheck
            TYPECHECK_EXIT=$?

            if [ $TYPECHECK_EXIT -eq 0 ]; then
                echo "✅ TypeScript: All good"
            else
                echo "❌ TypeScript: Errors found"
                echo ""
                echo "💡 SUGGESTED WORKFLOW:"
                echo "   claude code 'Execute emergency TypeScript fix workflow - compilation errors detected'"
            fi

            cd "$PROJECT_ROOT"
        fi

        # Component analysis
        echo "🧩 Analyzing components..."
        VUE_COUNT=$(find "$PROJECT_ROOT/internal-component-kit-master/src/components" -name "*.vue" 2>/dev/null | wc -l)
        INTERFACE_COUNT=$(find "$PROJECT_ROOT/internal-component-kit-master/src/components/interfaces" -name "*.ts" 2>/dev/null | wc -l)

        echo "   Vue Components: $VUE_COUNT"
        echo "   TypeScript Interfaces: $INTERFACE_COUNT"

        if [ $VUE_COUNT -gt $INTERFACE_COUNT ]; then
            MISSING=$((VUE_COUNT - INTERFACE_COUNT))
            echo "⚠️  $MISSING components may be missing TypeScript interfaces"
            echo ""
            echo "💡 SUGGESTED WORKFLOW:"
            echo "   claude code 'Run interface audit workflow - check for missing TypeScript interfaces'"
        fi

        echo "✅ Health check complete"
        ;;
    3)
        echo ""
        echo "📚 Workflow Usage Examples:"
        echo ""
        echo "🔵 Component Development:"
        echo "   claude code 'Execute component development workflow for nckProgressIndicator component'"
        echo ""
        echo "🔴 Bug Fixes:"
        echo "   claude code 'Run bug fix workflow for TypeScript errors in nckButton component'"
        echo ""
        echo "🟡 Design System:"
        echo "   claude code 'Execute design system validation workflow for updated color tokens'"
        echo ""
        echo "🟢 System Audit:"
        echo "   claude code 'Run comprehensive audit workflow for button, card, and input components'"
        echo ""
        echo "🟠 Performance:"
        echo "   claude code 'Execute performance optimization workflow - build time issues'"
        echo ""
        echo "🔴 Emergency:"
        echo "   claude code 'Emergency response workflow - production build failing'"
        echo ""
        echo "💡 Context-Based (automatically selects workflow):"
        echo "   claude code 'Create new toast notification component'"
        echo "   claude code 'Fix the modal component accessibility'"
        echo "   claude code 'Optimize the build performance'"
        echo ""
        echo "🔄 File Watcher Integration:"
        echo "   1. Start file watcher: node .claude/scripts/workflow-watcher.js"
        echo "   2. Modify any Vue component"
        echo "   3. See automatic workflow suggestions"
        echo "   4. Copy/paste suggested commands to Claude Code"
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac