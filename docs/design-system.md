# Design System Documentation for ADD_TaskFlow-App

This document outlines the core design tokens and UI components that form the visual language of the ADD_TaskFlow-App. Adhering to these guidelines ensures consistency and a cohesive user experience across the application.

## 1. Colors

Our color palette is defined in `frontend/tailwind.config.ts` and leverages Tailwind CSS for easy utility class usage.

### Primary Gradient
Used for primary actions, branding, and active states.
- **Start:** `#7C3AED` (Deep Purple)
- **End:** `#06D6A0` (Cyan)
- **Usage:** `bg-gradient-primary`

### Surface Color
Used for glassmorphism elements, providing a semi-transparent background with a blurred backdrop.
- **Value:** `rgba(30, 41, 59, 0.7)`
- **Usage:** `bg-surface`

### Semantic Colors
Used to convey specific meanings like success, error, or warnings.
- **Success:** `#10b981` (Green-500)
- **Warning:** `#f59e0b` (Yellow-500)
- **Error:** `#ef4444` (Red-500)

### Secondary / Grayscale
Used for backgrounds, text, borders, and less prominent UI elements.
- **Scale:** Tailwind's default grayscale (50-900)
- **Background Gradient:** `linear-gradient(to bottom, #f8fafc, #f1f5f9)` (`bg-gradient-background`)

## 2. Typography

The application uses the **Inter** font, sourced from Google Fonts, for all text.

### Font Family
- **Primary:** Inter (`font-sans` in Tailwind)
- **Fallback:** `sans-serif`

### Font Weights
Available weights are configured in `frontend/src/app/layout.tsx`.
- Light: `400` (Regular)
- Medium: `500`
- Semibold: `600`
- Bold: `700`

### Font Sizes
Defined in `frontend/tailwind.config.ts` and available as Tailwind utility classes.
- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px (Default)
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 32px

## 3. Spacing System

Our spacing is based on a **4px baseline grid**, ensuring harmonious alignment and consistent visual rhythm.

### Base Unit
- `4px`

### Scale
Defined in `frontend/tailwind.config.ts` and available as Tailwind utility classes (e.g., `p-4` for 4px padding, `m-16` for 16px margin).
- `4` (4px)
- `8` (8px)
- `12` (12px)
- `16` (16px)
- `20` (20px)
- `24` (24px)
- `32` (32px)
- `40` (40px)
- `48` (48px)
- `64` (64px)
- `80` (80px)
- `96` (96px)

## 4. Glassmorphism Design Pattern

The application utilizes a modern glassmorphism design aesthetic, characterized by frosted glass effects, subtle shadows, and vibrant backdrops. This effect enhances depth and visual hierarchy.

### Key Characteristics
- **Frosted Transparency:** Elements feature a semi-transparent background with a blur effect applied to the content behind them, creating a "frosted glass" appearance.
- **Subtle Borders & Shadows:** Light borders and soft shadows provide definition without obscuring the transparency.
- **Vibrant Backdrop:** The effect is most prominent against dynamic, colorful backgrounds, such as animated gradients or particle effects.

### Implementation
- **Tailwind CSS Integration:** Implemented using custom Tailwind CSS utilities defined in `frontend/tailwind.config.ts`, specifically the `backdropFilter` plugin.
- **Core Classes:**
    - `bg-surface`: Applies the semi-transparent background color (`rgba(30, 41, 59, 0.7)`).
    - `backdrop-blur-md`: Applies a medium blur effect to the background content.
    - `border border-opacity-20 border-white-500`: Provides subtle white borders for definition.
- **Fallback:** For browsers that do not support `backdrop-filter`, a graceful fallback is provided by setting a less transparent background color, ensuring readability and visual integrity across all browsers. This is handled via a JavaScript feature detection and a CSS `@supports` rule in `frontend/app/globals.css`.

## 5. Animations

