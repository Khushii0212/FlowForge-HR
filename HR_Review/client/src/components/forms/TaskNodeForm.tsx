import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { TaskNodeData } from '@/types';

const schema = z.object({
  title: z.string().min(1, 'Title is required'), description: z.string().optional(),
  assignee: z.string().optional(), dueDate: z.string().optional(),
  customFields: z.array(z.object({ key: z.string(), value: z.string() })),
});

interface Props { data: TaskNodeData; onUpdate: (data: Partial<TaskNodeData>) => void; }

export function TaskNodeForm({ data, onUpdate }: Props) {
  const { register, control, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: data.title || '', description: data.description || '', assignee: data.assignee || '', dueDate: data.dueDate || '', customFields: data.customFields || [] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'customFields' });
  const w = watch();

  useEffect(() => {
    const t = setTimeout(() => onUpdate({ ...w, label: w.title }), 300);
    return () => clearTimeout(t);
  }, [w.title, w.description, w.assignee, w.dueDate, JSON.stringify(w.customFields)]);

  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label htmlFor="title">Title *</Label><Input id="title" {...register('title')} />{errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}</div>
      <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" {...register('description')} rows={3} /></div>
      <div className="space-y-2"><Label htmlFor="assignee">Assignee</Label><Input id="assignee" {...register('assignee')} placeholder="e.g. john.doe" /></div>
      <div className="space-y-2"><Label htmlFor="dueDate">Due Date</Label><Input id="dueDate" type="date" {...register('dueDate')} /></div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><Label>Custom Fields</Label><Button type="button" variant="ghost" size="sm" onClick={() => append({ key: '', value: '' })}>+ Add</Button></div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input placeholder="Key" {...register(`customFields.${index}.key`)} className="flex-1" />
            <Input placeholder="Value" {...register(`customFields.${index}.value`)} className="flex-1" />
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50">✕</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
