import { useEffect } from "react";
import { toast } from "react-toastify";
import ActionsNavButton from "../components/ActionsNavButton";
import HeaderLight from "../components/HeaderLight";
import SavedContentService from "../services/saved-content.service";
import copyData from "../data/copy.json";
import { useParams } from "react-router-dom";

export default function InfoPage() {
  const contentId = Number(useParams<{ id: string }>().id);
  const content = copyData.find((item) => item.id === contentId);
  const imageUrl = new URL(`../assets/${content?.heroImage}`, import.meta.url)
    .href;

  useEffect(() => {
    if (!SavedContentService.findSavedContent(contentId)) {
      SavedContentService.saveContent(contentId);
      toast("Added to your saved actions", {
        position: "top-center",
      });
    }
  }, []);

  function renderActions() {
    return (
      <ul className="list-disc p-5">
        {content?.actions.map((action) => (
          <li key={action.description}>
            <strong>{action.heading}</strong>: {action.description}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className="absolute top-0 left-0 w-full p-5 z-10">
        <HeaderLight />
      </div>
      <div className="font-source-sans mb-5">
        <div className="w-full h-[30rem] object-cover relative">
          <img src={imageUrl} className="w-full h-full object-cover" />
          <h1 className="text-white absolute bottom-0 left-0 p-5 font-black text-4xl">
            {content?.title}
          </h1>
        </div>
        <div className="p-5">
          <p>{content?.description}</p>
          {renderActions()}
          <strong>
            Find out more about organisations making a difference.
          </strong>
        </div>
        <div className="flex justify-center items-center w-full mb-6 px-2 flex-col">
          <div>
            <button
              className="bg-[#FFB219] px-2 py-2 text-white rounded-lg block font-bold mb-3"
              type="button"
            >
              Connect with organisations
            </button>
          </div>
          a
          <ActionsNavButton />
        </div>
      </div>
    </div>
  );
}
