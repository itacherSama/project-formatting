import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import {
  $images, $kitsImages, $currentIdxKitImages, $modalState
} from '../../effector/store';
import {
  setCurrentCropImage, setKitImages,
  nextKitImages, previousKitImages, activeModal, disableModal, cancelCropImg
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import CustomModal from '../../components/CustomModal';
import SettingsImg from '../../components/SettingsImg';
import DownloadBtn from '../../components/DownloadBtn';
import styles from './ResizePage.module.css';
import { IobjIdxKitImages, IobjImg, ISettingImg, IImagesAndPoint } from '../../interfaces/items';
import history from '../../router/history';
import BlockImgPreview from '../../components/BlockImgPreview';
import { convertFromBase64 } from '../../services/base64Service';

const ResizePage: React.FC = () => {
  const kitsImages = useStore($kitsImages);
  const images: IobjImg[] = useStore($images);
  const currentIdxKitImages: IobjIdxKitImages = useStore($currentIdxKitImages);
  const currentObjectWithKitImg: IImagesAndPoint = kitsImages[currentIdxKitImages.idx];
  const currentImg: IobjImg = images[currentIdxKitImages.idx];
  const modalState: boolean = useStore($modalState);
  const [pointState, setPointState] = React.useState<any>(null);

  React.useEffect(() => {
    setCurrentCropImage(kitsImages[currentIdxKitImages.idx]);

  }, [currentIdxKitImages]);

  // console.log(currentObjectWithKitImg);

  const addCropedImg = (base64Img: string, settingImg: ISettingImg) => {
    convertFromBase64(base64Img, currentObjectWithKitImg.images.length).then((fileImg: IobjImg) => {
      fileImg.settingImg = settingImg;
      setKitImages({ 
        kitImages: {
          images: [...currentObjectWithKitImg.images, fileImg],
          point: pointState
        }, 
        idx: currentIdxKitImages.idx });
    });
  };

  const onPreviousImage = () => {
    previousKitImages();
  };

  const onNextImage = () => {
    nextKitImages();
  };

  const onActiveModal = () => {
    activeModal();
  };

  const onCloseModal = () => {
    disableModal();
  };

  if (!currentImg) {
    history.navigate('/');
    return null;
  }

  return (
    <>
      <BlockImgPreview
        currentImg={ currentImg }
        pointState={ pointState }
        setPointState={ setPointState }
      />
      
      <div className={ styles.kitImages }>
        <Gallery
          files={ currentObjectWithKitImg.images }
          onActiveModal={ onActiveModal }
          onCancelCropImg={ cancelCropImg }
        />
      </div>
      <CustomModal
        onCloseModal={ onCloseModal }
        open={ modalState }
      >
        <div className={ styles.crop }>
          <Crop
            addCropedImg={ addCropedImg }
            onCloseModal={ onCloseModal }
            src={ currentImg.preview! }
          />
        </div>
      </CustomModal>

      <div className={ styles.buttons }>
        <Button
          color='primary'
          disabled={ currentIdxKitImages.idx === 0 }
          onClick={ onPreviousImage }
          variant='contained'
        >
          Назад
        </Button>
        <Button
          color='primary'
          disabled={ currentIdxKitImages.idx === currentIdxKitImages.maxIdx }
          onClick={ onNextImage }
          variant='contained'
        >
          Далее
        </Button>
      </div>

      <div className={ styles.settings }>
        <SettingsImg />
      </div>

      <div className={ styles.download }>
        <DownloadBtn />
      </div>
    </>
  );
};

export default ResizePage;
