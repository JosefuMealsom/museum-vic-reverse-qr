import { useEffect, useState } from "react";
import ContentToast from "./ContentToast";
import toastCommunicatorService from "../services/toast-communicator.service";
import { all } from "underscore";

export default function ContentToastContainer() {
  const [contentToasts, setContentToasts] = useState<
    { contentId: number; animationComplete: boolean }[]
  >([]);

  useEffect(() => {
    toastCommunicatorService.addCallback((contentId) => {
      const t = { contentId: contentId, animationComplete: false };

      setContentToasts((prevContentToasts) => {
        if (!prevContentToasts.find((t) => t.contentId === contentId)) {
          return [...prevContentToasts, t];
        }
        return prevContentToasts;
      });

      // Remove the toasts from the list after all have animated out.
      // Otherwise a rerender will be triggered which will create issues
      // with the toasts still on the DOM
      setTimeout(() => {
        t.animationComplete = true;
        if (all(contentToasts, (toast) => toast.animationComplete)) {
          setContentToasts([]);
        }
      }, 6000);
    });
  }, []);

  function renderToasts() {
    if (contentToasts.length === 0) {
      return null;
    }

    return contentToasts.map(({ contentId }) => (
      <ContentToast key={contentId} contentId={contentId} />
    ));
  }

  return <div className="absolute top-0 left-0 w-full">{renderToasts()}</div>;
}
