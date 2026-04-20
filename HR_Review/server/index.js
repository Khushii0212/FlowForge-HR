const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock automations data
const automations = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'slack_notify', label: 'Slack Notification', params: ['channel', 'message'] },
  { id: 'update_hris', label: 'Update HRIS Record', params: ['employeeId', 'field', 'value'] },
  { id: 'schedule_meeting', label: 'Schedule Meeting', params: ['attendees', 'duration', 'topic'] },
];

// GET /automations
app.get('/automations', (req, res) => {
  res.json(automations);
});

// POST /simulate
app.post('/simulate', (req, res) => {
  const { nodes, edges } = req.body;

  if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
    return res.status(400).json({ error: 'Workflow must contain at least one node.' });
  }

  const startNodes = nodes.filter((n) => n.type === 'startNode');
  const endNodes = nodes.filter((n) => n.type === 'endNode');

  if (startNodes.length === 0) {
    return res.status(400).json({ error: 'Workflow must have a Start node.' });
  }
  if (startNodes.length > 1) {
    return res.status(400).json({ error: 'Workflow must have only one Start node.' });
  }
  if (endNodes.length === 0) {
    return res.status(400).json({ error: 'Workflow must have an End node.' });
  }

  // Build adjacency list from edges
  const adjacency = {};
  edges.forEach((edge) => {
    if (!adjacency[edge.source]) adjacency[edge.source] = [];
    adjacency[edge.source].push(edge.target);
  });

  // BFS traversal from Start node
  const visited = new Set();
  const queue = [startNodes[0].id];
  const executionOrder = [];

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = nodes.find((n) => n.id === currentId);
    if (node) executionOrder.push(node);

    const neighbors = adjacency[currentId] || [];
    neighbors.forEach((neighborId) => {
      if (!visited.has(neighborId)) queue.push(neighborId);
    });
  }

  // Generate simulation steps
  const steps = executionOrder.map((node, index) => {
    const title = node.data?.label || node.data?.title || node.type;
    let stepName = '';
    let status = 'completed';

    switch (node.type) {
      case 'startNode':
        stepName = `Start: ${title}`;
        break;
      case 'taskNode':
        stepName = `Task: ${title}`;
        status = 'completed';
        break;
      case 'approvalNode':
        stepName = `Approval: ${title}`;
        status = Math.random() > 0.2 ? 'approved' : 'rejected';
        break;
      case 'automatedNode':
        stepName = `Automated: ${title}`;
        status = 'executed';
        break;
      case 'endNode':
        stepName = `End: ${title}`;
        break;
      default:
        stepName = title;
    }

    return {
      step: index + 1,
      name: stepName,
      nodeId: node.id,
      type: node.type,
      status,
      timestamp: new Date(Date.now() + index * 2000).toISOString(),
    };
  });

  // Simulate delay
  setTimeout(() => {
    res.json({
      success: true,
      totalSteps: steps.length,
      executedNodes: visited.size,
      totalNodes: nodes.length,
      steps,
    });
  }, 800);
});

app.listen(PORT, () => {
  console.log(`HR Workflow API server running on http://localhost:${PORT}`);
});
