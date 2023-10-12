import type { Metadata } from "next";

import Link from "next/link";

import { CategoriesList } from "@/components/CategoriesList";
import { getCategories } from "@/services/getCategories";
import "./globals.css";

export const metadata: Metadata = {
  title: "Migrado Libre",
  description: "La tienda de Don Miguel, libre de amarillos",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
        <header className="text-xl font-bold leading-[3rem]">
          <Link href="/">Migrado Libre</Link>
        </header>
        <div className="grid grid-cols-[200px,1fr] gap-x-4 py-8">
          <aside>
            <CategoriesList categories={categories} />
          </aside>
          <main>{children}</main>
        </div>
        <footer className="text-center leading-[3rem] opacity-70">
          © {new Date().getFullYear()} Don Miguel
        </footer>
      </body>
    </html>
  );
}
