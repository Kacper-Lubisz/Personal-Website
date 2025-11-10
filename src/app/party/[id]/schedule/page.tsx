import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import OverrideTitle from "@/components/OverrideTitle";
import PreserveParamsLink from "@/components/PreserveParamsLink";

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
    <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8 print:p-0 print:block print:min-h-screen">
      <div className="w-full md:max-w-2xl md:shadow-2xl print:shadow-none print:max-w-none md:aspect-[1/1.414] print:min-h-screen">
        <div className="flex flex-col p-8 md:p-12 md:h-full md:overflow-y-auto print:overflow-visible print:min-h-screen">
          <header className="text-center mb-8 border-b-2 border-current pb-6">
            <OverrideTitle>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {party.title}
              </h1>
            </OverrideTitle>
            <p className="text-lg md:text-xl opacity-70">{party.date}</p>
            <p className="text-base mt-2 uppercase tracking-wider opacity-60">
              Schedule
            </p>
          </header>

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

          <footer className="mt-8 pt-6 border-t border-current text-center space-y-4">
            <div className="print:hidden">
              <PreserveParamsLink
                href={`/party/${id}`}
                className="inline-block py-2 px-6 border border-current hover:opacity-60 transition-opacity"
              >
                Back to Party
              </PreserveParamsLink>
            </div>
            <p className="text-sm opacity-50">See you there!</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
