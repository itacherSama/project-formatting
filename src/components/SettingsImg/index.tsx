import React, { ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import { useStore } from 'effector-react';
import { $quality, $color } from 'effector/store';
import { setColor, setQuality } from 'effector/event';
import { IvalueOfSelect } from 'interfaces/interfaces';
import messages from 'messages/index.json';
import styles from './SettingsImg.module.css';

const SettingsImg = () => {
  const color: string = useStore($color);
  const quality: string = useStore($quality);

  const onSetQuality = (event: ChangeEvent<IvalueOfSelect>): void => {
    const qualityValue = event.target.value as string;
    setQuality(qualityValue);
  };

  const onSetColor = (event: ChangeEvent<IvalueOfSelect>): void => {
    const colorValue = event.target.value as string;
    setColor(colorValue);
  };

  return (
    <div className={styles.selects}>
      <Grid spacing={4} container>
        <Grid xs={6} item>
          <FormControl fullWidth>
            <InputLabel id="quality-select-label">Quality</InputLabel>
            <Select id="quality-select" labelId="quality-select-label" value={quality} onChange={onSetColor}>
              {messages.qualities.map((el: string) => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6} item>
          <FormControl fullWidth>
            <InputLabel id="color-select-label">Colors</InputLabel>
            <Select id="color-select" labelId="color-select-label" value={color} onChange={onSetQuality}>
              {messages.colors.map((el: string) => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsImg;
