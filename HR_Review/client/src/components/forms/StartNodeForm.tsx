import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { StartNodeData } from '@/types';

const schema = z.object({ title: z.string().min(1, 'Title is required'), metadata: z.array(z.object({ key: z.string(), value: z.string() })) });

interface Props { data: StartNodeData; onUpdate: (data: Partial<StartNodeData>) => void; }

export function StartNodeForm({ data, onUpdate }: Props) {
  const { register, control, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: data.title || 'Start', metadata: data.metadata || [] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'metadata' });
  const watchedValues = watch();

  useEffect(() => {
    const t = setTimeout(() => onUpdate({ ...watchedValues, label: watchedValues.title }), 300);
    return () => clearTimeout(t);
  }, [watchedValues.title, JSON.stringify(watchedValues.metadata)]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Metadata</Label>
          <Button type="button" variant="ghost" size="sm" onClick={() => append({ key: '', value: '' })}>+ Add</Button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input placeholder="Key" {...register(`metadata.${index}.key`)} className="flex-1" />
            <Input placeholder="Value" {...register(`metadata.${index}.value`)} className="flex-1" />
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50">✕</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
