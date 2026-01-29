import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeWishlist } from "@/store/shop-slice/wishlistSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HeartOff } from "lucide-react";
import { showToast } from "@/utils/toast";

const ShopWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.shopWishlist);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user]);

  const handleRemove = (e, productId) => {
    e.stopPropagation();

    dispatch(
      removeWishlist({
        userId: user.id,
        productId,
      })
    );
    showToast.success("Removed from wishlist");

  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-xl font-semibold text-muted-foreground">
          No items in your wishlist
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-5">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const product = item.productId;

          return (
            <Card
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="cursor-pointer hover:shadow-lg transition-shadow py-0 gap-0"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[280px] object-cover rounded-t-lg"
              />

              <CardContent className="p-3">
                <h2 className="font-semibold text-lg capitalize truncate">
                  {product.title}
                </h2>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">
                    ₹{product.salePrice > 0
                      ? product.salePrice
                      : product.price}
                  </span>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={(e) => handleRemove(e, product._id)}
                  >
                    <HeartOff className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ShopWishlist;
