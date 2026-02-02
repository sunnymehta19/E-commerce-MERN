import { Separator } from "@/components/ui/separator";

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl m-8">
      {/* TITLE */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Refund Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last Updated: July 2025
        </p>
      </div>

      <Separator className="my-8" />

      <div className="space-y-8 text-muted-foreground leading-7">
        {/* INTRO */}
        <section className="space-y-3">
          <p>
            This Refund Policy outlines the conditions under which refunds are
            processed for purchases made on <strong>UniDrobe</strong>. Refunds
            are governed by the applicable return, cancellation, and product-
            specific policies displayed on the product or order page.
          </p>
        </section>

        <Separator />

        {/* ELIGIBILITY */}
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Refund Eligibility
          </h2>

          <p>
            Refunds may be initiated in the following cases:
          </p>

          <ul className="list-disc ml-6">
            <li>Order cancellation before dispatch (where applicable)</li>
            <li>Successful return of a product as per the return policy</li>
            <li>Seller-initiated cancellation due to unforeseen circumstances</li>
            <li>Product delivered is damaged, defective, or incorrect</li>
          </ul>

          <p>
            Refund eligibility depends on the product category, condition of the
            item at the time of return, and compliance with return guidelines.
          </p>
        </section>

        <Separator />

        {/* PROCESS */}
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Refund Process
          </h2>

          <p>
            Once a return or cancellation request is approved, the refund will
            be initiated after the product is received by the seller or the
            cancellation is confirmed.
          </p>

          <p>
            Refunds are processed to the original mode of payment used while
            placing the order. In the case of Cash on Delivery (CoD) orders,
            refunds may be processed via bank transfer or other supported
            methods.
          </p>
        </section>

        <Separator />

        {/* TIMELINE */}
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Refund Timeline
          </h2>

          <p>
            Once initiated, refunds are generally completed within
            <strong> 5–7 business days</strong>. Actual credit time may vary
            depending on your payment provider or bank.
          </p>

          <p>
            You can track the status of your refund from the Order Details
            section of your account.
          </p>
        </section>

        <Separator />

        {/* PARTIAL REFUNDS */}
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Partial Refunds
          </h2>

          <p>
            In certain cases, partial refunds may be issued. This may include
            situations where:
          </p>

          <ul className="list-disc ml-6">
            <li>Only a part of the order is returned</li>
            <li>Accessories or freebies are missing</li>
            <li>Product is returned in a condition not eligible for full refund</li>
          </ul>
        </section>

        <Separator />

        {/* NON-REFUNDABLE */}
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Non-Refundable Items
          </h2>

          <p>
            Certain products may not be eligible for refunds due to hygiene,
            safety, or regulatory reasons. For such products, the refund or
            return eligibility will be clearly mentioned on the product page.
          </p>
        </section>

        <Separator />

        {/* CONTACT */}
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Contact Us
          </h2>

          <p>
            If you have any questions or concerns regarding refunds, please
            contact us at:
          </p>

          <p className="font-medium text-foreground">
            📧 Email:{" "}
            <span className="text-primary">
              sunnymehta.here@gmail.com
            </span>
          </p>
        </section>

        <Separator />

        {/* CHANGES */}
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Changes to This Policy
          </h2>

          <p>
            UniDrobe reserves the right to modify this Refund Policy at any time.
            Any changes will be updated on this page with a revised “Last
            Updated” date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
