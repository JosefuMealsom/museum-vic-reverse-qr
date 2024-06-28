import { Link } from "react-router-dom";
import MyContentInfoComponent from "./MyContentInfoComponent";
import HeaderDark from "../../components/HeaderDark";

export default function MyContent() {
  function renderListInfoComponents() {
    return [0, 1, 2, 3].map((itemId: number) => (
      <div className="mb-2" key={itemId}>
        <MyContentInfoComponent contentId={itemId} />
      </div>
    ));
  }

  return (
    <div>
      <HeaderDark className="p-5" />
      <div className="font-source-sans mb-5 p-3">
        <h1 className="font-black text-2xl mb-3">Your scanned content</h1>
        {renderListInfoComponents()}
      </div>
      <div className="flex justify-center mb-10">
        <Link to="/">
          <button
            className="bg-mv-color px-5 py-2 text-white rounded-lg block font-bold"
            type="button"
          >
            Show my QR code
          </button>
        </Link>
      </div>
    </div>
  );
}
