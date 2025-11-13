import { ReactNode } from "react";
import BackToPartyButton from "./BackToPartyButton";
import PartyContentCard from "./PartyContentCard";

interface PartyPageWrapperProps {
  children: ReactNode;
  partyId?: string;
  showBackButton?: boolean;
}

export default function PartyPageWrapper({
  children,
  partyId,
  showBackButton = true,
}: PartyPageWrapperProps) {
  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center p-4 md:p-8 print:p-0 print:block print:min-h-screen">
      <div className="flex flex-col items-center gap-6 w-full">
        <PartyContentCard>{children}</PartyContentCard>
        {showBackButton && partyId && <BackToPartyButton partyId={partyId} />}
      </div>
    </div>
  );
}
