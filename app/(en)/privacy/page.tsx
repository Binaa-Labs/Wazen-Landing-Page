import type { Metadata } from "next";

import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Wazen",
  description:
    "How Wazen collects, uses, stores, and protects coach and client data.",
  alternates: {
    canonical: "https://wazen.fit/privacy",
  },
};

const email = (
  <a href="mailto:admin@binaalabs.com" className="text-primary underline">
    admin@binaalabs.com
  </a>
);

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="June 2026">
      <LegalSection title="1. Introduction">
        <p>
          This Privacy Policy explains how Binaa Lab collects, uses, stores, and
          protects information when you use the Wazen platform. We are committed
          to protecting your privacy and handling data responsibly.
        </p>
      </LegalSection>

      <LegalSection title="2. Who This Policy Applies To">
        <p>
          This policy applies to Coaches who register and use the Wazen coach
          dashboard, and to Clients who access the Wazen client application by
          invitation from a Coach.
        </p>
      </LegalSection>

      <LegalSection title="3. Information We Collect">
        <p className="font-medium text-ink">At account creation:</p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>Email address</li>
          <li>First and last name</li>
          <li>Password (stored as a secure hash, never in plain text)</li>
          <li>Date of birth (used to verify minimum age requirement)</li>
          <li>Profile picture (optional)</li>
        </ul>

        <p className="font-medium text-ink">
          Additional information Coaches may provide after signup:
        </p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>Gender, phone number, professional title and specialization</li>
          <li>Bio, tagline, years of experience, certifications</li>
          <li>Public profile links (website, LinkedIn, Instagram)</li>
          <li>Branding assets (logo and brand colors)</li>
        </ul>

        <p className="font-medium text-ink">
          Additional information Clients may provide after signup:
        </p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>Date of birth, gender, phone number</li>
          <li>Health goal, current weight, height, allergies</li>
        </ul>

        <p className="font-medium text-ink">
          Health and wellness data created during use:
        </p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>
            Body weight history and body composition metrics (body fat
            percentage, fasting glucose, and other measurements)
          </li>
          <li>Nutrition plans and daily caloric and macro targets</li>
          <li>Workout plans and schedules</li>
          <li>Medication and supplement tracking</li>
          <li>Check-in responses and progress measurements</li>
          <li>Adherence and compliance data</li>
          <li>Wellness indicators such as energy levels and sleep quality</li>
        </ul>

        <p>
          <span className="font-medium text-ink">Usage data:</span> features
          accessed, pages viewed, actions taken within the Platform.
        </p>
        <p>
          <span className="font-medium text-ink">Payment information:</span>{" "}
          processed by a third-party payment processor. We store billing plan and
          history only. We do not store payment card numbers.
        </p>
        <p>
          <span className="font-medium text-ink">Communications:</span> messages
          exchanged between Coaches and Clients through the Platform are stored to
          provide the messaging feature.
        </p>
      </LegalSection>

      <LegalSection title="4. How We Use Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>provide, operate, and maintain the Platform;</li>
          <li>process subscription payments and billing;</li>
          <li>
            send transactional notifications including billing alerts, account
            warnings, and check-in reminders;
          </li>
          <li>provide customer support;</li>
          <li>improve and develop the Platform;</li>
          <li>comply with legal obligations.</li>
        </ul>
        <p>
          We do not use client health or wellness data for advertising,
          profiling, or any purpose beyond operating the Platform.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Ownership and Control">
        <p>
          Coaches own their client data. Binaa Lab processes it as a data
          processor on the Coach’s behalf. Coaches are data controllers and are
          responsible for ensuring they have obtained appropriate consent from
          their clients to collect and store health data through the Platform.
        </p>
        <p>
          Clients may request access to their data from their Coach. Clients
          wishing to request deletion of their data may contact their Coach or
          reach us directly at {email}.
        </p>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <p>
          Active client data is retained for the duration of the coaching
          relationship. After a client is deactivated, their data remains
          available for export for a limited window: 15 days on Starter, 45 days
          on Professional, and 90 days on Premium. After this window closes, data
          is permanently and irreversibly deleted; it cannot be recovered by
          anyone, including our support team. Account data is permanently deleted
          within 30 days of an account deletion request.
        </p>
      </LegalSection>

      <LegalSection title="7. Data Security">
        <p>
          We protect data using TLS encryption in transit and encryption at
          rest. Access to production data is restricted to authorized personnel
          only, and we conduct regular security reviews. If you believe your
          account has been compromised, contact us immediately at {email}.
        </p>
      </LegalSection>

      <LegalSection title="8. Data Sharing">
        <p>
          We do not sell your personal data or client health data. We may share
          data with:
        </p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>
            service providers who help us operate the Platform, under strict data
            processing agreements;
          </li>
          <li>
            legal authorities when required by applicable law or valid legal
            process;
          </li>
          <li>
            successor entities in the event of a merger, acquisition, or sale of
            assets, with appropriate notification to users.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="9. International Data Transfers">
        <p>
          Binaa Lab is based in the United Arab Emirates. If you access the
          Platform from outside the UAE, your data may be transferred to and
          processed in the UAE. We take appropriate measures to ensure such
          transfers comply with applicable data protection laws.
        </p>
      </LegalSection>

      <LegalSection title="10. Cookies">
        <p>
          The Platform uses essential cookies necessary for it to function,
          including session management and authentication. We do not use
          advertising or tracking cookies. You can control cookie settings
          through your browser, though disabling essential cookies may affect
          Platform functionality.
        </p>
      </LegalSection>

      <LegalSection title="11. Age and Minors">
        <p>
          The Platform is not intended for individuals under the age of 13. A
          date of birth is collected at signup to verify this minimum age.
          Coaches are responsible for obtaining verifiable parental or guardian
          consent before inviting any client aged 13 to 17. If Wazen is notified
          or becomes aware that a user under the age of 13 is using the Platform,
          we will remove their account and delete their data promptly. To report
          a concern, contact {email}.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you
          of material changes by email or through the Platform.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <p>For privacy-related questions, requests, or concerns:</p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>
            <span className="font-medium text-ink">Email:</span> {email}
          </li>
          <li>
            <span className="font-medium text-ink">Company:</span> Binaa Lab
          </li>
          <li>
            <span className="font-medium text-ink">Location:</span> United Arab
            Emirates
          </li>
        </ul>
      </LegalSection>
    </LegalPageLayout>
  );
}
