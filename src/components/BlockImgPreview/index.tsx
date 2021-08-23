import React from 'react';
import styles from './BlockImgPreview.module.css';
import {
  calcPercentFromPx,
  calcPxStatePoint,
  calcWidthPoint,
  calcWidthPointOnCanvas,
} from '../../services/imageService';
import { findPointOnCanvas } from '../../utils/differentFunc';
import { IInfoImg, IPointOnImg, IPointPlace } from '../../interfaces/items';

const getOffset = (e: React.MouseEvent<HTMLCanvasElement>): number[] => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  return [x, y];
};

const BlockImgPreview: React.FC<{
  statePoint: IPointOnImg;
  currentImg: IInfoImg;
  setStatePoint: (pxStatePoint?: any, newDataForPointWidth?: IPointPlace, canvas?: any) => void;
}> = ({ currentImg, statePoint, setStatePoint }) => {
  const canvasPreview: any = React.useRef(null);
  const ImgPreview: any = React.useRef(null);

  const [activeChange, setActiveChange] = React.useState<boolean>(false);
  const [pxStatePoint, setPxStatePoint] = React.useState<IPointOnImg>(statePoint);

  const resize = React.useCallback(() => {
    const canvas = canvasPreview.current;

    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);
    canvas.width = width;
    canvas.height = height;

    setPxStatePoint(calcPxStatePoint(statePoint, canvas));
  }, [calcPxStatePoint, statePoint]);

  const draw = (argStatePoint: IPointOnImg): void => {
    const canvas: HTMLCanvasElement = canvasPreview.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (argStatePoint?.pointPlace?.x && argStatePoint?.pointPlace?.y) {
      ctx.fillStyle = 'red';
      ctx.beginPath();

      ctx.arc(argStatePoint.pointPlace.x, argStatePoint.pointPlace.y, argStatePoint.pointWidth, 0, 2 * Math.PI, true);

      ctx.fill();
    }
  };

  React.useEffect(() => {
    resize();
  }, [resize, currentImg]);

  React.useEffect(() => {
    setPxStatePoint(calcPxStatePoint(statePoint, canvasPreview.current));
  }, [statePoint, calcPxStatePoint]);

  React.useEffect(() => {
    if (pxStatePoint) {
      draw(pxStatePoint);
    }
  }, [pxStatePoint]);

  React.useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [statePoint, resize]);

  const getPercentWidthPoint = (firstObj: IPointPlace, secondObj?: IPointPlace) => {
    const pointWidth = calcWidthPoint(firstObj, secondObj);
    const widthPointPercent = calcWidthPointOnCanvas(pointWidth, canvasPreview.current, calcPercentFromPx);

    return widthPointPercent;
  };

  const onDown = (e: React.MouseEvent<HTMLCanvasElement>): void | false => {
    if (e.button === 2) {
      return false;
    }
    const [x, y] = getOffset(e);
    const newState = { x, y };
    setActiveChange(true);

    setPxStatePoint({
      ...pxStatePoint,
      pointWidth: calcWidthPoint(pxStatePoint.pointPlace),
      pointPlace: newState,
    });
  };

  const onUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeChange) {
      const [x, y] = getOffset(e);

      setActiveChange(false);
      setStatePoint({
        pxStatePoint,
        newDataForPointWidth: { x, y },
        canvas: canvasPreview.current,
      });

      setStatePoint({
        ...pxStatePoint,
        pointWidth: getPercentWidthPoint(pxStatePoint.pointPlace, { x, y }),
        pointPlace: findPointOnCanvas(pxStatePoint.pointPlace, canvasPreview.current, calcPercentFromPx),
      });
    }
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const [x, y] = getOffset(e);
    if (activeChange) {
      const currentState = {
        ...pxStatePoint,
        pointWidth: calcWidthPoint(pxStatePoint.pointPlace, { x, y }),
      };
      draw(currentState);
    }
  };

  const cancelPoint = (e: React.MouseEvent): void => {
    if (e) {
      e.preventDefault();
    }
    setStatePoint();
  };

  /*   const handleTouchStart = (): void => {
    timer = setTimeout(cancelPoint, touchduration);
  };

  const handleTouchEnd = (): void => {
    if (timer) clearTimeout(timer);
  }; */

  return (
    <div className={styles.blockImgPreview}>
      <img ref={ImgPreview} alt="main" src={currentImg.preview} />
      <canvas
        ref={canvasPreview}
        /*       onClick={ setPoint } */
        onContextMenu={cancelPoint}
        onMouseDown={onDown}
        onMouseLeave={onUp}
        onMouseMove={onMove}
        onMouseUp={onUp}
      />
    </div>
  );
};

export default BlockImgPreview;
