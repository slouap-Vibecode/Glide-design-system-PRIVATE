#!/bin/bash

# Neo Design System Git Hooks Setup Script
# Sets up automatic workflow suggestions on git events

echo "🔧 Setting up Neo Design System Git Hooks..."

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
GIT_HOOKS_DIR="$PROJECT_ROOT/.git/hooks"
CLAUDE_SCRIPTS_DIR="$PROJECT_ROOT/.claude/scripts"

# Create git hooks directory if it doesn't exist
mkdir -p "$GIT_HOOKS_DIR"

# Pre-commit hook
echo "📝 Creating pre-commit hook..."
cat > "$GIT_HOOKS_DIR/pre-commit" << 'EOF'
#!/bin/bash

# Neo Design System Pre-commit Workflow Hook
echo "🔍 Neo Design System Pre-commit Analysis..."

# Get staged files
STAGED_FILES=$(git diff --cached --name-only)

if [ -z "$STAGED_FILES" ]; then
    echo "ℹ️  No files staged for commit"
    exit 0
fi

echo "📁 Staged files:"
echo "$STAGED_FILES" | sed 's/^/   /'

# Check for Vue component changes
VUE_FILES=$(echo "$STAGED_FILES" | grep "internal-component-kit-master/src/components/.*\.vue$" || true)
if [ ! -z "$VUE_FILES" ]; then
    echo ""
    echo "🔵 Vue Component Changes Detected:"
    echo "$VUE_FILES" | sed 's/^/   /'

    # Run TypeScript check
    echo "   Running TypeScript validation..."
    cd internal-component-kit-master
    npm run typecheck > /dev/null 2>&1
    TYPECHECK_EXIT_CODE=$?
    cd ..

    if [ $TYPECHECK_EXIT_CODE -ne 0 ]; then
        echo "❌ TypeScript errors found!"
        echo ""
        echo "🤖 WORKFLOW SUGGESTION:"
        echo "   claude code 'Execute emergency bug fix workflow for TypeScript errors in Vue components: $VUE_FILES'"
        echo ""
        echo "🚨 Commit blocked due to TypeScript errors"
        echo "   Run the suggested workflow to fix errors, then commit again"
        exit 1
    else
        echo "✅ TypeScript validation passed"

        # Suggest component validation workflow
        echo ""
        echo "💡 WORKFLOW SUGGESTION:"
        echo "   claude code 'Run component validation workflow for updated Vue components: $VUE_FILES'"
    fi
fi

# Check for interface changes
INTERFACE_FILES=$(echo "$STAGED_FILES" | grep "internal-component-kit-master/src/components/interfaces/.*\.ts$" || true)
if [ ! -z "$INTERFACE_FILES" ]; then
    echo ""
    echo "🔵 Interface Changes Detected:"
    echo "$INTERFACE_FILES" | sed 's/^/   /'
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Execute interface validation workflow for updated TypeScript interfaces: $INTERFACE_FILES'"
fi

# Check for style changes
STYLE_FILES=$(echo "$STAGED_FILES" | grep "internal-component-kit-master/src/styles/.*\.less$" || true)
if [ ! -z "$STYLE_FILES" ]; then
    echo ""
    echo "🎨 Style Changes Detected:"
    echo "$STYLE_FILES" | sed 's/^/   /'
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Run design system validation workflow for updated style files: $STYLE_FILES'"
fi

# Check for constants changes
CONSTANTS_FILES=$(echo "$STAGED_FILES" | grep "internal-component-kit-master/src/constants/.*\.ts$" || true)
if [ ! -z "$CONSTANTS_FILES" ]; then
    echo ""
    echo "⚙️  Constants Changes Detected:"
    echo "$CONSTANTS_FILES" | sed 's/^/   /'
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Execute constants validation workflow for updated constant files: $CONSTANTS_FILES'"
fi

# Check for package.json changes
PACKAGE_CHANGED=$(echo "$STAGED_FILES" | grep "internal-component-kit-master/package.json" || true)
if [ ! -z "$PACKAGE_CHANGED" ]; then
    echo ""
    echo "📦 Package Dependencies Changed"
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Run build validation workflow - package dependencies updated'"
fi

# Check for multiple component changes (suggest integration testing)
COMPONENT_COUNT=$(echo "$VUE_FILES" | grep -v "^$" | wc -l)
if [ $COMPONENT_COUNT -gt 2 ]; then
    echo ""
    echo "🧪 Multiple Components Updated ($COMPONENT_COUNT)"
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Execute integration testing workflow - $COMPONENT_COUNT components updated simultaneously'"
fi

echo ""
echo "✅ Pre-commit analysis complete"

# Log this commit analysis
echo "$(date): Pre-commit analysis - Staged files: $STAGED_FILES" >> .claude/scripts/git-workflow-log.txt
EOF

# Post-commit hook
echo "📝 Creating post-commit hook..."
cat > "$GIT_HOOKS_DIR/post-commit" << 'EOF'
#!/bin/bash

# Neo Design System Post-commit Workflow Hook
echo "📊 Neo Design System Post-commit Analysis..."

# Get files in latest commit
CHANGED_FILES=$(git diff-tree --no-commit-id --name-only -r HEAD)
COMMIT_MSG=$(git log -1 --pretty=%B)

echo "📁 Files in commit:"
echo "$CHANGED_FILES" | sed 's/^/   /'

# Check for documentation updates needed
CODE_FILES=$(echo "$CHANGED_FILES" | grep -E "internal-component-kit-master/src/.*\.(vue|ts|js)$" || true)
if [ ! -z "$CODE_FILES" ]; then
    echo ""
    echo "📝 Code Changes Detected - Documentation Sync Recommended"
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Update documentation workflow for changed code files: $CODE_FILES'"
fi

