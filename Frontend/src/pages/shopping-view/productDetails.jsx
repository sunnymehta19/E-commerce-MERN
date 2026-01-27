import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "@/store/shop-slice/productSlice";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cartSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { showToast } from "@/utils/toast";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import StarRatingComponent from "@/components/common/StarRatingComponent";
import { addReviews, getReviews } from "@/store/shop-slice/reviewSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRatingDisplayOnly from "@/components/common/StarRatingDisplayOnly";



const ProductDetailsPage = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const { productDetails, isLoading } = useSelector((state) => state.shopProducts);
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { reviews } = useSelector((state) => state.shopReview);

    const [rating, setRating] = useState(0);
    const [reviewMsg, setReviewMsg] = useState("");
    const [activeImage, setActiveImage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProductDetails(productId));
        dispatch(getReviews(productId));
    }, [dispatch, productId]);



    if (isLoading || !productDetails) {
        return <div className="p-6">
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
        </div>;
    }
    const images = [
        productDetails.image,
        productDetails.image,
        productDetails.image
    ];


    const averageReview =
        reviews && reviews.length > 0
            ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
            : 0;


    const handleRatingChange = (getRating) => {
        setRating(getRating);
    }


    const handleAddReview = async () => {
        try {
            await dispatch(
                addReviews({
                    productId: productDetails?._id,
                    userId: user?.id,
                    username: user?.username,
                    reviewMessage: reviewMsg,
                    reviewValue: rating,
                })
            ).unwrap();

            showToast.success("Review added successfully");
            setRating(0);
            setReviewMsg("");
            dispatch(getReviews(productDetails?._id));

        } catch (error) {
            showToast.error(error?.message || "You already reviewed this product");
        }
    }




    const handleAddToCart = (getCurrentProductId, getTotalStock) => {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    showToast.error(`Only ${getQuantity} items available in stock`);
                    return;
                }
            }
        }


        dispatch(addToCart({
            userId: user?.id, productId: getCurrentProductId, quantity: 1
        })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user.id));
                showToast.success("Added to Cart")
            }
        });
    }

    const handleBuyNow = (getCurrentProductId) => {
        let getCartItems = cartItems.items || [];

        const isAlreadyInCart = getCartItems.some(
            (item) => item.productId === getCurrentProductId
        );

        if (isAlreadyInCart) {
            navigate("/checkout");
            return;
        }

        dispatch(
            addToCart({
                userId: user?.id, productId: getCurrentProductId, quantity: 1
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user.id));
                navigate("/checkout")
            }
        });
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* TOP SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                {/* IMAGE SECTION */}
                <div className="flex flex-col gap-4">
                    {/* MAIN IMAGE */}
                    <div className="w-full max-w-md mx-auto lg:mx-0 border rounded-2xl overflow-hidden bg-muted relative">
                        <img
                            src={images[activeImage]}
                            alt={productDetails.title}
                            className="w-full aspect-square object-cover"
                        />
                        {
                            productDetails?.totalStock === 0 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    Out Of Stock
                                </Badge>
                            ) : productDetails?.totalStock < 10 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    {`Only ${productDetails?.totalStock} items left`}
                                </Badge>
                            ) : productDetails?.salePrice > 0 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    Sale
                                </Badge>
                            ) : null
                        }
                    </div>


                </div>

                {/* PRODUCT INFO */}
                <div className="flex flex-col gap-6 md:relative">
                    {/* TITLE + RATING */}
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl md:pt-5 font-bold leading-tight">
                            {productDetails.title}
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                            {productDetails.description}
                        </p>


                        <div className="flex items-center gap-2">
                            <StarRatingDisplayOnly rating={averageReview} />
                            <span className="text-sm text-muted-foreground">
                            ({averageReview.toFixed(0) } ★)
                            </span>
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-2xl md:text-3xl font-bold ${productDetails.salePrice
                                ? "line-through text-muted-foreground"
                                : ""
                                }`}
                        >
                            ₹{productDetails.price}
                        </span>

                        {productDetails.salePrice > 0 && (
                            <span className="text-2xl md:text-3xl font-bold text-primary">
                                ₹{productDetails.salePrice}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col  gap-3 pt-4 md:absolute w-full bottom-0">
                        {productDetails?.totalStock === 0 ? (
                            <Button className="h-12 text-base flex-1 opacity-60 cursor-not-allowed">
                                Out Of Stock
                            </Button>
                        ) : (
                            <Button
                                className="h-12 text-base flex-1 cursor-pointer"
                                onClick={() => handleAddToCart(productDetails._id, productDetails?.totalStock)}
                            >
                                Add to Cart
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            className="h-12 text-base flex-1 cursor-pointer"
                            onClick={() => handleBuyNow(productDetails?._id)}
                            disabled={productDetails.totalStock === 0}
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>


            <Separator className="my-10" />

            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* LEFT: REVIEWS (REFERENCE STYLE) */}
                    <div className="space-y-6 md:h-[60vh] overflow-y-scroll pill-scrollbar">
                        <h3 className="text-xl font-semibold">Ratings & Reviews</h3>

                        {reviews && reviews.length > 0 ? (
                            reviews.map((reviewItem) => (
                                <div
                                    key={reviewItem?._id}
                                    className="bg-muted/40 border rounded-xl p-6 space-y-3"
                                >
                                    {/* USER */}
                                    <div className="flex gap-2 items-center">
                                        <div className="">
                                            <Avatar>
                                                <AvatarFallback>{reviewItem?.username[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="">
                                            <h3 className="capitalize font-bold ">{reviewItem?.username}</h3>
                                        </div>
                                        <div className="">
                                            <span className="text-muted-foreground font-normal">(Verified Buyer)</span>
                                        </div>

                                    </div>
                                    {/* STARS */}
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-1">
                                            <StarRatingDisplayOnly rating={reviewItem?.reviewValue} />
                                        </div>
                                        <div className="font-semibold">({reviewItem?.reviewValue} <span className="pl-0.1">★</span>)</div>
                                    </div>



                                    {/* REVIEW TEXT */}
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {reviewItem?.reviewMessage}
                                    </p>


                                </div>
                            )
                            )) : (
                            <h2 className="text-2xl font-bold">No reviews</h2>
                        )}
                    </div>

                    {/* RIGHT: WRITE REVIEW FORM */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Write a review</h3>

                        <div className="border rounded-xl p-6 space-y-5">

                            {/* REVIEW MESSAGE */}
                            <div>
                                <div className="mb-3">
                                    <p className="text-sm font-medium mb-2">Your Rating</p>
                                    <StarRatingComponent
                                        rating={rating}
                                        handleRatingChange={handleRatingChange}
                                    />
                                </div>
                                <p className="text-sm font-medium mb-2">Your Review</p>
                                <textarea
                                    name="reviewMsg"
                                    value={reviewMsg}
                                    onChange={(e) => setReviewMsg(e.target.value)}
                                    placeholder="Write your experience with this product..."
                                    className="w-full min-h-[110px] resize-none border rounded-md p-3 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                {/* SUBMIT */}
                                <Button
                                    onClick={handleAddReview}
                                    disabled={reviewMsg.trim() === ""}
                                    className="w-full"
                                >
                                    Submit Review
                                </Button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
}


export default ProductDetailsPage;