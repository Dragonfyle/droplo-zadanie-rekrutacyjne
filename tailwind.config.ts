import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        xxs: "var(--spacing-xxs)",
        xs: "var(--spacing-xs)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
        },

        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
        },

        button: {
          primary: {
            fg: "var(--button-primary-fg)",
            bg: "var(--button-primary-bg)",
            border: "var(--button-primary-border)",
          },
        },
      },

      borderRadius: {
        md: "var(--radius-md)",
      },

      fontSize: {
        "sm/regular": [
          "var(--font-size-sm)",
          {
            lineHeight: "var(--line-height-sm)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        "sm/medium": [
          "var(--font-size-sm)",
          {
            lineHeight: "var(--line-height-sm)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        "sm/semibold": [
          "var(--font-size-sm)",
          {
            lineHeight: "var(--line-height-sm)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        "md/semibold": [
          "var(--font-size-md)",
          {
            lineHeight: "var(--line-height-md)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        "md/regular": [
          "var(--font-size-md)",
          {
            lineHeight: "var(--line-height-md)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
      },
    },
  },
} satisfies Config;
