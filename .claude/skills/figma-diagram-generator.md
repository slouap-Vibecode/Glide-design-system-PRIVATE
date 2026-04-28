# Figma Diagram Generator Skill

**Category**: AI Workflow Skill
**Created**: 2026-02-27
**Purpose**: Generate professional diagrams in FigJam for any topic with consistent formatting and styling
**Usage**: Ask Claude to create a diagram on any topic and get high-quality, visually appealing results

**Tags**: #figma #diagramming #visualization #ai-workflow #design-system

---

## Skill Overview

This skill provides a standardized approach to creating professional diagrams using Figma's `generate_diagram` function with consistent styling, optimal layouts, and business-appropriate formatting.

### Core Capabilities
- **Any Topic Visualization**: Business processes, technical architectures, organizational charts, user flows
- **Professional Styling**: Consistent color schemes, typography, and visual hierarchy
- **Interactive Output**: Clickable FigJam links for collaborative editing
- **Scalable Complexity**: From simple flowcharts to complex multi-agent systems

---

## Skill Parameters & Standards

### **1. Diagram Naming Convention**
```
Format: [Topic] - [Specific Focus/Type]
Examples:
- "AI Product Lifecycle - End-to-End Process Flow"
- "Engineering Architecture - Microservices Overview"
- "Customer Journey - B2B Sales Process"
- "Team Structure - Cross-Functional Collaboration"
```

### **2. Mermaid Syntax Standards**

#### **Flowchart Configuration**
```mermaid
flowchart TD  # Use TD (Top-Down) for hierarchical processes
flowchart LR  # Use LR (Left-Right) for sequential workflows
```

#### **Node Formatting Standards**
```mermaid
# Standard Node Patterns
PROCESS["🔄 Process Name<br/>Description Line 1<br/>Description Line 2"]
PERSON["👤 Role Name<br/>Responsibility<br/>Key Focus Area"]
SYSTEM["🤖 System Name<br/>Core Function<br/>Key Benefit"]
DECISION{"❓ Decision Point<br/>Criteria<br/>Outcome"}
DATA["📊 Data/Analytics<br/>Source Information<br/>Key Metrics"]
```

#### **Professional Styling Classes**
```mermaid
# Color-Coded System
classDef humanRole fill:#E3F2FD,stroke:#1976D2,stroke-width:2px,color:#000
classDef aiAgent fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,color:#000
classDef process fill:#E8F5E8,stroke:#388E3C,stroke-width:2px,color:#000
classDef decision fill:#FFF3E0,stroke:#F57C00,stroke-width:2px,color:#000
classDef data fill:#F3E5F5,stroke:#9C27B0,stroke-width:2px,color:#000
classDef outcome fill:#FFEBEE,stroke:#C62828,stroke-width:3px,color:#000
classDef governance fill:#FFF8E1,stroke:#FBC02D,stroke-width:3px,color:#000
```

### **3. Content Structure Standards**

#### **Information Hierarchy**
1. **Title/Header** - Clear, descriptive name
2. **Key Metrics** - Quantified benefits when applicable
3. **Process Flow** - Logical sequence of activities
4. **Relationships** - Clear connections and dependencies
5. **Outcomes** - Results and value creation

#### **Text Formatting Rules**
- **Emojis**: Use relevant emojis for visual clarity and engagement
- **Line Breaks**: Use `<br/>` for multi-line content in nodes
- **Quantification**: Include specific metrics, percentages, dollar amounts
- **Action Verbs**: Use active language (Generate, Analyze, Create, etc.)

---

## Template Functions

### **1. Business Process Template**
```typescript
// For business processes, workflows, organizational structures
const businessProcessTemplate = {
  diagramType: "flowchart TD",
  nodeTypes: ["👤 Roles", "🔄 Processes", "📊 Outcomes", "💰 Benefits"],
  connectionTypes: ["Sequential", "Collaborative", "Feedback Loops"],
  stylingFocus: "Professional business colors with clear hierarchy"
}
```

### **2. Technical Architecture Template**
```typescript
// For system designs, technical workflows, engineering processes
const technicalTemplate = {
  diagramType: "flowchart LR",
  nodeTypes: ["🖥️ Systems", "🔧 Tools", "⚡ APIs", "📦 Components"],
  connectionTypes: ["Data Flow", "API Calls", "Dependencies"],
  stylingFocus: "Technical blue/gray palette with system emphasis"
}
```

### **3. User Experience Template**
```typescript
// For user journeys, experience flows, design processes
const uxTemplate = {
  diagramType: "flowchart TD",
  nodeTypes: ["👥 Users", "🎯 Goals", "🎨 Interfaces", "💡 Insights"],
  connectionTypes: ["User Actions", "System Responses", "Feedback"],
  stylingFocus: "User-friendly colors with experience emphasis"
}
```

### **4. Analytics/Data Template**
```typescript
// For data flows, analytics processes, measurement frameworks
const analyticsTemplate = {
  diagramType: "flowchart LR",
  nodeTypes: ["📊 Data Sources", "🔄 Processing", "📈 Analysis", "🎯 Actions"],
  connectionTypes: ["Data Pipelines", "Analysis Flows", "Decision Points"],
  stylingFocus: "Data-focused purple/blue with measurement emphasis"
}
```

---

## Skill Execution Process

### **Step 1: Topic Analysis**
```markdown
1. **Identify Diagram Category**:
   - Business Process (workflows, organizational)
   - Technical Architecture (systems, engineering)
   - User Experience (journeys, design)
   - Analytics/Data (flows, measurements)

2. **Determine Complexity Level**:
   - Simple: 5-8 nodes, linear flow
   - Medium: 10-15 nodes, some branching
   - Complex: 15+ nodes, multiple paths and feedback loops
```

