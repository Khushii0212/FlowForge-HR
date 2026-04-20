import type { Automation, SimulationResult } from '@/types';

const API_BASE = '/api';

export async function fetchAutomations(): Promise<Automation[]> {
  const res = await fetch(`${API_BASE}/automations`);
  if (!res.ok) throw new Error('Failed to fetch automations');
  return res.json();
}

export async function simulateWorkflow(
  workflow: { nodes: unknown[]; edges: unknown[] }
): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workflow),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Simulation failed');
  }
  return res.json();
}
