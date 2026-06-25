"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import RFQWizard from "./RFQWizard";

export default function RFQWizardLauncher({
  label = "Request a Quote",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className || "btn btn-secondary"}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      >
        <FileText size={15} />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1rem", zIndex: 1000,
            }}
          >
            <RFQWizard onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
