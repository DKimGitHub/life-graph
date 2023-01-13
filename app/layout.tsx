import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import AuthContext from "../lib/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( 
    <html lang="en" data-theme="dracula">
      <head />
      <body>
        <AuthContext>
          <main className="min-h-screen w-screen max-w-full overflow-x-hidden">
            <Header />
            <div className="mx-auto w-full max-w-6xl px-4">
              {children}
              {/* footer */}
            </div>
          </main>
        </AuthContext>
        <AuthModal/>
      </body>
    </html>
  );
}
