import React, { useLayoutEffect, useEffect, useCallback, FC, useRef, useState, MouseEvent } from 'react';
import { calcPercentFromPx, calcPxStatePoint, calcWidthPoint } from '@services/imageService';
import { IInfoImg, IPointOnImg } from '@interfaces/interfaces';
import { setActiveChangeSettings } from '@effector/event';
import styles from './BlockImgPreview.module.css';

const getOffset = (e: MouseEvent<HTMLCanvasElement>): number[] => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;

  return [x, y];
};

const BlockImgPreview: FC<{
  statePoint: IPointOnImg;
  currentImg: IInfoImg;
  setStatePoint: (pxStatePoint?: IPointOnImg) => void;
}> = ({ currentImg, statePoint, setStatePoint }) => {
  const canvasPreview: any = useRef();
  const ImgPreview: any = useRef();
  const [activeChange, setActiveChange] = useState<boolean>(false);
  const [mouseIntoBlock, setMouseIntoBlock] = useState<boolean>(false);

  const [pxStatePoint, setPxStatePoint] = useState<IPointOnImg>({
    pointPlace: {
      x: null,
      y: null,
    },
    pointWidth: null,
  });

  const resize = useCallback(() => {
    const canvas = canvasPreview.current;
    if (ImgPreview.current) {
      const cs = getComputedStyle(ImgPreview.current);
      const width = parseInt(cs.getPropertyValue('width'), 10);
      const height = parseInt(cs.getPropertyValue('height'), 10);
      canvas.width = width;
      canvas.height = height;

      setPxStatePoint(calcPxStatePoint(statePoint, canvasPreview.current));
    }
  }, [statePoint, ImgPreview]);

  const draw = useCallback((argStatePoint: IPointOnImg): void => {
    const canvas: HTMLCanvasElement = canvasPreview.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (argStatePoint?.pointWidth && argStatePoint?.pointPlace?.x && argStatePoint?.pointPlace?.y) {
      ctx.fillStyle = 'red';
      ctx.beginPath();

      ctx.arc(argStatePoint.pointPlace.x, argStatePoint.pointPlace.y, argStatePoint.pointWidth, 0, 2 * Math.PI, true);

      ctx.fill();
    }
  }, []);

  useEffect(() => {
    resize();
    ImgPreview.current.onload = function () {
      resize();
    };
  }, [resize, ImgPreview]);

  useEffect(() => {
    setPxStatePoint(calcPxStatePoint(statePoint, canvasPreview.current));
  }, [statePoint]);

  useEffect(() => {
    if (pxStatePoint) {
      draw(pxStatePoint);
    }
  }, [pxStatePoint]);

  useEffect(() => {
    setActiveChangeSettings(mouseIntoBlock);
  }, [mouseIntoBlock]);

  useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const onDown = useCallback(
    (e: MouseEvent<HTMLCanvasElement>): void | false => {
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
    },
    [pxStatePoint]
  );

  const onUp = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      if (activeChange) {
        const [x, y] = getOffset(e);

        const { x: newPointPlaceX, y: newPointPlaceY } = pxStatePoint.pointPlace;
        const calcPointPlaceX = calcPercentFromPx(ImgPreview.current.width, newPointPlaceX);
        const calcPointPlaceY = calcPercentFromPx(ImgPreview.current.height, newPointPlaceY);

        const calcPointWidth = calcPercentFromPx(
          ImgPreview.current.width,
          calcWidthPoint(pxStatePoint.pointPlace, {
            x,
            y,
          })
        );

        const res: IPointOnImg = {
          pointWidth: calcPointWidth,
          pointPlace: {
            x: calcPointPlaceX,
            y: calcPointPlaceY,
          },
        };

        setStatePoint(res);
        setActiveChange(false);
      }
    },
    [activeChange, pxStatePoint.pointPlace, setStatePoint]
  );

  const onMove = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      const [x, y] = getOffset(e);
      if (activeChange) {
        const currentState = {
          ...pxStatePoint,
          pointWidth: calcWidthPoint(pxStatePoint.pointPlace, { x, y }),
        };
        draw(currentState);
      }
      setMouseIntoBlock(true);
    },
    [pxStatePoint, draw, activeChange]
  );

  const onLeave = useCallback(() => {
    setMouseIntoBlock(false);
    setActiveChange(false);
  }, []);

  const cancelPoint = useCallback(
    (e: MouseEvent): void => {
      if (e) {
        e.preventDefault();
      }
      setStatePoint();
    },
    [setStatePoint]
  );

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
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        onMouseUp={onUp}
      />
    </div>
  );
};

export default BlockImgPreview;
