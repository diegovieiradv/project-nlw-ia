import type { HealthResponse, Message, QuestionResponse, Room } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://project-nlw-ia.vercel.app";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.error || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Health
  async health(): Promise<HealthResponse> {
    return request<HealthResponse>("/health");
  },

  // Rooms
  async getRooms(): Promise<Room[]> {
    return request<Room[]>("/rooms");
  },

  async getRoom(id: string): Promise<Room> {
    return request<Room>(`/rooms/${id}`);
  },

  async createRoom(data: {
    name: string;
    description?: string;
  }): Promise<Room> {
    return request<Room>("/rooms", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Messages
  async getMessages(roomId: string): Promise<Message[]> {
    return request<Message[]>(`/rooms/${roomId}/messages`);
  },

  async sendMessage(
    roomId: string,
    data: { content: string; role?: "user" | "assistant" }
  ): Promise<Message> {
    return request<Message>(`/rooms/${roomId}/messages`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Questions (RAG)
  async askQuestion(
    roomId: string,
    question: string
  ): Promise<QuestionResponse> {
    return request<QuestionResponse>(`/rooms/${roomId}/questions`, {
      method: "POST",
      body: JSON.stringify({ question }),
    });
  },
};
