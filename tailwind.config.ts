import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          50: "hsl(159, 65%, 95%)",
          100: "hsl(159, 65%, 90%)",
          200: "hsl(159, 65%, 80%)",
          300: "hsl(159, 65%, 70%)",
          400: "hsl(159, 65%, 60%)",
          500: "hsl(159, 65%, 50%)",
          600: "hsl(159, 65%, 40%)",
          700: "hsl(159, 65%, 30%)",
          800: "hsl(159, 65%, 20%)",
          900: "hsl(159, 65%, 10%)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          50: "hsl(214, 93%, 95%)",
          100: "hsl(214, 93%, 90%)",
          200: "hsl(214, 93%, 80%)",
          300: "hsl(214, 93%, 70%)",
          400: "hsl(214, 93%, 65%)",
          500: "hsl(214, 93%, 59%)",
          600: "hsl(214, 93%, 50%)",
          700: "hsl(214, 93%, 40%)",
          800: "hsl(214, 93%, 30%)",
          900: "hsl(214, 93%, 20%)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Custom PyLearn colors
        pylearn: {
          primary: {
            DEFAULT: "var(--pylearn-primary)",
            light: "var(--pylearn-primary-light)",
          },
          secondary: {
            DEFAULT: "var(--pylearn-secondary)",
            light: "var(--pylearn-secondary-light)",
          },
          success: "var(--pylearn-success)",
          warning: "var(--pylearn-warning)",
          error: "var(--pylearn-error)",
          amber: "var(--pylearn-amber)",
          orange: "var(--pylearn-orange)",
        },
        // Additional color palette for the app
        green: {
          50: "hsl(142, 76%, 96%)",
          100: "hsl(149, 80%, 90%)",
          200: "hsl(152, 76%, 80%)",
          300: "hsl(156, 72%, 67%)",
          400: "hsl(158, 64%, 52%)",
          500: "hsl(160, 84%, 39%)",
          600: "hsl(161, 94%, 30%)",
          700: "hsl(163, 94%, 24%)",
          800: "hsl(163, 88%, 20%)",
          900: "hsl(164, 86%, 16%)",
        },
        blue: {
          50: "hsl(214, 100%, 97%)",
          100: "hsl(214, 95%, 93%)",
          200: "hsl(213, 97%, 87%)",
          300: "hsl(212, 96%, 78%)",
          400: "hsl(213, 94%, 68%)",
          500: "hsl(217, 91%, 60%)",
          600: "hsl(221, 83%, 53%)",
          700: "hsl(224, 76%, 48%)",
          800: "hsl(226, 71%, 40%)",
          900: "hsl(224, 64%, 33%)",
        },
        amber: {
          50: "hsl(48, 100%, 96%)",
          100: "hsl(48, 96%, 89%)",
          200: "hsl(48, 97%, 77%)",
          300: "hsl(46, 97%, 65%)",
          400: "hsl(43, 96%, 56%)",
          500: "hsl(38, 92%, 50%)",
          600: "hsl(32, 95%, 44%)",
          700: "hsl(26, 90%, 37%)",
          800: "hsl(23, 83%, 31%)",
          900: "hsl(22, 78%, 26%)",
        },
        orange: {
          50: "hsl(34, 100%, 97%)",
          100: "hsl(32, 98%, 91%)",
          200: "hsl(33, 98%, 83%)",
          300: "hsl(31, 97%, 72%)",
          400: "hsl(27, 96%, 61%)",
          500: "hsl(25, 95%, 53%)",
          600: "hsl(21, 90%, 48%)",
          700: "hsl(17, 88%, 40%)",
          800: "hsl(15, 79%, 34%)",
          900: "hsl(15, 75%, 28%)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      boxShadow: {
        "2xs": "var(--shadow-2xs)",
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        glow: "0 0 20px hsl(var(--pylearn-primary) / 0.3)",
        "glow-sm": "0 0 10px hsl(var(--pylearn-primary) / 0.2)",
        "glow-lg": "0 0 30px hsl(var(--pylearn-primary) / 0.4)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "slide-in-up": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-in-down": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.8)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "bounce-gentle": {
          "0%, 20%, 53%, 80%, 100%": {
            transform: "translateY(0)",
          },
          "40%, 43%": {
            transform: "translateY(-15px)",
          },
          "70%": {
            transform: "translateY(-7px)",
          },
          "90%": {
            transform: "translateY(-2px)",
          },
        },
        "pulse-soft": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.7",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-up": "slide-in-up 0.3s ease-out forwards",
        "slide-in-down": "slide-in-down 0.3s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "bounce-gentle": "bounce-gentle 2s infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    // Custom plugin for PyLearn specific utilities
    function({ addUtilities, theme }: { addUtilities: any, theme: any }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow: '0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.bg-grid': {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23e5e7eb'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`,
        },
        '.bg-grid-small': {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20' fill='none' stroke='%23e5e7eb'%3e%3cpath d='m0 .5h20m-20 20v-20'/%3e%3c/svg%3e")`,
        },
        '.scroll-smooth': {
          scrollBehavior: 'smooth',
        },
        '.scroll-auto': {
          scrollBehavior: 'auto',
        },
      }
      addUtilities(newUtilities);
    }
  ],
} satisfies Config;
