import { ChangeEvent, DragEvent, ReactElement, useState } from "react";
import addImageIcon from '/images/add-image-icon.svg';
import { useUploadImageMutation } from "../api/uploadImageApi";

export function FileInputWithDrag(): ReactElement {
  const [isDragActive, setIsDragActive] = useState(false);
  const [imageState, setImageState] = useState({isImageUpload: false, src: ''});
  const [ uploadImage ] = useUploadImageMutation();

  function handleDrag(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();

    setIsDragActive(false);

    if (e.dataTransfer.files) {
      setFormDataAndUploadImage(e.dataTransfer.files[0]);
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFormDataAndUploadImage(e.target.files[0]);
    }
  }

  function setFormDataAndUploadImage(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    uploadImage(formData)
    .unwrap()
    .then((res) => {
      setImageState({isImageUpload: true, src: `https://storage.googleapis.com/meetups-dev/media/${res.url}`});
      // setValue from react-hook-form
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <input
        onChange={onChange}
        type="file"
        id="input-upload-file"
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
      />
      <label onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} htmlFor="input-upload-file" className={`bg-gray flex flex-col items-center max-w-[270px] rounded-[10px] box-border h-[170px] overflow-hidden flex items-center justify-center ${isDragActive ? "border-dashed border-2 border-text-light-gray" : ""}`}>
        {
          imageState.isImageUpload ? (
            <img className="object-cover" src={imageState.src} />
          ) : (
            <>
              <img className="mt-[45px]" src={addImageIcon} />
              <p className="text-[18px] text-text-light-gray mt-5 mb-[22px] leading-[22.59px]">Загрузите главное фото</p>
            </>
          )
        }
      </label>
    </>
  )
}
