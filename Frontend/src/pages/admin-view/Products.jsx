import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { Fragment, useState, useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import ProductImageUpload from '@/components/admin-view/ProductImageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from '@/store/admin-slice/productSlice'
import { showToast } from '@/utils/toast'
import AdminProductTile from '@/components/admin-view/productTile'
import { ChartNoAxesColumnDecreasing } from 'lucide-react'

const initialFormValues = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
  customCategory: "",
  customBrand: "",
};

const AdminProducts = () => {

  const form = useForm({
    defaultValues: initialFormValues,
  })



  const [createProductDialog, setCreateProductDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCustomBrand, setIsCustomBrand] = useState(false);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);


  //Editing Product
  useEffect(() => {
    if (!selectedProduct) return;

    form.reset({
      title: selectedProduct.title,
      description: selectedProduct.description,
      category: selectedProduct.category,
      brand: selectedProduct.brand,
      price: selectedProduct.price,
      salePrice: selectedProduct.salePrice,
      totalStock: selectedProduct.totalStock,
    });

  }, [selectedProduct, form])

  //Fetching Product
  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);


  const onSubmit = (data) => {
    const finalData = {
      ...data,
      category: data.category === "other" ? data.customCategory : data.category,
      brand: data.brand === "other" ? data.customBrand : data.brand,
      image: uploadImageUrl || selectedProduct?.image,
    };


    currentEditedId !== null
      ? dispatch(
        editProduct({
          id: currentEditedId,
          formData: finalData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          showToast.success("Product updated successfully");
          setCreateProductDialog(false);
          form.reset(initialFormValues);
          setCurrentEditedId(null)
        }
      })
      : dispatch(
        addNewProduct({
          ...finalData,
          image: uploadImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());

          showToast.success("Product added successfully.");
          setCreateProductDialog(false);
          setUploadImageUrl("")
          setImageFile(null);
          setIsCustomCategory(false);
          setIsCustomBrand(false);
          form.reset();

        }
      });
  }

  const handleDelete = (getProductId) => {
    dispatch(deleteProduct(getProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        showToast.success("Product deleted successfully.")
      }
    });
  }

  
 




  return (
    <>
      <Fragment >
        <div className="mb-2 flex w-full justify-end">
          <Button className="cursor-pointer " onClick={() => { setCreateProductDialog(true) }} >
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[85vh] md:h-[80vh] overflow-y-auto no-scrollbar">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setCurrentEditedId={setCurrentEditedId}
                setCreateProductDialog={setCreateProductDialog}
                setSelectedProduct={setSelectedProduct}
                product={productItem}
                handleDelete={handleDelete}

              />
            )) : null}
        </div>
        <Sheet
          open={createProductDialog}
          onOpenChange={() => {
            setCreateProductDialog(false);
            setSelectedProduct(null);
            form.reset(initialFormValues);

          }}
        >
          <SheetContent side='right' className='overflow-auto'>
            <SheetHeader className="pb-2 space-y-1">
              <SheetTitle className='md:text-xl text-xl'>
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>

            <div className=" py-2 px-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <ProductImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    uploadImageUrl={uploadImageUrl}
                    setUploadImageUrl={setUploadImageUrl}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isEditMode={currentEditedId !== null}

                  />
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder='Product title' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    rules={{ required: "Description is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className='resize-none h-[10vh] ' placeholder="Product Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setIsCustomCategory(value === "other");

                            if (value !== "other") {
                              form.setValue("customCategory", "");
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="men">Men</SelectItem>
                            <SelectItem value="women">Women</SelectItem>
                            <SelectItem value="kids">Kids</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="footwear">Footwear</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Custom Category */}
                        {isCustomCategory && (
                          <FormField
                            control={form.control}
                            name="customCategory"
                            rules={{ required: "Please enter category name" }}
                            render={({ field }) => (
                              <FormItem className="">
                                <FormControl>
                                  <Input placeholder="Enter category" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Brand */}
                  <FormField
                    control={form.control}
                    name="brand"
                    rules={{ required: "Brand is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setIsCustomBrand(value === "other");

                            if (value !== "other") {
                              form.setValue("customBrand", "")
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="nike">Nike</SelectItem>
                            <SelectItem value="adidas">Adidas</SelectItem>
                            <SelectItem value="puma">Puma</SelectItem>
                            <SelectItem value="levi">Levi's</SelectItem>
                            <SelectItem value="zara">Zara</SelectItem>
                            <SelectItem value="h&m">H&M</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Custom Brand */}
                        {isCustomBrand && (
                          <FormField
                            control={form.control}
                            name="customBrand"
                            rules={{ required: "Please enter brand name" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Enter brand name" {...field} />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    rules={{ required: "Price is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="no-spinner"
                            placeholder="Price"
                            onWheel={(e) => e.target.blur()}
                            {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Sale Price */}
                  <FormField
                    control={form.control}
                    name="salePrice"
                    rules={{ required: "Sale price is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="no-spinner"
                            placeholder="Sale price"
                            onWheel={(e) => e.target.blur()}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Total Stock */}
                  <FormField
                    control={form.control}
                    name="totalStock"
                    rules={{ required: "Stock is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="no-spinner"
                            value={field.value}
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => {
                              field.onChange(e.target.value === "" ? "" : Number(e.target.value))
                            }}
                            placeholder="Stock" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={imageLoadingState}
                    className={`w-full ${imageLoadingState ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                  >
                    {/* {imageLoadingState ? "Uploading Image..." : "Add Product"} */}
                    {currentEditedId !== null ? "Edit Product" : "Add New Product"}

                  </Button>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
    </>
  )
}

export default AdminProducts