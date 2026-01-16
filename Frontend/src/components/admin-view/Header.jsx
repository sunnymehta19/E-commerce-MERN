import React from 'react'
import { AlignJustify, LogOut } from "lucide-react"
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../store/auth-slice/authSlice'
import { Button } from '../ui/button'

const AdminHeader = ({ setOpen }) => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={() => setOpen(true)} className="text-black lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>


  )
}

export default AdminHeader