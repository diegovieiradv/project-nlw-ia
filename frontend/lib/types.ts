export interface Room {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  content: string;
  role: "user" | "assistant";
  createdAt: string;
}

export interface QuestionResponse {
  answer: string;
  relatedMessages: RelatedMessage[];
}

export interface RelatedMessage {
  content: string;
  role: string;
  similarity: number;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}
