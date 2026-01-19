import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

export const metadata = {
  title: "Ana Cris Ormaza | Selfcare & Motherhood",
  description:
    "Un espacio para mujeres que están listas para reorganizar su vida, su energía y su identidad, a su propio ritmo.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${lora.variable}`}>
      <body className="font-serif antialiased bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
