import { React, useRef, useEffect, useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductImageUpload = ({ imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) => {

  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const max_file_size = 10 * 1024 * 1024;
  const handleImageFileChange = (e) => {

    const selectedFile = e.target.files?.[0];
    setErrorMessage("");

    if (!selectedFile) return;
    if (selectedFile.size > max_file_size) {
      setErrorMessage("Image upload failed: File size must be under 10 MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setImageFile(selectedFile);

  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    setErrorMessage("");

    if (!droppedFile) return;

    if (droppedFile.size > max_file_size) {
      setErrorMessage("Image upload failed: File size must be under 10 MB.");
      return;
    }

    setImageFile(droppedFile);
  }

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    setErrorMessage("");

    try {
      const data = new FormData()
      data.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:3000/api/admin/products/upload-image", data
      );


      if (response?.data?.success) {
        setUploadImageUrl(response.data.result.url);
      } else {
        setErrorMessage("Image upload failed. Please try again.");
      }

    } catch (error) {
      const backendMessage =
        error?.response?.data?.message || "Image upload failed due to server error.";
      setErrorMessage(`Upload failed: ${backendMessage}`);

    } finally {
      setImageLoadingState(false);
    }

  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary()
  }, [imageFile])


  return (
    <>
      <div className="w-full">
        <Label className="font-semibold mb-2 block">Upload Image</Label>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4">
        <Input id="upload-image"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        // disabled={isEditMode}
        />
        {
          !imageFile ? (
            <Label
              htmlFor="upload-image"
              className="flex flex-col items-center justify-center h-24 cursor-pointer"
            // className={`${isEditMode ? "cursor-not-allowed" : ""}flex flex-col items-center justify-center h-24 cursor-pointer`}
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span className='text-xs md:text-base'>Drag & drop or click to upload image</span>
            </Label>
          ) : imageLoadingState ? (
            <Skeleton className="h-10 bg-gray-100" />
          ) : (
            < div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className='w-8 text-primary mr-2 h-8' />
              </div>
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                variant='ghost'
                size='icon'
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={handleRemoveImage}
              >
                <XIcon className='w-4 h-4 ' />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
      </div >
      {errorMessage && (
        <p className=" text-sm text-red-500 ">
          *{errorMessage}
        </p>
      )}
    </>
  )
}

export default ProductImageUpload;