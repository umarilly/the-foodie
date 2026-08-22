import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind The Foodie and the team behind the kitchen.",
};

const TEAM = [
  {
    name: "Amara Khan",
    role: "Head Chef",
    photo: "photo-1607990281513-2c110a25bd8c",
  },
  {
    name: "Bilal Ahmed",
    role: "Operations Lead",
    photo: "photo-1519085360753-af0119f7cbe7",
  },
  {
    name: "Sara Malik",
    role: "Customer Experience",
    photo: "photo-1573497019940-1c28c88b4f3e",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="Food, cooked the way it should be"
        description="We started The Foodie because takeout didn't have to mean a compromise."
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl font-semibold">Who we are</h2>
          <p className="mt-4 text-muted-foreground">
            The Foodie is a fast-growing kitchen built around one idea: food
            people actually want to eat again. We take responsibility for
            every order from the moment it hits the kitchen to the moment it
            lands on your table — cooked fresh, packed properly, and
            delivered on time.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock3 className="h-5 w-5 text-primary" />
              Open 24/7 for delivery
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Quality checked every order
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop"
            alt="Inside The Foodie's kitchen"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="font-heading text-3xl font-semibold">Our Team</h2>
            <p className="mt-2 text-muted-foreground">
              The people making sure every order goes out right.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={`https://images.unsplash.com/${member.photo}?q=80&w=300&auto=format&fit=crop`}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">
                  {member.name}
                </h3>
                <p className="text-sm text-accent">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
