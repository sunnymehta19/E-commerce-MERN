import { Heart, HousePlug, LayoutDashboard, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
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
  {
    id: "search",
    label: "Search",
    path: "/search",

  },
]


const MenuItems = ({ onItemClick }) => {
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

    onItemClick?.();

  }


  return (
    <>
      <nav className={`${isAuthenticated ? "" : "pl-24"} flex flex-col mb-3 lg:mb-0 lg:items-center p-4 gap-4 md:gap-6 lg:flex-row`}>
        {
          shoppingHeaderMenuItems.map((items) => (
            <Label
              onClick={() => handleNavigate(items)}
              key={items.id}
              className="text-sm font-medium cursor-pointer"
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
  const { wishlist } = useSelector((state) => state.shopWishlist);
  const [openCartSheet, setOpenCartSheet] = useState(false);


  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/");
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch])


  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          className="cursor-pointer  relative"
          variant='outline'
          size='icon'
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className='w-6 h-6' />

          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
            {cartItems?.items?.length || 0}
          </span>
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
              Logged in as <span className="capitalize">{user?.username}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Admin Dashboard */}
            {user?.role === "admin" && (
              <>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/wishlist")}>
              <Heart className="mr-2 h-4 w-4" />
              <div className="flex items-center justify-between w-full cursor-pointer">
                <div className="">Wishlist</div>
                <div className=" flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                  {wishlist?.length || 0}
                </div>
              </div>
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
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">

        <Link to="/" className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6' />
          <span className="font-bold">UniDrobe</span>
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
        <HeaderRightContent />

          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild>
              <Button size='icon' className='lg:hidden bg-white text-black h-10'>
                <Menu size={30} className='h-6 w-6' />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full max-w-xs p-4" >
              <MenuItems onItemClick={() => setOpenMenu(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <MenuItems />
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <HeaderRightContent />
        </div>
        
      </div>
    </header>
  )
}

export default ShoppingHeader