import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

const CATEGORIES = [
  { name: "Starters", slug: "starters", sortOrder: 0 },
  { name: "Burgers", slug: "burgers", sortOrder: 1 },
  { name: "Pizza", slug: "pizza", sortOrder: 2 },
  { name: "Steaks", slug: "steaks", sortOrder: 3 },
  { name: "Shawarma & Wraps", slug: "shawarma-wraps", sortOrder: 4 },
  { name: "Drinks", slug: "drinks", sortOrder: 5 },
  { name: "Desserts", slug: "desserts", sortOrder: 6 },
];

const ITEMS: Record<
  string,
  Array<{
    name: string;
    slug: string;
    description: string;
    priceCents: number;
    imageUrl: string;
    rating?: number;
    isFeatured?: boolean;
  }>
> = {
  starters: [
    {
      name: "Loaded Potato Skins",
      slug: "loaded-potato-skins",
      description: "Crisped skins with cheddar, bacon bits, and sour cream.",
      priceCents: 65000,
      imageUrl: img("photo-1541592106381-b31e9677c0e5"),
      rating: 4.6,
    },
    {
      name: "Buffalo Wings",
      slug: "buffalo-wings",
      description: "Six wings tossed in house buffalo sauce, blue cheese dip.",
      priceCents: 85000,
      imageUrl: img("photo-1608039755401-742074f0548d"),
      rating: 4.7,
      isFeatured: true,
    },
    {
      name: "Garlic Bread",
      slug: "garlic-bread",
      description: "Toasted sourdough, roasted garlic butter, parsley.",
      priceCents: 35000,
      imageUrl: img("photo-1573140247632-f8fd74997d5c"),
      rating: 4.4,
    },
  ],
  burgers: [
    {
      name: "Chicken Beef Classic",
      slug: "chicken-beef-classic",
      description: "Basil, mozzarella, tomatoes, and house sauce.",
      priceCents: 50000,
      imageUrl: img("photo-1568901346375-23c9450c58cd"),
      rating: 4.8,
      isFeatured: true,
    },
    {
      name: "Spicy Zinger Burger",
      slug: "spicy-zinger-burger",
      description: "Crispy chicken fillet, chipotle mayo, pickles.",
      priceCents: 75000,
      imageUrl: img("photo-1550547660-d9450f859349"),
      rating: 4.5,
    },
    {
      name: "Smoky BBQ Burger",
      slug: "smoky-bbq-burger",
      description: "Beef patty, smoked cheddar, crispy onions, BBQ glaze.",
      priceCents: 95000,
      imageUrl: img("photo-1571091718767-18b5b1457add"),
      rating: 4.6,
    },
    {
      name: "Double Smash Deluxe",
      slug: "double-smash-deluxe",
      description: "Double beef patty, double cheese, brioche bun, burger sauce.",
      priceCents: 150000,
      imageUrl: img("photo-1553979459-d2229ba7433b"),
      rating: 4.9,
    },
  ],
  pizza: [
    {
      name: "Margherita Pizza",
      slug: "margherita-pizza",
      description: "San Marzano tomato, fresh mozzarella, basil.",
      priceCents: 120000,
      imageUrl: img("photo-1604068549290-dea0e4a305ca"),
      rating: 4.7,
      isFeatured: true,
    },
    {
      name: "Pepperoni Feast",
      slug: "pepperoni-feast",
      description: "Double pepperoni, mozzarella, oregano.",
      priceCents: 145000,
      imageUrl: img("photo-1628840042765-356cda07504e"),
      rating: 4.8,
    },
    {
      name: "BBQ Chicken Pizza",
      slug: "bbq-chicken-pizza",
      description: "Grilled chicken, red onion, smoked BBQ base.",
      priceCents: 140000,
      imageUrl: img("photo-1571997478779-2adcbbe9ab2f"),
      rating: 4.5,
    },
  ],
  steaks: [
    {
      name: "Grilled Ribeye Steak",
      slug: "grilled-ribeye-steak",
      description: "10oz ribeye, herb butter, roasted vegetables.",
      priceCents: 220000,
      imageUrl: img("photo-1600891964599-f61ba0e24092"),
      rating: 4.9,
      isFeatured: true,
    },
    {
      name: "Peppercorn Sirloin",
      slug: "peppercorn-sirloin",
      description: "Sirloin steak, cracked pepper cream sauce, fries.",
      priceCents: 240000,
      imageUrl: img("photo-1544025162-d76694265947"),
      rating: 4.6,
    },
  ],
  "shawarma-wraps": [
    {
      name: "Chicken Shawarma",
      slug: "chicken-shawarma",
      description: "Marinated chicken, garlic sauce, pickles, flatbread.",
      priceCents: 35000,
      imageUrl: img("photo-1633436375153-d7045cb93e38"),
      rating: 4.7,
      isFeatured: true,
    },
    {
      name: "Beef Shawarma Wrap",
      slug: "beef-shawarma-wrap",
      description: "Spiced beef, tahini, pickled turnip, flatbread.",
      priceCents: 40000,
      imageUrl: img("photo-1529006557810-274b9b2fc783"),
      rating: 4.5,
    },
  ],
  drinks: [
    {
      name: "Fresh Lemonade",
      slug: "fresh-lemonade",
      description: "Hand-squeezed lemons, mint, sparkling water.",
      priceCents: 25000,
      imageUrl: img("photo-1621263764928-df1444c5e859"),
      rating: 4.4,
    },
    {
      name: "Iced Cold Brew",
      slug: "iced-cold-brew",
      description: "Slow-steeped cold brew coffee over ice.",
      priceCents: 30000,
      imageUrl: img("photo-1461023058943-07fcbe16d735"),
      rating: 4.5,
    },
  ],
  desserts: [
    {
      name: "Molten Chocolate Cake",
      slug: "molten-chocolate-cake",
      description: "Warm chocolate cake, molten center, vanilla ice cream.",
      priceCents: 45000,
      imageUrl: img("photo-1624353365286-3f8d62daad51"),
      rating: 4.8,
      isFeatured: true,
    },
    {
      name: "New York Cheesecake",
      slug: "new-york-cheesecake",
      description: "Classic baked cheesecake, berry compote.",
      priceCents: 50000,
      imageUrl: img("photo-1524351199678-941a58a3df50"),
      rating: 4.6,
    },
  ],
};

async function main() {
  for (const category of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, sortOrder: category.sortOrder },
      create: category,
    });

    const items = ITEMS[category.slug] ?? [];
    for (const item of items) {
      await prisma.menuItem.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          description: item.description,
          priceCents: item.priceCents,
          imageUrl: item.imageUrl,
          rating: item.rating ?? 4.5,
          isFeatured: item.isFeatured ?? false,
          categoryId: created.id,
        },
        create: {
          ...item,
          categoryId: created.id,
        },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
