import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "@/store/shop-slice/productSlice";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cartSlice";
import { getReviews, addReview } from "@/store/shop-slice/reviewSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

function StarRating({ value, onChange, size = 18, readOnly = false }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`cursor-pointer ${star <= value
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                        }`}
                    onClick={() => !readOnly && onChange?.(star)}
                />
            ))}
        </div>
    );
}

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    //   const { toast } = useToast();

    const { productDetails, isLoading } = useSelector(
        (state) => state.shopProducts
    );
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { reviews } = useSelector((state) => state.shopReview);

    const [rating, setRating] = useState(0);
    const [reviewMsg, setReviewMsg] = useState("");
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        dispatch(fetchProductDetails(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (productDetails?._id) {
            dispatch(getReviews(productDetails._id));
        }
    }, [productDetails]);

    if (isLoading || !productDetails) {
        return <div className="p-6">Loading product...</div>;
    }

    const images = [
        productDetails.image,
        productDetails.image,
        productDetails.image,
    ];

    const avgRating =
        reviews?.length > 0
            ? (
                reviews.reduce((sum, r) => sum + r.reviewValue, 0) /
                reviews.length
            ).toFixed(1)
            : 0;

    function handleAddToCart() {
        const items = cartItems.items || [];
        const existing = items.find(
            (i) => i.productId === productDetails._id
        );

        if (existing && existing.quantity + 1 > productDetails.totalStock) {
            toast({
                title: "Stock limit reached",
                variant: "destructive",
            });
            return;
        }

        dispatch(
            addToCart({
                userId: user?.id,
                productId: productDetails._id,
                quantity: 1,
            })
        ).then((res) => {
            if (res?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({ title: "Added to cart" });
            }
        });
    }

    function handleAddReview() {
        dispatch(
            addReview({
                productId: productDetails._id,
                userId: user?.id,
                userName: user?.userName,
                reviewMessage: reviewMsg,
                reviewValue: rating,
            })
        ).then((res) => {
            if (res.payload.success) {
                setRating(0);
                setReviewMsg("");
                dispatch(getReviews(productDetails._id));
                toast({ title: "Review submitted" });
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
                    <div className="w-full max-w-md mx-auto lg:mx-0 border rounded-2xl overflow-hidden bg-muted">
                        <img
                            src={images[activeImage]}
                            alt={productDetails.title}
                            className="w-full aspect-square object-cover"
                        />
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
                            <StarRating value={avgRating} readOnly />
                            <span className="text-sm text-muted-foreground">
                                {avgRating} ({reviews?.length || 0} reviews)
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
                        <Button
                            className="h-12 text-base flex-1 cursor-pointer"
                            onClick={handleAddToCart}
                            disabled={productDetails.totalStock === 0}
                        >
                            {productDetails.totalStock === 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                        </Button>
                        <Button
                            variant="outline"
                            className="h-12 text-base flex-1 cursor-pointer"
                            disabled={productDetails.totalStock === 0}
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>


            <Separator className="my-10" />

            {/* REVIEWS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold">Customer Reviews</h2>

                    {reviews?.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="flex gap-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {review.userName[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className="font-semibold">{review.userName}</p>
                                    <StarRating value={review.reviewValue} readOnly />
                                    <p className="text-muted-foreground">
                                        {review.reviewMessage}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No reviews yet</p>
                    )}
                </div>

                {/* ADD REVIEW */}
                <div className="border rounded-xl p-5 h-fit">
                    <h3 className="font-bold mb-3">Write a Review</h3>

                    <Label>Rating</Label>
                    <StarRating value={rating} onChange={setRating} />

                    <Label className="mt-3 block">Review</Label>
                    <Input
                        value={reviewMsg}
                        onChange={(e) => setReviewMsg(e.target.value)}
                        placeholder="Share your experience"
                    />

                    <Button
                        className="w-full mt-4"
                        onClick={handleAddReview}
                        disabled={!rating || reviewMsg.trim() === ""}
                    >
                        Submit Review
                    </Button>

                </div>
            </div>
        </div>
    );
}


export default ProductDetailsPage;