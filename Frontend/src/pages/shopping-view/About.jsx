import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl m-5">
      {/* HERO */}
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          About UniDrobe
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          UniDrobe is a modern e-commerce project built to deliver a clean,
          intuitive, and scalable online shopping experience for fashion and
          lifestyle products.
        </p>
      </div>

      <Separator className="my-10" />

      {/* OUR STORY */}
      <div className="space-y-4 max-w-4xl">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Our Story
        </h2>
        <p className="leading-7 text-muted-foreground">
          UniDrobe was created as a full-stack e-commerce project with the goal
          of replicating real-world shopping workflows — from product discovery
          to wishlist, cart, checkout, and account management.
        </p>
        <p className="leading-7 text-muted-foreground">
          This project focuses on building a strong frontend experience backed
          by structured data, role-based access, and scalable UI components.
        </p>
      </div>

      <Separator className="my-10" />

      {/* WHAT WE OFFER */}
      <div className="space-y-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          What You’ll Find on UniDrobe
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Men’s Fashion",
              desc: "Everyday essentials, casual wear, footwear, and accessories.",
            },
            {
              title: "Women’s Fashion",
              desc: "Modern styles, seasonal collections, and lifestyle pieces.",
            },
            {
              title: "Kids Collection",
              desc: "Comfortable and playful clothing for kids of all ages.",
            },
            {
              title: "Footwear",
              desc: "Sneakers, casual shoes, sports shoes, and sandals.",
            },
            {
              title: "Accessories",
              desc: "Bags, watches, jewelry, and everyday add-ons.",
            },
            {
              title: "Featured Products",
              desc: "Admin-curated selections highlighted across the store.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-background p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      {/* WHY UNIDROBE */}
      <div className="space-y-4 max-w-4xl">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Why UniDrobe
        </h2>
        <ul className="my-6 ml-6 list-disc text-muted-foreground [&>li]:mt-2">
          <li>Clean and responsive UI built with Tailwind & shadcn/ui</li>
          <li>Modern product management with admin controls</li>
          <li>Wishlist, cart, reviews, and authentication flows</li>
          <li>Scalable structure suitable for real-world expansion</li>
        </ul>
      </div>

      <Separator className="my-12" />

      {/* CTA */}
      <div className="flex flex-col items-start gap-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Start Exploring
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Browse products, manage your wishlist, and experience a modern
          e-commerce workflow built with performance and usability in mind.
        </p>

        <Button asChild className="mt-2">
          <Link to="/listing">Start Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default About;
