import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./NewYear.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function NewYear() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [phase, setPhase] = useState<"counting" | "final" | "celebrating">(
    "counting"
  );

  // const targetDate = new Date("January 1, 2026 00:00:00").getTime();
  const [targetDate] = useState(() => new Date().getTime() + 15000);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        if (phase !== "celebrating") {
          setPhase("celebrating");
          triggerHypeCelebration();
        }
      } else if (distance <= 10000) {
        setPhase("final");
        setTimeLeft(calculateTime(distance));
      } else {
        setPhase("counting");
        setTimeLeft(calculateTime(distance));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const calculateTime = (distance: number): TimeLeft => {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const triggerHypeCelebration = () => {
    // STRICTLY White and Blue confetti
    const colors = ["#ffffff", "#b72a27"];

    // No duration limit anymore. It runs forever.
    setInterval(() => {
      // Burst 1: Random location
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
        particleCount: 50,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: colors,
        disableForReducedMotion: true,
      });

      // Burst 2: A bit more chaos
      confetti({
        startVelocity: 45,
        spread: 100,
        ticks: 60,
        zIndex: 100,
        particleCount: 30,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: colors,
        disableForReducedMotion: true,
      });
    }, 250); // Fires a new blast every 0.25 seconds
  };
  const formatNum = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={`ny-container ${phase}`}>
      {/* PHASE 1: BOLD COUNTDOWN */}
      {phase === "counting" && (
        <div className="ny-content">
          <div className="ny-hero-text-wrapper">
            <h1 className="ny-hero-text">COUNTDOWN</h1>
            <h1 className="ny-hero-text outline">TO 2026</h1>
          </div>

          <div className="ny-timer-block">
            <div className="ny-unit">
              <span className="ny-big-num">{formatNum(timeLeft.days)}</span>
              <span className="ny-tag">DAYS</span>
            </div>
            <div className="ny-unit">
              <span className="ny-big-num">{formatNum(timeLeft.hours)}</span>
              <span className="ny-tag">HRS</span>
            </div>
            <div className="ny-unit">
              <span className="ny-big-num">{formatNum(timeLeft.minutes)}</span>
              <span className="ny-tag">MIN</span>
            </div>
            <div className="ny-unit active">
              <span className="ny-big-num">{formatNum(timeLeft.seconds)}</span>
              <span className="ny-tag">SEC</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: FINAL 10 SECONDS (INTENSE SHAKE) */}
      {phase === "final" && (
        <div className="ny-final-stage">
          <div key={timeLeft.seconds} className="ny-blast-count">
            {timeLeft.seconds}
          </div>
        </div>
      )}

      {/* PHASE 3: CELEBRATION (BIG & LOUD) */}
      {phase === "celebrating" && (
        <div className="ny-party-stage slide-up">
          <h1 className="ny-year-giant">2026</h1>
          <div className="ny-welcome-banner">HAPPY NEW YEAR</div>
        </div>
      )}
    </div>
  );
}
