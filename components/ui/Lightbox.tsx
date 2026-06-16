"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type LightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Classes for the in-place trigger (e.g. the aspect box / image wrapper) */
  className?: string;
  /** Controlled open — lets Features' PiP open the primary's lightbox */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

/* No-op subscribe: getSnapshot returns true on the client, false on the
   server — a set-state-free way to know the portal target exists. */
const emptySubscribe = () => () => {};

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-5"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Lightbox({
  src,
  alt,
  width,
  height,
  className,
  open: openProp,
  onOpenChange,
  children,
}: LightboxProps) {
  const layoutId = `lightbox-${useId()}`;
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? openProp : internalOpen;

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const setOpen = useCallback((v: boolean) => {
    setInternalOpen(v);
    onOpenChangeRef.current?.(v);
  }, []);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // Escape to close + scroll lock + focus management while open.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus(); // restore focus to the screenshot that opened it
    };
  }, [open, close]);

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={layoutId}
        onClick={() => setOpen(true)}
        aria-label={`Expand image: ${alt}`}
        className={`relative block cursor-pointer overflow-hidden ${
          className ?? ""
        }`}
      >
        {children}
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                onClick={close}
                className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center p-4 sm:p-8"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-ink/30 backdrop-blur-xl"
                />
                <motion.div
                  layoutId={layoutId}
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-[1] cursor-default overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-2xl object-contain"
                  />
                </motion.div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="fixed end-4 top-4 z-[2] flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <CloseIcon />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
