import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function DropzonePage(props) {
  const [files, setFiles] = React.useState([]);
  const {
    getRootProps, getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const prevFiles = [...files];
      const newFiles = acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }));

      setFiles(prevFiles.concat(newFiles));
    },
  });

  const thumbs = files.map((file, idx) => (
    <div className={ 'thumb' } key={ `${file.name}_${idx}` }>
      <div className={ 'thumbInner' }>
        <img
          alt={ `${file.name}_${idx}` }
          src={ file.preview }
        />
      </div>
    </div>
  ));

  const DropzoneItem = () => {
    if (!files.length) {
      return (<p>Drag &apos;n drop some files here, or click to select files</p>);
    }
    return (<aside className={ 'thumbsContainer' }>
      {thumbs}
    </aside>);
  };

  /*   React.useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
   */

  return (
    <section className="container">
      <Container { ...getRootProps({ isDragActive, isDragAccept, isDragReject }) }>
        <input { ...getInputProps() } />
        <DropzoneItem />

      </Container>
      <Link to='/resize'>
        <button>Далее</button>
      </Link>
    </section>
  );
}

export default DropzonePage;
