# Claude Code Instructions - Design Workspace

## Design Workspace Context & Situation

### Current State
The **Design Workspace** (`/Users/slouap/Documents/Cursor app/Glide-workspace/`) is a comprehensive development environment for the **Neo Design System** that includes:

- **Active Projects**: Neo Component Kit, Neo Icon Kit, Harmony Website integration
- **Current Challenge**: Build system integration and component rendering issues
- **Development Phase**: Optimization, integration testing, and knowledge consolidation
- **Priority Focus**: TypeScript compilation, module resolution, and cross-project compatibility

### Workspace Structure Overview
```
Glide-workspace/
├── Neo Design System/              # Main Neo Design System directory
│   ├── neo-component-kit-ai-enhanced/  # Vue 3 component library (main)
│   └── neo-icon-kit/              # SVG icon library (833+ icons)
└── .claude/                        # Agent and skill configurations
```

### Current Objectives
1. **Build System Stabilization**: Fix TypeScript compilation and module resolution issues
2. **Component Integration**: Ensure seamless Neo component usage across projects
3. **Knowledge Base Development**: Document solutions for recurring issues
4. **Performance Optimization**: Improve build times and runtime performance
5. **Documentation Organization**: Maintain structured knowledge management

---

## System Access & Permissions

### Full File System Access Rights
Claude Code has **COMPLETE READ/WRITE ACCESS** to all files and folders within the Glide-workspace environment:

#### File Operations - NO APPROVAL REQUIRED
- ✅ **Read** any file in any directory (`Read(*)`)
- ✅ **Edit** any existing file (`Edit(*)`)
- ✅ **Write** new files anywhere (`Write(*)`)
- ✅ **Search** files and content (`Glob(*)`, `Grep(*)`)
- ✅ **Move/Copy/Delete** files via bash commands (`mv`, `cp`, `rm`)
- ✅ **Create directories** and manage folder structure (`mkdir`)

#### Web Access & External Resources
- ✅ **Fetch** content from any website (`WebFetch(*)`)
- ✅ **Access** documentation, references, and external APIs
- ✅ **Integration** with design tools (Figma via MCP)
- ✅ **Browser automation** via Chrome DevTools MCP

#### Development Tools & Automation
- ✅ **Execute** build scripts, tests, and development commands
- ✅ **Manage** package dependencies (`npm install`, `npm update`)
- ✅ **Version control** operations (git commands)
- ✅ **IDE integration** via MCP servers

#### Autonomous Operation Mode
**IMPORTANT**: All file operations, web access, and development tools can be used **without requesting user permission**. This enables:

- **Proactive problem solving** - Identify and fix issues immediately
- **Comprehensive system analysis** - Read any file needed for context
- **Rapid prototyping** - Create test files and configurations
- **External research** - Fetch documentation and best practices
- **Complete workspace management** - Organize and optimize the entire environment

#### Usage Guidelines
```bash
# ✅ Autonomous file operations
Read /path/to/any/file.ts          # No approval needed
Edit src/components/Button.vue     # Direct editing allowed
Write new-config.json             # Create files freely
WebFetch https://docs.vue.js      # Access external docs

# ✅ Development workflow automation
npm run build                     # Execute build scripts
git commit -m "fix: issue"        # Version control operations
mkdir new-feature                 # Create project structure
```

This access level enables **maximum efficiency** and **autonomous problem solving** while maintaining the highest standards for code quality and documentation.

---

## Autonomous Agent System - USE PROACTIVELY

### Available Specialized Agents

Claude Code has access to specialized agents that should be used **AUTOMATICALLY and PROACTIVELY** whenever their expertise is needed. **DO NOT ask the user** - invoke agents autonomously when appropriate.

#### Core Design System Agents

1. **Design System Manager** (`design-system-manager`)
   - **When to Use**: Design token governance, brand consistency, component specifications
   - **Invoke for**: Token architecture decisions, component design guidelines, brand adherence
   - **Usage**: Autonomous for design decisions and token management

2. **Vue Design System Engineer** (`design-system-vue`)
   - **When to Use**: Vue 3 component implementation, Composition API patterns, Vue-specific issues
   - **Invoke for**: Component development, Vue performance optimization, reactivity issues
   - **Usage**: Autonomous for all Vue.js related tasks

3. **Design System UX Engineer** (`design-system-ux-engineer`)
   - **When to Use**: Accessibility requirements, user experience patterns, interaction design
   - **Invoke for**: WCAG compliance, usability improvements, interaction patterns
   - **Usage**: Autonomous for accessibility and UX concerns

#### Support Agents

4. **Engineer Agent** (`engineer_agent`)
   - **When to Use**: General software engineering challenges, architecture decisions
   - **Invoke for**: Build system issues, module resolution, performance optimization
   - **Usage**: Autonomous for technical engineering problems

