import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1">
        <main className="py-6 lg:py-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
