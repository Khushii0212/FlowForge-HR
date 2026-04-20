# ⚡ FlowForge HR

FlowForge HR is a **visual process automation tool** built for HR workflows. HR teams can drag nodes onto a canvas, connect them to define process flow, configure each step's properties, and run a live simulation to watch the workflow execute step-by-step with a real-time execution log.

---

## ✅ Live Features

- **Drag & Drop Canvas** — Drag any node from the sidebar onto the infinite canvas and position it freely
- **Visual Connections** — Draw edges between nodes by dragging handle-to-handle
- **Per-Node Properties** — Click any node to open its tailored configuration form; changes reflect on the canvas instantly
- **Real-Time Validation** — 5 validation rules run on every change, surfaced as non-blocking canvas toasts
- **Simulation Engine** — Sends workflow JSON to the backend, which performs BFS graph traversal and returns an ordered execution trace
- **Execution Log** — Floating panel with stats cards, a completion progress bar, and colour-coded step badges
- **Import / Export** — Serialize the entire canvas to a downloadable JSON file and reload it anytime
- **Mini-map & Controls** — Pan, zoom, fit-view, and a bird's-eye minimap for large workflows

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER (Client)                    │
│                                                          │
│  ┌──────────┐   ┌──────────────┐   ┌─────────────────┐  │
│  │NodeSidebar│  │  React Flow   │   │  ConfigPanel    │  │
│  │(drag src) │  │    Canvas     │   │ (properties)    │  │
│  └──────────┘  └───────────────┘   └────────┬────────┘  │
│                        │                    │           │
│  ┌─────────────────────▼────────────────────▼────────┐  │
│  │              Zustand Workflow Store                 │  │
│  │  nodes[] │ edges[] │ selectedNodeId │ validation   │  │
│  └──────────────────────────────────────────────────┬─┘  │
│                                                     │    │
│  ┌──────────────────────────────────────────────────▼─┐  │
│  │           API Client  (fetch abstraction)           │  │
│  │     fetchAutomations()  │  simulateWorkflow()       │  │
│  └──────────────────────────────────────────────────┬─┘  │
└─────────────────────────────────────────────────────┼────┘
                       Vite Proxy                     │
┌─────────────────────────────────────────────────────▼────┐
│                  Node.js / Express  :3001                 │
│   GET  /automations  →  mock automation catalogue        │
│   POST /simulate     →  BFS traversal → execution trace  │
└──────────────────────────────────────────────────────────┘
```

**Simulation data flow:**

```
"Run Workflow" click
  → getWorkflowJSON()  (Zustand)
  → POST /simulate     (fetch)
  → BFS traversal      (server)
  → SimulationPanel    (execution log UI)
```

---

## 📁 Project Structure

```
HR_Review/
├── client/
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
│       ├── pages/
│       │   └── WorkflowDesigner.tsx      # Main canvas page
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.tsx            # Branding + action buttons
│       │   │   ├── NodeSidebar.tsx       # Draggable node palette
│       │   │   ├── ConfigPanel.tsx       # Right-side properties panel
│       │   │   └── SimulationPanel.tsx   # Floating execution log
│       │   ├── nodes/                    # Custom React Flow renderers
│       │   │   ├── StartNode.tsx
│       │   │   ├── TaskNode.tsx
│       │   │   ├── ApprovalNode.tsx
│       │   │   ├── AutomatedNode.tsx
│       │   │   └── EndNode.tsx
│       │   ├── forms/                    # Per-node config forms
│       │   └── ui/                       # Radix-based primitives
│       ├── hooks/
│       │   ├── useWorkflow.ts            # Canvas operations facade
│       │   └── useSimulation.ts          # Async simulation state
│       ├── store/
│       │   └── workflowStore.ts          # Zustand global state
│       ├── api/
│       │   └── client.ts                 # Fetch abstraction layer
│       └── types/
└── server/
    └── index.js                          # Express API + BFS engine
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **UI Framework** | React 19 + TypeScript | Component model, type safety |
| **Build Tool** | Vite 6 | Instant HMR, fast cold starts |
| **Canvas** | @xyflow/react 12 | Node graph — pan/zoom/edges/handles |
| **State** | Zustand 5 | Zero-boilerplate global workflow state |
| **Styling** | TailwindCSS v4 | Utility-first, zero runtime CSS |
| **Components** | Radix UI | Headless, accessible form primitives |
| **Forms** | React Hook Form + Zod | Performant forms + schema validation |
| **Backend** | Node.js + Express | Lightweight mock API server |
| **Algorithm** | BFS traversal | Correct execution ordering in any DAG |

---

## 🚀 How to Run

### Prerequisites
- Node.js v18+
- npm v8+

### 1 — Start the Backend

```bash
cd server
npm install
node index.js
# ✅ Running on http://localhost:3001
```

### 2 — Start the Frontend

```bash
cd client
npm install
npm run dev
# ✅ Running on http://localhost:5173
```

### 3 — Open the App

Visit **[http://localhost:5173](http://localhost:5173)**

> The Vite dev server automatically proxies `/api/*` requests to `localhost:3001` — no extra configuration needed.

### Production Build

```bash
cd client && npm run build
# Output → client/dist/
```

---

## 🧩 Node Types

| Node | Icon | Purpose | Config |
|---|---|---|---|
| **Start Entry** | ▶ | Entry point — exactly one required | Title, metadata pairs |
| **Assign Task** | ✏ | Human task assigned to an HR role | Title, assignee, due date, custom fields |
| **Approval Gate** | ✓ | Checkpoint requiring sign-off | Approver role, auto-approve threshold |
| **Auto Action** | ⚡ | System integration (email, Slack, HRIS) | Action type, parameter map |
| **End Point** | ■ | Terminal state — at least one required | Title, end message |

> **Approval simulation:** 80% approved / 20% rejected — randomised to mirror real-world non-determinism.

---

## 📊 Completed vs. Future Work

### ✅ Completed

- 5 fully custom node types with individual renderers and forms
- Drag-and-drop canvas with handle-to-handle edge connections
- Real-time workflow validation (5 rules) with non-blocking toasts
- BFS simulation engine — ordered execution trace with timestamps
- Execution log: stats cards, progress bar, colour-coded step badges
- JSON import / export — preserves full canvas layout
- Zustand global state with atomic node + edge operations
- Premium light-theme UI with animated interactions

### 🚀 Would Add With More Time

| Priority | Feature |
|---|---|
| High | **Undo / Redo** — `Ctrl+Z` via command pattern |
| High | **Conditional branching** — Yes/No output edges on Approval nodes |
| High | **Workflow persistence** — Save/load named workflows from a database |
| Medium | **Workflow templates** — Onboarding, Leave Approval, Performance Review |
| Medium | **Edge labels** — Label paths (e.g., "Approved" / "Rejected") |
| Medium | **Auto-layout** — Dagre/ELK automatic node arrangement |
| Low | **Real-time collaboration** — WebSocket multi-user canvas |
| Low | **Unit + E2E tests** — Jest for hooks/store, Playwright for drag-drop |

---

## 👤 About the Developer

**Built with ❤️ by Khushi Prasad**

I'm a passionate full-stack developer who loves crafting clean, functional, and visually premium web experiences. FlowForge HR is a reflection of that passion — combining thoughtful architecture with a polished UI that actually feels good to use.

If you have feedback, ideas, or just want to connect — feel free to reach out!

---

<div align="center">

**FlowForge HR** · Built with ⚡ React Flow + Node.js

</div>
