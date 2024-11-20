import { RequestForm } from '@/components/request-form';
import { Tabs } from '@/components/tabs';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">REST Client</h1>
        <Tabs />
      </div>
    </main>
  );
}