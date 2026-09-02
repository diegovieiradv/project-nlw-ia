"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { QuestionResponse } from "@/lib/types";

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<QuestionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await api.askQuestion(roomId, question.trim());
      setResponse(result);
      setQuestion("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar pergunta"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h3 className="text-sm font-semibold text-accent">
          Perguntar à IA (RAG)
        </h3>
      </div>

      <p className="mb-3 text-xs text-muted">
        Faça uma pergunta e a IA responderá usando o contexto das mensagens
        anteriores
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: Qual o tema principal desta conversa?"
          disabled={isLoading}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-white placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          Perguntar
        </button>
      </form>

      {error && (
        <div className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-4 animate-fade-in space-y-3">
          <div className="rounded-lg border border-accent/20 bg-background p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase text-accent">
              Resposta da IA
            </h4>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-white">
              {response.answer}
            </p>
          </div>

          {response.relatedMessages.length > 0 && (
            <div className="rounded-lg border border-border bg-surface p-3">
              <h4 className="mb-2 text-xs font-semibold uppercase text-muted">
                Mensagens relacionadas
              </h4>
              <div className="space-y-2">
                {response.relatedMessages.map((msg, i) => (
                  <div
                    key={i}
                    className="rounded bg-background px-3 py-2 text-xs"
                  >
                    <span className="font-medium text-accent">
                      {msg.role === "user" ? "Usuário" : "Assistente"}{" "}
                    </span>
                    <span className="text-muted">
                      (similaridade: {(msg.similarity * 100).toFixed(0)}%)
                    </span>
                    <p className="mt-1 text-white">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
