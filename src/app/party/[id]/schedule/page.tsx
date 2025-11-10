import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";

interface ScheduleItem {
  time: string;
  activity: string;
}

interface Party {
  id: string;
  title: string;
  date: string;
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

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const party = partiesData.parties.find((p) => p.id === id);

  if (!party) {
    notFound();
  }

  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8 print:p-0 print:block print:min-h-screen">
      <div className="w-full md:max-w-2xl md:shadow-2xl print:shadow-none print:max-w-none md:aspect-[1/1.414] print:min-h-screen">
        <div className="flex flex-col p-8 md:p-12 md:h-full md:overflow-y-auto print:overflow-visible print:min-h-screen">
          <header className="text-center mb-8 border-b-2 border-current pb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {party.title}
            </h1>
            <p className="text-lg md:text-xl opacity-70">{party.date}</p>
            <p className="text-base mt-2 uppercase tracking-wider opacity-60">
              Schedule
            </p>
          </header>

          <div className="md:flex-1 print:flex-1 space-y-8">
            {party.schedule.map((item, index) => (
              <div key={index} className="flex items-baseline gap-6">
                <time className="text-3xl font-bold min-w-[5rem]">
                  {item.time}
                </time>
                <div className="flex-1 border-b-2 border-current pb-2">
                  <p className="text-xl md:text-2xl">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-8 pt-6 border-t border-current text-center">
            <p className="text-sm opacity-50">See you there!</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
