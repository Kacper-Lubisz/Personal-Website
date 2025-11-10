import Link from "next/link";
import partiesData from "@/data/menus.json";

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
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Dinner Parties</h1>
          <p className="text-lg opacity-70">
            Select a party to view menu or schedule
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {partiesData.parties.map((party) => (
            <div
              key={party.id}
              className="border-2 border-current p-8 space-y-4"
            >
              <h2 className="text-3xl font-bold mb-2">{party.title}</h2>
              <p className="text-lg opacity-70 mb-4">{party.date}</p>
              <div className="flex gap-4">
                <Link
                  href={`/party/${party.id}/menu`}
                  className="flex-1 text-center py-2 px-4 border border-current hover:opacity-60 transition-opacity"
                >
                  Menu
                </Link>
                <Link
                  href={`/party/${party.id}/schedule`}
                  className="flex-1 text-center py-2 px-4 border border-current hover:opacity-60 transition-opacity"
                >
                  Schedule
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/party/toilet"
            className="inline-block py-3 px-8 border-2 border-current hover:opacity-60 transition-opacity text-xl"
          >
            Toilet Sign
          </Link>
        </div>
      </main>
    </div>
  );
}
