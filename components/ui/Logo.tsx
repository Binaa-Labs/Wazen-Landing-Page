/* Single source of truth for the brand mark in the page chrome (nav +
   footer).

   The mark is the owner-supplied Wazen "W" (public/brand/ master set, D23),
   inlined as fill="currentColor" so CSS tokens drive its color:
   - tone="ink"     → var(--color-logo-mark): logo teal in light mode,
                      sage in dark mode (the green-in-dark hard requirement;
                      swapping sage↔teal is a one-token edit in globals.css).
   - tone="white"   → sage — for surfaces that are dark in BOTH themes
                      (footer), keeping the mark in the brand green family.
   - tone="onPhoto" → var(--color-logo-on-photo): light colorway over the
                      hero photo / transparent nav.
   Never reintroduce the padded/background-path SVG versions — the master's
   full-canvas white background was deliberately stripped (viewBox is tight
   around the mark). */

type LogoProps = {
  /** "ink" for light surfaces (nav), "white" for dark surfaces (footer),
      "onPhoto" for the transparent nav over the hero photo */
  tone?: "ink" | "white" | "onPhoto";
};

const markTone: Record<NonNullable<LogoProps["tone"]>, string> = {
  ink: "text-logo-mark",
  white: "text-secondary",
  onPhoto: "text-logo-on-photo",
};

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="179 266 735 436"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        fill="currentColor"
        d="M 752.222 275.470 C 742.805 278.410, 736.020 287.428, 736.020 297 C 736.020 302.828, 739.661 310.479, 744.630 315.093 C 752.666 322.553, 861.680 403.422, 866.961 405.840 C 873.421 408.797, 882.315 409.163, 888.162 406.711 C 900.413 401.574, 906.377 385.663, 900.610 373.500 C 897.521 366.986, 893.564 363.414, 875.750 351.062 C 867.638 345.436, 861 340.616, 861 340.350 C 861 340.084, 862.111 338.409, 863.470 336.628 C 873.473 323.514, 872.225 306.054, 860.605 296.532 C 854.571 291.588, 850.106 289.998, 842.282 290.010 C 833.609 290.022, 827.301 292.875, 820.500 299.861 C 817.750 302.686, 815.154 304.998, 814.730 304.999 C 814.307 304.999, 808.551 300.948, 801.940 295.996 C 785.698 283.830, 776.342 277.632, 771.230 275.653 C 766.163 273.692, 758.162 273.615, 752.222 275.470 M 699.748 305.366 C 681.115 312.319, 677.421 334.007, 692.703 346.728 C 695.341 348.924, 704.818 356.203, 713.762 362.904 C 729.058 374.364, 729.954 375.219, 728.859 377.294 C 727.700 379.490, 722.893 387.384, 694.324 434 C 686.066 447.475, 667.250 478.413, 652.512 502.750 C 637.773 527.087, 625.364 547, 624.935 547 C 624.506 547, 619.093 539.913, 612.906 531.250 C 598.750 511.431, 573.893 477.177, 529.041 415.684 C 523.900 408.635, 518.269 401.781, 516.528 400.453 C 508.486 394.320, 495.115 392.937, 485.799 397.277 C 482.885 398.634, 479.033 401.210, 477.241 403 C 475.448 404.791, 460.843 425.435, 444.785 448.878 C 428.727 472.320, 411.969 496.761, 407.545 503.191 C 403.120 509.621, 393.439 523.909, 386.031 534.941 C 378.624 545.973, 372.272 555, 371.916 555 C 371.560 555, 368.092 548.138, 364.210 539.750 C 357.148 524.496, 355.118 520.166, 339.247 486.500 C 326.976 460.473, 317.135 439.460, 301.429 405.750 L 287.569 376 237.284 376 C 209.628 376, 187 376.370, 187 376.821 C 187 377.273, 191.548 387.960, 197.107 400.571 C 202.666 413.182, 208.459 426.425, 209.980 430 C 220.365 454.402, 310.546 655.224, 315.578 665.154 C 319.160 672.222, 330.036 682.935, 337.131 686.382 C 352.752 693.972, 367.817 693.928, 384 686.245 C 393.998 681.499, 400.979 674.268, 413.201 656 C 454.757 593.886, 493.415 537.396, 496.861 533.750 C 500.531 529.868, 503.431 529.096, 506.259 531.250 C 507.161 531.938, 519.309 548.475, 533.254 568 C 547.199 587.525, 565.747 613.400, 574.472 625.500 C 583.198 637.600, 593.523 651.987, 597.418 657.470 C 610.531 675.932, 617.959 681.290, 630.500 681.334 C 643.299 681.378, 651.713 675.045, 662.427 657.305 C 665.684 651.912, 670.914 643.450, 674.049 638.500 C 677.184 633.550, 682.660 624.775, 686.219 619 C 696.435 602.422, 731.894 545.225, 736.744 537.500 C 739.162 533.650, 747.554 520.150, 755.394 507.500 C 785.463 458.982, 801.916 432.452, 802.693 431.232 C 803.272 430.321, 809.562 434.525, 825 446.144 C 836.825 455.043, 848.525 463.234, 851 464.346 C 856.651 466.885, 867.035 467.026, 872.080 464.632 C 885.964 458.044, 891.245 443.197, 884.563 429.539 C 881.649 423.583, 879.963 422.177, 848.500 399.472 C 840.250 393.518, 828.325 384.756, 822 380 C 815.675 375.244, 803.975 366.620, 796 360.834 C 788.025 355.048, 768.684 340.975, 753.020 329.560 C 737.357 318.146, 722.732 307.883, 720.520 306.753 C 715.410 304.144, 704.903 303.442, 699.748 305.366"
      />
    </svg>
  );
}

export default function Logo({ tone = "ink" }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark className={`h-6 w-auto shrink-0 ${markTone[tone]}`} />
      <span className="flex flex-col gap-0.5">
        <span
          className={`font-display text-lg font-bold leading-none ${
            tone === "ink" ? "text-ink" : "text-white"
          }`}
        >
          Wazen
        </span>
        <span
          className={`font-arabic text-[0.7rem] font-bold leading-none ${
            tone === "ink" ? "text-primary" : "text-secondary"
          }`}
        >
          وازن
        </span>
      </span>
    </span>
  );
}
