# Agent System Guide

## Overview

You now have a comprehensive agent system with seven specialized agents that work together:

### Core Agents
1. **UX Researcher** - Handles user research, usability testing, and user insights
2. **Scrum Master** - Manages sprint planning, team processes, and delivery
3. **Agent Coordinator** - Routes questions to the right specialist and orchestrates multi-agent responses

### Design System Agents
4. **Design System Manager** - Oversees design token strategy, governance, and cross-platform consistency
5. **Design System UX Engineer** - Handles component API design, accessibility, and implementation specifications
6. **Design System Vue Engineer** - Specializes in Vue.js component implementation and design token integration
7. **Design System React Engineer** - Specializes in React component implementation and design token integration

## How to Use the Agents

### Invoking Individual Agents

Use the `/skill` command to invoke specific agents:

```bash
# Core Agents
/skill ux-researcher          # For UX research questions
/skill scrum-master          # For scrum/agile process questions
/skill agent-coordinator     # For intelligent question routing

# Design System Agents
/skill design-system-manager         # For design system strategy and governance
/skill design-system-ux-engineer     # For component design and accessibility
/skill design-system-vue            # For Vue.js implementation
/skill design-system-react          # For React implementation
```

### Question Examples by Agent

#### UX Researcher Handles:
- "How do users interact with our checkout process?"
- "What usability issues are we seeing in the dashboard?"
- "Can you analyze the user feedback from last month?"
- "How can we test this new feature with users?"
- "What accessibility improvements do we need?"
- "What does the analytics data tell us about user behavior?"

#### Scrum Master Handles:
- "How should we plan our next sprint?"
- "What's blocking our team's progress?"
- "How can we improve our sprint retrospectives?"
- "What's our team's current velocity?"
- "How do we handle this impediment?"
- "How can we better coordinate with stakeholders?"

#### Agent Coordinator Handles:
- Complex questions requiring multiple specialists
- Questions where the domain isn't immediately clear
- Requests for comprehensive analysis across disciplines

#### Design System Manager Handles:
- "What should our design token strategy be?"
- "How do we ensure consistency across Vue and React implementations?"
- "What are our design system governance rules?"
- "How should we structure our component library?"
- "What's our design system rollout plan?"
- "How do we maintain brand consistency across platforms?"

#### Design System UX Engineer Handles:
- "How should we implement these design tokens?"
- "What's the best API design for this component?"
- "How do we make this component accessible?"
- "What's the component architecture approach?"
- "How feasible is this implementation across platforms?"
- "What accessibility requirements need to be built in?"

#### Design System Vue Engineer Handles:
- "How do we build this component in Vue?"
- "What's the Vue implementation approach for this design?"
- "How should we handle reactivity with design tokens?"
- "What Vue patterns should we use for this component?"
- "How do we integrate with the Vue ecosystem?"
- "What's the best Vue 3 Composition API approach?"

#### Design System React Engineer Handles:
- "How do we build this component in React?"
- "What's the React implementation approach for this design?"
- "How should we handle state with design tokens?"
- "What React patterns should we use for this component?"
- "How do we integrate with the React ecosystem?"
- "What's the best React hooks approach?"

## Multi-Agent Collaboration Examples

### Example 1: Feature Planning
**Question**: "We want to add a new user onboarding flow. How should we approach this from research to delivery?"

**Agent Coordination**:
1. **Agent Coordinator** analyzes and determines multi-agent response needed
2. **UX Researcher** provides:
   - Current onboarding pain points analysis
   - User research plan for new flow
   - Usability testing strategy
3. **Scrum Master** provides:
   - Sprint breakdown and timeline
   - Resource planning and capacity
   - Risk assessment and mitigation

**Result**: Comprehensive plan covering user needs AND delivery execution

### Example 2: Sprint Planning with User Focus
**Question**: "Our next sprint focuses on improving user retention. How do we plan this effectively?"

**Agent Coordination**:
1. **UX Researcher** first provides user retention insights and research
2. **Scrum Master** then creates sprint plan based on research findings
3. Both coordinate on success metrics and validation approach

### Example 3: Design System Implementation
**Question**: "We need to implement a new data table component that works consistently in both Vue and React. How do we approach this?"

**Agent Coordination**:
1. **Agent Coordinator** analyzes and determines design system multi-agent response needed
2. **Design System Manager** provides:
   - Strategic decisions and consistency requirements
   - Cross-platform governance standards
   - Component library integration guidelines
3. **Design System UX Engineer** provides:
   - Component API design and specification
   - Accessibility requirements and implementation
   - Testing strategy across platforms
4. **Design System Vue** provides:
   - Vue-specific implementation approach
   - Vue 3 Composition API patterns
   - Vue ecosystem integration
5. **Design System React** provides:
   - React-specific implementation approach
   - React hooks and patterns
   - React ecosystem integration
6. **Coordination ensures**: API parity, visual consistency, and accessibility compliance

**Result**: Comprehensive implementation plan ensuring consistency across both platforms

### Example 4: Design Token Architecture Rollout
**Question**: "How should we restructure our design tokens and roll them out across our Vue and React applications?"

**Agent Coordination**:
1. **Design System Manager** provides:
   - Token architecture strategy and governance
   - Rollout planning and risk assessment
   - Cross-platform consistency requirements
2. **Design System UX Engineer** provides:
   - Implementation specification and testing strategy
   - Accessibility integration approach
   - Component impact assessment
3. **Design System Vue** and **Design System React** provide:
   - Platform-specific integration approaches
   - Migration strategies for existing components
   - Performance optimization considerations
