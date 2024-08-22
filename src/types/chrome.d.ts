export type CSSRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
}

export type DOMRect = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Viewport = {
  scale: number;
  offsetX: number;
  offsetY: number;
  clientWidth: number;
  clientHeight: number;
}

export type LayoutMetrics = {
  cssContentSize: CSSRect;
  contentSize: DOMRect;
  visualViewport: Viewport;
  layoutViewport: Viewport;
}
