import * as React from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  transitionDuration: 0,
  itemSelector: '.grid-image',
  gutter: 10,
  fitWidth: true,

};

function Gallery({ images }) {
  const childElements = images.map((el, idx) => {
    return (
      <li className="grid-image" key={ idx }>
        <img src={ el.preview } />
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
