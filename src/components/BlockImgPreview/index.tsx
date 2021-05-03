import React, {
  MouseEvent,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import styles from "./BlockImgPreview.module.css";
import {
  calcMinMaxValue,
  calcPercentFromPx,
  calcPlacePoint,
  calcPxFromPercent,
  getWidthPoint,
} from "../../services/imageService";

const touchduration = 1000;

const defaultStatePoint = {
  widthPoint: null,
  pointPlace: {
    x: null,
    y: null,
  },
};

const defaultLocalStatePoint = {
  activeChange: false,
  start: {
    x: null,
    y: null,
  },
  end: {
    x: null,
    y: null,
  },
};

const getOffset = (e: MouseEvent<HTMLCanvasElement>): number[] => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  return [x, y];
};

const BlockImgPreview: FC<any> = ({
  currentImg,
  statePoint,
  setStatePoint,
}) => {
  const canvasPreview: any = useRef(null);
  const ImgPreview: any = useRef(null);

  const [localStatePoint, setLocalStatePoint] = useState(defaultLocalStatePoint);
  let timer: number;
  useEffect(() => {
    resize();
  }, [currentImg]);

  useEffect(() => {
    draw({ ...statePoint, ...localStatePoint });
  }, [localStatePoint]);

  useEffect(() => {
    setLocalStatePoint((prevState: any) => {
      const newState = { ...prevState, ...statePoint };
      if (statePoint.pointState?.x && statePoint.pointState?.y) {
        const pointPlace = calcWithFunc({ x: statePoint.pointState.x, y: statePoint.pointState.y }, calcPxFromPercent);
        newState.pointPlace = pointPlace; 
      }

      return newState;
    });
  }, [statePoint]);


  const resize = () => {
    const canvas = canvasPreview.current;
    const cs = getComputedStyle(ImgPreview.current);
    const width = parseInt(cs.getPropertyValue("width"), 10);
    const height = parseInt(cs.getPropertyValue("height"), 10);
    canvas.width = width;
    canvas.height = height;

    draw({ ...statePoint, ...localStatePoint });
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [statePoint]);


  const calcWithFunc = (obj: {x: number, y: number}, func: any) => {
    const canvas = canvasPreview.current;
    const xPercent = func(canvas.width, obj.x);
    const yPercent = func(canvas.height, obj.y);
    return {
      x: xPercent,
      y: yPercent,
    };
  };

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

  /*   const setPoint = (e: MouseEvent<HTMLCanvasElement>): void => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const percentPoint = calcWithFunc(x, y, calcPercentFromPx);

    // setStatePoint(percentPoint);
  }; */

  const cancelPoint = (e: MouseEvent): void => {
    if (e) {
      e.preventDefault();
    }
    setStatePoint(defaultStatePoint);
    setLocalStatePoint(defaultLocalStatePoint);
    
  };

  const onDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 2) {
      return false;
    }
    const [x,y] = getOffset(e);
    
    setLocalStatePoint((prevState: any) => (
      {
        ...prevState,
        activeChange: true,
        start: { x,y }
      }
    ));
  };

  const onUp = (e: MouseEvent<HTMLCanvasElement>) => {
  
    if (statePoint?.activeChange) {
      const [x,y] = getOffset(e);

      const end = {
        x,y
      };

      setLocalStatePoint((prevLState: any) => {
        setStatePoint((prevState: any) => {
          
          return {
            widthPoint: getWidthPoint(prevLState.start, end),
            pointPlace: calcWithFunc(calcPlacePoint(prevLState.start, end), calcPercentFromPx)
          };
        });
        return { ...prevLState,
          activeChange: false,
          end,
        };
      });
      
    }
   
  };

  const onMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const [x,y] = getOffset(e);
    if (statePoint?.activeChange) {
      const end = {
        x,y
      };
      
      const currentState = {
        ...statePoint,
        ...localStatePoint,
        end,
        widthPoint: getWidthPoint(statePoint.start, end),
        pointPlace: calcPlacePoint(statePoint.start, end)
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
