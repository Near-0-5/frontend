import {
  ChatPlaceholder,
  StreamHeader,
  StreamPlayerPlaceholder,
} from '@/features/live/components';

export default function StreamingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-4">
      <StreamHeader />

      <section className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <StreamPlayerPlaceholder />
        </div>

        <div className="col-span-4">
          <ChatPlaceholder />
        </div>
      </section>
    </main>
  );
}
