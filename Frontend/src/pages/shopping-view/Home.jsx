import { React, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react';
import { SiNike, SiAdidas, SiPuma, SiZara } from "react-icons/si";
import { PiDress } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchFeaturedProducts } from '@/store/shop-slice/productSlice';
import ShoppingProductTile from '@/components/shopping-view/productTile';
import LeviLogo from "../../assets/levi.png";
import HmLogo from "../../assets/HmLogo.png";
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop-slice/cartSlice';
import { showToast } from '@/utils/toast';
import { getFeatureImage } from '@/store/common/featureSlice';
import Footer from '../common/Footer';

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: PiDress },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: GiConverseShoe },
];


const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: SiNike, type: "icon" },
  { id: "adidas", label: "Adidas", icon: SiAdidas, type: "icon" },
  { id: "puma", label: "Puma", icon: SiPuma, type: "icon" },
  { id: "levi", label: "Levi", icon: LeviLogo, type: "image" },
  { id: "zara", label: "Zara", icon: SiZara, type: "icon" },
  { id: "h&m", label: "H&M", icon: HmLogo, type: "image" },
];



const ShoppingHome = () => {

  const dispatch = useDispatch();
  const { productList, featuredProducts } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { cartItems } = useSelector((state) => state.shopCart);

  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();



  const handleNavigateToListing = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilters = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate("/listing");
  }

  const handleAddToCart = (getCurrentProductId, getTotalStock, size) => {

    if (!user) {
      showToast.error("Please log in to add items to your cart.")
      return;
    }

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

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
        size: size,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        showToast.success("Added to Cart")
      }
    })
  }



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
    }, 3000);

    return () => clearInterval(timer)
  }, [featureImageList])


  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
          {
            featureImageList && featureImageList.length > 0 ?
              featureImageList.map((slide, index) => (
                <img
                  src={slide?.image}
                  key={index}
                  className={` ${index === currentSlide ? "opacity-100" : "opacity-0"} 
                absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                />
              )) : null
          }
          <Button
            variant='outline'
            size='icon'
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 cursor-pointer"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}
          >
            <ChevronLeftIcon className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 cursor-pointer"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}

          >
            <ChevronRightIcon className='w-4 h-4' />
          </Button>
        </div>

        {/* Shop by Category */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {
                categoriesWithIcon.map((categoryItem) => (
                  <Card
                    onClick={() => handleNavigateToListing(categoryItem, "category")}
                    key={categoryItem.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardContent
                      className="flex flex-col items-center justify-center p-6"
                    >
                      {<categoryItem.icon className='w-12 h-12 mb-4 text-primary' />}
                      <span className="font-bold">{categoryItem.label}</span>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        </section>

        {/* Shop by Brand */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Brand
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {
                brandsWithIcon.map((brandItem) => (
                  <Card
                    onClick={() => handleNavigateToListing(brandItem, "brand")}

                    key={brandItem.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardContent
                      className="flex flex-col items-center justify-center p-6"
                    >
                      {brandItem.type === "icon" ? (
                        <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                      ) : (
                        <img
                          src={brandItem.icon}
                          alt={brandItem.label}
                          className="w-12 h-12 mb-4 object-contain"
                        />
                      )}
                      <span className="font-bold">{brandItem.label}</span>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        </section>

        {/* Feature Products */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {
                featuredProducts && featuredProducts.length > 0
                  ? featuredProducts.map((productItem) => (
                    <ShoppingProductTile
                      key={productItem._id}
                      product={productItem}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
                  : (
                    <p className="col-span-full text-center text-muted-foreground">
                      No featured products available
                    </p>
                  )
              }

            </div>
          </div>
        </section>

        <section>
          <Footer />
        </section>
      </div>
    </>
  )
}

export default ShoppingHome