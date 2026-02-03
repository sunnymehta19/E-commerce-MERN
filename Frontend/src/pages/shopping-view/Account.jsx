import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShopOrders from '@/components/shopping-view/orders'
import ShopAddress from '@/components/shopping-view/address'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'

const ShoppingAccount = () => {

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="container mx-auto pt-6 mt-5">
          <div className="flex items-center gap-4 rounded-xl border bg-background p-6 shadow-sm">

            {/* Avatar with initial */} 
            <Avatar className="h-16 w-16 bg-primary">
              <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                {user?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex flex-col gap-1">
              {/* Name + Role */}
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold capitalize">
                  {user?.username}
                </h2>

                {user?.role === "admin" && (
                  <span className="text-sm text-muted-foreground">
                    (Admin)
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>

                {user?.mobilenumber && (
                  <div className="flex items-center gap-1 sm:ml-4">
                    <Phone className="h-4 w-4" />
                    <span>{user?.mobilenumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger className="cursor-pointer" value="orders">Orders</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="address">Address</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <ShopOrders />
              </TabsContent>
              <TabsContent value="address">
                <ShopAddress />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShoppingAccount