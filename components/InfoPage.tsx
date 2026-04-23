import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

export type InfoSection = {
  heading: string;
  body: string | string[];
};

export default function InfoPage({
  title,
  intro,
  sections,
  tocTitle,
  cta,
}: {
  title: string;
  intro?: string;
  sections: InfoSection[];
  tocTitle?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <>
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <Link href="/" className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold truncate">{title}</h1>
      </header>

      <article className="bg-white mx-3 mt-3 rounded-xl p-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {intro && <p className="mt-2 text-[13px] text-gray-700 leading-relaxed">{intro}</p>}

        {tocTitle && (
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <div className="text-[12px] font-semibold text-gray-700 mb-2">{tocTitle}</div>
            <ul className="space-y-1">
              {sections.map((s, i) => (
                <li key={i} className="text-[12px] text-tt-red flex items-center gap-1">
                  <ChevronRight size={12} />
                  <a href={`#s-${i}`}>{s.heading}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 space-y-5">
          {sections.map((s, i) => (
            <section key={i} id={`s-${i}`}>
              <h3 className="text-[14px] font-bold text-gray-900 border-l-4 border-tt-red pl-2">
                {s.heading}
              </h3>
              {Array.isArray(s.body) ? (
                <ul className="mt-2 space-y-1.5 text-[13px] text-gray-700 leading-relaxed list-disc pl-5">
                  {s.body.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-[13px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {s.body}
                </p>
              )}
            </section>
          ))}
        </div>

        {cta && (
          <Link
            href={cta.href}
            className="mt-6 block bg-gradient-to-r from-tt-red to-[#ff3d5b] text-white text-center font-semibold py-3 rounded-full text-sm"
          >
            {cta.label}
          </Link>
        )}
      </article>

      <div className="text-center text-[11px] text-gray-400 py-4">
        Cập nhật lần cuối: 22/04/2026
      </div>

      <Footer />
    </>
  );
}
