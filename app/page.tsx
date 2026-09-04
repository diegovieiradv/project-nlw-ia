import { RoomList } from "@/components/RoomList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12">
      <div className="w-full max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
            <span className="text-accent">NLW</span> IA
          </h1>
          <p className="text-lg text-muted">
            Crie salas de conversa e interaja com inteligência artificial
          </p>
        </header>

        <RoomList />
      </div>
    </main>
  );
}
