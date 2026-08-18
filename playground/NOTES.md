# Accessibility Component Comparison

## Handmade Components vs shadcn/ui

For this assignment, I first built a Modal, Tabs, and Disclosure component from scratch using React and TypeScript. I then installed shadcn/ui and inspected its generated Dialog and Tabs source.

## 1. Modal vs shadcn Dialog

My handmade Modal implemented basic accessibility behavior manually, including Escape-to-close, focus management, focus return, `role="dialog"`, `aria-modal`, and `aria-labelledby`.

The shadcn Dialog is more modular. Instead of implementing everything inside one component, it provides separate components such as `DialogTrigger`, `DialogClose`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogTitle`, and `DialogDescription`.

A major gap in my implementation was that I handled the dialog behavior manually, while shadcn delegates the interaction behavior to Base UI's Dialog primitive. The shadcn implementation also provides reusable portal and overlay components and a structured header/footer API.

Another gap was that my Modal only had a simple close button and basic focus handling. The shadcn Dialog provides a reusable close component, optional close button, screen-reader-only close text, and reusable title and description components.

## 2. Tabs vs shadcn Tabs

My handmade Tabs explicitly implemented the Left and Right arrow-key behavior and manually managed focus using React refs.

The shadcn Tabs delegates the tab interaction behavior to Base UI's Tabs primitive. It provides separate `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent` components.

One concrete gap in my implementation is that my Tabs only supports the horizontal layout I designed, while the shadcn implementation supports both horizontal and vertical orientation.

Another gap is that my implementation contains one fixed tab structure, while shadcn provides reusable variants, disabled-state handling, focus-visible styling, and separate components for the tab list, trigger, and content.

## 3. Key Learning

Building the components from scratch helped me understand the accessibility requirements instead of relying immediately on a component library.

Inspecting shadcn/ui showed me how accessible behavior can be packaged into reusable components while still keeping the implementation source available for review.

The main lesson is that AI-generated or library-generated components should still be reviewed for accessibility behavior rather than being used without understanding how they work.