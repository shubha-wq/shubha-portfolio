import Header from "@/components/Header";
import Footer from "@/components/Footer";
import resume from "@/content/resume.json";

export const metadata = { title: "Resume — Shubha Singh" };

export default function ResumePage() {
  const hasPdf = Boolean(resume.pdfUrl);

  return (
    <main>
      <Header />

      <section className="px-6 pb-10 pt-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-extrabold text-ink md:text-5xl">
              Resume
            </h1>
            {hasPdf ? (
              <a
                href={resume.pdfUrl}
                download
                className="rounded-pill bg-ink px-6 py-2.5 text-sm font-medium text-paper transition hover:bg-band hover:text-ink"
              >
                Download PDF
              </a>
            ) : (
              <span className="rounded-pill border border-line px-6 py-2.5 text-sm font-medium text-inkdim">
                Download PDF (coming soon)
              </span>
            )}
          </div>
          <p className="mt-3 text-inkdim">
            {resume.contact.email} · {resume.contact.phone}
          </p>
        </div>
      </section>

      <section className="px-6 pb-10 md:px-10">
        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-inkdim">
              Professional Experience
            </h2>
            <div className="space-y-8">
              {resume.experience.map((job) => (
                <div key={job.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-ink">
                      {job.company}
                    </h3>
                    <span className="text-sm text-inkdim">{job.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-inkdim">{job.role}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="text-[15px] leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-inkdim">
              Education
            </h2>
            {resume.education.map((edu) => (
              <div key={edu.degree}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-ink">{edu.degree}</h3>
                  <span className="text-sm text-inkdim">{edu.duration}</span>
                </div>
                <p className="text-sm font-medium text-inkdim">
                  {edu.institution}
                </p>
                <p className="mt-2 text-[15px] text-ink">{edu.detail}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-inkdim">
              Certifications
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-ink">
              {resume.certifications.map((c, i) => (
                <li key={i} className="text-[15px] leading-relaxed">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-inkdim">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-pill border border-line px-3 py-1 text-sm text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-inkdim">
                Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-pill border border-line px-3 py-1 text-sm text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
