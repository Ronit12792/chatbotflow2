# Project Setup
    
    To run this project, follow these steps:
    
    1. Extract the zip file.
    2. Run `npm install` to install dependencies.
    3. Run `npm run dev` to start the development server.
    
# 🤖 BiteSpeed — Chatbot Flow Builder

> Visual editor to design chatbot conversations using **nodes** (messages) and **edges** (flow). Built with **React**, **React Flow**, and **Tailwind CSS**.
> Clean, extensible, and ready for deployment.



# Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Quick Start](#quick-start)
5. [Project Structure](#project-structure)
6. [How It Works](#how-it-works)
7. [Validation Rules & Save Behavior](#validation-rules--save-behavior)
8. [Data Format / API Example](#data-format--api-example)
9. [Deployment](#deployment)
10. [Customization & Extensibility](#customization--extensibility)
11. [Contributing](#contributing)
12. [Troubleshooting](#troubleshooting)
13. [License](#license)

---

# Overview

BiteSpeed is a lightweight visual tool to create chatbot conversation flows. Designers and developers can visually compose messages, connect order of execution, and export a JSON representation ready to be consumed by a chatbot runtime.

Use cases:

* Rapid prototyping of conversation flows
* Non-technical design by product/PM teams
* Exporting flows for bot runtimes or testing

---

# Key Features

* ✅ **Text node** with editable message content
* ✅ **Drag & drop** nodes from Nodes Panel onto canvas
* ✅ **Connect nodes** via handles (edges) to create sequences
* ✅ **Source handle**: only **one** outgoing edge allowed
* ✅ **Target handle**: multiple incoming edges allowed
* ✅ **Settings panel** replaces Nodes Panel when node selected (edit in real-time)
* ✅ **Save flow** with validation and `flow.json` download
* ✅ Extensible node library — add new node types easily

---

# Tech Stack

* **React 18** — UI library
* **React Flow** — graph / canvas engine
* **Tailwind CSS** — styling
* **Vite** — build tool
* **JavaScript** (Vanilla; TypeScript optional)

---

# Quick Start

### Clone & Install

```bash
git clone https://github.com/TODO-username/bitespeed-flow.git
cd bitespeed-flow
npm install
```

### Dev

```bash
npm run dev
# Open: http://localhost:5173 (or printed URL)
```

### Build

```bash
npm run build
npm run preview   # preview the production build
```

---

# Project Structure (recommended)

```
bitespeed-flow/
├─ public/
│  └─ _redirects           # (Netlify SPA fallback)
├─ src/
│  ├─ components/
│  │  ├─ nodes/
│  │  │  └─ TextNode.jsx
│  │  ├─ panels/
│  │  │  ├─ NodesPanel.jsx
│  │  │  └─ SettingsPanel.jsx
│  │  └─ ButtonsBar.jsx
│  ├─ lib/
│  │  ├─ nodeLibrary.js    # node registry
│  │  └─ validators.js     # save/graph validation rules
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css            # Tailwind imports + small tweaks
├─ package.json
├─ tailwind.config.cjs
├─ postcss.config.cjs
└─ vite.config.js
```

---

# How It Works (simple & clear)

1. **Nodes & Edges State**

   * App keeps two central arrays: `nodes[]` and `edges[]`.
   * These represent everything on the canvas: positions, labels, and connections.

2. **Add nodes (drag & drop)**

   * Drag item from Nodes Panel → Drop on canvas.
   * On drop: compute mouse coords relative to canvas → create node with `type` and `data`.

3. **Connect nodes**

   * Each node shows two handles: **left** (target) and **right** (source).
   * Drag from a node’s right handle to another’s left handle to create an edge.

4. **Source rule**

   * The app prevents adding a second outgoing edge from the same source — either block with alert or visually prevent.

5. **Edit node text**

   * Click a node → Settings Panel opens → edit textarea → node label updates live.

6. **Save**

   * On Save: run validators (see next section). If valid, package nodes+edges into a JSON and download `flow.json`.

---

# Validation Rules & Save Behavior

* **Single outgoing per source**: a source handle may have at most **one** outgoing edge.
* **Multi incoming to target**: a target handle may accept multiple incoming edges.
* **Save validation**:

  * If `nodes.length > 1` **and** there are **more than one sink nodes** (nodes with no outgoing edges), Save fails with the message:

    > `Cannot save: More than one node has empty target handles. Please connect nodes so there's only one end node.`
  * Otherwise, Save succeeds and downloads `flow.json`.

---

# Data Format / API Example

Saved `flow.json` structure:

```json
{
  "nodes": [
    {
      "id": "text-1",
      "type": "text",
      "position": { "x": 120, "y": 50 },
      "data": { "label": "Hello! How can I help?" }
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "text-1",
      "target": "text-2",
      "sourceHandle": "output",
      "targetHandle": "input"
    }
  ],
  "savedAt": "2025-08-22T12:00:00.000Z"
}
```

> This JSON is ready to be posted to an API endpoint for storage or consumed by a chatbot runtime.

---

# Deployment

## Vercel (recommended)

1. Push repo to GitHub.
2. Create new project in Vercel → import GitHub repo.
3. Set Framework Preset to **Vite** (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Netlify (alternative)

1. New site → import from Git.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add `_redirects` in `public`:

```
/* /index.html 200
```

---

# Customization & Extensibility

### Add new node type (summary)

1. Add a record to `src/lib/nodeLibrary.js`:

```js
{ type: 'delay', title: 'Delay', defaultData: { ms: 1000 } }
```

2. Create `src/components/nodes/DelayNode.jsx`.
3. Register in `nodeTypes` map passed to `<ReactFlow nodeTypes={nodeTypes} />`.
4. Extend SettingsPanel to show fields for the new node type.

### Validation

* All validators live in `src/lib/validators.js`. Add rules here: root node checks, no cycles, reachability, etc.

---

# Contributing

1. Fork → create a feature branch: `git checkout -b feat/cool-feature`
2. Commit with clear message: `feat(node): add delay node`
3. Open a PR describing the change & include screenshots for UI changes.
4. Run tests (if added) and ensure linting passes.

---

# Troubleshooting (common)

* **Drag & drop not working**: ensure `onDragOver(e) { e.preventDefault(); }` on canvas wrapper.
* **Multiple outputs allowed**: check `onConnect` handler — it should check existing edges for `edge.source === params.source`.
* **Tailwind styles missing**: confirm `index.css` imports Tailwind and `tailwind.config.cjs.content` includes `./src/**/*`.
* **404 on refresh (Netlify)**: add `_redirects` rule to redirect all routes to `index.html`.

---

# FAQ

**Q: Can nodes have multiple outputs later?**
A: Yes — change the `onConnect` rule to allow multiple outgoing edges, and update UI/validation accordingly.

**Q: Can I save flows to a backend?**
A: Yes — replace the JSON download logic with a `POST /api/flows` request.

---

# License

This project is released under the **MIT License**. See the `LICENSE` file.

