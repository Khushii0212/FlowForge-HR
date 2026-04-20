import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ApprovalNodeData } from '@/types';

const schema = z.object({ title: z.string().min(1, 'Title is required'), approverRole: z.string().optional(), autoApproveThreshold: z.coerce.number().min(0).optional() });

interface Props { data: ApprovalNodeData; onUpdate: (data: Partial<ApprovalNodeData>) => void; }
const roles = ['Manager', 'Director', 'VP', 'HR Admin', 'CEO', 'Department Head', 'Team Lead'];

export function ApprovalNodeForm({ data, onUpdate }: Props) {
  const { register, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: data.title || '', approverRole: data.approverRole || '', autoApproveThreshold: data.autoApproveThreshold || 0 },
  });
  const w = watch();

  useEffect(() => {
    const t = setTimeout(() => onUpdate({ ...w, label: w.title }), 300);
    return () => clearTimeout(t);
  }, [w.title, w.approverRole, w.autoApproveThreshold]);

  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label htmlFor="title">Title *</Label><Input id="title" {...register('title')} />{errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}</div>
      <div className="space-y-2">
        <Label>Approver Role</Label>
        <Select value={w.approverRole} onValueChange={(v) => setValue('approverRole', v)}>
          <SelectTrigger><SelectValue placeholder="Select approver role" /></SelectTrigger>
          <SelectContent>{roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="autoApproveThreshold">Auto-Approve Threshold ($)</Label>
        <Input id="autoApproveThreshold" type="number" min={0} {...register('autoApproveThreshold')} />
        <p className="text-[10px] text-slate-400">Auto-approve requests below this amount</p>
      </div>
    </div>
  );
}
