
'use client';

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { CommsAgent } from "@/core/agents/workers/comms";
import { useAppDispatch } from "@/core/state";
import { useState } from "react";

const CommunicationsPage = () => {
    const dispatch = useAppDispatch();
    const commsAgent = new CommsAgent((msg) => dispatch(s => ({...s, events: [...s.events, msg]})));
    const [voiceText, setVoiceText] = useState('');
    const [notifText, setNotifText] = useState('');

    const handleSpeak = () => {
        commsAgent.speak(voiceText);
        setVoiceText('');
    }

    const handleNotify = () => {
        commsAgent.notifySingle(notifText);
        setNotifText('');
    }

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
                  <h2 className="text-2xl font-bold text-white mb-4">Voice Calls</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input value={voiceText} onChange={(e) => setVoiceText(e.target.value)} className="flex-1 px-3 py-2 rounded-md border border-white/20 bg-black/20 text-white" placeholder="Say something to a customer..." />
                      <button onClick={handleSpeak} className="px-4 py-2 bg-purple-600/50 hover:bg-purple-600/80 text-white rounded-lg text-sm font-medium border border-purple-600/80 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_rgba(128,0,128,0.8)]">Speak</button>
                    </div>
                    <div className="text-xs text-white/50">Uses browser Speech Synthesis API.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full">
              <div className="backdrop-blur-2xl bg-white/10 dark:bg-black/40 border-t border-l border-white/20 dark:border-white/10 rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent pointer-events-none rounded-[32px]" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-4">App Notifications</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input value={notifText} onChange={(e) => setNotifText(e.target.value)} className="flex-1 px-3 py-2 rounded-md border border-white/20 bg-black/20 text-white" placeholder="Notification text..." />
                      <button onClick={handleNotify} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium border border-white/20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_rgba(128,0,128,0.8)]">Notify</button>
                    </div>
                    <div className="text-xs text-white/50">Uses browser Notification API.</div>
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

export default CommunicationsPage;
