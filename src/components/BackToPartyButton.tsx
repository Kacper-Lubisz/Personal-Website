import PreserveParamsLink from "./PreserveParamsLink";

interface BackToPartyButtonProps {
  partyId: string;
}

export default function BackToPartyButton({ partyId }: BackToPartyButtonProps) {
  return (
    <div className="print:hidden">
      <PreserveParamsLink
        href={`/party/${partyId}`}
        className="inline-block py-2 px-4 text-sm opacity-50 hover:opacity-100 transition-opacity"
      >
        ← Back to Party
      </PreserveParamsLink>
    </div>
  );
}
