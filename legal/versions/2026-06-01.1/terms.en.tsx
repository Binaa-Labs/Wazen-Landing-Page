import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";

const email = (
  <a href="mailto:admin@binaalabs.com" className="text-primary underline">
    admin@binaalabs.com
  </a>
);

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="June 1, 2026"
      version="2026-06-01.1"
    >
      <LegalSection title="1. Agreement to Terms">
        <p>
          These Terms of Service (“Terms”) govern your access to and use of the
          Wazen platform (“the Platform”), operated by Binaa Lab, a software
          studio registered in the United Arab Emirates. By creating an account
          or using the Platform, you agree to be bound by these Terms. If you do
          not agree, do not use the Platform. If you are using Wazen on behalf
          of a business or organization, you represent that you have authority
          to bind that entity to these Terms.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of Service">
        <p>
          Wazen is a business-to-business platform designed for coaches,
          nutritionists, and wellness practitioners (“Coaches”) to manage their
          clients, deliver workout and nutrition plans, run structured
          check-ins, track progress, and communicate, all from one organized
          system. Coaches may invite their clients (“Clients”) to access a
          companion client application at no cost to Clients. Coaches may
          register directly through the Platform. Clients may only join Wazen by
          invitation from a registered Coach; there is no public signup for
          Clients.
        </p>
      </LegalSection>

      <LegalSection title="3. Accounts">
        <ul className="list-disc space-y-1.5 ps-5">
          <li>
            <span className="font-medium text-ink">Coach accounts:</span>{" "}
            Coaches register directly on the Platform and are responsible for
            maintaining the security of their account credentials and for all
            activity that occurs under their account.
          </li>
          <li>
            <span className="font-medium text-ink">Client accounts:</span>{" "}
            Clients may only join Wazen by invitation from a registered Coach. By
            accepting an invitation and creating an account, Clients agree to
            these Terms with respect to their use of the client application.
          </li>
          <li>
            <span className="font-medium text-ink">Account accuracy:</span> You
            agree to provide accurate and complete information when creating your
            account, including your date of birth, and to keep it updated.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Age Requirements">
        <p>
          The Platform is not intended for and may not be used by individuals
          under the age of 13. A date of birth is collected and verified at
          signup to confirm this minimum age. Providing a false date of birth to
          circumvent this requirement is a violation of these Terms.
        </p>
        <p>
          Coaches who invite clients between the ages of 13 and 17 are solely
          responsible for obtaining verifiable parental or guardian consent
          prior to sending the invitation. By sending an invitation to a minor,
          the Coach represents and warrants that such consent has been obtained.
          Wazen does not independently verify client ages beyond the date of
          birth provided at signup, and the invite-only model means clients may
          only access the Platform through a Coach’s deliberate invitation. The
          Coach assumes full responsibility for ensuring invited clients meet the
          age requirements set out in these Terms.
        </p>
        <p>
          If Wazen is notified or becomes aware that a user under the age of 13
          is using the Platform, we will take prompt action to remove that
          user’s account and delete their data. To report a concern, contact{" "}
          {email}.
        </p>
      </LegalSection>

      <LegalSection title="5. Subscription Plans and Billing">
        <p>Wazen offers three subscription tiers:</p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>
            <span className="font-medium text-ink">Starter:</span> Free, up to 5
            active clients, full core platform access.
          </li>
          <li>
            <span className="font-medium text-ink">Professional:</span>{" "}
            $49/month or $490/year, up to 20 active clients (up to 30 with add-on
            bundles).
          </li>
          <li>
            <span className="font-medium text-ink">Premium:</span> $99/month or
            $990/year, up to 50 active clients (up to 100 with add-on
            bundles).
          </li>
        </ul>
        <p>
          Yearly billing is equivalent to ten months for twelve, two months
          free. No refunds are issued for unused time on monthly plans or for
          unused months on yearly plans.
        </p>
        <p>
          Extra client bundles are available on Professional and Premium plans.
          Bundles are billed separately from the base plan and renew on their own
          billing schedule. Starter plans cannot purchase bundles.
        </p>
        <p>
          Paid plans renew automatically at the end of each billing cycle. You
          authorize us to charge your payment method on file for renewal fees
          unless you cancel before the renewal date. We will give at least 30
          days’ notice before any price change takes effect.
        </p>
      </LegalSection>

      <LegalSection title="6. Active Client Slots">
        <p>
          Wazen uses a slot-based model. Each plan includes a fixed number of
          active client slots. A client occupies a slot from the moment they are
          activated until they are deactivated.
        </p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>
            <span className="font-medium text-ink">Manual deactivation:</span>{" "}
            Coaches may manually deactivate a client at any time. Deactivation
            frees the slot immediately. The same client may not be deactivated
            and reactivated more than once within a 30-day window. Coaches who
            need to reactivate a client within this restriction period must
            contact support.
          </li>
          <li>
            <span className="font-medium text-ink">Paused clients:</span> Pausing
            a client’s plan does not free their slot. A paused client remains an
            active client for billing and slot purposes.
          </li>
          <li>
            <span className="font-medium text-ink">
              Client limits on downgrade:
            </span>{" "}
            If your active client count exceeds your new plan limit following a
            downgrade, you will be required to select which clients to retain.
            Clients above the limit will be deactivated.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Data Retention and Deletion">
        <p>
          While a client is active, full historical data is accessible
          regardless of plan tier. After a client is deactivated, a data export
          window begins during which the Coach may export the client’s data.
          After this window expires, data is permanently and irreversibly
          deleted and cannot be recovered by anyone, including the Wazen support
          team.
        </p>
        <p className="font-medium text-ink">Export windows by plan:</p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>Starter: 15 days after deactivation</li>
          <li>Professional: 45 days after deactivation</li>
          <li>Premium: 90 days after deactivation</li>
        </ul>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>
            <span className="font-medium text-ink">Downgrade impact:</span> If
            you downgrade to a lower plan tier, deactivated clients’ export
            windows are governed by the new plan’s rules from the date of
            downgrade.
          </li>
          <li>
            <span className="font-medium text-ink">Reactivation:</span>{" "}
            Reactivating a deactivated client before their export window expires
            resets the deletion clock. A new export window only begins if the
            client is deactivated again.
          </li>
          <li>
            <span className="font-medium text-ink">Cancellation:</span> Upon
            cancellation, your account moves to the Starter tier at the end of
            your billing cycle. Clients above the Starter limit are deactivated
            and subject to a 15-day export window. Permanently deleted data
            cannot be recovered under any circumstances.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Payment Failures">
        <p>
          If a payment fails on renewal, you will be notified immediately and a
          3-day grace period begins during which full access continues
          unchanged.
        </p>
        <p>
          If the payment remains unresolved after 3 days, your account enters
          restricted mode for up to 7 additional days (days 4–10 from the
          original failure). During restricted mode:
        </p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>you can log in and view everything in read-only mode;</li>
          <li>you cannot invite new clients or assign new plans or check-ins;</li>
          <li>existing clients retain full access to their app.</li>
        </ul>
        <p>
          If the payment remains unresolved after 10 days total, your account
          reverts to the Starter tier. Clients above the Starter limit are
          deactivated and subject to Starter data export rules. Full access is
          restored immediately upon successful payment resolution.
        </p>
      </LegalSection>

      <LegalSection title="9. Cancellation">
        <p>
          You may cancel your subscription at any time from your account
          settings. Cancellation takes effect at the end of your current billing
          cycle. Fees already paid are non-refundable. Upon cancellation, your
          account moves to the Starter tier rather than being deleted. You retain
          access to up to 5 active clients under Starter limitations. You may
          resubscribe at any time.
        </p>
      </LegalSection>

      <LegalSection title="10. Client Data and Ownership">
        <p>
          Coaches own all client data they upload, create, or manage through the
          Platform. Binaa Lab does not claim ownership over client data.
        </p>
        <p>
          Binaa Lab acts as a data processor, processing client data on the
          Coach’s behalf. Coaches are data controllers and are responsible for
          ensuring they have obtained appropriate consent from their clients to
          collect, store, and process their health and personal information
          through Wazen.
        </p>
        <p>
          All data is encrypted in transit and at rest. We do not sell, share,
          or disclose client health data to third parties except as required by
          law or as strictly necessary to operate the Platform.
        </p>
      </LegalSection>

      <LegalSection title="11. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1.5 ps-5">
          <li>use Wazen for any unlawful purpose;</li>
          <li>upload content that violates any third-party rights;</li>
          <li>
            attempt to gain unauthorized access to the Platform or other
            accounts;
          </li>
          <li>store or share content that is harmful, abusive, or illegal;</li>
          <li>
            resell or sublicense access to the Platform without authorization.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="12. Intellectual Property">
        <p>
          The Wazen Platform, including all software, designs, and content
          created by Binaa Lab, is owned by Binaa Lab and protected by
          applicable intellectual property laws. These Terms do not grant you any
          ownership interest in the Platform.
        </p>
      </LegalSection>

      <LegalSection title="13. Disclaimers">
        <p>
          The Platform is provided “as is” and “as available” without warranties
          of any kind, express or implied. We do not warrant that the Platform
          will be uninterrupted, error-free, or free of security
          vulnerabilities. Wazen is a practice management tool and does not
          provide medical, nutritional, or health advice.
        </p>
      </LegalSection>

      <LegalSection title="14. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, Binaa Lab shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of or related to your use of the
          Platform. Our total liability shall not exceed the total fees you paid
          to us in the 12 months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection title="15. Governing Law">
        <p>
          These Terms are governed by the laws of the United Arab Emirates. Any
          disputes arising from these Terms shall be subject to the jurisdiction
          of the courts of the UAE. We respect mandatory consumer protection laws
          that may apply in your jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="16. Changes to Terms">
        <p>
          We may update these Terms from time to time. We will provide at least
          30 days’ notice of material changes by email or through the Platform.
          Continued use of Wazen after changes take effect constitutes acceptance
          of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection title="17. Contact">
        <p>For questions about these Terms, contact us at: {email}</p>
        <p className="text-ink/60">Binaa Lab | United Arab Emirates</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
