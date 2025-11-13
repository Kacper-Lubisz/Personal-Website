import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import OverrideTitle from "@/components/OverrideTitle";
import PreserveParamsLink from "@/components/PreserveParamsLink";

type Course = {
  name: string;
  dish: string;
  description: string;
};

type TacoMenuSection = {
  title: string;
  items: string[];
};

type TacoMenu = {
  type: "taco";
  sections: TacoMenuSection[];
};

type TraditionalMenu = {
  type: "traditional";
  courses: Course[];
};

type Menu = TacoMenu | TraditionalMenu;

type Party = {
  id: string;
  title: string;
  date: string;
  releaseDate: string;
  menu: Menu;
  courses?: Course[]; // Legacy support
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

export default async function MenuPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { override } = await searchParams;

  const menu = partiesData.parties.find((m) => m.id === id);

  if (!menu) {
    notFound();
  }

  const isAvailable = isContentAvailable(
    menu.releaseDate,
    override as string | undefined
  );

  if (!isAvailable) {
    return (
      <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8">
        <div className="w-full md:max-w-2xl">
          <div className="flex flex-col p-8 md:p-12">
            <header className="text-center mb-8 border-b-2 border-current pb-6">
              <OverrideTitle>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {menu.title}
                </h1>
              </OverrideTitle>
              <p className="text-lg md:text-xl opacity-70">{menu.date}</p>
              <p className="text-base mt-2 uppercase tracking-wider opacity-60">
                Food Menu
              </p>
            </header>

            <div className="text-center space-y-6">
              <div className="border-2 border-current p-12">
                <Clock size={64} weight="regular" className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Not Available Yet</h2>
                <p className="text-lg opacity-70 mb-6">
                  The menu will be available on{" "}
                  {new Date(menu.releaseDate).toLocaleDateString("en-US", {
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
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-full md:max-w-2xl md:shadow-2xl print:shadow-none print:max-w-none print:aspect-[1/1.414] print:min-h-screen">
          <div className="flex flex-col p-8 md:p-12 print:overflow-visible print:min-h-screen">
            <header className="text-center mb-8 border-b-2 border-current pb-6">
              <OverrideTitle>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {menu.title}
                </h1>
              </OverrideTitle>
              <p className="text-lg md:text-xl opacity-70">{menu.date}</p>
            </header>

            <div className="md:flex-1 print:flex-1 space-y-8">
              {menu.menu && menu.menu.type === "taco" ? (
                // Taco Menu
                <>
                  <div className="text-center mb-8 pb-6 border-b-4 border-double border-current">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                      Build Your Own Taco
                    </h2>
                    <p className="text-sm mt-2 opacity-60 italic">
                      Five steps to perfection
                    </p>
                  </div>
                  {menu.menu.sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-center pb-3">
                        {section.title}
                      </h3>
                      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3 md:gap-4">
                        {section.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="text-center py-2 px-4 border border-current md:flex-shrink-0"
                          >
                            <span className="text-base md:text-lg font-medium whitespace-nowrap">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                // Traditional Course Menu
                <>
{/*
                  {(menu.menu && menu.menu.type === "traditional"
                    ? menu.menu.courses
                    : menu.courses || []
                  ).map((course, index) => (
                    <div key={index} className="space-y-1">
                      <h2 className="text-sm uppercase tracking-widest opacity-60">
                        {course.name}
                      </h2>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {course.dish}
                      </h3>
                      <p className="text-sm md:text-base opacity-75 italic">
                        {course.description}
                      </p>
                    </div>
                  ))}
*/}
                </>
              )}
            </div>

            <footer className="mt-8 pt-6 border-t border-current text-center">
              <p className="text-sm opacity-50">Bon Appétit</p>
            </footer>
          </div>
        </div>
        <div className="print:hidden">
          <PreserveParamsLink
            href={`/party/${id}`}
            className="inline-block py-2 px-6 border border-current hover:opacity-60 transition-opacity"
          >
            Back to Party
          </PreserveParamsLink>
        </div>
      </div>
    </div>
  );
}
