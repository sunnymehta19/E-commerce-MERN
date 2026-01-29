import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { addWishlist, fetchWishlist, removeWishlist } from '@/store/shop-slice/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '@/utils/toast'

const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

const ShoppingProductTile = ({ product, handleAddToCart }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { wishlist } = useSelector((state) => state.shopWishlist);

    const defaultSize =
        product?.sizes?.length > 0
            ? [...product.sizes].sort(
                (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
            )[0]
            : "M";

    const isWishlisted = wishlist?.some(
        (item) =>
            typeof item.productId === "string"
                ? item.productId === product._id
                : item.productId._id === product._id
    );


    const handleWishlist = (e) => {
        e.stopPropagation();

        if (!user) {
            showToast.error("Please login to use wishlist");
            return;
        }

        if (isWishlisted) {
            dispatch(
                removeWishlist({
                    userId: user.id,
                    productId: product._id,
                })
            );
            showToast.success("Removed from wishlist");
        } else {
            dispatch(
                addWishlist({
                    userId: user.id,
                    productId: product._id,
                })
            );
            showToast.success("Added to wishlist");

        }
    };

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            dispatch(fetchWishlist(user.id));
        }
    }, [dispatch, isAuthenticated, user]);


    return (
        <Card className="w-full max-w-sm mx-auto p-0 h-fit cursor-pointer hover:shadow-lg transition-shadow" >
            <div onClick={() => navigate(`/products/${product._id}`)}>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product.id}
                        className='w-full h-[300px] object-cover rounded-t-lg'
                    />
                    <Heart
                        onClick={handleWishlist}
                        className={`absolute top-3 right-3 w-5 h-5 cursor-pointer transition
                            ${isWishlisted
                                ? "fill-red-500 text-red-500"
                                : "text-white hover:text-red-500"
                            }`
                        }
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
                        ) : product?.salePrice > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Sale
                            </Badge>
                        ) : null
                    }
                </div>

                <CardContent className="p-2">
                    <h2 className="text-xl font-bold mb-0 capitalize truncate">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[16px] text-muted-foreground capitalize">
                            {product?.category}
                        </span>
                        <span className="text-[16px] text-muted-foreground capitalize">
                            {product?.brand}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}
                        >
                            ₹{product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-bold text-primary">
                                ₹{product?.salePrice}
                            </span>
                        ) : null}
                    </div>
                    <CardFooter className=' pb-1'>
                        {product?.totalStock === 0 ? (
                            <Button className="w-full  opacity-60 cursor-not-allowed">
                                Out Of Stock
                            </Button>
                        ) : (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product._id, product?.totalStock, defaultSize);
                                }}
                                className="w-full cursor-pointer"
                            >
                                Add to Cart
                            </Button>
                        )}

                    </CardFooter>
                </CardContent>
            </div>
        </Card>
    )
}

export default ShoppingProductTile