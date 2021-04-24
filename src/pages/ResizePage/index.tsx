import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import {
  $images, $kitsImages, $idxKitImages, $modalState, $kitsImagesSetting
} from '../../effector/store';
import {
  setCurrentCropImage, setKitImages,
  nextKitImages, previousKitImages, activeModal, disableModal, cancelCropImg, setPointImg, setKitImagesSettings
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import CustomModal from '../../components/CustomModal';
import styles from './ResizePage.module.css';
import { IobjIdxKitImages, IobjImg, ISettingImg, ISettingsImage } from '../../interfaces/items';
import history from '../../router/history';
import BlockImgPreview from '../../components/BlockImgPreview';
import { convertFromBase64 } from '../../services/base64Service';

const ResizePage: React.FC<any> = ({ nextStep, backStep }) => {
  const kitsImages = useStore($kitsImages);
  const images: IobjImg[] = useStore($images);
  const kitsImagesSetting: ISettingsImage[] = useStore($kitsImagesSetting);
  const idxKitImages: IobjIdxKitImages = useStore($idxKitImages);
  const currentIdxKitImages: number = idxKitImages.idx;
  const currenKitImg: any = kitsImages[currentIdxKitImages];
  const currentImg: IobjImg = images[currentIdxKitImages];
  const currentImgSetting: ISettingsImage = kitsImagesSetting[currentIdxKitImages];
  const modalState: boolean = useStore($modalState);

  React.useEffect(() => {
    setCurrentCropImage(kitsImages[currentIdxKitImages]);

  }, [currentIdxKitImages]);

  const addCropedImg = (base64Img: string, settingImg: ISettingImg) => {
    convertFromBase64(base64Img, currenKitImg.length).then((fileImg: IobjImg) => {
      setKitImagesSettings({
        settingImg,
        idx: currentIdxKitImages 
      });
      setKitImages({ 
        kitImages: [...currenKitImg, fileImg],
        idx: currentIdxKitImages });
    });
  };

  const onPreviousImage = () => {
    previousKitImages();
  };

  const onNextImage = () => {
    // eslint-disable-next-line no-unused-expressions
    currentIdxKitImages === idxKitImages.maxIdx ? nextStep() : nextKitImages();
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
        pointState={ currentImgSetting.point }
        setPointState={ setPointImg }
      />
      
      <div className={ styles.kitImages }>
        <Gallery
          files={ currenKitImg }
          onActiveModal={ onActiveModal }
          onCancelCropImg={ cancelCropImg }
          settings={ currentImgSetting.items }
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
            point={ currentImgSetting.point }
            src={ currentImg.preview! }
          />
        </div>
      </CustomModal>

      {
        images.length > 0 && (
          <div className={ styles.buttons }>
        
            <Button
              color='primary'
              onClick={ currentIdxKitImages === 0 ? backStep : onPreviousImage }
              variant='contained'
            >
              Назад
            </Button>
            <Button
              color='primary'
              onClick={ onNextImage }
              variant='contained'
            >
              Далее
            </Button>
          </div>
        )
      }
    </>
  );
};

export default ResizePage;
