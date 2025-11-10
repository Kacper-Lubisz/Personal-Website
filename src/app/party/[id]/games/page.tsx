import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import { GameController, Clock } from "@phosphor-icons/react/dist/ssr";
import OverrideTitle from "@/components/OverrideTitle";
import PreserveParamsLink from "@/components/PreserveParamsLink";

interface Game {
  name: string;
  description: string;
}

interface Party {
  id: string;
  title: string;
  date: string;
  releaseDate: string;
  games: Game[];
}

export async function generateStaticParams() {
  return partiesData.parties.map((party) => ({
    id: party.id,
  }));
}

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function isContentAvailable(releaseDate: string, override?: string): boolean {
  if (override === "true") return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const release = new Date(releaseDate);
  release.setHours(0, 0, 0, 0);

  return today >= release;
}

export default async function GamesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { override } = await searchParams;

  const party = partiesData.parties.find((p) => p.id === id);

  if (!party) {
    notFound();
  }

  const isAvailable = isContentAvailable(
    party.releaseDate,
    override as string | undefined
  );

  if (!isAvailable) {
    return (
      <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8">
        <div className="w-full md:max-w-2xl">
          <div className="flex flex-col p-8 md:p-12">
            <header className="text-center mb-8 border-b-2 border-current pb-6">
              <OverrideTitle className="flex items-center justify-center gap-3 mb-2">
                <GameController size={40} weight="regular" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  {party.title}
                </h1>
              </OverrideTitle>
              <p className="text-lg md:text-xl opacity-70">{party.date}</p>
              <p className="text-base mt-2 uppercase tracking-wider opacity-60">
                Party Games
              </p>
            </header>

            <div className="text-center space-y-6">
              <div className="border-2 border-current p-12">
                <Clock size={64} weight="regular" className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Not Available Yet</h2>
                <p className="text-lg opacity-70 mb-6">
                  The games will be revealed on{" "}
                  {new Date(party.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <PreserveParamsLink
                  href={`/party/${id}`}
                  className="inline-block py-3 px-8 border border-current hover:opacity-60 transition-opacity"
                >
                  Back to Party
                </PreserveParamsLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8 print:p-0 print:block print:min-h-screen">
      <div className="w-full md:max-w-2xl md:shadow-2xl print:shadow-none print:max-w-none md:aspect-[1/1.414] print:min-h-screen">
        <div className="flex flex-col p-8 md:p-12 md:h-full md:overflow-y-auto print:overflow-visible print:min-h-screen">
          <header className="text-center mb-8 border-b-2 border-current pb-6">
            <OverrideTitle className="flex items-center justify-center gap-3 mb-2">
              <GameController size={40} weight="regular" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {party.title}
              </h1>
            </OverrideTitle>
            <p className="text-lg md:text-xl opacity-70">{party.date}</p>
            <p className="text-base mt-2 uppercase tracking-wider opacity-60">
              Party Games
            </p>
          </header>

          <div className="md:flex-1 print:flex-1 space-y-8">
            {party.games.map((game, index) => (
              <div key={index} className="border-2 border-current p-6 space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold">{game.name}</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  {game.description}
                </p>
              </div>
            ))}
          </div>

          <footer className="mt-8 pt-6 border-t border-current text-center space-y-4">
            <div className="print:hidden">
              <PreserveParamsLink
                href={`/party/${id}`}
                className="inline-block py-2 px-6 border border-current hover:opacity-60 transition-opacity"
              >
                Back to Party
              </PreserveParamsLink>
            </div>
            <p className="text-sm opacity-50">Let the games begin!</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
