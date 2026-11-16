import { Mail } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { StoreHours } from "@/components/location/StoreHours";
import { PageHeader } from "@/components/ui/PageHeader";
import { business } from "@/data/business";
import { job } from "@/data/hiring";
import { breadcrumbSchema, jobPostingSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: job.open ? `Now Hiring: ${job.title}` : "Careers",
  description: job.open
    ? `${job.title} at Vapor Pulse in Irving, TX. ${job.employmentType}, ${job.pay.display}. ${job.minimumAge}+. Apply by email with your availability and resume.`
    : `Job openings at Vapor Pulse, the vape shop on N O'Connor Rd in ${business.address.city}, ${business.address.region}.`,
  path: "/careers",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers" },
];

/** The at-a-glance facts, read as a definition list rather than tiles. */
const facts: { label: string; value: string; note?: string }[] = [
  { label: "Job type", value: job.employmentType },
  { label: "Hours", value: job.hoursPerWeek },
  { label: "Location", value: `${business.address.city}, ${business.address.region}` },
  { label: "Age requirement", value: `${job.minimumAge}+` },
  { label: "Starting pay", value: job.pay.display, note: job.pay.note },
];

const applyHref = business.email
  ? `mailto:${business.email}?subject=${encodeURIComponent(job.applySubject)}`
  : null;

/** Section heading inside the posting — one rhythm the whole way down. */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-fog-50 mt-12 text-2xl uppercase tracking-wide first:mt-0">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="bg-pulse-cyan/70 mt-2 size-1.5 shrink-0 rounded-full"
          />
          <span className="text-fog-300 text-base leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {/* Only while the role is actually open. */}
      {job.open && <JsonLd data={jobPostingSchema(job)} />}

      <PageHeader
        eyebrow={job.open ? "We're hiring" : "Careers"}
        title={job.open ? job.title : "No Openings Right Now"}
        description={
          job.open
            ? job.summary
            : "Nothing is open at the moment. Check back here, or introduce yourself in store — we keep good people in mind."
        }
        breadcrumbs={crumbs}
        showWave={false}
      />

      <section className="container-vp pb-20">
        {job.open ? (
          <article className="max-w-3xl">
            <dl className="border-fog-400/15 divide-fog-400/10 divide-y border-y">
              {facts.map(({ label, value, note }) => (
                <div
                  key={label}
                  className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[11rem_1fr] sm:items-baseline"
                >
                  <dt className="text-fog-500 text-xs uppercase tracking-wider">
                    {label}
                  </dt>
                  <dd className="text-fog-100 text-sm font-semibold">
                    {value}
                    {note && (
                      <span className="text-fog-500 font-normal"> — {note}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12">
              <Heading>Looking for a Flexible, Fun Job?</Heading>
              <div className="mt-4 space-y-4">
                {job.intro.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-fog-300 text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <Heading>What You&apos;ll Do</Heading>
            <Bullets items={job.responsibilities} />

            <Heading>Who We&apos;re Looking For</Heading>
            <Bullets items={job.requirements} />
            <p className="text-neon-cyan mt-5 text-sm font-semibold">
              College students and seasonal applicants are encouraged to apply!
            </p>

            <Heading>Why Work With Us?</Heading>
            <Bullets items={job.benefits} />

            <Heading>Interested? Apply Today</Heading>
            <p className="text-fog-300 mt-4 text-base leading-relaxed">
              {job.applyAsk}
            </p>
            {business.email && (
              <p className="text-fog-300 mt-4 text-base leading-relaxed">
                Email your resume to{" "}
                <a
                  href={`mailto:${business.email}`}
                  className="text-pulse-cyan font-semibold underline underline-offset-2"
                >
                  {business.email}
                </a>
                , or come in and introduce yourself — we are at{" "}
                {business.address.street}, {business.address.cityLine}.
              </p>
            )}
            {applyHref && (
              <div className="mt-7">
                <a
                  href={applyHref}
                  className="btn btn-primary h-12 px-6 text-base"
                >
                  <Mail className="size-4" aria-hidden />
                  Apply by Email
                </a>
              </div>
            )}

            <Heading>Store Hours</Heading>
            <p className="text-fog-500 mt-1 text-xs">Central Time</p>
            <StoreHours className="mt-4" />
          </article>
        ) : (
          <p className="text-fog-300 max-w-3xl text-base leading-relaxed">
            We are not hiring at the moment. If you would still like to be
            considered, email{" "}
            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="text-pulse-cyan underline underline-offset-2"
              >
                {business.email}
              </a>
            )}{" "}
            and we will keep your note on file.
          </p>
        )}
      </section>
    </>
  );
}
