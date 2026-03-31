import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jake Bouma",
    template: "%s — Jake Bouma",
  },
  description:
    "Writer, builder, cancer survivor. A personal archive and portfolio est. 2005.",
  metadataBase: new URL("https://jakebouma.com"),
  openGraph: {
    title: "Jake Bouma",
    description:
      "Writer, builder, cancer survivor. A personal archive and portfolio est. 2005.",
    url: "https://jakebouma.com",
    siteName: "Jake Bouma",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@jakebouma",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-ink font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
