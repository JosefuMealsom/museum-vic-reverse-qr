import { Link } from "react-router-dom";
import MyContentInfoComponent from "./MyContentInfoComponent";
import HeaderDark from "../../components/HeaderDark";
import { useEffect, useState } from "react";
import SavedContentService from "../../services/saved-content.service";
import parseIdsFromQuery from "../../services/query-parser.service";

export default function MyContent() {
  const [scannedContent, setScannedContent] = useState(
    SavedContentService.getAllSavedContent()
  );

  // Not the best place to put this, but ok for now
  useEffect(() => {
    const ids = parseIdsFromQuery();

    for (const id of ids) {
      if (!SavedContentService.findSavedContent(id)) {
        SavedContentService.saveContent(id);
      }
    }
    setScannedContent(SavedContentService.getAllSavedContent());
  }, []);

  function renderListInfoComponents() {
    if (!scannedContent) {
      return null;
    }

    return scannedContent.map((itemId: number) => (
      <div className="mb-2" key={itemId}>
        <MyContentInfoComponent contentId={itemId} />
      </div>
    ));
  }

  return (
    <div>
      <HeaderDark className="p-5" />
      <div className="font-source-sans mb-5 p-3">
        <h1 className="font-black text-2xl mb-3">Your scanned actions</h1>
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
