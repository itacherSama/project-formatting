import React, { MouseEvent, FC, useEffect, useLayoutEffect, useRef, useState, useMemo, useCallback } from 'react';
import styles from './BlockImgPreview.module.css';
import {
  calcMinMaxValue,
  calcPercentFromPx,
  calcPlacePoint,
  calcPxFromPercent,
  calcWidthPoint,
  calcWidthPointOnCanvas,
} from '../../services/imageService';
import { findPointOnCanvas } from '../../utils/differentFunc';

const touchduration = 1000;

/* const defaultStatePoint = {
  pointWidth: null,
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

const BlockImgPreview: FC<any> = ({ currentImg, statePoint, setStatePoint }) => {
  const canvasPreview: any = useRef(null);
  const ImgPreview: any = useRef(null);

  const [activeChange, setActiveChange] = useState<boolean>(false);
  const [pxStatePoint, setPxStatePoint] = useState<any>(null);
  const calcPxStatePoint = (statePoint: any) => {
    if (statePoint?.pointPlace?.x && statePoint?.pointPlace?.y && statePoint.pointWidth) {
      return {
        pointPlace: findPointOnCanvas(statePoint.pointPlace, canvasPreview.current, calcPxFromPercent),
        pointWidth: getPxWidthPoint(statePoint.pointWidth),
      };
    }

    return statePoint;
  };

  useEffect(() => {
    resize();
  }, [currentImg]);

  useEffect(() => {
    setPxStatePoint(calcPxStatePoint(statePoint));
  }, [statePoint]);

  useEffect(() => {
    draw(pxStatePoint);
  }, [pxStatePoint]);

  const resize = () => {
    const canvas = canvasPreview.current;

    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);
    canvas.width = width;
    canvas.height = height;

    setPxStatePoint(calcPxStatePoint(statePoint));
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [statePoint]);

  const draw = (statePoint: any): void => {
    const canvas: HTMLCanvasElement = canvasPreview.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (statePoint?.pointPlace?.x && statePoint?.pointPlace?.y) {
      ctx.fillStyle = 'red';
      ctx.beginPath();

      ctx.arc(statePoint.pointPlace.x!, statePoint.pointPlace.y!, statePoint.pointWidth, 0, 2 * Math.PI, true);

      ctx.fill();
    }
  };

  const getPercentWidthPoint = (firstObj: any, secondObj?: any) => {
    const pointWidth = calcWidthPoint(firstObj, secondObj);
    const widthPointPercent = calcWidthPointOnCanvas(pointWidth, canvasPreview.current, calcPercentFromPx);

    return widthPointPercent;
  };

  const getPxWidthPoint = (pointWidth: number) => {
    const widthPointPx = calcWidthPointOnCanvas(pointWidth, canvasPreview.current, calcPxFromPercent);
    const defaultWidthPoint = 3;

    if (widthPointPx === 0) {
      return defaultWidthPoint;
    }
    return widthPointPx;
  };

  const onDown = (e: MouseEvent<HTMLCanvasElement>) => {
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

  const onUp = (e: MouseEvent<HTMLCanvasElement>) => {
    if (activeChange) {
      const [x, y] = getOffset(e);

      setActiveChange(false);
      setStatePoint({
        ...pxStatePoint,
        pointWidth: getPercentWidthPoint(pxStatePoint.pointPlace, { x, y }),
        pointPlace: findPointOnCanvas(pxStatePoint.pointPlace, canvasPreview.current, calcPercentFromPx),
      });
    }
  };

  const onMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const [x, y] = getOffset(e);
    if (activeChange) {
      const currentState = {
        ...pxStatePoint,
        pointWidth: calcWidthPoint(pxStatePoint.pointPlace, { x, y }),
      };
      draw(currentState);
    }
  };

  const cancelPoint = (e: MouseEvent): void => {
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
