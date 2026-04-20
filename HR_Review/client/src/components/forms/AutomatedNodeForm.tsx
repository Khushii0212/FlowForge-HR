import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchAutomations } from '@/api/client';
import type { AutomatedNodeData, Automation } from '@/types';

const schema = z.object({ title: z.string().min(1, 'Title is required'), actionId: z.string().optional() });

interface Props { data: AutomatedNodeData; onUpdate: (data: Partial<AutomatedNodeData>) => void; }

export function AutomatedNodeForm({ data, onUpdate }: Props) {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [params, setParams] = useState<Record<string, string>>(data.parameters || {});
  const { register, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: data.title || '', actionId: data.actionId || '' },
  });
  const w = watch();
  const selectedAction = automations.find((a) => a.id === w.actionId);

  useEffect(() => { fetchAutomations().then(setAutomations).catch(console.error); }, []);

  useEffect(() => {
    const t = setTimeout(() => onUpdate({ ...w, label: w.title, parameters: params }), 300);
    return () => clearTimeout(t);
  }, [w.title, w.actionId, JSON.stringify(params)]);

  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label htmlFor="title">Title *</Label><Input id="title" {...register('title')} />{errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}</div>
      <div className="space-y-2">
        <Label>Action</Label>
        <Select value={w.actionId} onValueChange={(v) => { setValue('actionId', v); setParams({}); }}>
          <SelectTrigger><SelectValue placeholder="Select automation action" /></SelectTrigger>
          <SelectContent>{automations.map((a) => <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {selectedAction && selectedAction.params.length > 0 && (
        <div className="space-y-3 rounded-lg border border-violet-200 bg-violet-50/50 p-3">
          <p className="text-xs font-medium text-violet-700">Action Parameters</p>
          {selectedAction.params.map((p) => (
            <div key={p} className="space-y-1">
              <Label htmlFor={`param-${p}`} className="text-xs capitalize">{p}</Label>
              <Input id={`param-${p}`} value={params[p] || ''} onChange={(e) => setParams((prev) => ({ ...prev, [p]: e.target.value }))} placeholder={`Enter ${p}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
