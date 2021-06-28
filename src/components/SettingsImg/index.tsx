import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import { useStore } from 'effector-react';
import { $quality, $color } from '../../effector/store';
import { setColor, setQuality } from '../../effector/event';
import { IvalueOfSelect } from '../../interfaces/items';

import styles from './SettingsImg.module.css';

const qualities = ['low', 'middle', 'high'];
const colors = ['1', '8', '12', '15', '24'];

const SettingsImg: React.FC = () => {
  const color: string = useStore($color);
  const quality: string = useStore($quality);

  const onSetQuality = (event: React.ChangeEvent<IvalueOfSelect>): void => {
    const quality = event.target.value;
    setQuality(quality);
  };

  const onSetColor = (event: React.ChangeEvent<IvalueOfSelect>): void => {
    const color = event.target.value;
    setColor(color);
  };

  return (
    <div className={styles.selects}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="quality-select-label">Quality</InputLabel>
            <Select id="quality-select" labelId="quality-select-label" onChange={onSetColor} value={quality}>
              {qualities.map((el: string, idx: number) => {
                return (
                  <MenuItem key={`${idx}_${el}`} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="color-select-label">Colors</InputLabel>
            <Select id="color-select" labelId="color-select-label" onChange={onSetQuality} value={color}>
              {colors.map((el: string, idx: number) => {
                return (
                  <MenuItem key={`${idx}_${el}`} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsImg;
