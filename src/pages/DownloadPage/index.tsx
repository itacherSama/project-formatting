import React from 'react';
import { SettingsImg, DownloadBtn } from '@components';
import styles from './DownloadPage.module.css';

const DownloadPage: React.FC<any> = () => (
  <>
    <div className={styles.settings}>
      <SettingsImg />
    </div>

    <div className={styles.download}>
      <DownloadBtn />
    </div>
  </>
);

export default DownloadPage;
