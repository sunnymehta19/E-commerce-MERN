import React, { useEffect, useState } from 'react';
import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import DashboardStatCard from '@/components/admin-view/DashboardStatCard';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addFeatureImage, deleteFeatureImage, getFeatureImage } from '@/store/common/featureSlice';
import { MdDelete } from "react-icons/md";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ShoppingBag, ShoppingCart, Users, IndianRupee } from "lucide-react";
import { fetchDashboardStats } from '@/store/admin-slice/dashboardSlice';



const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();

  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { stats, isLoading } = useSelector((state) => state.adminDashboard);



  const handleDeleteFeatureImage = (id) => {
    dispatch(deleteFeatureImage(id));
  };

  const handleFeatureImageUpload = () => {
    dispatch(addFeatureImage(uploadImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImage());
        setImageFile(null);
        setUploadImageUrl("");
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImage());
    dispatch(fetchDashboardStats());
  }, [dispatch]);


  return (
    <div className="space-y-8">

      {isLoading ? (
        <div className="text-center text-muted-foreground py-10">
          Loading dashboard data...
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          <DashboardStatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<ShoppingBag />}
            bgColor="bg-white"
          />
          <DashboardStatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart />}
            bgColor="bg-white"
          />
          <DashboardStatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users />}
            bgColor="bg-white"
          />
          <DashboardStatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue}`}
            icon={<IndianRupee />}
            bgColor="bg-white"
          />
        </div>
      ) : null}



      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-bold mb-4">
          Homepage Feature Images
        </h2>

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
          className="mt-5 w-full"
        >
          Upload Feature Image
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {featureImageList?.map((featureItem) => (
          <div
            key={featureItem._id}
            className="border rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={featureItem.image}
              className="w-full h-[200px] object-cover"
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
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        handleDeleteFeatureImage(featureItem._id)
                      }
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
