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
import { addNewProduct, editProduct, fetchAllProduct } from '@/store/admin-slice/productSlice'



const AdminProducts = () => {

  const form = useForm({
    defaultValues: {
      image: null,
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      totalStock: "",
      averageReview: 0,
    },
  })

  const [createProductDialog, setCreateProductDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);


  const onSubmit = (data) => {

    dispatch(
      addNewProduct({
        ...data,
        image: uploadImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());

        setCreateProductDialog(false);
        setUploadImageUrl("")
        setImageFile(null);
        form.reset();

      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);


  return (
    <>
      <Fragment>
        <div className="mt-3 flex w-full justify-end">
          <Button className="cursor-pointer" onClick={() => { setCreateProductDialog(true) }} >
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Sheet
            open={createProductDialog}
            onOpenChange={() => {
              setCreateProductDialog(false)

            }}
          >
            <SheetContent side='right' className='overflow-auto'>
              <SheetHeader className="pb-2 space-y-1">
                <SheetTitle className='md:text-xl text-xl'>
                  Add New Product
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
                            onValueChange={field.onChange}
                            value={field.value}
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
                            </SelectContent>
                          </Select>
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
                            onValueChange={field.onChange}
                            value={field.value}
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
                            </SelectContent>
                          </Select>
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
                            <Input type="number" className="no-spinner" placeholder="Price" {...field} />
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
                              onChange={(e) => {
                                field.onChange(e.target.value === "" ? "" : Number(e.target.value))
                              }}
                              placeholder="Stock" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Add Product
                    </Button>
                  </form>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Fragment>
    </>
  )
}

export default AdminProducts