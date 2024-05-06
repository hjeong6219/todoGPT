function DashboardSekeleton() {
  return (
    <>
      <section className="mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-20 rounded shadow-lg animate-pulse bg-slate-300"></div>
          <div className="h-20 rounded shadow-lg animate-pulse bg-slate-300"></div>
          <div className="h-20 rounded shadow-lg animate-pulse bg-slate-300"></div>
        </div>
      </section>
      <section className="h-20 mb-6 rounded shadow-lg animate-pulse bg-slate-300" />
      <section className="h-20 mb-6 rounded shadow-lg animate-pulse bg-slate-300" />
    </>
  );
}

export default DashboardSekeleton;
