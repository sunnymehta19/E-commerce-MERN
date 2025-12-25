import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to='/auth/login'
                state={{ from: location.pathname }}
            />
        );
    }

    return children;
}

export default ProtectedRoute