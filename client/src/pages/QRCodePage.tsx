import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Link } from "react-router-dom";
import HeaderDark from "../components/HeaderDark";
import savedContentService from "../services/saved-content.service";
import socketIoService from "../services/socket-io.service";

export default function QRCodePage() {
  const [qrCode, _] = useState(savedContentService.fetchSessionID());
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState("");

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

  useEffect(() => {
    socketIoService.on("qr_code_detected", (data) => {
      const contentId = Number(data);

      if (!savedContentService.findSavedContent(contentId)) {
        savedContentService.saveContent(Number(data));
      }
    });
  }, []);

  function renderQRCode() {
    return (
      <div>
        <HeaderDark className="p-5 absolute top-0 left-0 w-full" />
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <img className="w-full max-w-[40rem]" src={qrCodeImageUrl} />
          <p className="font-source-sans font-bold text-base mb-8">
            Your code: {qrCode}
          </p>
          <Link to="/my-content">
            <button
              className="bg-mv-color px-5 py-2 text-white rounded-lg block font-bold"
              type="button"
            >
              View my scanned content
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return <div>{renderQRCode()}</div>;
}
