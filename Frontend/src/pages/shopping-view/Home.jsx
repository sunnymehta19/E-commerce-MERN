import { React, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, ShirtIcon, WatchIcon } from 'lucide-react'
import { SiNike, SiAdidas, SiPuma, SiZara } from "react-icons/si"
import { PiDress } from "react-icons/pi"
import { GiConverseShoe } from "react-icons/gi"
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedProducts } from '@/store/shop-slice/productSlice'
import ShoppingProductTile from '@/components/shopping-view/productTile'
import LeviLogo from "../../assets/levi.png"
import HmLogo from "../../assets/HmLogo.png"
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop-slice/cartSlice'
import { showToast } from '@/utils/toast'
import { getFeatureImage } from '@/store/common/featureSlice'
import Footer from '../common/Footer'

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: PiDress },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: GiConverseShoe },
]

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: SiNike, type: "icon" },
  { id: "adidas", label: "Adidas", icon: SiAdidas, type: "icon" },
  { id: "puma", label: "Puma", icon: SiPuma, type: "icon" },
  { id: "levi", label: "Levi", icon: LeviLogo, type: "image" },
  { id: "zara", label: "Zara", icon: SiZara, type: "icon" },
  { id: "h&m", label: "H&M", icon: HmLogo, type: "image" },
]

const ShoppingHome = () => {
  const dispatch = useDispatch()
  const { featuredProducts } = useSelector((state) => state.shopProducts)
  const { featureImageList } = useSelector((state) => state.commonFeature)
  const { cartItems } = useSelector((state) => state.shopCart)
  const { user } = useSelector((state) => state.auth)

  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()
  const topRef = useRef(null)

  const handleNavigateToListing = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters")
    sessionStorage.setItem("filters", JSON.stringify({ [section]: [getCurrentItem.id] }))
    navigate("/listing")
  }

  const handleAddToCart = (getCurrentProductId, getTotalStock, size) => {
    if (!user) {
      showToast.error("Please log in to add items to your cart.")
      return
    }

    const items = cartItems.items || []
    const existing = items.find(i => i.productId === getCurrentProductId)

    if (existing && existing.quantity + 1 > getTotalStock) {
      showToast.error(`Only ${existing.quantity} items available in stock`)
      return
    }

    dispatch(addToCart({
      userId: user.id,
      productId: getCurrentProductId,
      quantity: 1,
      size
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id))
        showToast.success("Added to Cart")
      }
    })
  }

  useEffect(() => {
    if (!featureImageList.length) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featureImageList.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [featureImageList])

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
    dispatch(getFeatureImage())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen" ref={topRef}>

      {/* Slider */}
      <div className="relative w-full h-[200px] sm:h-[260px] md:h-[420px] lg:h-[600px] overflow-hidden">
        {featureImageList.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"}
              absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/40 md:bg-white/80"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length)}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/40 md:bg-white/80"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList.length)}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-6 lg:grid-cols-5 gap-3 justify-items-center">
            {categoriesWithIcon.map((item, index) => (
              <Card
                key={item.id}
                onClick={() => handleNavigateToListing(item, "category")}
                className={`cursor-pointer hover:shadow-lg transition-shadow w-full max-w-[110px] sm:max-w-none col-span-2 ${index === 3 ? "col-start-2" : ""} ${index === 4 ? "col-start-4" : ""} lg:col-span-1 lg:col-start-auto `}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Brands */}
      <section className="py-6 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Shop by Brand
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {brandsWithIcon.map(item => (
              <Card
                key={item.id}
                onClick={() => handleNavigateToListing(item, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  {item.type === "icon"
                    ? <item.icon className="w-10 h-10 mb-3 text-primary" />
                    : <img src={item.icon} className="w-10 h-10 mb-3 object-contain" />
                  }
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Feature Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {featuredProducts.length ? featuredProducts.map(product => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            )) : (
              <p className="col-span-full text-center text-muted-foreground">
                No featured products available
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Back to top */}
      <section className="pt-10 md:pt-20 bg-gray-50">
        <div
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center justify-center bg-gray-600 text-white cursor-pointer"
        >
          <div className="py-2 md:py-3 text-xs sm:text-sm font-semibold">
            Back to top
          </div>
        </div>
      </section>

      <section >
        <Footer />
      </section>
    </div>
  )
}

export default ShoppingHome
