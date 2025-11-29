import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function FinInfraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden pt-14">
      <Header />
      <div className="mx-auto w-full max-w-screen-xl flex-1 px-4 sm:px-6 lg:px-8">
        <main className="py-6 lg:py-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
