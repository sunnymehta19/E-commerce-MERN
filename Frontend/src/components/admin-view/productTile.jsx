import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { Button } from '../ui/button'
import { Badge } from '../ui/badge';
import { editProduct, fetchAllProduct } from '@/store/admin-slice/productSlice';
import { useDispatch } from 'react-redux';

const AdminProductTile = ({
    product,
    setCreateProductDialog,
    setCurrentEditedId,
    setSelectedProduct,
    handleDelete,
}) => {

    const dispatch = useDispatch();

    const handleToggleFeatured = () => {
        dispatch(
            editProduct({
                id: product._id,
                formData: {
                    isFeatured: !product.isFeatured,
                },
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProduct());
            }
        });
    };

    return (
        <>
            <Card className="w-full max-w-sm mx-auto p-0 ">
                <div>
                    <div className="relative ">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className='w-full h-[240px] md:h-[280px] object-cover rounded-t-lg'
                        // className='w-full h-[180px] md:h-[220px] object-center rounded-t-lg'
                        />
                        {
                            product?.totalStock === 0 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    Out Of Stock
                                </Badge>
                            ) : product?.totalStock < 10 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    {`Only ${product?.totalStock} items left`}
                                </Badge>
                            ) : product?.totalStock ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    {`Total Stock ${product?.totalStock} items`}
                                </Badge>
                            ) : null
                        }
                    </div>
                    <div>
                        <CardContent className="px-3">
                            <h2 className='text-sm md:text-base font-semibold mb-1 mt-2 truncate '>{product?.title}</h2>
                            <div className="flex justify-between items-center mb-2">
                                <span
                                    className={`${product?.salePrice > 0 ? "line-through" : ""
                                        } text-lg font-semibold text-primary`}
                                >
                                    ₹{product?.price}
                                </span>
                                {product?.salePrice > 0 ? (
                                    <span className="text-lg font-bold">₹{product?.salePrice}</span>
                                ) : null}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-wrap gap-2 justify-between items-center pb-3 px-3">
                            <Button
                                size='sm'
                                className="cursor-pointer"
                                onClick={() => {
                                    setCreateProductDialog(true);
                                    setCurrentEditedId(product._id);
                                    setSelectedProduct(product);
                                }}
                            >
                                Edit
                            </Button>
                            
                            <Button
                                size="sm"
                                variant={product?.isFeatured ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={handleToggleFeatured}
                            >
                                {product?.isFeatured ? "Featured" : "Make Featured"}
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        size='sm'
                                        className="cursor-pointer">
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete
                                            this product.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Yes, Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </CardFooter>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default AdminProductTile