import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import { Image, Thumb, ThumbInner, ThumbsSection, ThumbsContainer } from "./ImageDropzone.styles";

interface ImageDropzoneProps {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ file, setFile }) => {
  const onDrop = ([firstFile]: File[]) => {
    setFile(firstFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: onDrop,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    if (file) {
      URL.revokeObjectURL(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <>
      {!file ? (
        <ThumbsSection>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Typography variant="body1">Drag and drop the image you want in your post.</Typography>
          </div>
        </ThumbsSection>
      ) : (
        <>
          <Typography variant="h6">Your Image:</Typography>
          <ThumbsContainer>
            <Thumbs file={file} />
          </ThumbsContainer>
        </>
      )}
    </>
  );
};

const Thumbs = ({ file }: { file: File | undefined }) => (
  <Thumb>
    <ThumbInner>{file && <Image src={URL.createObjectURL(file)} />}</ThumbInner>
  </Thumb>
);

export default ImageDropzone;
