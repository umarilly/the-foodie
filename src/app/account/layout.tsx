import { AccountNav } from "@/components/account/account-nav";

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold">My Account</h1>
      <AccountNav className="mt-6" />
      <div className="mt-8">{children}</div>
    </div>
  );
}
