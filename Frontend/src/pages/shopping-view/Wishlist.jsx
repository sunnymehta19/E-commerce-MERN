import React, { useEffect } from "react";
import { HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeWishlist } from "@/store/shop-slice/wishlistSlice";
import { Button } from "@/components/ui/button";

const ShopWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, isLoading } = useSelector(
    (state) => state.shopWishlist
  );

  // 🔹 Fetch wishlist on mount / user change
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [user?.id]);

 



  return (
   <div className="max-w-7xl mx-auto px-6 py-10">
  <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

  {isLoading && (
    <p className="text-center text-muted-foreground mb-6">
      Updating wishlist...
    </p>
  )}

  {wishlist.length === 0 ? (
    <div className="text-center text-muted-foreground mt-20">
      <p>Your wishlist is empty.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {wishlist.map((item) => {
        const product = item?.productId;
        if (!product) return null;

        return (
          <div
            key={product._id}
            className="border rounded-lg p-3 hover:shadow transition cursor-pointer"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />

            <div className="mt-3 flex justify-between items-start">
              <div>
                <p className="font-semibold line-clamp-1">
                  {product.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  ₹{product.salePrice > 0 ? product.salePrice : product.price}
                </p>
              </div>

              <HeartOff
                className="w-5 h-5 text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    removeWishlist({
                      userId: user.id,
                      productId: product._id,
                    })
                  );
                }}
              />
            </div>

            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/${product._id}`);
              }}
            >
              View Product
            </Button>
          </div>
        );
      })}
    </div>
  )}
</div>

  );
};

export default ShopWishlist;
