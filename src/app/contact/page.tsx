import type { Metadata } from "next";
import { MapPin, Phone, Mail, Globe2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Foodie.",
};

const DETAILS = [
  { icon: MapPin, label: "G-9, Islamabad" },
  { icon: Phone, label: "+92 313 5712381" },
  { icon: Mail, label: "hello@thefoodie.example" },
  { icon: Globe2, label: "www.thefoodie.example" },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Let's get in touch"
        description="We're open for any suggestion or just to have a chat."
      />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Reach us directly</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {DETAILS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
