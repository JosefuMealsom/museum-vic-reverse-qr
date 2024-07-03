import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import QRCodePage from "./pages/QRCodePage";
import MyContent from "./pages/MyContentPage/MyContent";
import savedContentService from "./services/saved-content.service";
import SocketIoService from "./services/socket-io.service";
import InfoPage from "./pages/InfoPage";

// Ideally would be done by the server and via a cookie, but doesn't matter at this point
if (!savedContentService.fetchSessionID()) {
  savedContentService.setSessionID(crypto.randomUUID());
}

SocketIoService.connect();
SocketIoService.setSessionId(savedContentService.fetchSessionID()!);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <QRCodePage />,
      },
      {
        path: "/my-content",
        element: <MyContent />,
      },
      {
        path: "/my-content/:id",
        element: <InfoPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
