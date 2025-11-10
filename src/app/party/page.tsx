import Link from "next/link";
import partiesData from "@/data/menus.json";
import {
  CalendarBlank,
  BellIcon,
  ToiletIcon,
} from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Party",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="w-full max-w-3xl">
        <header className="text-center mb-12 border-b-2 border-current pb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <CalendarBlank size={56} weight="regular" />
            <h1 className="text-5xl md:text-6xl font-bold">Dinner Parties</h1>
          </div>
          <p className="text-lg md:text-xl opacity-70">
            Select a party to view details
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-1 mb-12">
          {partiesData.parties.map((party) => (
            <Link
              key={party.id}
              href={`/party/${party.id}`}
              className="border-2 border-current p-8 hover:opacity-60 transition-opacity group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-105 transition-transform origin-left">
                    {party.title}
                  </h2>
                  <p className="text-lg md:text-xl opacity-70">{party.date}</p>
                </div>
                <BellIcon
                  size={40}
                  weight="regular"
                  className="group-hover:animate-pulse"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center border-t border-current pt-8">
          <Link
            href="/party/toilet"
            className="inline-flex items-center gap-3 py-3 px-8 border-2 border-current hover:opacity-60 transition-opacity text-xl group"
          >
            <ToiletIcon
              size={32}
              weight="regular"
              className="group-hover:scale-110 transition-transform"
            />
            Toilet Sign
          </Link>
        </div>
      </main>
    </div>
  );
}
