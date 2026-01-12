import React from 'react'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <div className="min-h-screen w-full flex ">
                <AdminSidebar />
                <div className="flex flex-col flex-1">
                    <AdminHeader />
                    <main className=" bg-gray-100 flex-1 flex-col flex bg-muted/40  p-4 md:p-6 ">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminLayout