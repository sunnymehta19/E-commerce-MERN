import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

const baseOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  transition: Bounce,
};

export const showToast = {
  success: (message) =>
    toast.success(message, {
      ...baseOptions,
      theme: "light",
    }),

  error: (message) =>
    toast.error(message, {
      ...baseOptions,
      theme: "colored",
    }),

  warning: (message) =>
    toast.warning(message, {
      ...baseOptions,
      theme: "colored",
    }),

  info: (message) =>
    toast.info(message, {
      ...baseOptions,
      theme: "light",
    }),
};
