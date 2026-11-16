import {
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Mail,
  Sparkles,
} from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/location/CallButton";
import { StoreHours } from "@/components/location/StoreHours";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

/** Facts people scan for before they read a word of the posting. */
const facts = [
  { icon: CalendarClock, label: "Hours", value: job.hoursPerWeek },
  { icon: ClipboardList, label: "Job type", value: job.employmentType },
  { icon: BadgeCheck, label: "Age requirement", value: `${job.minimumAge}+` },
  {
    icon: Sparkles,
    label: "Starting pay",
    value: job.pay.display,
    note: job.pay.note,
  },
];

const applyHref = business.email
  ? `mailto:${business.email}?subject=${encodeURIComponent(job.applySubject)}`
  : null;

function ListPanel({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden
              className="bg-pulse-cyan/70 mt-2 size-1.5 shrink-0 rounded-full"
            />
            <span className="text-fog-300 text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
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
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {job.open && applyHref && (
            <a href={applyHref} className="btn btn-primary h-12 px-6 text-base">
              <Mail className="size-4" aria-hidden />
              Apply by Email
            </a>
          )}
          <CallButton
            variant="secondary"
            size="lg"
            showNumber
            location="careers_header"
          />
        </div>
      </PageHeader>

      {job.open ? (
        <>
          <section className="container-vp pb-14">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(({ icon: Icon, label, value, note }) => (
                <div key={label} className="panel panel-lit p-5">
                  <span
                    aria-hidden
                    className="border-pulse-cyan/25 bg-pulse-cyan/10 text-pulse-cyan grid size-10 place-items-center rounded-xl border"
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <p className="text-fog-500 mt-4 text-xs uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-fog-100 mt-1 text-sm font-semibold">
                    {value}
                  </p>
                  {note && <p className="text-fog-500 mt-0.5 text-xs">{note}</p>}
                </div>
              ))}
            </div>
          </section>

          <section className="container-vp pb-14">
            <div className="panel p-6 sm:p-8">
              <SectionHeading
                eyebrow="The role"
                title="Looking for a Flexible, Fun Job?"
                as="h2"
              />
              <div className="mt-5 space-y-4">
                {job.intro.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-fog-300 max-w-3xl text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="text-neon-cyan mt-6 text-sm font-semibold">
                College students and seasonal applicants are encouraged to
                apply!
              </p>
            </div>
          </section>

          <section className="container-vp pb-14">
            <div className="grid gap-5 lg:grid-cols-2">
              <ListPanel
                title="What You'll Do"
                items={job.responsibilities}
                className="panel p-6 sm:p-8"
              />
              <ListPanel
                title="Who We're Looking For"
                items={job.requirements}
                className="panel p-6 sm:p-8"
              />
            </div>
          </section>

          <section className="container-vp pb-14">
            <ListPanel
              title="Why Work With Us?"
              items={job.benefits}
              className="panel panel-lit p-6 sm:p-8"
            />
          </section>

          <section className="container-vp pb-20">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="panel panel-lit flex flex-col p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Interested?"
                  title="Apply Today"
                  description={job.applyAsk}
                  as="h2"
                />
                {business.email && (
                  <p className="text-fog-400 mt-5 text-sm">
                    Email your resume to{" "}
                    <a
                      href={`mailto:${business.email}`}
                      className="text-pulse-cyan font-semibold underline underline-offset-2"
                    >
                      {business.email}
                    </a>
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
                <p className="text-fog-500 mt-6 text-sm leading-relaxed">
                  You can also come in and introduce yourself — we are at{" "}
                  {business.address.street}, {business.address.cityLine}.
                </p>
              </div>

              <div className="panel p-6 sm:p-8">
                <h2 className="font-display text-fog-50 text-xl uppercase tracking-wide">
                  Store Hours
                </h2>
                <p className="text-fog-500 mt-1 text-xs">Central Time</p>
                <StoreHours className="mt-4" />
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="container-vp pb-20">
          <div className="panel panel-lit p-6 sm:p-8">
            <p className="text-fog-300 text-base leading-relaxed">
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
          </div>
        </section>
      )}
    </>
  );
}
