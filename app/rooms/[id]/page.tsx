"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { Room } from "@/lib/types";
import { ChatInterface } from "@/components/ChatInterface";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRoom() {
      try {
        setIsLoading(true);
        const data = await api.getRoom(roomId);
        setRoom(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar sala"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (roomId) {
      loadRoom();
    }
  }, [roomId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <svg
          className="mb-4 h-12 w-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="mb-2 text-xl font-semibold text-white">
          Sala não encontrada
        </h2>
        <p className="mb-6 text-muted">
          {error || "A sala solicitada não existe."}
        </p>
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Voltar para salas
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <header className="mb-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </Link>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h1 className="text-2xl font-bold text-white">{room.name}</h1>
            {room.description && (
              <p className="mt-2 text-sm text-muted">{room.description}</p>
            )}
            <div className="mt-3 flex items-center gap-4 text-xs text-muted">
              <span>
                Criada em{" "}
                {new Date(room.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Ativa
              </span>
            </div>
          </div>
        </header>

        {/* Chat */}
        <ChatInterface roomId={roomId} />
      </div>
    </main>
  );
}
