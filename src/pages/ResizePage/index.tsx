import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import { $modalState } from 'effector/store';
import {
  setCurrentCropImage,
  setKitImages,
  changeKitImages,
  nextKitImages,
  previousKitImages,
  activeModal,
  disableModal,
  cancelCropImg,
  setPointImg,
  addKitImageSettings,
  changeKitImageSettings,
} from 'effector/event';
import Gallery from 'components/Gallery';
import Crop from 'components/Crop';
import CustomModal from 'components/CustomModal';
import BlockImgPreview from 'components/BlockImgPreview';
import { convertFromBase64 } from 'services/base64Service';
import { $idxKitImages, $kitsImagesSetting, $kitsImages, $images } from 'effector/stores';
import {
  IobjIdxKitImages,
  IInfoImg,
  ISettingImg,
  ISettingsImage,
  IImgSettingsNaturalSize,
} from 'interfaces/interfaces';
import styles from './ResizePage.module.css';

type Props = {
  nextStep: () => void;
  backStep: () => void;
};

const ResizePage = ({ nextStep, backStep }: Props) => {
  const kitsImages = useStore($kitsImages);
  const images: IInfoImg[] = useStore($images);
  const kitsImagesSetting: ISettingsImage[] = useStore($kitsImagesSetting);
  const idxKitImages: IobjIdxKitImages = useStore($idxKitImages);
  const currentIdxKitImages: number = idxKitImages.idx;
  const currenKitImg: IInfoImg[] = kitsImages[currentIdxKitImages];
  const currentImg: IInfoImg = images[currentIdxKitImages];
  const [currentChangeCrop, setCurrentChangeCrop] = useState<null | number>(null);
  const currentImgSetting: ISettingsImage = kitsImagesSetting[currentIdxKitImages] || {};
  const modalState: boolean = useStore($modalState);

  useEffect(() => {
    setCurrentCropImage(kitsImages[currentIdxKitImages]);
  }, [currentIdxKitImages, kitsImages]);

  const settingItem = currentChangeCrop ? currentImgSetting.items[currentChangeCrop] : null;

  const resetCurrentChangeCrop = useCallback(() => {
    setCurrentChangeCrop(null);
  }, []);

  const addCropedImg = useCallback(
    (base64Img: string, settingImg: ISettingImg, dataByNaturalSize: IImgSettingsNaturalSize) => {
      convertFromBase64(base64Img, currenKitImg.length).then((fileImg: IInfoImg) => {
        if (currentChangeCrop === null) {
          addKitImageSettings({
            settingImg,
            dataByNaturalSize,
            idx: currentIdxKitImages,
          });
          setKitImages({
            cropItem: fileImg,
            idx: currentIdxKitImages,
          });
        } else {
          changeKitImageSettings({
            settingImg,
            dataByNaturalSize,
            idx: currentIdxKitImages,
            cropId: currentChangeCrop,
          });
          changeKitImages({
            cropItem: fileImg,
            idx: currentIdxKitImages,
            cropId: currentChangeCrop,
          });
        }
      });
    },
    [currentChangeCrop, currentIdxKitImages, currenKitImg.length]
  );

  const onPreviousImage = () => {
    previousKitImages();
  };

  const onNextImage = () => {
    if (currentIdxKitImages === idxKitImages.maxIdx) {
      nextStep();
    } else {
      nextKitImages();
    }
  };

  const onActiveModal = (cropNumber?: number) => {
    if (cropNumber !== undefined) {
      setCurrentChangeCrop(cropNumber);
    } else {
      console.log('else');
    }
    activeModal();
  };

  const onCloseModal = () => {
    disableModal();
  };

  if (!currentImg) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <BlockImgPreview currentImg={currentImg} setStatePoint={setPointImg} statePoint={currentImgSetting?.point} />

      <div className={styles.kitImages}>
        <Gallery
          files={currenKitImg}
          settings={currentImgSetting?.items}
          onActiveModal={onActiveModal}
          onCancelCropImg={cancelCropImg}
        />
      </div>
      <CustomModal open={modalState} onCloseModal={onCloseModal}>
        <div className={styles.crop}>
          <Crop
            addCropedImg={addCropedImg}
            point={currentImgSetting?.point}
            resetCurrentChangeCrop={resetCurrentChangeCrop}
            setting={settingItem}
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
