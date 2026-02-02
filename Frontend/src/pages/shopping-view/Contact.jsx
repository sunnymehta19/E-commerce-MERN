import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl m-7">
      {/* HEADER */}
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Have a question, feedback, or need support? We’d love to hear from you.
        </p>
      </div>

      <Separator className="my-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: CONTACT INFO */}
        <div className="space-y-6">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Get in Touch
          </h2>

          <p className="leading-7 text-muted-foreground">
            UniDrobe is a modern e-commerce project focused on delivering a clean
            and user-friendly shopping experience. If you have any questions
            related to products, orders, or the platform, feel free to reach
            out.
          </p>

          <div className="space-y-4">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">
                sunnymehta.here@gmail.com
              </p>
            </div>

            <div>
              <p className="font-medium">Support Availability</p>
              <p className="text-muted-foreground">
                Monday – Saturday, 10:00 AM – 6:00 PM (IST)
              </p>
            </div>

            <div>
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">
                India
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
       
      </div>
    </div>
  );
};

export default Contact;
