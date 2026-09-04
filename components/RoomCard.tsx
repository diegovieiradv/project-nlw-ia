import Link from "next/link";
import type { Room } from "@/lib/types";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const formattedDate = new Date(room.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/rooms/${room.id}`}>
      <article className="group cursor-pointer rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-accent hover:bg-surface-light">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white group-hover:text-accent">
            {room.name}
          </h3>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
            {formattedDate}
          </span>
        </div>

        {room.description && (
          <p className="line-clamp-2 text-sm text-muted">{room.description}</p>
        )}

        <div className="mt-4 flex items-center text-xs text-muted">
          <svg
            className="mr-1.5 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Abrir sala
        </div>
      </article>
    </Link>
  );
}