### **Step 2: Content Structuring**
```markdown
1. **Extract Key Elements**:
   - Main actors/systems involved
   - Sequential process steps
   - Decision points and branches
   - Quantifiable benefits/metrics
   - Key relationships and dependencies

2. **Apply Template Standards**:
   - Choose appropriate node types
   - Structure information hierarchy
   - Plan connection patterns
```

### **Step 3: Mermaid Generation**
```markdown
1. **Build Diagram Structure**:
   - Start with main flow nodes
   - Add supporting information nodes
   - Create logical connections
   - Apply styling classes

2. **Optimize for Clarity**:
   - Ensure readable text sizing
   - Balance information density
   - Use consistent visual patterns
```

### **Step 4: Quality Validation**
```markdown
1. **Content Check**:
   - All key information included
   - Logical flow and connections
   - Appropriate level of detail

2. **Visual Check**:
   - Professional appearance
   - Consistent styling application
   - Clear visual hierarchy
```

---

## Usage Examples

### **Example 1: Business Process Request**
**Input**: "Create a diagram showing our customer onboarding process"

**Output Approach**:
```mermaid
flowchart TD
    INQUIRY["📞 Customer Inquiry<br/>Initial Contact<br/>Qualification"]
    DEMO["🎯 Product Demo<br/>Solution Presentation<br/>Needs Assessment"]
    PROPOSAL["📋 Proposal Creation<br/>Custom Pricing<br/>Contract Terms"]
    # ... continue with full process
```

### **Example 2: Technical Architecture Request**
**Input**: "Show me how our microservices architecture works"

**Output Approach**:
```mermaid
flowchart LR
    API["🌐 API Gateway<br/>Request Routing<br/>Authentication"]
    USER_SVC["👤 User Service<br/>Profile Management<br/>Authentication"]
    ORDER_SVC["📦 Order Service<br/>Transaction Processing<br/>Inventory Management"]
    # ... continue with technical details
```

### **Example 3: Analytics Request**
**Input**: "Create a diagram of our data analytics pipeline"

**Output Approach**:
```mermaid
flowchart LR
    SOURCES["📊 Data Sources<br/>Customer Interactions<br/>System Logs<br/>External APIs"]
    PROCESSING["⚡ Data Processing<br/>ETL Pipeline<br/>Data Cleaning"]
    ANALYSIS["🔍 Analysis Engine<br/>Machine Learning<br/>Statistical Models"]
    # ... continue with analytics flow
```

---

## Skill Invocation Commands

### **Standard Usage Pattern**
```
Request: "Create a [diagram type] showing [specific topic/process]"
Additional Context: [Any specific requirements, stakeholders, metrics to include]
```

### **Example Invocations**
```
✅ "Create a flowchart showing our AI agent implementation process"
✅ "Generate a diagram of the customer journey for B2B sales"
✅ "Show me how data flows through our analytics platform"
✅ "Create an organizational chart for our new team structure"
✅ "Diagram the user experience for our mobile app onboarding"
```

### **Enhanced Requests (More Specific)**
```
✅ "Create a technical architecture diagram showing how our Vue components integrate with the Neo Design System, including build processes and deployment"

✅ "Generate a business process diagram for our product lifecycle showing where AI agents provide the most value and quantified benefits"

✅ "Show the data analytics flow from customer interactions to business intelligence insights with specific tools and metrics"
```

---

## Quality Standards & Success Criteria

### **Visual Quality Standards**
- ✅ Professional business appearance suitable for executive presentations
- ✅ Consistent color coding and visual hierarchy throughout diagram
- ✅ Clear, readable text with appropriate information density
- ✅ Logical flow patterns that are easy to follow

### **Content Quality Standards**
- ✅ Accurate representation of the requested process/system
- ✅ Appropriate level of detail for the intended audience
- ✅ Inclusion of quantified benefits and metrics when relevant
- ✅ Clear identification of key stakeholders, systems, and relationships

### **Functional Quality Standards**
- ✅ Interactive FigJam link provided for collaborative editing
- ✅ Diagram renders correctly in Figma with all styling applied
- ✅ Scalable complexity that can be expanded or simplified as needed
- ✅ Reusable elements that can be adapted for related diagrams

---

## Integration with Design Workspace

### **File Organization**
- **Generated Diagrams**: Automatically saved to FigJam with structured naming
- **Reference Links**: Maintain list of created diagrams for future reference
- **Template Variations**: Document successful patterns for reuse

### **Cross-Reference with Other Skills**
- **Neo Design System**: Use consistent branding and color schemes
- **Documentation System**: Link diagrams to relevant documentation
- **AI Agent Specifications**: Integrate with agent workflow documentation

### **Continuous Improvement**
- **Pattern Recognition**: Identify frequently requested diagram types
- **Template Enhancement**: Evolve templates based on successful outcomes
- **Stakeholder Feedback**: Incorporate user feedback to improve visual standards

---

## Skill Activation

**To Use This Skill:**
1. Simply ask Claude to "create a diagram showing [your topic]"
2. Claude will automatically apply these standards and templates
3. Receive a professional FigJam diagram with consistent styling
4. Get an interactive link for collaborative editing and enhancement

**Examples of Activation:**
- "Create a diagram of our engineering workflow"
- "Show me how our AI agents interact with human teams"
- "Generate a flowchart for our customer success process"
- "Diagram the data architecture for our analytics platform"

This skill ensures every diagram request results in professional, visually consistent, and business-appropriate diagrams that can be used in presentations, documentation, and strategic planning sessions.