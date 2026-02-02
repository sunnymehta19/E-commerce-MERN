import { Separator } from "@/components/ui/separator";

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl m-8">
      {/* TITLE */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Shipping Policy
        </h1>
      </div>

      <Separator className="my-8" />

      <div className="space-y-8 text-muted-foreground leading-7">
        {/* SECTION 1 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Why does the delivery date not correspond to the delivery timeline of X-Y business days?
          </h2>
          <p>
            It is possible that the Seller or our delivery partners have a holiday
            between the day you placed your order and the date of delivery, which
            is based on the timelines shown on the product page. In this case, we
            add a day to the estimated date. Some delivery partners and Sellers do
            not work on Sundays and this is factored in to the delivery dates.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            What is the estimated delivery time?
          </h2>
          <p>
            Sellers generally procure and ship the items within the time
            specified on the product page. Business days exclude public holidays
            and Sundays.
          </p>
          <p>Estimated delivery time depends on the following factors:</p>
          <ul className="list-disc ml-6">
            <li>The Seller offering the product</li>
            <li>Product's availability with the Seller</li>
            <li>
              The destination to which you want the order shipped to and location
              of the Seller.
            </li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Why does the estimated delivery time vary for each seller?
          </h2>
          <p>
            You have probably noticed varying estimated delivery times for
            sellers of the product you are interested in. Delivery times are
            influenced by product availability, geographic location of the
            Seller, your shipping destination and the delivery partner's
            time-to-deliver in your location.
          </p>
          <p>
            Please enter your default pin code on the product page (you don't
            have to enter it every single time) to know more accurate delivery
            times on the product page itself.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Seller does not/cannot ship to my area. Why?
          </h2>
          <p>
            Please enter your pincode on the product page (you don't have to
            enter it every single time) to know whether the product can be
            delivered to your location.
          </p>
          <p>
            If you haven't provided your pincode until the checkout stage, the
            pincode in your shipping address will be used to check for
            serviceability.
          </p>
          <p>Whether your location can be serviced or not depends on</p>
          <ul className="list-disc ml-6">
            <li>Whether the Seller ships to your location</li>
            <li>
              Legal restrictions, if any, in shipping particular products to your
              location
            </li>
            <li>
              The availability of reliable delivery partners in your location
            </li>
          </ul>
          <p>
            At times Sellers prefer not to ship to certain locations. This is
            entirely at their discretion.
          </p>
        </div>

        {/* SECTION 5 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Why is the CoD option not offered in my location?
          </h2>
          <p>
            Availability of CoD depends on the ability of our delivery partner
            servicing your location to accept cash as payment at the time of
            delivery.
          </p>
          <p>
            Our delivery partners have limits on the cash amount payable on
            delivery depending on the destination and your order value might
            have exceeded this limit. Please enter your pin code on the product
            page to check if CoD is available in your location.
          </p>
        </div>

        {/* SECTION 6 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            I need to return an item, how do I arrange for a pick-up?
          </h2>
          <p>
            Returns are easy. Contact Us to initiate a return. You will receive a
            call explaining the process, once you have initiated a return.
          </p>
          <p>
            Wherever possible Ekart Logistics will facilitate the pick-up of the
            item. In case, the pick-up cannot be arranged through Ekart, you can
            return the item through a third-party delivery service. Return fees
            are borne by the Seller.
          </p>
        </div>

        {/* SECTION 7 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            I did not receive my order but got a delivery confirmation SMS/Email.
          </h2>
          <p>
            In case the product was not delivered and you received a delivery
            confirmation email/SMS, report the issue within 7 days from the date
            of delivery confirmation for the seller to investigate.
          </p>
        </div>

        {/* SECTION 8 */}
        <div className="space-y-4">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            What do the different tags like "In Stock", "Available" mean?
          </h2>

          <p><strong>'In Stock'</strong></p>
          <p>
            For items listed as "In Stock", Sellers will mention the delivery
            time based on your location pincode (usually 2-3 business days, 4-5
            business days or 4-6 business days in areas where standard delivery
            service is available). For other areas, orders will be sent by
            Registered Post through the Indian Postal Service which may take 1-2
            weeks depending on the location.
          </p>

          <p><strong>'Available'</strong></p>
          <p>
            The Seller might not have the item in stock but can procure it when
            an order is placed for the item. The delivery time will depend on the
            estimated procurement time and the estimated shipping time to your
            location.
          </p>

          <p><strong>'Preorder' or 'Forthcoming'</strong></p>
          <p>
            Such items are expected to be released soon and can be pre-booked
            for you. The item will be shipped to you on the day of it's official
            release launch and will reach you in 2 to 6 business days.
          </p>

          <p><strong>'Out of Stock'</strong></p>
          <p>
            Currently, the item is not available for sale. Use the 'Notify Me'
            feature to know once it is available for purchase.
          </p>

          <p><strong>'Imported'</strong></p>
          <p>
            Sometimes, items have to be sourced by Sellers from outside India.
            These items are mentioned as 'Imported' on the product page and can
            take at least 10 days or more to be delivered to you.
          </p>

          <p><strong>'Back In Stock Soon'</strong></p>
          <p>
            The item is popular and is sold out. You can however 'book' an order
            for the product and it will be shipped according to the timelines
            mentioned by the Seller.
          </p>

          <p><strong>'Temporarily Unavailable'</strong></p>
          <p>
            The product is currently out of stock and is not available for
            purchase.
          </p>

          <p><strong>'Permanently Discontinued'</strong></p>
          <p>
            This product is no longer available because it is obsolete and/or
            its production has been discontinued.
          </p>

          <p><strong>'Out of Print'</strong></p>
          <p>
            This product is not available because it is no longer being
            published and has been permanently discontinued.
          </p>
        </div>

        {/* SECTION 9 */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
            Does UniDrobe deliver internationally?
          </h2>
          <p>
            As of now, UniDrobe doesn't deliver items internationally.
          </p>
          <p>
            You will be able to make your purchases on our site from anywhere in
            the world with credit/debit cards issued in India and select other
            countries, but please ensure the delivery address is in India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
