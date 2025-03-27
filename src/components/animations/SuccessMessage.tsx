import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";

type SuccessMessageProps = {
  message: string;
}
export default function SuccessMessage({ message }: Readonly<SuccessMessageProps>) {
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
        <CircleCheckBig size={48} color="#2f5cb6" strokeWidth={1.75} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-semibold"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
