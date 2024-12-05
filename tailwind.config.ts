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
                sm: "var(--spacing-sm)",
                md: "var(--spacing-md)",
                lg: "var(--spacing-lg)",
                xl: "var(--spacing-xl)",
                "2xl": "var(--spacing-2xl)",
                "3xl": "var(--spacing-3xl)",
                "4xl": "var(--spacing-4xl)",
            },

            colors: {
                bg: {
                    primary: "var(--bg-primary)",
                    secondary: "var(--bg-secondary)",
                    tertiary: "var(--bg-tertiary)",
                    quaternary: "var(--bg-quaternary)",
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
                    secondary: {
                        fg: "var(--button-secondary-fg)",
                        bg: "var(--button-secondary-bg)",
                        border: "var(--button-secondary-border)",
                        color: {
                            bg: "var(--button-secondary-color-bg)",
                            fg: "var(--button-secondary-color-fg)",
                            border: "var(--button-secondary-color-border)",
                        },
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

            textColor: {
                primary: "var(--text-primary)",
                secondary: "var(--text-secondary)",
                tertiary: "var(--text-tertiary)",
                placeholder: "var(--text-placeholder)",
            },
        },
    },
} satisfies Config;
