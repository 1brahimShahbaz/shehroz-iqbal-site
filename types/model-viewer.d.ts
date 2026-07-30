import type { HTMLAttributes, DetailedHTMLProps } from "react";

// `<model-viewer>` is a custom element registered at runtime by
// `@google/model-viewer`. Declare it so TSX accepts it with arbitrary
// (kebab-case) attributes like `auto-rotate`, `camera-controls`, etc.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Record<string, unknown>,
        HTMLElement
      >;
    }
  }
}

export {};
