import React from 'react';

const DropzonePreview = ({ images }) => {
  const thumbs = images.map((file, idx) => (
    <div className={ 'thumb' } key={ `${file.name}_${idx}` }>
      <div className={ 'thumbInner' }>
        <img
          alt={ `${file.name}_${idx}` }
          src={ file.preview }
        />
      </div>
    </div>
  ));

  if (!images.length) {
    return (<p className={ 'thumbsText' }>Drag &apos;n drop some files here, or click to select files</p>);
  }
  return (<aside className={ 'thumbsContainer' }>
    {thumbs}
  </aside>);
};

export default DropzonePreview;
