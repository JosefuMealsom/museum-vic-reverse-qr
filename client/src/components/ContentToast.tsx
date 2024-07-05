import { useEffect, useState } from "react";
import copyData from "../data/copy.json";

export default function ContentToast(props: { contentId: number }) {
  const content = copyData.find((data) => data.id === props.contentId);
  const title = content?.title;
  const imageUrl = new URL(`../assets/${content?.heroImage}`, import.meta.url)
    .href;
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [startAnimate, setStartAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);

    setTimeout(() => {
      setStartAnimate(true);
    }, 100);

    setTimeout(() => {
      setShouldAnimate(false);
      setStartAnimate(false);
    }, 5000);
  }, []);

  return (
    <div
      className={`w-full bg-white border p-3 shadow-lg transition-transform duration-300 ${
        shouldAnimate && startAnimate ? "translate-x-0" : "translate-x-full"
      } flex justify-between items-center`}
    >
      <div>
        <h2 className="font-source-sans mb-1 text-sm font-bold">
          New content scanned!
        </h2>
        <h1 className="font-source-sans mb-1 text-xl font-bold">{title}</h1>
        <h2 className="font-source-sans mb-1 text-xs w-3/4">
          View all your scanned content by clicking the button below
        </h2>
      </div>
      <img src={imageUrl} className="w-28 h-20 object-cover rounded-lg" />
    </div>
  );
}
