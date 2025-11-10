export const metadata = {
  title: "Toilet Sign",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ToiletPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 print:p-0">
      <div
        className="w-full bg-white shadow-2xl print:shadow-none flex items-center justify-center"
        style={{ aspectRatio: "16 / 9", maxWidth: "800px" }}
      >
        <div className="text-center p-8">
          <div className="text-9xl mb-6">🚽</div>
          <h1 className="text-7xl font-bold text-black">TOILET</h1>
          <div className="mt-6 text-5xl">→</div>
        </div>
      </div>
    </div>
  );
}
