import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminFeatures from './pages/admin-view/Features'
import AdminOrders from './pages/admin-view/Orders'
import AdminProducts from './pages/admin-view/Products'

import NotFound from './pages/not-found/notFound'

import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import ShoppingAccount from './pages/shopping-view/Account'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingListing from './pages/shopping-view/Listing'
import ProductDetailsPage from "./pages/shopping-view/ProductDetails"

import ProtectedRoute from "./components/common/ProtectedRoute"
import AdminRoute from "./components/common/AdminRoute"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./store/auth-slice/authSlice"
import { Skeleton } from "./components/ui/skeleton"
import ShopSearchProducts from "./pages/shopping-view/Search"
import OrderSuccess from "./pages/shopping-view/OrderSuccess"


function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  if (isLoading) return <Skeleton className="h-[20px] w-[100px] rounded-full" />

  return (
    <>

      <Routes>
        {/* Auth routes */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Shop routes */}
        <Route path='/' element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path='search' element={<ShopSearchProducts />} />
          <Route path='order-success' element={<OrderSuccess />} />

          <Route
            path='checkout'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShoppingCheckout />
              </ProtectedRoute>} />
          <Route
            path='account'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ShoppingAccount />
              </ProtectedRoute>} />

        </Route>

        {/* Admin routes */}
        <Route
          path='/admin'
          element={
            <AdminRoute isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </AdminRoute>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>

        {/* 404 routes */}
        <Route path='*' element={<NotFound />}></Route>


      </Routes>
    </>
  )
}

export default App