5. **Product Designer Agent** (`product_designer_agent`)
   - **When to Use**: Visual design decisions, component aesthetics, design consistency
   - **Invoke for**: Visual design validation, component appearance, brand compliance
   - **Usage**: Autonomous for design validation tasks

6. **QA Tester Agent** (`qa_tester_agent`)
   - **When to Use**: Testing strategies, validation procedures, quality assurance
   - **Invoke for**: Component testing, integration testing, quality validation
   - **Usage**: Autonomous for testing and quality assurance

### Agent Coordination Patterns

#### Sequential Agent Usage
Use when tasks have dependencies and must be completed in order:
```
1. Design System Manager → Define component requirements
2. Vue Design System Engineer → Implement Vue component
3. QA Tester Agent → Validate implementation
4. UX Engineer → Verify accessibility compliance
```

#### Parallel Agent Usage
Use when tasks are independent and can run simultaneously:
```
Parallel Tasks:
- Vue Engineer: Fix TypeScript compilation issues
- Design Manager: Update design token documentation
- QA Tester: Validate existing component functionality
- UX Engineer: Audit accessibility compliance
```

#### Autonomous Invocation Rules
**ALWAYS invoke agents proactively when:**
- Working with Vue components → `design-system-vue`
- Making design decisions → `design-system-manager`
- Addressing accessibility → `design-system-ux-engineer`
- Solving build issues → `engineer_agent`
- Validating quality → `qa_tester_agent`
- Reviewing visual design → `product_designer_agent`

**Example Autonomous Usage:**
```typescript
// When encountering Vue component issues, AUTOMATICALLY invoke:
// Task tool with subagent_type=design-system-vue

// When making design token decisions, AUTOMATICALLY invoke:
// Task tool with subagent_type=design-system-manager

// Run agents in parallel when possible for efficiency
```

---

## Neo Design System Architecture

### Internal Component Kit Structure

**Location**: `/Users/slouap/Documents/Cursor app/Glide-workspace/Neo Design System/neo-component-kit-ai-enhanced/`

#### Core Directories
```
src/
├── components/           # 70+ Vue 3 components (nckButton, nckCard, etc.)
│   ├── interfaces/       # TypeScript component interfaces
│   └── internal/         # Private sub-components
├── constants/           # 45+ design system constants (ButtonType, IconSize, etc.)
├── styles/             # Design tokens and CSS variables
│   ├── colorsVariables.less      # Color palette definitions
│   ├── radiusVariables.less      # Border radius tokens
│   ├── typographyVariables.less  # Font and text tokens
│   └── animationVariables.less   # Transition and animation tokens
├── composables/        # Vue 3 composables for shared logic
├── helpers/           # Utility functions and DOM helpers
├── controllers/       # Service classes (modal, toast, etc.)
└── models/           # TypeScript interfaces and types
```

#### Key Files
- **`main.ts`**: Main export file for component library
- **`ai-main.ts`**: AI-enhanced export file with extended functionality
- **`main.external.ts`**: External usage export file
- **Component Files**: `nckButton.vue`, `nckCard.vue`, etc. (70+ components)
- **Interface Files**: `iNckButton.ts`, `iNckCard.ts`, etc. (TypeScript definitions)

#### Design Token System
```less
// Color tokens (colorsVariables.less)
@bright-blue-300: #006fcf;
@bright-blue-400: #0056a3;
@white: #ffffff;

// Radius tokens (radiusVariables.less)
--nck-radius-s: 4px;
--nck-radius-m: 8px;
--nck-radius-l: 12px;

// Typography tokens (typographyVariables.less)
--font-family-primary: 'Inter', sans-serif;
--font-size-body: 16px;
--line-height-normal: 1.5;
```

### Neo Icon Kit Structure

**Location**: `/Users/slouap/Documents/Cursor app/Glide-workspace/Neo Design System/neo-icon-kit/`

#### Core Structure
```
neo-icon-kit-master/
├── icons/              # 833+ optimized SVG icons
│   ├── action/         # Action icons (edit, delete, save, etc.)
│   ├── navigation/     # Navigation icons (arrow, menu, etc.)
│   ├── communication/  # Communication icons (email, phone, etc.)
│   ├── media/          # Media icons (play, pause, volume, etc.)
│   ├── status/         # Status icons (success, error, warning, etc.)
│   └── brand/          # Brand and logo icons
├── helperScripts/      # Icon processing and optimization scripts
├── preloadedIcons.js   # Pre-compiled icon bundle (1.3MB)
└── package.json        # NPM package configuration
```

#### Icon Usage Pattern
```vue
<!-- In Vue components -->
<nck-icon
  :iconName="'arrow-left'"
  :iconSize="IconSize.M"
  :primaryColor="'@bright-blue-300'"
  :iconAltText="'Navigate back'"
/>
```

