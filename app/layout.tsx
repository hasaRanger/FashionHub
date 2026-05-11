import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FashionHub – Wear Your Style',
  description: 'Best trendy collection',
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <div className="max-w-[390px] mx-auto bg-white min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}