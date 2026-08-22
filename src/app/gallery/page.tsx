import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look inside The Foodie's kitchen and dishes.",
};

const GALLERY_IMAGES = [
  "photo-1414235077428-338989a2e8c0",
  "photo-1517248135467-4c7edcad34c4",
  "photo-1555396273-367ea4eb4db5",
  "photo-1552566626-52f8b828add9",
  "photo-1466978913421-dad2ebd01d17",
  "photo-1504674900247-0877df9cc836",
  "photo-1526318472351-c75fcf070305",
  "photo-1495474472287-4d71bcdd2085",
];

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title="A peek behind the pass"
        description="Real dishes, real kitchen — no stock photography stand-ins."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_IMAGES.map((id, index) => (
            <div
              key={`${id}-${index}`}
              className="relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={`https://images.unsplash.com/${id}?q=80&w=600&auto=format&fit=crop`}
                alt="Dish from The Foodie's kitchen"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
