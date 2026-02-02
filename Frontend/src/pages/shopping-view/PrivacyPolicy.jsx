import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl m-8">
      {/* TITLE */}
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last Updated: January 2026
        </p>
      </div>

      <Separator className="my-8" />

      {/* INTRO */}
      <div className="space-y-4">
        <p className="leading-7 text-muted-foreground">
          We value the trust you place in us and recognize the importance of
          secure transactions and information privacy. This Privacy Policy
          describes how <strong>UniDrobe</strong> (“we”, “our”, “us”) collects,
          uses, shares, or otherwise processes your personal data through the
          UniDrobe website and related services (collectively, the “Platform”).
        </p>

        <p className="leading-7 text-muted-foreground">
          While you can browse sections of the Platform without sharing personal
          information, certain features such as placing orders, wishlists, or
          account access may require registration. By using our Platform, you
          agree to the terms of this Privacy Policy and applicable laws of India.
        </p>
      </div>

      <Separator className="my-8" />

      {/* COLLECTION */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Collection of Information
        </h2>

        <p className="leading-7 text-muted-foreground">
          We collect personal data that you provide voluntarily while using our
          Platform, such as your name, email address, phone number, delivery
          address, and payment-related details when you create an account or
          place an order.
        </p>

        <p className="leading-7 text-muted-foreground">
          We also collect information related to your browsing behavior, product
          interactions, preferences, and usage patterns to improve user
          experience, analyze trends, and enhance our services. This information
          may be aggregated and anonymized for analytical purposes.
        </p>
      </section>

      <Separator className="my-8" />

      {/* USE OF DATA */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Use of Your Information
        </h2>

        <ul className="my-6 ml-6 list-disc text-muted-foreground ">
          <li>Process and fulfill orders</li>
          <li>Deliver products and services</li>
          <li>Process payments securely</li>
          <li>Provide customer support</li>
          <li>Improve platform functionality and performance</li>
          <li>Send service-related communications</li>
          <li>Prevent fraud and enforce platform policies</li>
        </ul>

        <p className="leading-7 text-muted-foreground">
          With your consent, we may also use your contact information to inform
          you about updates, offers, or new features related to UniDrobe.
        </p>
      </section>

      <Separator className="my-8" />

      {/* COOKIES */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Cookies
        </h2>

        <p className="leading-7 text-muted-foreground">
          We use cookies and similar technologies to understand user behavior,
          analyze traffic, and enhance the overall experience on our Platform.
          Cookies help us remember your preferences and improve site
          functionality.
        </p>

        <p className="leading-7 text-muted-foreground">
          You may choose to disable cookies through your browser settings;
          however, some features of the Platform may not function properly if
          cookies are disabled.
        </p>
      </section>

      <Separator className="my-8" />

      {/* SHARING */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Sharing of Personal Data
        </h2>

        <p className="leading-7 text-muted-foreground">
          We do not sell your personal data. We may share information with
          trusted third parties such as payment processors, delivery partners,
          or service providers strictly for fulfilling orders and improving
          services.
        </p>

        <p className="leading-7 text-muted-foreground">
          We may also disclose personal data if required by law, legal process,
          or to protect the rights, safety, and security of our users and the
          Platform.
        </p>
      </section>

      <Separator className="my-8" />

      {/* SECURITY */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Security Precautions
        </h2>

        <p className="leading-7 text-muted-foreground">
          We maintain reasonable physical, electronic, and procedural safeguards
          to protect your information. However, no method of transmission over
          the internet is completely secure, and we cannot guarantee absolute
          security.
        </p>
      </section>

      <Separator className="my-8" />

      {/* CHILDREN */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Children’s Information
        </h2>

        <p className="leading-7 text-muted-foreground">
          UniDrobe is intended for users who can form a legally binding contract
          under Indian law. We do not knowingly collect personal data from
          children under the age of 18.
        </p>
      </section>

      <Separator className="my-8" />

      {/* USER RIGHTS */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Your Rights
        </h2>

        <p className="leading-7 text-muted-foreground">
          You may access, update, or correct your personal information through
          your account settings. You may also request deletion or withdrawal of
          consent by contacting us at the email address provided below.
        </p>
      </section>

      <Separator className="my-8" />

      {/* CONTACT */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Contact Us
        </h2>

        <p className="leading-7 text-muted-foreground">
          If you have any questions, concerns, or complaints regarding this
          Privacy Policy or the use of your personal data, please contact us at:
        </p>

        <p className="font-medium">
          📧 Email:{" "}
          <span className="text-primary">
            sunnymehta.here@gmail.com
          </span>
        </p>
      </section>

      <Separator className="my-8" />

      {/* CHANGES */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Changes to This Policy
        </h2>

        <p className="leading-7 text-muted-foreground">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices. Any updates will be posted on this page with a
          revised “Last Updated” date.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
