import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SleekCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const SleekCard = ({ children, className, hover = false }: SleekCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={hover ? { scale: 1.01 } : {}}
      className={cn(
        "bg-[#111111] border border-[#1f1f1f] rounded-lg p-6",
        "hover:border-[#2a2a2a] transition-all duration-200",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
