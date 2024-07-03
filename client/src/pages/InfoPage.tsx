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
  const description = content?.description;
  const title = content?.title;

  useEffect(() => {
    if (!SavedContentService.findSavedContent(contentId)) {
      SavedContentService.saveContent(contentId);
      toast("Added to your saved actions", {
        position: "top-center",
      });
    }
  }, []);

  return (
    <div>
      <div className="absolute top-0 left-0 w-full p-5 z-10">
        <HeaderLight />
      </div>
      <div className="font-source-sans mb-5">
        <div className="w-full h-[30rem] object-cover relative">
          <img src={imageUrl} className="w-full h-full object-cover" />
          <h1 className="text-white absolute bottom-0 left-0 p-5 font-black text-4xl">
            {title}
          </h1>
        </div>
        <p
          className="p-5"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        ></p>
        <div className="flex justify-center w-full">
          <ActionsNavButton />
        </div>
      </div>
    </div>
  );
}