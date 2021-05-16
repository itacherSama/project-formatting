import React, {
  MouseEvent,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo
} from "react";
import styles from "./BlockImgPreview.module.css";
import {
  calcMinMaxValue,
  calcPercentFromPx,
  calcPlacePoint,
  calcPxFromPercent,
  getWidthPoint,
} from "../../services/imageService";
import { findPointOnCanvas } from "../../utils/differentFunc";

const touchduration = 1000;

/* const defaultStatePoint = {
  widthPoint: null,
  pointPlace: {
    x: null,
    y: null,
  },
};
 */
const getOffset = (e: MouseEvent<HTMLCanvasElement>): number[] => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  return [x, y];
};

const BlockImgPreview: FC<any> = ({
  currentImg,
  statePoint,
  setStatePoint,
  resetStatePoint,
}) => {
  const canvasPreview: any = useRef(null);
  const ImgPreview: any = useRef(null);

  const [activeChange, setActiveChange] = useState<boolean>(false);
  let timer: number;
  const pxStatePoint = useMemo(() => {
    
    if (statePoint?.pointPlace?.x && statePoint?.pointPlace?.y) {
      return { widthPoint: statePoint.widthPoint,
        pointPlace: findPointOnCanvas(statePoint.pointPlace, canvasPreview.current, calcPxFromPercent) };
    }

    return statePoint;

  }, [statePoint]);
  console.log('pxStatePoint', pxStatePoint);
  
  useEffect(() => {
    resize();
  }, [currentImg]);

  useEffect(() => {
    draw(pxStatePoint);
    console.log('statePoint',statePoint);
    
  }, [statePoint]);

  const resize = () => {
    const canvas = canvasPreview.current;
    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue("width"), 10);
    const height = parseInt(cs.getPropertyValue("height"), 10);
    canvas.width = width;
    canvas.height = height;

    draw(pxStatePoint);
  }; 

  useLayoutEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const draw = (statePoint: any): void => {
    const canvas: HTMLCanvasElement = canvasPreview.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (statePoint?.pointPlace?.x && statePoint?.pointPlace?.y) {
      ctx.fillStyle = "red";
      ctx.beginPath();

      ctx.arc(statePoint.pointPlace.x!, statePoint.pointPlace.y!, statePoint.widthPoint, 0, 2 * Math.PI, true);

      ctx.fill();
    }
  };

  const cancelPoint = (e: MouseEvent): void => {
    if (e) {
      e.preventDefault();
    }
    setStatePoint({});
    // resetStatePoint();
  };

  const onDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 2) {
      return false;
    }
    const [x,y] = getOffset(e);
    const newState = { x, y };
    setActiveChange(true);
    setStatePoint({
      ...statePoint,
      widthPoint: getWidthPoint(newState),
      pointPlace: findPointOnCanvas(newState, canvasPreview.current, calcPercentFromPx),
    });
  };

  const onUp = (e: MouseEvent<HTMLCanvasElement>) => {
  
    if (activeChange) {
      const [x,y] = getOffset(e);

      setActiveChange(false);
      setStatePoint( {
        ...statePoint,
        widthPoint: getWidthPoint(pxStatePoint.pointPlace, { x, y }),
      });
    }
  };

  const onMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const [x,y] = getOffset(e);
    if (activeChange) {
      
      const currentState = {
        ...pxStatePoint,
        widthPoint: getWidthPoint(pxStatePoint.pointPlace, { x, y }),

      };
      draw(currentState);
      
    }
  };

  /*   const handleTouchStart = (): void => {
    timer = setTimeout(cancelPoint, touchduration);
  };

  const handleTouchEnd = (): void => {
    if (timer) clearTimeout(timer);
  }; */

  return (
    <div className={ styles.blockImgPreview }>
      <img
        ref={ ImgPreview }
        alt="main"
        src={ currentImg.preview }
      />
      <canvas
        ref={ canvasPreview }
        /*       onClick={ setPoint } */
        onContextMenu={ cancelPoint }
        onMouseDown={ onDown }
        onMouseLeave={ onUp }
        onMouseMove={ onMove }
        onMouseUp={ onUp }
      />
    </div>
  );
};

export default BlockImgPreview;
