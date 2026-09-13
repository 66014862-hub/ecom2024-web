const HeaderAdmin = () => {
  return (
    <header className="bg-gradient-to-r from-sky-50 via-sky-100/50 to-pink-50/50 h-20 flex items-center justify-between px-8 border-b border-sky-100 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-slate-700 tracking-wide">
          ✨ Header
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl shadow-sm border border-sky-100/80">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-sm font-semibold text-slate-700">Administrator</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;