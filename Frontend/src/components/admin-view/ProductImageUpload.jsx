import React, { useRef, useEffect } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const ProductImageUpload = ({ imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);

  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData()
    data.append("image", imageFile);
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image", data
    );
    console.log("response", response);

    if (response?.data?.success) {
      setUploadImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
    
  }


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
        />
        {
          !imageFile ? (
            <Label
              htmlFor="upload-image"
              className="flex flex-col items-center justify-center h-24 cursor-pointer"
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span className='text-xs md:text-base'>Drag & drop or click to upload image</span>
            </Label>
          ) : <div className="flex items-center justify-between">
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
        }
      </div>
    </>
  )
}

export default ProductImageUpload