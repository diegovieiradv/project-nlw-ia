"use client";

import { useState } from "react";

interface MessageFormProps {
  onSend: (content: string) => Promise<void>;
  isLoading?: boolean;
}

export function MessageForm({ onSend, isLoading }: MessageFormProps) {
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    const message = content.trim();
    setContent("");
    await onSend(message);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Digite sua mensagem..."
        disabled={isLoading}
        className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !content.trim()}
        className="flex items-center gap-2 rounded-xl bg-user px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-user-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        )}
        Enviar
      </button>
    </form>
  );
}
