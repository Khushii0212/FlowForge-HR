import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { EndNodeData } from '@/types';

const schema = z.object({ title: z.string().optional(), endMessage: z.string().optional(), showSummary: z.boolean() });

interface Props { data: EndNodeData; onUpdate: (data: Partial<EndNodeData>) => void; }

export function EndNodeForm({ data, onUpdate }: Props) {
  const { register, watch, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: data.title || 'End', endMessage: data.endMessage || '', showSummary: data.showSummary || false },
  });
  const w = watch();

  useEffect(() => {
    const t = setTimeout(() => onUpdate({ ...w, label: w.title || 'End' }), 300);
    return () => clearTimeout(t);
  }, [w.title, w.endMessage, w.showSummary]);

  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" {...register('title')} /></div>
      <div className="space-y-2"><Label htmlFor="endMessage">End Message</Label><Input id="endMessage" {...register('endMessage')} placeholder="Workflow completed successfully" /></div>
      <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
        <div><Label htmlFor="showSummary" className="cursor-pointer">Show Summary</Label><p className="text-[10px] text-slate-400">Display execution summary at the end</p></div>
        <Switch id="showSummary" checked={w.showSummary} onCheckedChange={(c) => setValue('showSummary', c)} />
      </div>
    </div>
  );
}
