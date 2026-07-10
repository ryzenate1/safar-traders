"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

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

      {open && typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rfq-modal-overlay"
              style={{
                position: "fixed", inset: 0,
                backgroundColor: "#fff",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: 0, zIndex: 3000,
              }}
            >
              <RFQWizard onClose={() => setOpen(false)} />
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
