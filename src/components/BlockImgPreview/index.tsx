import React, {MouseEvent, FC, useEffect, useLayoutEffect, useRef, useState, useCallback} from 'react';
import styles from './BlockImgPreview.module.css';
import {
  calcPercentFromPx,
  calcPxFromPercent,
  calcWidthPoint,
  calcWidthPointOnCanvas,
} from '../../services/imageService';
import { findPointOnCanvas } from '../../utils/differentFunc';
import { IPointOnImg } from '../../interfaces/items';

// const touchduration = 1000;

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

const BlockImgPreview: FC<{
  statePoint: IPointOnImg;
  currentImg: any,
  setStatePoint: any,
}> = ({ currentImg, statePoint, setStatePoint }) => {
  const canvasPreview: any = useRef(null);
  const ImgPreview: any = useRef(null);

  const [activeChange, setActiveChange] = useState<boolean>(false);
  const [pxStatePoint, setPxStatePoint] = useState<any>(null);

  const getPxWidthPoint = (pointWidth: number) => {
    const widthPointPx = calcWidthPointOnCanvas(pointWidth, canvasPreview.current, calcPxFromPercent);
    const defaultWidthPoint = 3;

    if (widthPointPx === 0) {
      return defaultWidthPoint;
    }
    return widthPointPx;
  };

  const calcPxStatePoint = (argStatePoint: IPointOnImg): IPointOnImg => {
    if (argStatePoint?.pointPlace?.x && argStatePoint?.pointPlace?.y && argStatePoint.pointWidth) {
      return {
        pointPlace: findPointOnCanvas(argStatePoint.pointPlace, canvasPreview.current, calcPxFromPercent),
        pointWidth: getPxWidthPoint(argStatePoint.pointWidth),
      };
    }

    return statePoint;
  };

  const resize = () => {
    const canvas = canvasPreview.current;

    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);
    canvas.width = width;
    canvas.height = height;

    setPxStatePoint(calcPxStatePoint(statePoint));
  };

  const draw = (argStatePoint: IPointOnImg): void => {
    const canvas: HTMLCanvasElement = canvasPreview.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (argStatePoint?.pointPlace?.x && argStatePoint?.pointPlace?.y) {
      ctx.fillStyle = 'red';
      ctx.beginPath();

      ctx.arc(argStatePoint.pointPlace.x!, argStatePoint.pointPlace.y!, argStatePoint.pointWidth, 0, 2 * Math.PI, true);

      ctx.fill();
    }
  };

  useEffect(() => {
    resize();
  }, [resize, currentImg]);

  useEffect(() => {
    setPxStatePoint(calcPxStatePoint(statePoint));
  }, [statePoint, calcPxStatePoint]);

  useEffect(() => {
    draw(pxStatePoint);
  }, [pxStatePoint]);

  useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [statePoint]);

  const getPercentWidthPoint = (firstObj: any, secondObj?: any) => {
    const pointWidth = calcWidthPoint(firstObj, secondObj);
    const widthPointPercent = calcWidthPointOnCanvas(pointWidth, canvasPreview.current, calcPercentFromPx);

    return widthPointPercent;
  };

  const onDown = (e: MouseEvent<HTMLCanvasElement>): void | false => {
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
