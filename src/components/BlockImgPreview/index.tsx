import React from 'react';
import { useStore } from 'effector-react';
import { $stateCropPoint } from '@effector/stores/stateCropPoint';
import { calcPercentFromPx, calcPxStatePoint, calcWidthPoint } from '@services/imageService';
import { IInfoImg, IPointOnImg, IPointPlace } from '@interfaces/items';
import { setActiveChangeSettings } from '@effector/event';
import styles from './BlockImgPreview.module.css';

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
  const [mouseIntoBlock, setMouseIntoBlock] = React.useState<boolean>(false);
  const [pxStatePoint, setPxStatePoint] = React.useState<IPointOnImg>(
    calcPxStatePoint(statePoint, canvasPreview.current)
  );

  const stateCropPoint = useStore($stateCropPoint);

  const resize = React.useCallback(() => {
    const canvas = canvasPreview.current;

    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);
    canvas.width = width;
    canvas.height = height;

    setPxStatePoint(calcPxStatePoint(statePoint, canvasPreview.current));
  }, [statePoint]);

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
  }, [statePoint]);

  React.useEffect(() => {
    if (pxStatePoint) {
      draw(pxStatePoint);
    }
  }, [pxStatePoint]);

  React.useEffect(() => {
    setActiveChangeSettings(mouseIntoBlock);
  }, [mouseIntoBlock]);

  React.useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [statePoint, resize]);

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

      setStatePoint({
        pointWidth: calcPercentFromPx(ImgPreview.current.width, calcWidthPoint(pxStatePoint.pointPlace, { x, y })),
        pointPlace: {
          x: calcPercentFromPx(ImgPreview.current.width, pxStatePoint.pointPlace.x),
          y: calcPercentFromPx(ImgPreview.current.height, pxStatePoint.pointPlace.y),
        },
      });

      setActiveChange(false);
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
    setMouseIntoBlock(true);
  };

  const onLeave = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseIntoBlock(false);
    setActiveChange(false);
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
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        onMouseUp={onUp}
      />
    </div>
  );
};

export default BlockImgPreview;
