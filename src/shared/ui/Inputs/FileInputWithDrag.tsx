import { ChangeEvent, DragEvent, ReactElement, ReactNode, useId, useState } from "react";

interface IFileInputWithDragProps {
  children: ReactNode;
  uploadImageFunc: (file: File) => void;
  id?: string;
  extraClass?: string;
  error?: string;
}

export function FileInputWithDrag({ children, uploadImageFunc, id, extraClass, error }: IFileInputWithDragProps): ReactElement {
  const uploadInputId = useId();
  const [isDragActive, setIsDragActive] = useState(false);

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
      uploadImageFunc(e.dataTransfer.files[0]);
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      uploadImageFunc(e.target.files[0]);
    }
  }

  return (
    <>
      <input
        onChange={onChange}
        type="file"
        id={id ? id : uploadInputId}
        className="hidden"
        accept="image/png, image/gif, image/jpeg, image/webp"
      />
      <label onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} htmlFor={id ? id : uploadInputId} className={`bg-custom-gray rounded-[10px] box-border overflow-hidden cursor-pointer ${extraClass} ${isDragActive ? "border-dashed border-2 border-text-light-gray" : ""} ${error && "border-solid border-input-error border-1"}`}>
        {children}
      </label>
    </>
  )
}