#### Icon Integration
- **Source**: SVG files in `neo-icon-kit-master/icons/`
- **Usage**: Through `nckIcon` Vue component in component kit
- **Processing**: Automated through `generatePreloadedIcons.js`
- **Distribution**: Pre-compiled bundle for performance

---

## Knowledge Base Building Strategy

### Learning & Issue Documentation System

#### Objective
Build a comprehensive knowledge base that captures **every issue encountered** and **every solution implemented** to create institutional knowledge that improves over time.

#### Documentation Categories & Placement

1. **Issue Patterns** → `01- docs/08 - troubleshooting/`
   - Document recurring build errors with solutions
   - TypeScript compilation issues and fixes
   - Module resolution problems and resolutions
   - Performance bottlenecks and optimizations

2. **Root Cause Analysis** → `01- docs/07 - investigations/`
   - Deep technical analysis of complex problems
   - System behavior investigations
   - Performance profiling results
   - Architecture evaluation studies

3. **Solution Playbooks** → `01- docs/06 - implementation/`
   - Step-by-step fix procedures
   - Code templates for common solutions
   - Configuration patterns that work
   - Best practice implementations

4. **System Evolution** → `01- docs/04 - architecture/`
   - Architecture decisions and rationale
   - System design improvements over time
   - Technology choices and justifications
   - Scalability considerations

#### Knowledge Capture Workflow

**When Encountering ANY Issue:**

1. **Immediate Documentation** (01- docs/08 - troubleshooting/)
   ```markdown
   # Issue: [Brief Description] - YYYY-MM-DD

   **Status**: [Investigating | In Progress | Resolved]
   **Severity**: [Critical | High | Medium | Low]
   **Component**: [Affected component/system]

   ## Problem Description
   [Detailed description of the issue]

   ## Error Messages
   ```
   [Exact error messages and stack traces]
   ```

   ## Investigation Steps
   1. Step 1 taken
   2. Step 2 taken
   3. etc.

   ## Root Cause
   [Once identified]

   ## Solution
   [Implemented fix with code examples]

   ## Prevention
   [How to avoid this issue in the future]
   ```

2. **Solution Documentation** (01- docs/06 - implementation/)
   - Create reusable solution templates
   - Document configuration changes
   - Provide code examples and tests
   - Include validation procedures

3. **Pattern Recognition** (01- docs/03 - analysis-reports/)
   - Monthly analysis of recurring issues
   - Trend identification in problem types
   - Effectiveness measurement of solutions
   - System improvement recommendations

#### Continuous Learning Framework

**Weekly Reviews:**
- Analyze new issues encountered
- Update solution playbooks
- Identify system improvements
- Share knowledge across team

**Monthly Assessments:**
- Pattern analysis of recurring issues
- Solution effectiveness evaluation
- Architecture improvement opportunities
- Knowledge base quality review

**Quarterly Evolution:**
- System architecture review
- Technology stack evaluation
- Process optimization
- Knowledge transfer activities

---

## Documentation System Usage

### Organized Documentation Structure

**CRITICAL**: All documentation MUST be placed in the organized folder structure under `/Users/slouap/Documents/Cursor app/Glide-workspace/01- docs/`. **NEVER create `.md` files outside this structure.**

#### Folder Classification System

```
01- docs/
├── 00-quick-start/              # New user onboarding
├── 01 - accessibility/         # Accessibility guidelines and standards
├── 02 -ai-workflow/            # AI processes & agent coordination
├── 03 - analysis-reports/      # System assessments & audits
├── 04 - architecture/          # System design & best practices
├── 05 - audit-procedures/      # Quality assurance procedures
├── 06 - implementation/        # Development guides & templates
├── 07 - investigations/        # Technical deep dives & research
├── 08 - troubleshooting/       # Problem solving & fixes
├── 09 - reference/             # Quick lookup & cheat sheets
├── 10 - competitive-intelligence/ # Market analysis
└── 11 - AI Product life cycle & UX/ # Product development workflow
```

#### Document Type Decision Matrix

**Use this flowchart to determine correct folder:**

```
Is this a new user guide? → 01- docs/00-quick-start/
Is this a system audit/report? → 01- docs/03 - analysis-reports/
Is this a technical investigation? → 01- docs/07 - investigations/
Is this problem solving? → 01- docs/08 - troubleshooting/
Is this architecture/design? → 01- docs/04 - architecture/
Is this implementation guide? → 01- docs/06 - implementation/
Is this AI/agent related? → 01- docs/02 -ai-workflow/
Is this quick reference? → 01- docs/09 - reference/
```

#### File Naming Conventions

