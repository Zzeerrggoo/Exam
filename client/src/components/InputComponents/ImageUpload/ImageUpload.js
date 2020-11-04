import React from 'react';
import classNames from 'classnames';
import {useField} from 'formik';

const ImageUpload = (props) => {

  const [field, meta] = useField(props);
  const {value} = meta;
  const {uploadContainer, inputContainer, imgStyle} = props.classes;

  const onChange = (e) => {
    const node = window.document.getElementById('imagePreview');
    const file = e.target.files[0];
    const {onChange} = field;
    const imageType = /image.*/;
    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      onChange(e);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className={uploadContainer}>
        <div className={inputContainer}>
          <span>Support only images (*.png, *.jpg, *.jpeg)</span>
          <input
              {...field}
              id="fileInput"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={onChange}
          />
          <label htmlFor="fileInput">Chose file</label>
        </div>

        <img id="imagePreview"
             className={classNames({[imgStyle]: !!value})}
             alt="imagePreview"/>
      </div>
  );
};

export default ImageUpload;



