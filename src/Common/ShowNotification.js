import { toast } from "react-toastify";

export const ShowNotification = (message, type) => {
    toast(message, {
      type,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };