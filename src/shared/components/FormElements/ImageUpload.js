import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

//This is a component for the user to upload his/her own images
//Currencly not used
const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, SetPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      if (!file) {
          return;
      }
      const fileReader = new FileReader();
      //onload function will execute when readAsDataURL is done
      fileReader.onload = () => {
          SetPreviewUrl(fileReader.result);
      }
      fileReader.readAsDataURL(file);
    }, [file])

  const pickedImageHandler = (event) => {
    let pickedFile;
    let fileisValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileisValid = true;
    } else {
      setIsValid(false);
      fileisValid = false;
    }
    props.onInput(props.id, pickedFile, fileisValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedImageHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
