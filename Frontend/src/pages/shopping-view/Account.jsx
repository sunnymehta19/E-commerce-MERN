import React from 'react'
import accountBg from "../../assets/account.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShopOrders from '@/components/shopping-view/orders'
import ShopAddress from '@/components/shopping-view/address'

const ShoppingAccount = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src={accountBg}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
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