"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { Room } from "@/lib/types";
import { RoomCard } from "./RoomCard";
import { CreateRoomForm } from "./CreateRoomForm";

export function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getRooms();
      setRooms(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar salas"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Suas Salas</h2>
        <CreateRoomForm onCreated={loadRooms} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="mb-3 text-red-400">{error}</p>
          <button
            onClick={loadRooms}
            className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/30"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && !error && rooms.length === 0 && (
        <div className="rounded-xl border border-border bg-surface py-16 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="mb-2 text-lg font-medium text-white">
            Nenhuma sala criada
          </p>
          <p className="text-sm text-muted">
            Crie sua primeira sala para começar a conversar
          </p>
        </div>
      )}

      {!isLoading && !error && rooms.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
