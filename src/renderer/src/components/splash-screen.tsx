import { motion } from "motion/react";
import appIcon from "@renderer/assets/icon.png";

function SplashRing(): React.JSX.Element {
  return (
    <motion.div className="relative h-20 w-20" initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
      <motion.div
        className="absolute inset-0 rounded-full border border-[#2A2A38]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="absolute inset-2 rounded-full border-4 border-[#252530]" />
      <motion.div
        className="absolute inset-2 rounded-full border-4 border-transparent border-r-[#A99EFA] border-t-[#7B6EF6]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full" animate={{
          boxShadow: [
            "0 0 0 rgba(123, 110, 246, 0)",
            "0 0 24px rgba(123, 110, 246, 0.35)",
            "0 0 0 rgba(123, 110, 246, 0)",
          ],
        }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          <img src={appIcon} alt="" className="h-10 w-10 rounded-full object-cover" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function LoadingText(): React.JSX.Element {
  return (
    <div className="mt-2 flex items-center justify-center text-[12px] font-medium uppercase tracking-widest text-[#5A5975]">
      <span>Loading workspace</span>
    </div>
  );
}

export default function SplashScreen(): React.JSX.Element {
  return (
    <motion.div className="flex min-h-screen items-center justify-center bg-[#15151C] px-6 text-[#F0EFF8]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.div className="flex flex-col items-center text-center"
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <SplashRing />
        <motion.div className="mt-6 text-[22px] font-semibold tracking-tight"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
        >
          FlowDesk
        </motion.div>
        <LoadingText />
        <div className="mt-6 h-1 w-44 overflow-hidden rounded-full bg-[#252530]">
          <motion.div className="h-full w-1/2 rounded-full bg-[#7B6EF6]"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "100%", "260%"] }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
