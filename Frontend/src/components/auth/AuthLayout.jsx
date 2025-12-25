import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex">

            {/* Left part design */}
            <div className="hidden lg:flex w-[40%] flex-col justify-center px-16 
                      bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white">
                <h1 className="text-5xl font-extrabold leading-tight">
                    Welcome to <br />
                    <span className="text-amber-400">E-Commerce</span>
                </h1>

                <p className="mt-6 text-lg text-zinc-300 max-w-md">
                    Shop smarter. Track orders. Experience seamless online shopping
                    with secure payments and fast delivery.
                </p>

                <div className="mt-10 flex gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur">
                        Secure
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur">
                        Fast
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur">
                        Reliable
                    </span>
                </div>
            </div>

            {/* Login/Register part */}
            <div className="flex flex-1 lg:w-[60%] items-center justify-center 
                      px-4 sm:px-8 bg-zinc-50">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;
