"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PreserveParamsLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function PreserveParamsLink({
  href,
  children,
  className,
  target,
  rel,
}: PreserveParamsLinkProps) {
  const searchParams = useSearchParams();
  const override = searchParams?.get("override");

  const finalHref = override ? `${href}?override=true` : href;

  return (
    <Link href={finalHref} className={className} target={target} rel={rel}>
      {children}
    </Link>
  );
}
