import "./globals.css";
import { IBM_Plex_Sans, Open_Sans } from "next/font/google";
import {
  AnalyticsWrapper,
  Navbar,
  ServiceWorkerWrapper,
  ThemeProviders,
} from "@/components";

const open_sans = Open_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic-ext", "latin-ext"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />

        <title>unischedule</title>
      </head>
      <body className={`${open_sans.className} `}>
        <AnalyticsWrapper />
        <ThemeProviders data-theme defaultTheme="cmyk" enableSystem>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
