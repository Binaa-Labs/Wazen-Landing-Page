"use client";

import { motion } from "framer-motion";

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  /** Renders a motion.a when set; motion.button otherwise */
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary:
    "border border-primary bg-transparent text-primary hover:bg-primary/5",
};

const sizeClasses = {
  md: "px-7 py-3.5 text-body",
  sm: "px-5 py-2 text-sm",
};

const hoverLift = {
  whileHover: { y: -3 },
  transition: { duration: 0.22, ease: "easeOut" },
} as const;

export default function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  type = "button",
  onClick,
  className,
  children,
}: ButtonProps) {
  const classes = [
    "inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
        {...hoverLift}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...hoverLift}>
      {children}
    </motion.button>
  );
}
