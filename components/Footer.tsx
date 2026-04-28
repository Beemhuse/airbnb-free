export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <span>© 2022 Airbnb, Inc.</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Sitemap</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6 text-sm text-neutral-700">
          
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            🌐 <span>English (US)</span>
          </div>

          <div className="cursor-pointer hover:underline">
            $ USD
          </div>

          <div className="cursor-pointer hover:underline">
            Support & resources
          </div>

          {/* Mobbin branding */}
          <div className="flex items-center gap-2 ml-6">
            <span className="text-neutral-500">curated by</span>
            <span className="font-semibold">Mobbin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}