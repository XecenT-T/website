import type { Metadata } from "next";
import {
  Playfair_Display,
  Poppins,
  Bebas_Neue,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-accent",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Silver Saffron | Luxury Stay & Premium Hospitality",
  description:
    "Welcome to Hotel Silver Saffron — A unit of Gill & Grewal's Hospitality. Experience 47 premium rooms, banquet halls, terrace dining, and world-class hospitality. Book your stay today.",
  keywords: [
    "hotel silver saffron",
    "luxury hotel",
    "hotel booking",
    "gill grewal hospitality",
    "banquet hall",
    "premium rooms",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${bebasNeue.variable} ${greatVibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
