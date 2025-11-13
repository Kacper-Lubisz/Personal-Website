import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import PreserveParamsLink from "@/components/PreserveParamsLink";
import PartyPageWrapper from "@/components/PartyPageWrapper";
import PartyPageHeader from "@/components/PartyPageHeader";
import PartyPageFooter from "@/components/PartyPageFooter";

interface ScheduleItem {
  time: string;
  activity: string;
  hideUntilReleased: boolean;
}

interface Party {
  id: string;
  title: string;
  date: string;
  releaseDate: string;
  scheduleNote?: string;
  schedule: ScheduleItem[];
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

export default async function SchedulePage({
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
    <PartyPageWrapper partyId={id}>
      <PartyPageHeader
        partyId={id}
        title={party.title}
        date={party.date}
        subtitle="Schedule"
      />

      {party.scheduleNote && (
        <div className="mb-8 border-2 border-current p-6 print:hidden">
          <p className="text-base md:text-lg text-center font-medium">
            {party.scheduleNote}
          </p>
        </div>
      )}

      <div className="md:flex-1 print:flex-1 space-y-8">
        {party.schedule.map((item, index) => {
          const shouldHide = item.hideUntilReleased && !isAvailable;
          const hiddenActivity = shouldHide
            ? item.activity.replace(/[^\s]/g, "?")
            : item.activity;

          // Check if this is the Party Games item and should link to games page
          const isGamesItem = item.activity === "Party Games" && !shouldHide;

          return (
            <div key={index} className="flex items-baseline gap-6">
              <time className="text-3xl font-bold min-w-[5rem]">
                {item.time}
              </time>
              <div className="flex-1 border-b-2 border-current pb-2">
                {isGamesItem ? (
                  <PreserveParamsLink
                    href={`/party/${id}/games`}
                    className="text-xl md:text-2xl hover:opacity-60 transition-opacity inline-block"
                  >
                    {hiddenActivity}
                  </PreserveParamsLink>
                ) : (
                  <p className="text-xl md:text-2xl">{hiddenActivity}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <PartyPageFooter message="See you there!" />
    </PartyPageWrapper>
  );
}
