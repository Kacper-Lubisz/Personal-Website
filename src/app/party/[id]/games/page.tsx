import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import {
  GameController,
  Clock,
  IdentificationCard,
} from "@phosphor-icons/react/dist/ssr";
import PreserveParamsLink from "@/components/PreserveParamsLink";
import PartyPageWrapper from "@/components/PartyPageWrapper";
import PartyPageHeader from "@/components/PartyPageHeader";
import PartyPageFooter from "@/components/PartyPageFooter";

type Game = {
  name: string;
  description: string;
  hasIdentityCards?: boolean;
};

type Party = {
  id: string;
  title: string;
  date: string;
  releaseDate: string;
  games: Game[];
};

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

function areIdentityCardsAvailable(
  releaseDate: string,
  override?: string
): boolean {
  if (override === "true") return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const release = new Date(releaseDate);
  release.setHours(0, 0, 0, 0);

  // Add one day to release date
  const dayAfterRelease = new Date(release);
  dayAfterRelease.setDate(dayAfterRelease.getDate() + 1);

  return today >= dayAfterRelease;
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

  const identityCardsAvailable = areIdentityCardsAvailable(
    party.releaseDate,
    override as string | undefined
  );

  if (!isAvailable) {
    return (
      <PartyPageWrapper partyId={id} showBackButton={false}>
        <PartyPageHeader
          partyId={id}
          title={party.title}
          date={party.date}
          subtitle="Party Games"
        />

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
      </PartyPageWrapper>
    );
  }

  return (
    <PartyPageWrapper partyId={id}>
      <PartyPageHeader
        partyId={id}
        title={party.title}
        date={party.date}
        subtitle="Party Games"
      />

      <div className="md:flex-1 print:flex-1 space-y-8">
        {party.games.map((game, index) => (
          <div key={index} className="border-2 border-current p-6 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">{game.name}</h2>
            <p className="text-base md:text-lg leading-relaxed">
              {game.description}
            </p>
            {game.hasIdentityCards && identityCardsAvailable && (
              <div className="pt-4 print:hidden">
                <PreserveParamsLink
                  href={`/party/${id}/games/identity-cards`}
                  className="inline-flex items-center gap-2 py-2 px-4 border border-current hover:opacity-60 transition-opacity"
                >
                  <IdentificationCard size={20} weight="regular" />
                  <span>View & Print Identity Cards</span>
                </PreserveParamsLink>
              </div>
            )}
          </div>
        ))}
      </div>

      <PartyPageFooter message="Let the games begin!" />
    </PartyPageWrapper>
  );
}
