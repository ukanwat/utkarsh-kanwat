---
title: "Why I'm Betting Against AI Agents in 2025 (Despite Building Them)"
date: "2025-07-19"
description: "I've built 12+ AI agent systems across development, DevOps, and data operations. Here's why the current hype around autonomous agents is mathematically impossible and what actually works in production."
tags: ["AI Agents", "Production AI", "Software Engineering", "DevOps", "AI Architecture", "LLMs", "Automation", "Technical Leadership", "AI Economics", "System Design"]
published: true
---

Everyone says 2025 is the year of AI agents. The headlines are everywhere: "Autonomous AI will transform work," "Agents are the next frontier," "The future is agentic." Meanwhile, I've spent the last year building many different agent systems that actually work in production. And that's exactly why I'm betting against the current hype.

I'm not some AI skeptic writing from the sidelines. Over the past year, I've built more than a dozen production agent systems across the entire software development lifecycle:

**Development agents**: UI generators that create functional React components from natural language, code refactoring agents that modernize legacy codebases, documentation generators that maintain API docs automatically, and function generators that convert specifications into working implementations.

**Data & Infrastructure agents**: Database operation agents that handle complex queries and migrations, DevOps automation AI systems managing infrastructure-as-code across multiple cloud providers.

**Quality & Process agents**: AI-powered CI/CD pipelines that fix lint issues, generate comprehensive test suites, perform automated code reviews, and create detailed pull requests with proper descriptions.


These systems work. They ship real value. They save hours of manual work every day. And that's precisely why I think much of what you're hearing about 2025 being "the year of agents" misses key realities.

## **TL;DR: Three Hard Truths About AI Agents**

After building AI systems, here's what I've learned:

1. Error rates compound exponentially in multi-step workflows. 95% reliability per step = 36% success over 20 steps. Production needs 99.9%+.

2. Context windows create quadratic token costs. Long conversations become prohibitively expensive at scale.

3. The real challenge isn't AI capabilities, it's designing tools and feedback systems that agents can actually use effectively.


## The Mathematical Reality No One Talks About

Here's the uncomfortable truth that every AI agent company is dancing around: error compounding makes autonomous multi-step workflows mathematically impossible at production scale.

![Error Compounding in AI Agent Workflows](/writing/betting-against-agents/error_compounding_graph.svg)

Let's do the math. If each step in an agent workflow has 95% reliability, which is optimistic for current LLMs,then:
- 5 steps = 77% success rate  
- 10 steps = 59% success rate
- 20 steps = 36% success rate

Production systems need 99.9%+ reliability. Even if you magically achieve 99% per-step reliability (which no one has), you still only get 82% success over 20 steps. This isn't a prompt engineering problem. This isn't a model capability problem. This is mathematical reality.

My DevOps agent works precisely because it's not actually a 20-step autonomous workflow. It's 3-5 discrete, independently verifiable operations with explicit rollback points and human confirmation gates. The "agent" handles the complexity of generating infrastructure code, but the system is architected around the mathematical constraints of reliability.

Every successful agent system I've built follows the same pattern: bounded contexts, verifiable operations, and human decision points (sometimes) at critical junctions. The moment you try to chain more than a handful of operations autonomously, the math kills you.

## The Token Economics That Don't Add Up

There's another mathematical reality that agent evangelists conveniently ignore: context windows create quadratic cost scaling that makes conversational agents economically impossible.

Here's what actually happens when you build a "conversational" agent:
- Each new interaction requires processing ALL previous context
- Token costs scale quadratically with conversation length  
- A 100-turn conversation costs $50-100 in tokens alone
- Multiply by thousands of users and you're looking at unsustainable economics

I learned this the hard way when prototyping a conversational database agent. The first few interactions were cheap. By the 50th query in a session, each response was costing multiple dollars - more than the value it provided. The economics simply don't work for most scenarios.

![Token Cost Scaling in Conversational Agents](/writing/betting-against-agents/token_cost_scaling_chart.svg)


My function generation agent succeeds because it's completely stateless: description → function → done. No context to maintain, no conversation to track, no quadratic cost explosion. It's not a "chat with your code" experience, it's a focused tool that solves a specific problem efficiently.

The most successful "agents" in production aren't conversational at all. They're smart, bounded tools that do one thing well and get out of the way.

## The Tool Engineering Reality Wall

Even if you solve the math problems, you hit a different kind of wall: building production-grade tools for agents is an entirely different engineering discipline that most teams underestimate.

Tool calls themselves are actually quite precise now. The real challenge is tool design. Every tool needs to be carefully crafted to provide the right feedback without overwhelming the context window. You need to think about:

- How does the agent know if an operation partially succeeded? How do you communicate complex state changes without burning tokens?
- A database query might return 10,000 rows, but the agent only needs to know "query succeeded, 10k results, here are the first 5." Designing these abstractions is an art.
- When a tool fails, what information does the agent need to recover? Too little and it's stuck; too much and you waste context.
-  How do you handle operations that affect each other? Database transactions, file locks, resource dependencies.

