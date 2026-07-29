import Link from "next/link";

const tabs = [
  { label: "Overview", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Menu", href: "/admin/menu" },
];

export default function AdminNav({ active }: { active: string }) {
  return (
    <div className="mb-8 flex gap-2 border-b border-brand-navy/10">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            active === tab.href
              ? "border-brand-orange text-brand-orange"
              : "border-transparent text-brand-navy/60 hover:text-brand-navy"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
