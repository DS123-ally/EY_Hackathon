
'use client';

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAppState } from "@/core/state";

const RcaCapaPage = () => {
    const { rcaCases, capaActions } = useAppState();

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="relative z-10 w-full">
              <div className="backdrop-blur-2xl bg-white/10 dark:bg-black/40 border-t border-l border-white/20 dark:border-white/10 rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent pointer-events-none rounded-[32px]" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-4">RCA Cases</h2>
                  <div className="overflow-auto">
                    <table className="min-w-full text-sm">
                      <thead className="text-left text-white/70">
                        <tr>
                          <th className="px-3 py-2">Case ID</th>
                          <th className="px-3 py-2">Vehicle ID</th>
                          <th className="px-3 py-2">Component</th>
                          <th className="px-3 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {rcaCases.map(rcaCase => (
                            <tr key={rcaCase.id}>
                                <td className="px-3 py-4">{rcaCase.id}</td>
                                <td className="px-3 py-4">{rcaCase.vehicleId}</td>
                                <td className="px-3 py-4">{rcaCase.component}</td>
                                <td className="px-3 py-4">{rcaCase.status}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full">
              <div className="backdrop-blur-2xl bg-white/10 dark:bg-black/40 border-t border-l border-white/20 dark:border-white/10 rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent pointer-events-none rounded-[32px]" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-4">CAPA Actions</h2>
                  <div className="overflow-auto">
                    <table className="min-w-full text-sm">
                      <thead className="text-left text-white/70">
                        <tr>
                          <th className="px-3 py-2">Action ID</th>
                          <th className="px-3 py-2">RCA ID</th>
                          <th className="px-3 py-2">Action</th>
                          <th className="px-3 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {capaActions.map(capaAction => (
                            <tr key={capaAction.id}>
                                <td className="px-3 py-4">{capaAction.id}</td>
                                <td className="px-3 py-4">{capaAction.rcaId}</td>
                                <td className="px-3 py-4">{capaAction.action}</td>
                                <td className="px-3 py-4">{capaAction.status}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RcaCapaPage;
