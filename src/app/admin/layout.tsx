import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, ReceiptText } from "lucide-react";
import { requireAdmin } from "@/lib/require-admin";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/orders", label: "Orders", icon: ReceiptText },
];

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-3xl font-semibold">Admin Dashboard</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
        <nav className="flex gap-1 overflow-x-auto md:flex-col">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
