import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import {
  ForkKnife,
  Clock,
  Wine,
  Camera,
  CalendarBlank,
  CakeIcon,
  DressIcon,
  GameController,
} from "@phosphor-icons/react/dist/ssr";
import OverrideTitle from "@/components/OverrideTitle";
import PreserveParamsLink from "@/components/PreserveParamsLink";

interface Party {
  id: string;
  title: string;
  date: string;
  releaseDate: string;
  photoAlbumUrl: string;
  dressCode: string;
  welcomeMessage: string;
}

export async function generateStaticParams() {
  return partiesData.parties.map((party) => ({
    id: party.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const party = partiesData.parties.find((p) => p.id === id);

  if (!party) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const formattedDate = new Date(party.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    title: party.title,
    description: party.welcomeMessage,
    openGraph: {
      title: party.title,
      description: `Join us for ${party.title} on ${formattedDate}. ${party.dressCode} dress code.`,
      type: "website",
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

function isContentAvailable(releaseDate: string, override?: string): boolean {
  if (override === "true") return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const release = new Date(releaseDate);
  release.setHours(0, 0, 0, 0);

  return today >= release;
}

export default async function PartyMainPage({
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

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="w-full max-w-4xl">
        <header className="text-center mb-12 border-b-2 border-current pb-8">
          <OverrideTitle className="flex items-center justify-center gap-3 mb-4">
            <CakeIcon size={48} weight="regular" />
            <h1 className="text-5xl md:text-6xl font-bold">{party.title}</h1>
          </OverrideTitle>
          <p className="text-xl md:text-2xl opacity-70">{party.date}</p>
        </header>

        <div className="space-y-8">
          {/* Welcome Message and Dress Code */}
          <div className="border-2 border-current p-8 space-y-6">
            <div className="text-center">
              <p className="text-lg leading-relaxed">{party.welcomeMessage}</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-current">
              <DressIcon size={32} weight="regular" />
              <div>
                <p className="text-sm uppercase tracking-wider opacity-60">
                  Dress Code
                </p>
                <p className="text-xl font-bold">{party.dressCode}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Schedule - Full Width */}
            <PreserveParamsLink
              href={`/party/${party.id}/schedule`}
              className="border-2 border-current p-8 hover:opacity-60 transition-opacity group md:col-span-2"
            >
              <Clock
                size={48}
                weight="regular"
                className="mb-4 group-hover:scale-110 transition-transform"
              />
              <h2 className="text-3xl font-bold mb-2">Schedule</h2>
              <p className="text-lg opacity-70">
                See what&apos;s happening when
              </p>
            </PreserveParamsLink>

            {/* Food Menu */}
            {isAvailable ? (
              <PreserveParamsLink
                href={`/party/${party.id}/menu`}
                className="border-2 border-current p-8 hover:opacity-60 transition-opacity group"
              >
                <ForkKnife
                  size={48}
                  weight="regular"
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h2 className="text-3xl font-bold mb-2">Food Menu</h2>
                <p className="text-lg opacity-70">
                  View tonight&apos;s culinary journey
                </p>
              </PreserveParamsLink>
            ) : (
              <div className="border-2 border-current border-dashed p-8 opacity-40">
                <ForkKnife size={48} weight="regular" className="mb-4" />
                <h2 className="text-3xl font-bold mb-2">Food Menu</h2>
                <p className="text-lg opacity-70">Coming soon</p>
              </div>
            )}

            {/* Drinks Menu */}
            {isAvailable ? (
              <PreserveParamsLink
                href={`/party/${party.id}/drinks`}
                className="border-2 border-current p-8 hover:opacity-60 transition-opacity group"
              >
                <Wine
                  size={48}
                  weight="regular"
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h2 className="text-3xl font-bold mb-2">Drinks Menu</h2>
                <p className="text-lg opacity-70">
                  Explore our beverage selection
                </p>
              </PreserveParamsLink>
            ) : (
              <div className="border-2 border-current border-dashed p-8 opacity-40">
                <Wine size={48} weight="regular" className="mb-4" />
                <h2 className="text-3xl font-bold mb-2">Drinks Menu</h2>
                <p className="text-lg opacity-70">Coming soon</p>
              </div>
            )}

            {/* Party Games */}
            {isAvailable ? (
              <PreserveParamsLink
                href={`/party/${party.id}/games`}
                className="border-2 border-current p-8 hover:opacity-60 transition-opacity group"
              >
                <GameController
                  size={48}
                  weight="regular"
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h2 className="text-3xl font-bold mb-2">Party Games</h2>
                <p className="text-lg opacity-70">
                  Discover tonight&apos;s entertainment
                </p>
              </PreserveParamsLink>
            ) : (
              <div className="border-2 border-current border-dashed p-8 opacity-40">
                <GameController size={48} weight="regular" className="mb-4" />
                <h2 className="text-3xl font-bold mb-2">Party Games</h2>
                <p className="text-lg opacity-70">Coming soon</p>
              </div>
            )}

            {/* Photo Album */}
            {party.photoAlbumUrl ? (
              <a
                href={party.photoAlbumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-current p-8 hover:opacity-60 transition-opacity group"
              >
                <Camera
                  size={48}
                  weight="regular"
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h2 className="text-3xl font-bold mb-2">Photo Album</h2>
                <p className="text-lg opacity-70">
                  Share your memories from tonight
                </p>
              </a>
            ) : (
              <div className="border-2 border-current border-dashed p-8 opacity-40">
                <Camera size={48} weight="regular" className="mb-4" />
                <h2 className="text-3xl font-bold mb-2">Photo Album</h2>
                <p className="text-lg opacity-70">Coming soon</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
