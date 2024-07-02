import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <Outlet />
      <ToastContainer />
    </div>
  );
}