# Suggest comprehensive testing for large commits
FILE_COUNT=$(echo "$CHANGED_FILES" | grep -v "^$" | wc -l)
if [ $FILE_COUNT -gt 5 ]; then
    echo ""
    echo "🔍 Large Commit Detected ($FILE_COUNT files changed)"
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Execute comprehensive testing workflow - large commit with $FILE_COUNT file changes'"
fi

# Check for component library changes
COMPONENT_LIB_CHANGES=$(echo "$CHANGED_FILES" | grep "internal-component-kit-master/" | wc -l)
if [ $COMPONENT_LIB_CHANGES -gt 0 ]; then
    echo ""
    echo "🧩 Component Library Updated"
    echo ""
    echo "💡 WORKFLOW SUGGESTION:"
    echo "   claude code 'Run component library validation workflow - verify build, exports, and integration'"
fi

# Log this commit
echo "$(date): Post-commit - Files: $CHANGED_FILES | Message: $COMMIT_MSG" >> .claude/scripts/git-workflow-log.txt

echo ""
echo "✅ Post-commit analysis complete"
EOF

# Prepare-commit-msg hook (for commit message suggestions)
echo "📝 Creating prepare-commit-msg hook..."
cat > "$GIT_HOOKS_DIR/prepare-commit-msg" << 'EOF'
#!/bin/bash

# Neo Design System Commit Message Enhancement

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

# Only enhance commit messages for regular commits (not merges, etc.)
if [ "$COMMIT_SOURCE" != "" ]; then
    exit 0
fi

# Get staged files for context
STAGED_FILES=$(git diff --cached --name-only)

# Analyze what's being committed
VUE_COUNT=$(echo "$STAGED_FILES" | grep "\.vue$" | wc -l)
TS_COUNT=$(echo "$STAGED_FILES" | grep "\.ts$" | wc -l)
LESS_COUNT=$(echo "$STAGED_FILES" | grep "\.less$" | wc -l)

# Generate commit message suggestions based on changes
SUGGESTIONS=""

if [ $VUE_COUNT -gt 0 ]; then
    SUGGESTIONS="$SUGGESTIONS\n# Vue components modified ($VUE_COUNT files)"
    if [ $VUE_COUNT -eq 1 ]; then
        COMPONENT_NAME=$(echo "$STAGED_FILES" | grep "\.vue$" | head -1 | xargs basename -s .vue)
        SUGGESTIONS="$SUGGESTIONS\n# Consider: 'feat: enhance $COMPONENT_NAME component' or 'fix: resolve $COMPONENT_NAME issue'"
    fi
fi

if [ $TS_COUNT -gt 0 ]; then
    SUGGESTIONS="$SUGGESTIONS\n# TypeScript files modified ($TS_COUNT files)"
    INTERFACE_COUNT=$(echo "$STAGED_FILES" | grep "/interfaces/" | wc -l)
    if [ $INTERFACE_COUNT -gt 0 ]; then
        SUGGESTIONS="$SUGGESTIONS\n# Consider: 'types: update component interfaces'"
    fi
fi

if [ $LESS_COUNT -gt 0 ]; then
    SUGGESTIONS="$SUGGESTIONS\n# Style files modified ($LESS_COUNT files)"
    SUGGESTIONS="$SUGGESTIONS\n# Consider: 'style: update design tokens' or 'style: refactor component styles'"
fi

# Add suggestions to commit message template
if [ ! -z "$SUGGESTIONS" ]; then
    echo "" >> "$COMMIT_MSG_FILE"
    echo "# Commit suggestions based on staged files:" >> "$COMMIT_MSG_FILE"
    echo -e "$SUGGESTIONS" >> "$COMMIT_MSG_FILE"
    echo "#" >> "$COMMIT_MSG_FILE"
    echo "# After commit, consider running relevant workflows:" >> "$COMMIT_MSG_FILE"

    if [ $VUE_COUNT -gt 0 ]; then
        echo "# - Component validation workflow" >> "$COMMIT_MSG_FILE"
    fi
    if [ $LESS_COUNT -gt 0 ]; then
        echo "# - Design system validation workflow" >> "$COMMIT_MSG_FILE"
    fi
    if [ $((VUE_COUNT + TS_COUNT + LESS_COUNT)) -gt 3 ]; then
        echo "# - Integration testing workflow" >> "$COMMIT_MSG_FILE"
    fi
fi
EOF

# Make hooks executable
chmod +x "$GIT_HOOKS_DIR/pre-commit"
chmod +x "$GIT_HOOKS_DIR/post-commit"
chmod +x "$GIT_HOOKS_DIR/prepare-commit-msg"

# Create log file
touch "$CLAUDE_SCRIPTS_DIR/git-workflow-log.txt"

echo ""
echo "✅ Git hooks installed successfully!"
echo ""
echo "🔧 Installed hooks:"
echo "   ✓ pre-commit: Validates TypeScript, suggests workflows"
echo "   ✓ post-commit: Suggests documentation and testing workflows"
echo "   ✓ prepare-commit-msg: Enhanced commit message suggestions"
echo ""
echo "📝 Logs will be written to: .claude/scripts/git-workflow-log.txt"
echo ""
echo "🚀 Next steps:"
echo "   1. Make a test commit to see the hooks in action"
echo "   2. Install the file watcher: npm install chokidar && node .claude/scripts/workflow-watcher.js"
echo "   3. Start using Claude Code with suggested workflows"
echo ""
echo "💡 Example workflow commands:"
echo "   claude code 'Execute component development workflow for nckNewComponent'"
echo "   claude code 'Run bug fix workflow for TypeScript errors'"
echo "   claude code 'Execute design system validation workflow'"