import { Component } from "react";

/**
 * Keeps a failing 3D scene from taking the page down with it.
 *
 * This is not hypothetical: the site was blank in production for a long time
 * because the old host refused to serve `.bin` files, so `scene.bin` 404'd,
 * GLTFLoader threw, and with no boundary in the tree the throw unmounted the
 * whole app and lost the WebGL context. A missing model should cost you the
 * model, not the portfolio.
 *
 * The boundary has to sit *outside* `<Canvas>`: react-three-fiber forwards
 * errors from its own reconciler up to the enclosing React tree, and the
 * fallback is DOM, which cannot render inside a canvas.
 */
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error(
      `3D scene "${this.props.label ?? "unknown"}" failed to render; ` +
        `showing the fallback instead.`,
      error,
      info
    );
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
