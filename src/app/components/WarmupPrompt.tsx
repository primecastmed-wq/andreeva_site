import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Gift, MessageCircle, X } from "lucide-react";

export function WarmupPrompt({
  storageScope,
  onPrimaryClick,
}: {
  storageScope: string;
  onPrimaryClick: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [interactions, setInteractions] = useState(0);
  const [secondsOnPage, setSecondsOnPage] = useState(0);
  const [maxScrollPercent, setMaxScrollPercent] = useState(0);

  const isSuppressed = useMemo(() => {
    if (typeof window === "undefined") return true;
    const submitted = localStorage.getItem("lead_submitted") === "1";
    const dismissed =
      sessionStorage.getItem(`warmup_dismissed_${storageScope}`) === "1";
    return submitted || dismissed;
  }, [storageScope]);

  useEffect(() => {
    if (isSuppressed) return;

    const interval = window.setInterval(() => {
      setSecondsOnPage((prev) => prev + 1);
    }, 1000);

    const registerInteraction = () => {
      setInteractions((prev) => prev + 1);
    };
    const registerScrollDepth = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setMaxScrollPercent((prev) => Math.max(prev, percent));
    };

    const events: Array<keyof WindowEventMap> = [
      "click",
      "touchstart",
      "keydown",
    ];
    events.forEach((eventName) =>
      window.addEventListener(eventName, registerInteraction, { passive: true })
    );
    window.addEventListener("scroll", registerScrollDepth, { passive: true });

    return () => {
      window.clearInterval(interval);
      events.forEach((eventName) =>
        window.removeEventListener(eventName, registerInteraction)
      );
      window.removeEventListener("scroll", registerScrollDepth);
    };
  }, [isSuppressed]);

  useEffect(() => {
    if (isSuppressed || visible) return;
    const fastTrigger = secondsOnPage >= 12 && interactions >= 2;
    const scrollTrigger = maxScrollPercent >= 35;
    const mobileIdleTrigger =
      typeof window !== "undefined" &&
      window.innerWidth <= 768 &&
      secondsOnPage >= 8 &&
      interactions >= 1;

    if (fastTrigger || scrollTrigger || mobileIdleTrigger) {
      setVisible(true);
      if (typeof (window as any).ym === "function") {
        (window as any).ym(106751172, "reachGoal", "warmup_prompt_show");
      }
    }
  }, [
    isSuppressed,
    visible,
    secondsOnPage,
    interactions,
    maxScrollPercent,
  ]);

  const closePrompt = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`warmup_dismissed_${storageScope}`, "1");
      if (typeof (window as any).ym === "function") {
        (window as any).ym(106751172, "reachGoal", "warmup_prompt_close");
      }
    }
    setVisible(false);
  };

  const handlePrimary = () => {
    if (typeof (window as any).ym === "function") {
      (window as any).ym(106751172, "reachGoal", "warmup_prompt_click");
    }
    onPrimaryClick();
    closePrompt();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] z-[70]"
        >
          <div className="rounded-2xl border border-orange-400/35 bg-[#121826]/95 backdrop-blur-xl shadow-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
                  <Gift size={16} className="text-orange-300" />
                </div>
                <div>
                  <p className="text-white text-sm" style={{ fontWeight: 700 }}>
                    Получите бесплатный разбор
                  </p>
                  <p className="text-slate-300 text-xs mt-1">
                    30 минут + чек-лист «27 точек роста» без обязательств
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePrompt}
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePrimary}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm"
                style={{ fontWeight: 700 }}
              >
                Записаться
              </button>
              <a
                href="https://t.me/AndreevaSvetlana_bot"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  if (typeof (window as any).ym === "function") {
                    (window as any).ym(106751172, "reachGoal", "warmup_prompt_tg");
                  }
                }}
                className="border border-white/15 text-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-white/5 transition-colors"
                style={{ fontWeight: 600 }}
              >
                <MessageCircle size={14} />
                Telegram
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
