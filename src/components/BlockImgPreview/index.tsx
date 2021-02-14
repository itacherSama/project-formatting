import React from "react";
import styles from './BlockImgPreview.module.css';
import { calcPercentFromPx, calcPxFromPercent } from '../../services/imageService';

const BlockImgPreview: React.FC<any> = ({ currentImg }) => {
  const canvasPreview: any = React.useRef(null);
  const ImgPreview: any = React.useRef(null);
  const [pointState, setPointState] = React.useState<any>(null);

  React.useEffect(() => {
    setTimeout(() => {
      resize();
    }, 300);
    
    
  }, [currentImg]);

  React.useEffect(() => {
    if (!pointState) return;
    draw();
  }, [pointState]);

  const resize = () => {
  
    const canvas = canvasPreview.current;
    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue('width'), 10);
    const height = parseInt(cs.getPropertyValue('height'), 10);
    canvas.width = width;
    canvas.height = height;
    
    if (pointState) {
      draw();
    }
  };

  React.useLayoutEffect(() => {
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

  const draw = () => {
    const canvas: HTMLCanvasElement = canvasPreview.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!; 
    const pointValue = calcWithFunc(pointState.x, pointState.y, calcPxFromPercent);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(pointValue.x, pointValue.y, 3, 0, 2 * Math.PI, true);

    ctx.fill();
  };

  const setPoint = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const percentPoint = calcWithFunc(x, y, calcPercentFromPx);
    
    setPointState(percentPoint);
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
      />
    </div>
  );
};

export default BlockImgPreview;
