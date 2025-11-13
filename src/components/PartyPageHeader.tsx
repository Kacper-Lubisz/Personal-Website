import { ReactNode } from "react";
import OverrideTitle from "./OverrideTitle";
import PreserveParamsLink from "./PreserveParamsLink";

interface PartyPageHeaderProps {
  partyId: string;
  title: string;
  date: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

export default function PartyPageHeader({
  partyId,
  title,
  date,
  subtitle,
  className = "",
  children,
}: PartyPageHeaderProps) {
  return (
    <header
      className={`text-center mb-8 border-b-2 border-current pb-6 ${className}`}
    >
      <OverrideTitle
        className={
          children ? "flex items-center justify-center gap-3 mb-2" : ""
        }
      >
        <PreserveParamsLink href={`/party/${partyId}`}>
          <h1 className="text-4xl md:text-5xl font-bold hover:opacity-60 transition-opacity">
            {title}
          </h1>
        </PreserveParamsLink>
      </OverrideTitle>
      {children}
      <p className="text-lg md:text-xl opacity-70">{date}</p>
      {subtitle && (
        <p className="text-base mt-2 uppercase tracking-wider opacity-60">
          {subtitle}
        </p>
      )}
    </header>
  );
}
