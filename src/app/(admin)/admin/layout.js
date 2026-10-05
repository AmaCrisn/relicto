import "../../globals.css";

export const metadata = {
  title: "Admin | Relicto",
  description: "Panel administrasi Relicto",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-surface font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}