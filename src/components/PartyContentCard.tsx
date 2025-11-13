import { ReactNode } from "react";

interface PartyContentCardProps {
  children: ReactNode;
}

export default function PartyContentCard({ children }: PartyContentCardProps) {
  return (
    <div className="w-full md:max-w-2xl md:shadow-2xl md:bg-[#fffdf5] dark:md:bg-[#003847] print:shadow-none print:bg-transparent print:max-w-none print:aspect-[1/1.414] print:min-h-screen">
      <div className="flex flex-col p-8 md:p-12 print:overflow-visible print:min-h-screen">
        {children}
      </div>
    </div>
  );
}
