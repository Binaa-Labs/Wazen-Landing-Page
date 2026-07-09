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

import { useLanguage } from "@/components/LanguageProvider";
import PhoneFrame from "@/components/ui/PhoneFrame";

type LightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "image" (default): bare capture in a rounded card. "phone": the capture
      stays inside a PhoneFrame in the dialog, centered at ~85vh tall. */
  variant?: "image" | "phone";
  /** Classes for the in-place trigger (e.g. the aspect box / image wrapper) */
  className?: string;
  /** Controlled open — lets a parent component manage lightbox state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

/* No-op subscribe: getSnapshot returns true on the client, false on the
   server — a set-state-free way to know the portal target exists. */
const emptySubscribe = () => () => {};
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

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
  variant = "image",
  className,
  open: openProp,
  onOpenChange,
  children,
}: LightboxProps) {
  const { t } = useLanguage();
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
  const dialogRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((v: boolean) => {
    setInternalOpen(v);
    onOpenChangeRef.current?.(v);
  }, []);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // Escape/Tab handling + scroll lock + focus management while open.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    const siblingState = new Map<
      Element,
      { ariaHidden: string | null; inert: boolean }
    >();

    if (dialog) {
      Array.from(document.body.children).forEach((child) => {
        if (child === dialog) return;
        const el = child as HTMLElement;
        siblingState.set(el, {
          ariaHidden: el.getAttribute("aria-hidden"),
          inert: el.inert,
        });
        el.setAttribute("aria-hidden", "true");
        el.inert = true;
      });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = Array.from(
        dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) {
        e.preventDefault();
        closeRef.current?.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      siblingState.forEach((state, el) => {
        if (state.ariaHidden === null) {
          el.removeAttribute("aria-hidden");
        } else {
          el.setAttribute("aria-hidden", state.ariaHidden);
        }
        (el as HTMLElement).inert = state.inert;
      });
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
        aria-label={alt ? `${t.lightbox.expand}: ${alt}` : t.lightbox.expand}
        className={`block cursor-pointer ${
          /* phone triggers keep the frame's own rounding + shadow unclipped */
          variant === "phone" ? "w-full" : "overflow-hidden"
        } ${className ?? ""}`}
      >
        {children}
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={dialogRef}
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
                {variant === "phone" ? (
                  /* The capture stays inside the phone chrome, centered and
                     ~85vh tall (the frame's 9/19 window sets the width). */
                  <motion.div
                    layoutId={layoutId}
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-[1] w-[calc(85vh*9/19)] max-w-[80vw] cursor-default"
                  >
                    <PhoneFrame>
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="440px"
                        className="object-cover object-top dark:opacity-90"
                      />
                    </PhoneFrame>
                  </motion.div>
                ) : (
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
                )}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={t.lightbox.close}
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
