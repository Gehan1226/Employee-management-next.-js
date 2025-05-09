import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const notifications: string[] = [
  "🧾 Performance reviews are due for 3 team members",
  "📅 Your upcoming meeting with HR is in 30 minutes",
  "✅ John Doe's leave request has been approved",
  "📤 You successfully onboarded 2 new employees today",
  "⚠️ 1 contract employee's work authorization expires this week",
  "🔄 Team rotation plan is pending your review",
  "🚨 Attendance anomaly detected for Jane Smith",
  "🎯 Monthly hiring target reached — great job!",
];

export const NotificationSwitcher: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-6 overflow-hidden w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 flex items-center justify-center gap-2"
        >
          <p className="font-semibold text-medium text-gray-500">
            {notifications[currentIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
