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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-card border border-line bg-paper"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-band">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-inkdim">
                    {item.issuer}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-inkdim">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
