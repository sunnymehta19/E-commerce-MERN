import React, { useEffect, useState } from 'react'
import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addFeatureImage, deleteFeatureImage, getFeatureImage } from '@/store/common/featureSlice';
import { MdDelete } from "react-icons/md";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const AdminDashboard = () => {

  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);



  const handleDeleteFeatureImage = (id) => {
    dispatch(deleteFeatureImage(id));
  }


  const handleFeatureImageUpload = () => {
    dispatch(
      addFeatureImage(uploadImageUrl)
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImage());
        setImageFile(null);
        setUploadImageUrl("");

      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch])


  console.log("featureImageList", featureImageList);



  return (
    <>
      <div className="">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadImageUrl={uploadImageUrl}
          setUploadImageUrl={setUploadImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
        />
        <Button
          disabled={imageLoadingState || uploadImageUrl === ""}
          onClick={handleFeatureImageUpload}
          className="mt-5 w-full cursor-pointer"
        >
          Upload
        </Button>

        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((featureItem) => (
              <div
                key={featureItem._id}
                className="border rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  src={featureItem.image}
                  className="w-full h-[300px] object-cover"
                />

                <div className="p-3 flex justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <MdDelete />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          feature image.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteFeatureImage(featureItem._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                </div>
              </div>
            ))
            : null}

        </div>
      </div>
    </>
  )
}

export default AdminDashboard