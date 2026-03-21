export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050314] border-t border-white/10 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-gray-400 text-sm">
          © {currentYear} Handcrafted with precision by <span className="font-bold text-purple-400 uppercase tracking-widest">Anthic</span>.
        </p>

      </div>
    </footer>
  );
}
