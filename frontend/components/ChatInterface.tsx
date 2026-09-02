"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { Message } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";
import { MessageForm } from "./MessageForm";
import { QuestionForm } from "./QuestionForm";

interface ChatInterfaceProps {
  roomId: string;
}

export function ChatInterface({ roomId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    loadMessages();
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  async function loadMessages() {
    try {
      setIsLoadingMessages(true);
      setError(null);
      const data = await api.getMessages(roomId);
      setMessages(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao carregar mensagens"
      );
    } finally {
      setIsLoadingMessages(false);
    }
  }

  async function handleSendMessage(content: string) {
    try {
      setIsSending(true);
      setError(null);
      const message = await api.sendMessage(roomId, {
        content,
        role: "user",
      });
      setMessages((prev) => [...prev, message]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao enviar mensagem"
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Messages area */}
      <div className="flex h-[50vh] min-h-[300px] flex-col rounded-xl border border-border bg-surface p-4">
        {isLoadingMessages ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : error && messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="mb-3 text-red-400">{error}</p>
            <button
              onClick={loadMessages}
              className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/30"
            >
              Tentar novamente
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <svg
              className="mb-3 h-10 w-10 text-muted"
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
            <p className="text-sm text-muted">
              Nenhuma mensagem ainda. Comece a conversa!
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Send message form */}
      <MessageForm onSend={handleSendMessage} isLoading={isSending} />

      {/* Error banner */}
      {error && messages.length > 0 && (
        <div className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* RAG Question form */}
      <QuestionForm roomId={roomId} />
    </div>
  );
}
