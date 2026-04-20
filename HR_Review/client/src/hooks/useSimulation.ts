import { useState, useCallback } from 'react';
import { simulateWorkflow } from '@/api/client';
import type { SimulationResult } from '@/types';

export function useSimulation() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const runSimulation = useCallback(
    async (workflow: { nodes: unknown[]; edges: unknown[] }) => {
      setIsRunning(true); setError(null); setResult(null); setShowPanel(true);
      try {
        const data = await simulateWorkflow(workflow);
        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Simulation failed');
      } finally {
        setIsRunning(false);
      }
    },
    []
  );

  const closePanel = useCallback(() => {
    setShowPanel(false); setResult(null); setError(null);
  }, []);

  return { result, isRunning, error, showPanel, runSimulation, closePanel };
}
