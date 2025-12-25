import { Navigate } from 'react-router-dom'

const AdminRoute = ({ isAuthenticated, user, children }) => {
    if (!isAuthenticated) {
        return <Navigate to='/auth/login' replace />
    }

    if (user?.role !== 'admin') {
        return <Navigate to='/shop/home' replace />
    }


    return children;
}

export default AdminRoute