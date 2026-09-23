"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";

export function TagInput({
  value,
  onChange,
  placeholder,
  help,
  onSubmit,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  help?: string;
  onSubmit?: () => void;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const addTag = () => {
    const entry = draft.trim();
    if (!entry) return;
    if (value.includes(entry)) {
      setError("Already added.");
      return;
    }
    onChange([...value, entry]);
    setDraft("");
    setError(null);
    if (onSubmit) onSubmit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    } else if (event.key === "Backspace" && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    } else if (event.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  const pasteTags = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData.getData("text");
    if (!text.includes(",") && !text.includes("\n")) return;
    event.preventDefault();
    const entries = text
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const merged = [...value, ...entries.filter((e) => !value.includes(e))];
    onChange(merged);
  };

  return (
    <div>
      <div
        className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border border-input bg-background px-3 py-2 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40 hover:border-border"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(value.filter((t) => t !== tag));
              }}
              className="rounded-full p-0.5 text-muted-foreground transition-colors hover:text-destructive"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          onPaste={pasteTags}
          placeholder={value.length === 0 ? placeholder ?? "Type and press Enter" : undefined}
          className="min-w-32 flex-1 border-none bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground/70"
          aria-label="Add tag"
        />
        <button
          type="button"
          onClick={addTag}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          aria-label="Add tag"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      {help && <p className="mt-1 text-xs text-muted-foreground">{help}</p>}
    </div>
  );
}