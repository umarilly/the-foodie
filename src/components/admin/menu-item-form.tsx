"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MenuItemFormState } from "@/actions/admin-menu";

type Category = { id: string; name: string };

type MenuItemFormProps = {
  action: (
    state: MenuItemFormState,
    formData: FormData,
  ) => Promise<MenuItemFormState>;
  categories: Category[];
  defaultValues?: {
    id?: string;
    name: string;
    description: string;
    priceCents: number;
    imageUrl: string;
    categoryId: string;
    isAvailable: boolean;
    isFeatured: boolean;
  };
  submitLabel: string;
};

const initialState: MenuItemFormState = {};

export function MenuItemForm({
  action,
  categories,
  defaultValues,
  submitLabel,
}: MenuItemFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <fieldset disabled={pending} className="flex flex-col gap-4">
        {defaultValues?.id && (
          <input type="hidden" name="id" value={defaultValues.id} />
        )}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={defaultValues?.name} required />
          {fieldErrors.name && (
            <p className="text-xs text-destructive">{fieldErrors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={defaultValues?.description}
            required
          />
          {fieldErrors.description && (
            <p className="text-xs text-destructive">{fieldErrors.description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="priceCents">Price (in paisa)</Label>
            <Input
              id="priceCents"
              name="priceCents"
              type="number"
              min={1}
              defaultValue={defaultValues?.priceCents}
              required
            />
            <p className="text-xs text-muted-foreground">
              e.g. 55000 = Rs 550
            </p>
            {fieldErrors.priceCents && (
              <p className="text-xs text-destructive">{fieldErrors.priceCents}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="categoryId">Category</Label>
            <Select name="categoryId" defaultValue={defaultValues?.categoryId}>
              <SelectTrigger id="categoryId" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.categoryId && (
              <p className="text-xs text-destructive">{fieldErrors.categoryId}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            defaultValue={defaultValues?.imageUrl}
            placeholder="https://images.unsplash.com/..."
            required
          />
          {fieldErrors.imageUrl && (
            <p className="text-xs text-destructive">{fieldErrors.imageUrl}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              name="isAvailable"
              defaultChecked={defaultValues?.isAvailable ?? true}
            />
            Available for ordering
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              name="isFeatured"
              defaultChecked={defaultValues?.isFeatured ?? false}
            />
            Featured on homepage
          </label>
        </div>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        <Button type="submit" className="self-start" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
      </fieldset>
    </form>
  );
}
