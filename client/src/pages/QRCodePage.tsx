import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Link } from "react-router-dom";
import HeaderDark from "../components/HeaderDark";
import savedContentService from "../services/saved-content.service";
import socketIoService from "../services/socket-io.service";
import VisualIndicator from "../components/VisualIndicator";
import ContentToastContainer from "../components/ContentToastContainer";
import toastCommunicatorService from "../services/toast-communicator.service";

export default function QRCodePage() {
  const [qrCode, _] = useState(savedContentService.fetchSessionID());
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState("");
  const [triggerVisualIndicator, setTriggerVisualIndicator] = useState(false);
  const alreadyScannedRef = useRef<number[]>([]);

  useEffect(() => {
    if (!qrCode) return;

    const generateCode = async () => {
      const imageUrl = await QRCode.toDataURL(qrCode, {
        errorCorrectionLevel: "H",
      });

      setQrCodeImageUrl(imageUrl);
    };
    generateCode();
  }, [qrCode]);

  function triggerScanVisuals(contentId: number) {
    toastCommunicatorService.toast(contentId);
    setTriggerVisualIndicator(true);

    setTimeout(() => {
      setTriggerVisualIndicator(false);
    }, 1000);
  }

  useEffect(() => {
    const onFocus = () => {
      socketIoService.connect();
      socketIoService.on("qr_code_detected", (data) => {
        const contentId = Number(data);

        if (!savedContentService.findSavedContent(contentId)) {
          triggerScanVisuals(contentId);
          savedContentService.saveContent(contentId);
        } else if (!alreadyScannedRef.current.includes(contentId)) {
          triggerScanVisuals(contentId);
          alreadyScannedRef.current.push(contentId);
        }
      });
    };
    const onBlur = () => socketIoService.removeAllListeners();

    onFocus();

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      socketIoService.removeAllListeners();
    };
  }, []);

  function renderQRCode() {
    return (
      <div>
        <HeaderDark className="p-5 absolute top-0 left-0 w-full" />
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <div className="relative w-full max-w-[40rem]">
            <img className="w-full" src={qrCodeImageUrl} />
            <div className="absolute top-0 left-0 w-full h-full">
              <VisualIndicator shouldAnimate={triggerVisualIndicator} />
            </div>
          </div>
          <Link to="/my-content">
            <button
              className="bg-mv-color px-5 py-2 text-white rounded-lg block font-bold"
              type="button"
            >
              View my scanned actions
            </button>
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full">
          <ContentToastContainer />
        </div>
      </div>
    );
  }
  return <div>{renderQRCode()}</div>;
}
