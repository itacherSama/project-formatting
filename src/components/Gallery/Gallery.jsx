import * as React from 'react';
import Masonry from 'react-masonry-component';
import cn from 'classnames';
import { getWidthAndHeightFromFile, calcProportion, getTypeByPropotion } from '../../utils';

const masonryOptions = {
  itemSelector: '.grid-image',

  columnWidth: 1,
};

const typesBlock = ['normal', 'width', 'height'];

function Gallery({ files }) {
  const childElements = files.map((file, idx) => {
    const { imgWidth, imgHeight } = getWidthAndHeightFromFile(file);

    const proportionWidth = calcProportion(imgWidth, 160, imgHeight);
    const proportionHeight = calcProportion(imgHeight, 180, imgWidth);

    const currentType = getTypeByPropotion(proportionWidth, proportionHeight, typesBlock);

    return (
      <li
        className={ cn(
          'grid-image',
          {
            'grid-item--default': currentType === typesBlock[0],
            'grid-item--width2': currentType === typesBlock[1],
            'grid-item--height2': currentType === typesBlock[2],
          },
        ) } key={ idx }
      >
        <img src={ file.preview } />
      </li>
    );
  });

  return (
    <>
      <Masonry className="grid" elementType="ul" options={ masonryOptions }>
        {childElements}
      </Masonry>
    </>
  );
}

export default Gallery;
