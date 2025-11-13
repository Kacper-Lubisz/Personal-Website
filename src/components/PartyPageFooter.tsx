interface PartyPageFooterProps {
  message: string;
}

export default function PartyPageFooter({ message }: PartyPageFooterProps) {
  return (
    <footer className="mt-8 pt-6 border-t border-current text-center">
      <p className="text-sm opacity-50">{message}</p>
    </footer>
  );
}
