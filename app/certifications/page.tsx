import Header from "@/components/Header";
import Footer from "@/components/Footer";
import certifications from "@/content/certifications.json";

export const metadata = { title: "Certifications — Shubha Singh" };

export default function CertificationsPage() {
  return (
    <main>
      <Header />

      <section className="px-6 pb-14 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink md:text-5xl">
            {certifications.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-inkdim">
            {certifications.intro}
          </p>
        </div>
      </section>

      <div className="bg-band">
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="space-y-6">
            {certifications.items.map((item) => {
              const isPlaceholder = item.url === "#";
              const Wrapper = isPlaceholder ? "div" : "a";
              const wrapperProps = isPlaceholder
                ? {}
                : { href: item.url, target: "_blank", rel: "noopener noreferrer" };
              return (
                <Wrapper
                  key={item.id}
                  {...(wrapperProps as any)}
                  className="block rounded-card border border-line bg-paper p-8 transition hover:border-ink"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                    {item.issuer}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-ink md:text-2xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-inkdim">{item.description}</p>
                </Wrapper>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