4. **Scrum Master** provides:
   - Sprint planning for rollout phases
   - Team coordination and timeline management
   - Risk mitigation and communication strategy

**Result**: Integrated migration plan with coordinated rollout across platforms

## Testing the System

Here are some test questions to try:

### Single Agent Tests
```bash
# Test UX Researcher
"What methods should we use to understand why users abandon their shopping carts?"

# Test Scrum Master
"Our team consistently overcommits in sprints. How can we fix our planning process?"

# Test Design System Manager
"What should our design token strategy be for scaling across multiple platforms?"

# Test Design System UX Engineer
"How should we design a component API that's accessible and works across frameworks?"

# Test Design System Vue
"How do we implement design tokens reactively in Vue 3 components?"

# Test Design System React
"What's the best React hooks pattern for consuming design tokens?"
```

### Multi-Agent Tests
```bash
# Test Core Coordination
"We need to redesign our mobile app based on user complaints and deliver it this quarter. What's our approach?"

"How do we balance user research activities with sprint delivery commitments?"

# Test Design System Coordination
"We need to build a new component library that works in both Vue and React. How do we ensure consistency?"

"How do we restructure our design tokens and roll them out without breaking existing components?"

# Test Mixed Domain Coordination
"We want to improve our design system based on user feedback and deliver it in our next two sprints. What's our comprehensive approach?"
```

## Agent Capabilities Summary

### UX Researcher Capabilities
✅ User behavior analysis
✅ Usability testing design
✅ Research methodology selection
✅ Analytics interpretation
✅ Accessibility evaluation
✅ Competitive analysis
✅ Journey mapping
✅ Persona development

### Scrum Master Capabilities
✅ Sprint planning facilitation
✅ Daily standup coordination
✅ Impediment identification and removal
✅ Team performance monitoring
✅ Process improvement
✅ Stakeholder communication
✅ Risk management
✅ Velocity tracking

### Agent Coordinator Capabilities
✅ Intelligent question analysis
✅ Domain expertise routing
✅ Multi-agent orchestration
✅ Response synthesis
✅ Context preservation
✅ Comprehensive coverage assurance

### Design System Manager Capabilities
✅ Design token strategy and governance
✅ Cross-platform consistency management
✅ Brand compliance and standards
✅ Component library architecture
✅ Design system rollout planning
✅ Quality assurance oversight
✅ Stakeholder coordination
✅ Design decision authority

### Design System UX Engineer Capabilities
✅ Component API design and specification
✅ Accessibility integration and compliance
✅ Design token implementation architecture
✅ Cross-platform feasibility assessment
✅ Testing strategy development
✅ Documentation standards
✅ Performance consideration
✅ User experience optimization

### Design System Vue Capabilities
✅ Vue 3 Composition API implementation
✅ Reactive design token integration
✅ Vue-specific component patterns
✅ Vue ecosystem integration
✅ Performance optimization for Vue
✅ Vue testing strategies
✅ Template and script setup optimization
✅ Vue router and state management integration

### Design System React Capabilities
✅ React 18+ hooks and patterns
✅ Context-based design token system
✅ React-specific component architecture
✅ React ecosystem integration
✅ Performance optimization with React
✅ React testing library integration
✅ TypeScript integration
✅ Concurrent features optimization

## Best Practices

1. **Start with Agent Coordinator** for complex or unclear questions
2. **Use specific agents directly** when domain is obvious
3. **Ask follow-up questions** to get deeper insights
4. **Request coordination** when you need multiple perspectives
5. **Provide context** about your project/team when possible

## Integration Benefits

### Core Benefits
- **No Gaps**: Every question gets routed to the right expert
- **Comprehensive Coverage**: Multi-domain questions get full attention
- **Consistent Quality**: Each agent specializes in their domain
- **Efficient Process**: Right expert handles each question type
- **Coordinated Responses**: Complex questions get integrated answers

### Design System Specific Benefits
- **Cross-Platform Consistency**: Vue and React implementations stay aligned
- **Strategic Alignment**: Manager ensures all decisions support business goals
- **Implementation Feasibility**: UX Engineer validates technical approaches
- **Accessibility First**: Built-in accessibility across all implementations
- **Synchronized Development**: Platform engineers work in concert, not isolation

### Team Coordination Benefits
- **Research-Driven Design Systems**: UX insights inform design decisions
- **Agile Design System Delivery**: Scrum coordination ensures on-time delivery
- **Quality Assurance**: Multiple expert reviews before implementation
- **Knowledge Sharing**: Cross-pollination between agents and domains
- **Scalable Processes**: Framework for handling complex, multi-domain challenges

The agents are designed to work seamlessly together, ensuring you get the right expertise for every question while maintaining coordination across user research, agile delivery, and design system development disciplines.

## Special Design System Coordination

The design system agents are specifically designed to work **in sync but interact at different times** based on your needs:

### When Working on Vue Projects
- **Design System Manager** provides strategic guidance
- **Design System UX Engineer** specifies requirements
- **Design System Vue** handles implementation
- **Design System React** stays informed for consistency

### When Working on React Projects
- **Design System Manager** provides strategic guidance
- **Design System UX Engineer** specifies requirements
- **Design System React** handles implementation
- **Design System Vue** stays informed for consistency

### When Working on Cross-Platform Features
- All four design system agents coordinate simultaneously
- **Manager** leads strategic decisions
- **UX Engineer** ensures consistent APIs and accessibility
- **Vue** and **React** engineers implement in parallel
- Regular sync points maintain alignment

This approach ensures you get specialized expertise when you need it, while maintaining consistency across platforms.