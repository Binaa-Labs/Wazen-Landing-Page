/* Feature flags — deliberately tiny. Each flag is a one-line edit to flip. */

/* Video tour section (D20): the real walkthrough video is still in
   production, so the section ships HIDDEN at launch (2.3b). To enable it
   when the video lands, follow "Enabling the video section" in PROJECT.md —
   the asset drops in via lib/video.ts and this flag flips to true. */
export const SHOW_VIDEO_SECTION = false;
