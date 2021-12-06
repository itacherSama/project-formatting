import React from 'react';
import SettingsImg from '../../components/SettingsImg';
import DownloadBtn from '../../components/DownloadBtn';
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
