import { HousePlug, Menu } from 'lucide-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'


const shoppingHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "products",
    label: "Products",
    path: "/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/listing",

  },
  {
    id: "women",
    label: "Women",
    path: "/listing",

  },
  {
    id: "kids",
    label: "Kids",
    path: "/listing",

  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/listing",

  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/listing",

  },
]


const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
}



const ShoppingHeader = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6' />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>

          </SheetContent>
        </Sheet>
      </div>

    </header>
  )
}

export default ShoppingHeader