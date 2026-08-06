import Header from "@/components/Header";
import Footer from "@/components/Footer";
import services from "@/content/services.json";

export const metadata = { title: "Services — Shubha Singh" };

export default function ServicesPage() {
  return (
    <main>
      <Header />

      <section className="px-6 pb-14 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink md:text-5xl">
            {services.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-inkdim">{services.intro}</p>
        </div>
      </section>

      <div className="bg-band">
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="space-y-6">
            {services.services.map((service) => (
              <div
                key={service.id}
                className="rounded-card border border-line bg-paper p-8"
              >
                <h2 className="text-xl font-bold text-ink md:text-2xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-inkdim">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
