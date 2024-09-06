export type ToolbarProps = {
  onAddText: () => void;
  onAddMosaic: () => void;
  onAddShape: (shape: 'rectangle' | 'circle') => void;
}

export type AddTextFunction = () => void;
export type AddMosaicFunction = () => void;
export type AddShapeFunction = (shape: 'rectangle' | 'circle') => void;