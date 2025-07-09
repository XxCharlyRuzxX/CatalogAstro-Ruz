import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function useDropzoneUpload() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    file,
    clearFile: () => setFile(null),
  };
}
