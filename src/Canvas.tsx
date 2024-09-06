import FabricCanvas from './compenents/FabricCanvas'
import './App.css'
import Toolbar from './compenents/Toolbar'
import { useRef } from 'react';
import { AddTextFunction, AddMosaicFunction, AddShapeFunction } from '@/types/fabricCanvas'

function Canvas(screenshotUrl) {
  const addTextRef = useRef<AddTextFunction | null>(null);
  const addMosaicRef = useRef<AddMosaicFunction | null>(null);
  const addShapeRef = useRef<AddShapeFunction | null>(null);

  const handleAddText = () => {
    addTextRef.current();
  }
  const handleAddMosaic = () => {
    addMosaicRef.current();
  }
  const handleAddShape = (shape: 'rectangle' | 'circle') => {
    addShapeRef.current(shape);
  }

  return (
    <>
      <div className="canvas">
        <Toolbar
          onAddText={handleAddText}
          onAddMosaic={handleAddMosaic}
          onAddShape={handleAddShape}
        />
        <FabricCanvas
          screenshotUrl={screenshotUrl}
          addTextRef={addTextRef}
          addMosaicRef={addMosaicRef}
          addShapeRef={addShapeRef}
        />
      </div>
    </>
  )
}

export default Canvas
