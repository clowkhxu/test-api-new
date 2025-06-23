import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movie API Proxy',
  description: 'API Proxy for Movie Database',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}