My database agent works not because the tool calls are unreliable, but because I spent weeks designing tools that communicate effectively with the AI. Each tool returns structured feedback that the agent can actually use to make decisions, not just raw API responses.

The companies promising "just connect your APIs and our agent will figure it out" haven't done this engineering work. They're treating tools like human interfaces, not AI interfaces. The result is agents that technically make successful API calls but can't actually accomplish complex workflows because they don't understand what happened.

The dirty secret of every production agent system is that the AI is doing maybe 30% of the work. The other 70% is tool engineering: designing feedback interfaces, managing context efficiently, handling partial failures, and building recovery mechanisms that the AI can actually understand and use.

## The Integration Reality Check

But let's say you solve the reliability problems and the economics. You still have to integrate with the real world, and the real world is a mess.

Enterprise systems aren't clean APIs waiting for AI agents to orchestrate them. They're legacy systems with quirks, partial failure modes, authentication flows that change without notice, rate limits that vary by time of day, and compliance requirements that don't fit neatly into prompt templates.

My database agent doesn't just "autonomously execute queries." It navigates connection pooling, handles transaction rollbacks, respects read-only replicas, manages query timeouts, and logs everything for audit trails. The AI handles query generation; everything else is traditional systems programming.

The companies promising "autonomous agents that integrate with your entire tech stack" are either overly optimistic or haven't actually tried to build production systems at scale. Integration is where AI agents go to die.

## What Actually Works (And Why)

After building more than a dozen different agent systems across the entire software development lifecycle, I've learned that the successful ones share a pattern:

1. My UI generation agent works because humans review every generated interface before deployment. The AI handles the complexity of translating natural language into functional React components, but humans make the final decisions about user experience.

2. My database agent works because it confirms every destructive operation before execution. The AI handles the complexity of translating business requirements into SQL, but humans maintain control over data integrity.

3. My function generation agent works because it operates within clearly defined boundaries. Give it a specification, get back a function. No side effects, no state management, no integration complexity.

4. My DevOps automation works because it generates infrastructure-as-code that can be reviewed, versioned, and rolled back. The AI handles the complexity of translating requirements into Terraform, but the deployment pipeline maintains all the safety mechanisms we've learned to rely on.

5. My CI/CD agent works because each stage has clear success criteria and rollback mechanisms. The AI handles the complexity of analyzing code quality and generating fixes, but the pipeline maintains control over what actually gets merged.

The pattern is clear: AI handles complexity, humans maintain control, and traditional software engineering handles reliability.

## **My Predictions**

Here's my specific prediction about who will struggle in 2025:

Venture-funded "fully autonomous agent" startups will hit the economics wall first. Their demos work great with 5-step workflows, but customers will demand 20+ step processes that break down mathematically. Burn rates will spike as they try to solve unsolvable reliability problems.

Enterprise software companies that bolted "AI agents" onto existing products will see adoption stagnate. Their agents can't integrate deeply enough to handle real workflows.

Meanwhile, the winners will be teams building constrained, domain-specific tools that use AI for the hard parts while maintaining human control or strict boundaries over critical decisions. Think less "autonomous everything" and more "extremely capable assistants with clear boundaries."

The market will learn the difference between AI that demos well and AI that ships reliably. That education will be expensive for many companies.

I'm not betting against AI. I'm betting against the current approach to agent architecture. But I believe future is going to be far more valuable than the hype suggests.

## Building the Right Way

If you're thinking about building with AI agents, start with these principles:

**Define clear boundaries.** What exactly can your agent do, and what does it hand off to humans or deterministic systems?

**Design for failure.** How do you handle the 20-40% of cases where the AI makes mistakes? What are your rollback mechanisms?

**Solve the economics.** How much does each interaction cost, and how does that scale with usage? Stateless often beats stateful.

**Prioritize reliability over autonomy.** Users trust tools that work consistently more than they value systems that occasionally do magic.

**Build on solid foundations.** Use AI for the hard parts (understanding intent, generating content), but rely on traditional software engineering for the critical parts (execution, error handling, state management).

The agent revolution is coming. It just won't look anything like what everyone's promising in 2025. And that's exactly why it will succeed.

## The Real Lessons from the Trenches

The gap between "works in demo" and "works at scale" is enormous, and most of the industry is still figuring this out.

If you're working on similar problems, I'd love to continue this conversation. The challenges around agent reliability, cost optimization, and integration complexity are fascinating engineering problems that don't have obvious solutions yet. 

I regularly advise teams and companies navigating these exact challenges - from architecture decisions to avoiding the pitfalls I've learned about firsthand. Whether you're evaluating build vs buy decisions, debugging why your agents aren't working in production, or just want to implement them, feel free to reach out.

The more people building real systems and sharing honest experiences, the faster we'll all figure out what actually works. You can find me at [utkarshkanwat@gmail.com](mailto:utkarshkanwat@gmail.com) or [X](https://x.com/ukanwat) if you want to dive deeper into any of these topics.