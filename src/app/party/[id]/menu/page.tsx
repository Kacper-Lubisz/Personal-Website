import { notFound } from "next/navigation";
import partiesData from "@/data/menus.json";

interface Course {
  name: string;
  dish: string;
  description: string;
}

interface Party {
  id: string;
  title: string;
  date: string;
  courses: Course[];
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

export default async function MenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const menu = partiesData.parties.find((m) => m.id === id);

  if (!menu) {
    notFound();
  }

  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8 print:p-0 print:block print:min-h-screen">
      <div className="w-full md:max-w-2xl md:shadow-2xl print:shadow-none print:max-w-none md:aspect-[1/1.414] print:min-h-screen">
        <div className="flex flex-col p-8 md:p-12 md:h-full md:overflow-y-auto print:overflow-visible print:min-h-screen">
          <header className="text-center mb-8 border-b-2 border-current pb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {menu.title}
            </h1>
            <p className="text-lg md:text-xl opacity-70">{menu.date}</p>
          </header>

          <div className="md:flex-1 print:flex-1 space-y-6">
            {menu.courses.map((course, index) => (
              <div key={index} className="space-y-1">
                <h2 className="text-sm uppercase tracking-widest opacity-60">
                  {course.name}
                </h2>
                <h3 className="text-xl md:text-2xl font-bold">{course.dish}</h3>
                <p className="text-sm md:text-base opacity-75 italic">
                  {course.description}
                </p>
              </div>
            ))}
          </div>

          <footer className="mt-8 pt-6 border-t border-current text-center">
            <p className="text-sm opacity-50">Bon Appétit</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
