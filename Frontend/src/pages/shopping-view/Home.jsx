import { React, useEffect, useState } from 'react'
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from '@/components/ui/button';
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react';
import { SiNike, SiAdidas, SiPuma, SiZara } from "react-icons/si";
import { PiDress } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/store/shop-slice/productSlice';
import ShoppingProductTile from '@/components/shopping-view/productTile';
import LeviLogo from "../../assets/levi.png";
import HmLogo from "../../assets/HmLogo.png";
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop-slice/cartSlice';
import { showToast } from '@/utils/toast';

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
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree];
  const navigate = useNavigate();



  const handleNavigateToListing = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilters = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate("/listing");
  }

  const handleAddToCart = (getCurrentProductId) => {
    console.log(getCurrentProductId);

    dispatch(addToCart({
      userId: user?.id, productId: getCurrentProductId, quantity: 1
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
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 3000);

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh"
      })
    );
  }, [dispatch])



  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
          {
            slides.map((slide, index) => (
              <img
                src={slide}
                key={index}
                className={` ${index === currentSlide ? "opacity-100" : "opacity-0"} 
                absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          }
          <Button
            variant='outline'
            size='icon'
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 cursor-pointer"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
          >
            <ChevronLeftIcon className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 cursor-pointer"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}

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
                productList && productList.length > 0
                  ? productList.map((productItem) => (
                    <ShoppingProductTile
                      key={productItem._id}
                      product={productItem}
                      handleAddToCart={handleAddToCart}

                    />
                  )) : null
              }
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ShoppingHome