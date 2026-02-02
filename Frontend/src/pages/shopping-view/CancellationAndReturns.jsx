import { Separator } from "@/components/ui/separator";

const CancellationAndReturns = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl m-8">
      {/* TITLE */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Order Cancellation and Return Policy
        </h1>
      </div>

      <Separator className="my-8" />

      <div className="space-y-10 text-muted-foreground leading-7">

        {/* CANCELLATION POLICY */}
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Cancellation Policy
          </h2>

          <p>
            The customer can choose to cancel an order any time before it's
            dispatched. The order cannot be canceled once it’s out for delivery.
            However, the customer may choose to reject it at the doorstep.
          </p>

          <p>
            The time window for cancellation varies based on different
            categories and the order cannot be canceled once the specified time
            has passed.
          </p>

          <p>
            In some cases, the customer may not be allowed to cancel the order
            for free, post the specified time and a cancellation fee will be
            charged. The details about the time window mentioned on the product
            page or order confirmation page will be considered final.
          </p>

          <p>
            In case of any cancellation from the seller due to unforeseen
            circumstances, a full refund will be initiated for prepaid orders.
          </p>

          <p>
            Flipkart reserves the right to accept the cancellation of any order.
            Flipkart also reserves the right to waive off or modify the time
            window or cancellation fee from time to time.
          </p>
        </section>

        <Separator />

        {/* HYPERLOCAL */}
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Cancellation Policy - Hyperlocal
          </h2>

          <p>
            The Orders placed by you on the Platform are non-cancellable and
            non-refundable via self serve under MINUTES delivery option owing to
            quick delivery times, except if cancellation/refund is requested via
            CX Agent under the following circumstances:
          </p>

          <ul className="list-disc ml-6">
            <li>The Order could not be delivered within the estimated time that was displayed while placing the order;</li>
            <li>The Order has not been picked by the Delivery Partner;</li>
            <li>The Seller has not accepted or has canceled the Order due to reasons not attributable to You.</li>
            <li>Easy Doorstep Cancellation</li>
            <li>Any other reason that the Platform may update from time to time</li>
          </ul>

          <p>
            We reserve the right to cancel your order, in whole or in part, for
            reasons including product unavailability, unforeseen circumstances
            beyond our control (force majeure), suspected fraudulent activity,
            violation of our Terms of Use, or logistical constraints.
          </p>

          <p>
            Any payments you have already made will be promptly refunded within
            5-7 business days for any cancellations. You can track the status of
            your refund on the Order Details page/section.
          </p>
        </section>

        <Separator />

        {/* RETURNS POLICY */}
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Returns Policy
          </h2>

          <p>
            Returns is a scheme provided by respective sellers directly under
            this policy in terms of which the option of exchange, replacement
            and/or refund is offered by the respective sellers to you.
          </p>

          <p>
            The return policy is divided into three parts; Do read all sections
            carefully to understand the conditions and cases under which returns
            will be accepted.
          </p>
        </section>

        <Separator />

        {/* PART 1 */}
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Part 1 – Category, Return Window and Actions possible
          </h2>

          <p>
            The policy provided on the product page shall prevail over the
            general returns policy.
          </p>
        </section>

        <Separator />

        {/* PART 2 */}
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Part 2 – Returns Pick-Up and Processing
          </h2>

          <p>
            During pick-up, your product will be checked for correct product,
            complete product, unused product, undamaged product and undamaged
            packaging.
          </p>

          <p>
            The field executive will refuse to accept the return if any of the
            conditions are not met.
          </p>
        </section>

        <Separator />

        {/* PART 3 */}
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Part 3 – General Rules for a Successful Return
          </h2>

          <ul className="list-disc ml-6">
            <li>Only one replacement shall be provided.</li>
            <li>Refunds are processed after the product is received by seller.</li>
            <li>Open box delivery rules apply.</li>
            <li>Authorized personnel may inspect products.</li>
            <li>Flipkart holds the right to restrict the number of returns.</li>
          </ul>
        </section>

        <Separator />

        {/* FINAL NOTES */}
        <section className="space-y-4">
          <p>
            Returns for damaged and wrong delivery of products may be accepted
            on case basis within 5 days of delivery.
          </p>

          <p>
            Prescription medicines returns may be accepted only for damaged,
            wrong or expired products.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CancellationAndReturns;
