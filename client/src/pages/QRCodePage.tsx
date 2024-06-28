import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Link } from "react-router-dom";

export default function QRCodePage() {
  const [qrCode, setQRCode] = useState(crypto.randomUUID());
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState("");

  useEffect(() => {
    const generateCode = async () => {
      const imageUrl = await QRCode.toDataURL(qrCode, {
        errorCorrectionLevel: "H",
      });

      setQrCodeImageUrl(imageUrl);
    };
    generateCode();
  }, [qrCode]);

  function renderQRCode() {
    return (
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
    );
  }
  return <div>{renderQRCode()}</div>;
}
