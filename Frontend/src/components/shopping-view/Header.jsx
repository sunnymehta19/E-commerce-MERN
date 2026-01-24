import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import { React, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '@/store/auth-slice/authSlice'
import UserCartWrapper from './cartWrapper'
import { fetchCartItems } from '@/store/shop-slice/cartSlice'


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
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth);


  const handleNavigate = (getCurrentMenuItem) => {

    sessionStorage.removeItem("filters");
    const currentFilters =
      getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
        ? {
          category: [getCurrentMenuItem.id],
        } : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilters));

    location.pathname.includes("listing") && currentFilters !== null
      ? setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      ) : navigate(getCurrentMenuItem.path);


  }


  return (
    <>
      <nav className={`${isAuthenticated ? "" : "pl-24"} flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row`}>
        {
          shoppingHeaderMenuItems.map((items) => (
            <Label
              onClick={() => handleNavigate(items)}
              key={items.id}
              className="text-sm font-medium cursor-pointer  "
            >
              {items.label}
            </Label>
          ))
        }
      </nav>
    </>
  )
}



const HeaderRightContent = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);


  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/");
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch])


  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          className="cursor-pointer border-none "
          variant='outline'
          size='icon'
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className='w-6 h-6' />
          <span className="sr-only">User cart</span>
        </Button>
        <SheetContent side="right" className="sm:max-w-md p-0">
          <UserCartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items
            : []
          }
            setOpenCartSheet={setOpenCartSheet}
          />
        </SheetContent>
      </Sheet>

      {/* Checks Authenticated user */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black cursor-pointer">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" sideOffset={8} align="end" className="w-56">
            <DropdownMenuLabel>
              Logged in as {user?.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </AlertDialogTrigger>


              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to logout from your account?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Yes, Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </DropdownMenuContent>
        </DropdownMenu>

      ) : (
        <div className="flex gap-2">
          <Button className="cursor-pointer" variant='outline' onClick={() => navigate("/auth/login")}>Login</Button>
          <Button className="cursor-pointer" onClick={() => navigate("/auth/register")}>Sign up</Button>
        </div>
      )}
    </div>
  )
}




const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6' />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' className='lg:hidden bg-white text-black h-10'>
              <Menu size={30} className='h-6 w-6' />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs p-4" >
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader