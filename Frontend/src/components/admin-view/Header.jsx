import React from 'react'
import { AlignJustify, LogOut } from "lucide-react"
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../store/auth-slice/authSlice'
import { Button } from '../ui/button'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { useNavigate } from 'react-router-dom'


const AdminHeader = ({ setOpen }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <div className="flex items-center gap-2 lg:hidden">
        <button onClick={() => setOpen(true)} className="text-black lg:hidden sm:block">
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
        </button>
        {/* <span className="text-lg font-bold">TownStore</span> */}

      </div>

      <div className="flex flex-1 gap-3 justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/")}
          variant='outline'
        >
          Back to Shop
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer"
            >
              <LogOut />
              Logout
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Confirm Logout
              </AlertDialogTitle>
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

      </div>
    </header>
  )
}

export default AdminHeader