import React, { MouseEvent, FC, useEffect, useLayoutEffect, useRef } from "react";
import styles from './BlockImgPreview.module.css';
import { calcPercentFromPx, calcPxFromPercent } from '../../services/imageService';

const touchduration = 1000;

const BlockImgPreview: FC<any> = ({ currentImg, pointState, setPointState }) => {
  const canvasPreview: any = useRef(null);
  const ImgPreview: any = useRef(null);
  let timer: number;
  useEffect(() => {
    setTimeout(() => {
      resize();
    }, 300);
    
    
  }, [currentImg]);

  useEffect(() => {
    draw();
  }, [pointState]);

  const resize = () => {
    const canvas = canvasPreview.current;
    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);
    canvas.width = width;
    canvas.height = height;

    draw();
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [pointState]);


  const calcWithFunc = (x: number, y: number, func: any) => {
    const canvas = canvasPreview.current;
    const xPercent = func(canvas.width, x);
    const yPercent = func(canvas.height, y);
    return {
      x: xPercent,
      y: yPercent
    };
  };

  const draw = (): void => {
    const canvas: HTMLCanvasElement = canvasPreview.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pointState === null) {
      return;
    }
    
    const pointValue = calcWithFunc(pointState.x, pointState.y, calcPxFromPercent);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(pointValue.x, pointValue.y, 3, 0, 2 * Math.PI, true);
    
    ctx.fill();
  };

  const setPoint = (e: MouseEvent<HTMLCanvasElement>): void => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const percentPoint = calcWithFunc(x, y, calcPercentFromPx);
    
    setPointState(percentPoint);
  };

  const cancelPoint = (e: MouseEvent): void => {
    if (e) {
      e.preventDefault();
    }
    setPointState(null);
  };
  
  const handleTouchStart = (): void => {
    
    timer = setTimeout(cancelPoint, touchduration); 
  };

  const handleTouchEnd = (): void => {
    if (timer)
      clearTimeout(timer);
  };

  return (
    <div className={ styles.blockImgPreview }>
      <img
        ref={ ImgPreview }
        alt="main"
        src={ currentImg.preview }
      />
      <canvas
        ref={ canvasPreview }
        onClick={ setPoint }
        onContextMenu={ cancelPoint }
        onTouchEnd={ handleTouchEnd }
        onTouchStart={ handleTouchStart }
      />
    </div>
  );
};

export default BlockImgPreview;
