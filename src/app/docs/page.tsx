import { MarkdownContent } from "@/components/docs/markdown-content";

const indexContent = `# Getting Started

Welcome to xinfras! This guide will help you get started with our infrastructure frameworks.

## Overview

xinfras provides three production-ready Python frameworks:

- **ai-infra** — LLM orchestration, MCP servers, and agent frameworks
- **svc-infra** — Backend infrastructure with auth, database, caching, and jobs
- **fin-infra** — Billing infrastructure for payments and subscriptions

Each framework can be used independently or combined for full-stack applications.

## Installation

Install all three frameworks:

\`\`\`bash
pip install ai-infra svc-infra fin-infra
\`\`\`

Or install individually:

\`\`\`bash
pip install ai-infra    # AI/LLM capabilities
pip install svc-infra   # Backend services
pip install fin-infra   # Billing/payments
\`\`\`

## Quick Start

Here's a simple example combining all three frameworks:

\`\`\`python
from svc_infra import App, Router
from ai_infra import AgentGraph
from fin_infra import Billing

# Create the app
app = App()

# Set up AI capabilities
graph = AgentGraph("assistant")

@graph.tool
def search_docs(query: str) -> str:
    """Search documentation."""
    return f"Results for: {query}"

# Set up billing
billing = Billing(app)

# Create API routes
router = Router()

@router.post("/chat")
async def chat(message: str, user_id: str):
    # Check subscription
    if not await billing.has_active_subscription(user_id):
        return {"error": "Subscription required"}
    
    # Run AI agent
    response = await graph.run(message)
    return {"response": response}

app.include_router(router)
\`\`\`

## Framework Guides

Choose a framework to get started:

- [ai-infra](/ai-infra) — Build intelligent AI applications
- [svc-infra](/svc-infra) — Production-ready backend services
- [fin-infra](/fin-infra) — Complete billing infrastructure

## Requirements

- Python 3.11 or higher
- Redis (for caching and job queues)
- PostgreSQL (recommended for production)

## License

All frameworks are open source under the MIT License.
`;

export default function DocsPage() {
  return <MarkdownContent content={indexContent} />;
}
