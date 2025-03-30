import { motion } from "framer-motion";
import { BookText, ShieldAlert } from "lucide-react";
import React from "react";

type ErrorMessageProps = {
  message: string;
  error: string;
};
export default function ErrorMessage({
  message,
  error,
}: Readonly<ErrorMessageProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        bounce: 0.4,
      }}
      className="flex flex-col items-center mt-10 gap-2"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <ShieldAlert size={48} color="#fe2020" strokeWidth={1.75} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="font-semibold">{message}</p>

        <div className="w-4/5 border border-red-500 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] font-normal p-3 relative">
          <p>{error}</p>

          <BookText
            size={20}
            color="#ff2929"
            strokeWidth={1.75}
            className="absolute -top-2 -left-2 bg-white"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
