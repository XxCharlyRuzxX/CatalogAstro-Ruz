import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return <ToastContainer position="bottom-right" autoClose={3000} theme="colored"   toastStyle={{  minWidth: "65vh" }}
  />;
}
