import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Image from "next/image";

type EmployeeImageProps = {
  value: boolean;
};

export default function EmployeeImage({value}: Readonly<EmployeeImageProps>) {
  return (
    <AnimatePresence mode="wait">
      {!value  && (
        <motion.div
          key="default-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute -top-24 -right-44"
        >
          <Image
            src="/employee-img-1.png"
            alt="employee image"
            width={300}
            height={300}
          />
        </motion.div>
      )}

      {value && (
        <motion.div
          key="success-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute -top-24 -right-32"
        >
          <Image
            src="/happy-3d-business-man.png"
            alt="employee image"
            width={200}
            height={200}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
