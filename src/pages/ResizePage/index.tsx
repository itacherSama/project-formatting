import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import { $modalState } from '../../effector/store';
import {
  setCurrentCropImage,
  setKitImages,
  nextKitImages,
  previousKitImages,
  activeModal,
  disableModal,
  cancelCropImg,
  setPointImg,
  setKitImagesSettings,
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import CustomModal from '../../components/CustomModal';
import styles from './ResizePage.module.css';
import { IobjIdxKitImages, IobjImg, ISettingImg, ISettingsImage } from '../../interfaces/items';
import history from '../../router/history';
import BlockImgPreview from '../../components/BlockImgPreview';
import { convertFromBase64 } from '../../services/base64Service';
import { $idxKitImages } from '../../effector/stores/idxKitImages';
import { $kitsImagesSetting } from '../../effector/stores/kitsImagesSetting';
import { $images } from '../../effector/stores/images';
import { $kitsImages } from '../../effector/stores/kitsImages';

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
  /*
  console.log('images', images);
  console.log('currenKitImg', currenKitImg);
  console.log('currentImgSetting', currentImgSetting);
  */

  React.useEffect(() =>  {
    setCurrentCropImage(kitsImages[currentIdxKitImages]);
  }, [currentIdxKitImages] );

  const addCropedImg = (base64Img: string, settingImg: ISettingImg) => {
    convertFromBase64(base64Img, currenKitImg.length).then((fileImg: IobjImg) => {
      setKitImagesSettings(     {
        settingImg,
        idx: currentIdxKitImages,

      })

      ;
      setKitImages({
        kitImages: [ ...currenKitImg, fileImg],
        idx: currentIdxKitImages,
      });
    });
  };

  const onPreviousImage = () =>   {
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
      <BlockImgPreview currentImg={currentImg} setStatePoint={setPointImg} statePoint={currentImgSetting?.point} />

      <div className={styles.kitImages}>
        <Gallery
          files={currenKitImg}
          settings={currentImgSetting.items}
          onActiveModal={onActiveModal}
          onCancelCropImg={cancelCropImg}
        />
      </div>
      <CustomModal open={modalState} onCloseModal={onCloseModal}>
        <div className={styles.crop}>
          <Crop
            addCropedImg={addCropedImg}
            point={currentImgSetting.point}
            src={currentImg.preview!}
            onCloseModal={onCloseModal}
          />
        </div>
      </CustomModal>

      {images.length > 0 && (
        <div className={styles.buttons}>
          <Button color="primary" variant="contained" onClick={currentIdxKitImages === 0 ? backStep : onPreviousImage}>
            Назад
          </Button>
          <Button color="primary" variant="contained" onClick={onNextImage}>
            Далее
          </Button>
        </div>
      )}
    </>
  );
};

export default ResizePage;
