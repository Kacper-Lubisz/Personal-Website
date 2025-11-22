import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";
import { Clock, CookingPot } from "@phosphor-icons/react/dist/ssr";
import PreserveParamsLink from "@/components/PreserveParamsLink";
import PartyPageWrapper from "@/components/PartyPageWrapper";
import PartyPageHeader from "@/components/PartyPageHeader";
import PartyPageFooter from "@/components/PartyPageFooter";
import TentCardMenu from "@/components/TentCardMenu";

type Course = {
  name: string;
  dish: string;
  description: string;
};

type TacoMenuItem = {
  name: string;
  ingredients: string;
};

type TacoMenuSection = {
  title: string;
  subtitle?: string;
  items: TacoMenuItem[];
};

type TacoRecipe = {
  name: string;
  color: string;
  ingredients: string[];
  method: string[];
};

type TacoMenu = {
  type: "taco";
  sections: TacoMenuSection[];
  recipes?: TacoRecipe[];
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
  const resolvedSearchParams = await searchParams;
  const { override } = resolvedSearchParams;

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
      <PartyPageWrapper partyId={id} showBackButton={false}>
        <PartyPageHeader
          partyId={id}
          title={menu.title}
          date={menu.date}
          subtitle="Food Menu"
        />

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
      </PartyPageWrapper>
    );
  }

  // Suggested taco combinations
  const suggestedCombinations = [
    {
      name: "Carnitas Chimichurri Crunch",
      ingredients: [
        "Pulled Pork Carnitas",
        "Cabbage",
        "Pickled red onion",
        "Chimichurri",
        "Lime",
      ],
      description: "Clean, sharp, herb-driven. Perfect crowd-pleaser.",
    },
    {
      name: "Tikka Verde",
      ingredients: [
        "Tikka Paneer",
        "Mango slaw",
        "Salsa verde",
        "Coriander",
        "Lime",
      ],
      description: "Bright, juicy, sweet-green. Great vegetarian hero dish.",
    },
    {
      name: "Fiery Tinga Lime",
      ingredients: [
        "Chicken Tinga",
        "Cabbage",
        "Jalapeños",
        "Salsa roja",
        "Lime + coriander",
      ],
      description: "A classic spicy-red taco. Balanced heat.",
    },
    {
      name: "Paneer Slaw Supreme",
      ingredients: [
        "Tikka Paneer",
        "Cabbage",
        "Mango slaw",
        "Chipotle mayo",
        "Coriander",
      ],
      description: "Creamy, smoky, sweet, spicy. Deeply satisfying.",
    },
    {
      name: "Street-Style Pork Verde",
      ingredients: [
        "Pulled Pork Carnitas",
        "Pickled red onion",
        "Salsa verde",
        "Coriander",
      ],
      description: "Minimalist, bright, fresh. Pure taquería energy.",
    },
  ];

  const page1Content = (
    <>
      <PartyPageHeader partyId={id} title={menu.title} date={menu.date} />

      <div className="md:flex-1 print:flex-1 space-y-8">
        {menu.menu && menu.menu.type === "taco" ? (
          // Taco Menu
          <>
            <div className="text-center mb-8 pb-6 border-b-4 border-double border-current">
              <h2 className="text-4xl font-bold uppercase tracking-wider">
                Build Your Own Taco
              </h2>
              <p className="text-sm mt-2 opacity-60 italic">
                Three steps to perfection
              </p>
            </div>
            {menu.menu.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold uppercase tracking-widest pb-3">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-lg opacity-70 italic pb-3">
                      {section.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex flex-row flex-wrap justify-center gap-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="group relative text-center py-2 px-4 border border-current flex-shrink-0 cursor-help"
                      title={item.ingredients}
                    >
                      <span className="text-base font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-48 text-center">
                        {item.ingredients}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                      </div>
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

      <PartyPageFooter message="Bon Appétit" />
    </>
  );

  const page2Content = (
    <>
      <PartyPageHeader partyId={id} title={menu.title} date={menu.date} />

      <div className="md:flex-1 print:flex-1 space-y-6">
        <div className="text-center mb-6 pb-4 border-b-4 border-double border-current">
          <h2 className="text-4xl font-bold uppercase tracking-wider">
            Suggested Combinations
          </h2>
          <p className="text-sm mt-2 opacity-60 italic">
            Chef's favorites to try
          </p>
        </div>

        {suggestedCombinations.map((combo, index) => (
          <div
            key={index}
            className="space-y-2 pb-4 border-b border-current/30 last:border-0"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold opacity-40">{index + 1}.</span>
              <h3 className="text-xl font-bold">{combo.name}</h3>
            </div>
            <div className="text-sm opacity-90 italic pl-6">
              {combo.ingredients.join(" • ")}
            </div>
            <p className="text-sm opacity-60 pl-6">{combo.description}</p>
          </div>
        ))}
      </div>

      <PartyPageFooter message="Bon Appétit" />
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 print:p-0 print:block print:min-h-screen">
      <div className="w-full max-w-4xl">
        <TentCardMenu page1={page1Content} page2={page2Content} />
      </div>

      {/* Hidden cooking button - same location as tent preview control */}
      <div className="hidden md:block print:hidden fixed top-4 right-4 z-50">
        <div className="group">
          <div className="w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 bg-[var(--background)] border-2 border-current p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <PreserveParamsLink
              href={`/party/${id}/menu/cooking`}
              className="inline-flex items-center gap-2 py-2 px-4 border border-current hover:opacity-60 transition-opacity text-sm whitespace-nowrap"
            >
              <CookingPot size={18} />
              View Recipes
            </PreserveParamsLink>
          </div>
        </div>
      </div>
    </div>
  );
}