**High Priority Documents**: `UPPERCASE_WITH_UNDERSCORES.md`
- Example: `CRITICAL_BUILD_FAILURE_FIX.md`
- Use for: Urgent fixes, critical issues, breaking changes

**Formal Reports**: `Title_Case_With_Underscores.md`
- Example: `Component_Performance_Analysis_2026-02-25.md`
- Use for: Analysis reports, audit results, formal documentation

**Implementation Guides**: `kebab-case-naming.md`
- Example: `vue-component-setup-guide.md`
- Use for: Tutorials, setup guides, how-to documents

**Reference Materials**: `Title_Case_Reference.md`
- Example: `Design_Token_Quick_Reference.md`
- Use for: Lookup tables, cheat sheets, quick references

#### Standard Document Template

**Every document must use this header:**

```markdown
# Document Title

**Category**: [Analysis Report | Investigation | Troubleshooting | Architecture | Implementation | AI Workflow | Reference]
**Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD
**Status**: [Draft | Review | Complete | Archived]
**Related Documents**:
- [Link to related doc 1](../folder/document1.md)
- [Link to related doc 2](../folder/document2.md)

**Tags**: #tag1 #tag2 #tag3

## Executive Summary
[2-3 sentence summary of document purpose and key findings]

## Quick Reference
- **Key Insight 1**: Brief description
- **Key Insight 2**: Brief description
- **Action Items**: What needs to be done

## Detailed Content
[Main documentation content...]

## Related Issues
- Links to GitHub issues, related problems, or connected documents

## Follow-up Actions
- [ ] Action item 1
- [ ] Action item 2

## Knowledge Transfer
- **Who should read this**: Target audience
- **When to reference**: Use cases for this document
- **Update frequency**: How often this should be reviewed
```

#### Documentation Workflow

**Before Creating ANY Document:**

1. **Search Existing Documentation**
   ```bash
   # Search for existing related content
   grep -r "topic keyword" "01- docs/"
   find "01- docs/" -name "*topic*"
   ```

2. **Classify Document Type**
   - Use decision matrix above
   - Choose appropriate folder
   - Select naming convention

3. **Check for Dependencies**
   - Identify related documents
   - Plan cross-references
   - Consider update implications

4. **Create with Standard Template**
   - Use mandatory header format
   - Include all required metadata
   - Add proper cross-references

5. **Update Navigation**
   - Update `01- docs/README.md` if significant
   - Add to relevant index documents
   - Ensure discoverability

#### Cross-Reference Management

**Maintain Document Relationships:**
- Always link related documents
- Update cross-references when moving files
- Use relative paths for internal links
- Keep navigation current and accurate

#### Quality Standards

**All documentation must meet:**
- ✅ Clear, actionable content
- ✅ Proper markdown formatting
- ✅ Code examples where applicable
- ✅ Screenshots/diagrams for complex concepts
- ✅ Tested procedures and commands
- ✅ Regular updates and maintenance
- ✅ Proper categorization and tagging

---

## Enforcement & Automation

### Mandatory Practices (NON-NEGOTIABLE)

#### Agent Usage
- ✅ **ALWAYS** invoke appropriate agents proactively
- ✅ **USE PARALLEL** agent invocation when tasks are independent
- ✅ **COORDINATE** agents for complex multi-step tasks
- ❌ **NEVER** skip agent invocation for their specialized areas

#### Documentation
- ✅ **ALWAYS** document solutions in appropriate `01- docs/` folders
- ✅ **CAPTURE** every issue and resolution for knowledge building
- ✅ **USE** standard templates and naming conventions
- ❌ **NEVER** create documentation outside organized structure

#### Code Quality
- ✅ **TYPECHECK** after every code change (`npm run typecheck`)
- ✅ **USE** ES modules syntax (import/export)
- ✅ **DESTRUCTURE** imports when possible
- ✅ **MAINTAIN** Neo Design System compliance

#### Knowledge Building
- ✅ **DOCUMENT** every issue encountered with full solution
- ✅ **UPDATE** existing documentation when learning new solutions
- ✅ **CROSS-REFERENCE** related problems and solutions
- ✅ **ANALYZE** patterns and improve system architecture

### Success Metrics

**Session Success Criteria:**
- All issues documented with solutions
- Appropriate agents used for specialized tasks
- Documentation placed in correct organized folders
- Code quality maintained (TypeScript passes)
- Knowledge base expanded with new learnings

**Long-term Success Indicators:**
- Faster issue resolution over time
- Reduced recurring problems
- Improved system stability
- Enhanced team knowledge transfer
- Comprehensive documentation coverage

---

**Priority**: This design workspace operates as a learning system. Every interaction should improve our collective knowledge while maintaining the highest standards for code quality, documentation organization, and autonomous agent utilization. The goal is continuous improvement and institutional knowledge building that makes us more effective over time.