Animations are powered by **Framer Motion** for smooth and engaging user interactions.

### Libraries
- **Core:** `framer-motion` (installed in `frontend/package.json`)
- **Utilities:** `frontend/lib/animations.ts` (for common animation types)

### General Principles
- **Performance:** Animations are optimized for performance across devices, including mobile. The `will-change` CSS property is used where appropriate (`frontend/components/ui/AnimatedBackground.tsx`).
- **Reduced Motion:** Adhering to WCAG guidelines, users can disable or reduce non-essential animations via their system preferences (`prefers-reduced-motion`). This is implemented via CSS variables in `frontend/app/globals.css`.

### Specific Animations
- **Animated Background (`frontend/components/ui/AnimatedBackground.tsx`):
    - Features a `gradient-shift` animation for dynamic mesh gradients.
    - Duration is `15s` for desktop, `8s` for mobile, and `0s` if `prefers-reduced-motion` is enabled, ensuring visual fluidity and performance.
- **Animated Button (`frontend/components/ui/AnimatedButton.tsx`):
    - Incorporates `whileHover` and `whileTap` effects for interactive feedback.
    - Explicit `framer-motion` transitions (`duration: 0.2s`, `ease: "easeOut"`) provide a snappy and controlled response.
- **Page Transition (`frontend/components/ui/PageTransition.tsx`):
    - Provides smooth fade effects between route changes, enhancing navigation experience.
- **Particle Effect (`frontend/components/ui/ParticleEffect.tsx`):
    - Offers subtle floating particles for enhanced visual appeal.

### Default Parameters (configured in `frontend/lib/animations.ts` examples)
- **Duration:** 300ms (common transition duration, applicable to various UI elements)
- **Easing:** `easeInOut` (default for many animations, custom `cubic-bezier(0.4, 0, 0.2, 1)` is available)

### Common Animation Types
- `fadeAnimation` (opacity changes)
- `slideAnimation` (horizontal movement)
- `scaleAnimation` (size changes)

## 6. UI Components

Core reusable UI components are located in `frontend/components/ui/`. These components are built with Tailwind CSS and adhere to the design tokens.

-   **AnimatedButton (`AnimatedButton.tsx`):** Interactive element with built-in hover and tap animations for enhanced user feedback.
-   **GlassCard (`GlassCard.tsx`):** A specialized card component featuring the application's signature glassmorphism style, ideal for content grouping with frosted transparency.
-   **FloatingActionButton (`FloatingActionButton.tsx`):** A prominent, circular button typically used for primary actions, floating above other UI elements.
-   **StatisticsCard (`StatisticsCard.tsx`):** Displays numerical data with animated counts, used for dashboards and profile pages.
-   **Button (`Button.tsx`):** Interactive element for triggering actions. Supports primary, secondary, and ghost variants, with customizable sizes.
-   **Card (`Card.tsx`):** General-purpose container for grouping related content.
-   **Input (`Input.tsx`):** Form input field with support for labels and error messages.
-   **Modal (`Modal.tsx`):** Overlay dialog for displaying critical information or requiring user interaction. Features animated entry/exit.
-   **ConfirmationModal (`ConfirmationModal.tsx`):** A specific type of modal used to confirm user actions before proceeding.
-   **LoadingSpinner (`LoadingSpinner.tsx`):** Animated spinner to indicate loading states. Customizable size and color.
-   **Toast (`Toast.tsx`):** Ephemeral notification messages appearing at the top-right. Supports success, error, warning, and info types with customizable duration.
-   **PageTransition (`PageTransition.tsx`):** Manages smooth transitions between different application pages.
-   **AnimatedBackground (`AnimatedBackground.tsx`):** Provides dynamic mesh gradient backgrounds for an immersive visual experience.
-   **ParticleEffect (`ParticleEffect.tsx`):** Adds subtle, floating particle animations for aesthetic enhancement.


---

*This document is a living guide and will evolve with the project.*
