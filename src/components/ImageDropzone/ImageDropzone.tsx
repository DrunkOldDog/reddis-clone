import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import { Image, Thumb, ThumbInner, ThumbsSection, ThumbsContainer } from "./ImageDropzone.styles";

interface ImageDropzoneProps {
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ file, setFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const thumbs = (
    <Thumb>
      <ThumbInner>
        <Image src={file} />
      </ThumbInner>
    </Thumb>
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(file);
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
          <ThumbsContainer>{thumbs}</ThumbsContainer>
        </>
      )}
    </>
  );
};

export default ImageDropzone;
