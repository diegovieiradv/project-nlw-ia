"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface CreateRoomFormProps {
  onCreated?: () => void;
}

export function CreateRoomForm({ onCreated }: CreateRoomFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const room = await api.createRoom({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      setName("");
      setDescription("");
      setIsOpen(false);
      onCreated?.();
      router.push(`/rooms/${room.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar sala");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Nova Sala
      </button>
    );
  }

  return (
    <div className="animate-fade-in rounded-xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Criar Nova Sala</h3>
        <button
          onClick={() => {
            setIsOpen(false);
            setError(null);
          }}
          className="text-muted transition-colors hover:text-white"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="room-name"
            className="mb-1.5 block text-sm font-medium text-muted"
          >
            Nome da Sala *
          </label>
          <input
            id="room-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Discussão sobre React"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-white placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="room-description"
            className="mb-1.5 block text-sm font-medium text-muted"
          >
            Descrição (opcional)
          </label>
          <textarea
            id="room-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Sobre o que será esta sala?"
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-white placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Criando..." : "Criar Sala"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-light hover:text-white"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
