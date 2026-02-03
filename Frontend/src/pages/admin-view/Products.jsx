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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  sizeType: "",
  sizes: [],
};


const SIZE_OPTIONS = {
  upper: ["XS", "S", "M", "L", "XL", "XXL"],
  lower: ["26", "28", "30", "32", "34", "36", "38", "40", "42"],
  footwear: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
  kids: ["3Y", "4Y", "5Y", "6Y", "8Y", "10Y", "12Y", "14Y"],
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


  const featuredProducts = productList?.filter(
    (product) => product.isFeatured
  );

  const outOfStockProducts = productList?.filter(
    (product) => product.totalStock === 0
  );

  const lowStockProducts = productList?.filter(
    (product) => product.totalStock > 0 && product.totalStock <= 10
  );

  const onSaleProducts = productList?.filter(
    (product) => product.salePrice > 0
  );


  //Editing Product
  useEffect(() => {
    if (!selectedProduct) return;

    const predefinedCategories = ["men", "women", "kids", "accessories", "footwear"];
    const predefinedBrands = ["nike", "adidas", "puma", "levi", "zara", "h&m"];

    const isCategoryCustom = !predefinedCategories.includes(selectedProduct.category);
    const isBrandCustom = !predefinedBrands.includes(selectedProduct.brand);

    setIsCustomCategory(isCategoryCustom);
    setIsCustomBrand(isBrandCustom);

    form.reset({
      title: selectedProduct.title,
      description: selectedProduct.description,

      category: isCategoryCustom ? "other" : selectedProduct.category,
      customCategory: isCategoryCustom ? selectedProduct.category : "",

      brand: isBrandCustom ? "other" : selectedProduct.brand,
      customBrand: isBrandCustom ? selectedProduct.brand : "",

      price: selectedProduct.price,
      salePrice: selectedProduct.salePrice,
      totalStock: selectedProduct.totalStock,
      sizeType: selectedProduct.sizeType || "",
      sizes: selectedProduct.sizes || [],
    });

  }, [selectedProduct, form]);


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


  const renderProducts = (products) => {
    if (!products || products.length === 0) {
      return (
        <div className="col-span-full text-center text-muted-foreground py-10">
          No products found
        </div>
      );
    }

    return products.map((productItem) => (
      <AdminProductTile
        key={productItem._id}
        setCurrentEditedId={setCurrentEditedId}
        setCreateProductDialog={setCreateProductDialog}
        setSelectedProduct={setSelectedProduct}
        product={productItem}
        handleDelete={handleDelete}
      />
    ));
  };


  return (
    <>
      <Fragment >
        <div className="mb-2 flex w-full justify-end">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setCurrentEditedId(null);
              setSelectedProduct(null);
              setIsCustomCategory(false);
              setIsCustomBrand(false);
              setUploadImageUrl("");
              setImageFile(null);
              form.reset(initialFormValues);
              setCreateProductDialog(true);
            }}
          >
            Add New Product
          </Button>

        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger className="cursor-pointer" value="all">All Products</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="featured">Featured</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="outofstock">Out of Stock</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="lowstock">Low Stock</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="onsale">On Sale</TabsTrigger>
          </TabsList>

          {/* All Products */}
          <TabsContent value="all">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start h-[90vh] md:h-[80vh] overflow-y-auto no-scrollbar py-4">
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
                ))
                : (
                  <div className="col-span-full text-center text-muted-foreground py-10">
                    No products found
                  </div>
                )}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start h-[85vh] md:h-[80vh] overflow-y-auto no-scrollbar py-4">
              {renderProducts(featuredProducts)}
            </div>
          </TabsContent>

          <TabsContent value="outofstock">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start h-[85vh] md:h-[80vh] overflow-y-auto no-scrollbar py-4">
              {renderProducts(outOfStockProducts)}
            </div>
          </TabsContent>

          <TabsContent value="lowstock">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start h-[85vh] md:h-[80vh] overflow-y-auto no-scrollbar py-4">
              {renderProducts(lowStockProducts)}
            </div>
          </TabsContent>

          <TabsContent value="onsale">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start h-[85vh] md:h-[80vh] overflow-y-auto no-scrollbar py-4">
              {renderProducts(onSaleProducts)}
            </div>
          </TabsContent>

        </Tabs>

        <Sheet
          open={createProductDialog}
          onOpenChange={() => {
            setCreateProductDialog(false);
            setSelectedProduct(null);
            setIsCustomCategory(false);
            setIsCustomBrand(false);
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
                            <SelectTrigger className='w-full cursor-pointer'>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem className="cursor-pointer" value="men">Men</SelectItem>
                            <SelectItem className="cursor-pointer" value="women">Women</SelectItem>
                            <SelectItem className="cursor-pointer" value="kids">Kids</SelectItem>
                            <SelectItem className="cursor-pointer" value="accessories">Accessories</SelectItem>
                            <SelectItem className="cursor-pointer" value="footwear">Footwear</SelectItem>
                            <SelectItem className="cursor-pointer" value="other">Other</SelectItem>
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
                            <SelectTrigger className="w-full cursor-pointer">
                              <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem className="cursor-pointer" value="nike">Nike</SelectItem>
                            <SelectItem className="cursor-pointer" value="adidas">Adidas</SelectItem>
                            <SelectItem className="cursor-pointer" value="puma">Puma</SelectItem>
                            <SelectItem className="cursor-pointer" value="levi">Levi's</SelectItem>
                            <SelectItem className="cursor-pointer" value="zara">Zara</SelectItem>
                            <SelectItem className="cursor-pointer" value="h&m">H&M</SelectItem>
                            <SelectItem className="cursor-pointer" value="other">Other</SelectItem>
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

                  {/* Sizes */}
                  <FormField
                    control={form.control}
                    name="sizeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size Type</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("sizes", []);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full cursor-pointer">
                              <SelectValue placeholder="Select size type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem className="cursor-pointer" value="upper">Upper Wear</SelectItem>
                            <SelectItem className="cursor-pointer" value="lower">Lower Wear</SelectItem>
                            <SelectItem className="cursor-pointer" value="kids">Kids Wear</SelectItem>
                            <SelectItem className="cursor-pointer" value="footwear">Footwear</SelectItem>
                            <SelectItem className="cursor-pointer" value="none">No Size</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* Available Sizes */}
                  <FormField
                    control={form.control}
                    name="sizes"
                    render={({ field }) => {
                      const sizeType = form.watch("sizeType");
                      if (!sizeType || sizeType === "none") return null;

                      return (
                        <FormItem>
                          <FormLabel>Available Sizes</FormLabel>
                          <div className="flex gap-2 flex-wrap">
                            {SIZE_OPTIONS[sizeType].map((size) => (
                              <Button
                                className="cursor-pointer"
                                key={size}
                                type="button"
                                size="sm"
                                variant={field.value.includes(size) ? "default" : "outline"}
                                onClick={() => {
                                  field.onChange(
                                    field.value.includes(size)
                                      ? field.value.filter((s) => s !== size)
                                      : [...field.value, size]
                                  );
                                }}
                              >
                                {size}
                              </Button>
                            ))}
                          </div>
                        </FormItem>
                      );
                    }}
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