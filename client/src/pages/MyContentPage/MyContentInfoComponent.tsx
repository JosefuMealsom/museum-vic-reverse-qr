import { useEffect } from "react";
import copyData from "../../data/copy.json";
import { Link } from "react-router-dom";

export default function MyContentInfoComponent(props: { contentId: number }) {
  const content = copyData.find((item) => item.id === props.contentId);
  const imageUrl = new URL(
    `../../assets/${content?.heroImage}`,
    import.meta.url
  ).href;
  const title = content?.title;

  useEffect(() => {}, []);

  return (
    // <Link to={content?.url || ""}>
    <div className="rounded-lg w-full h-48 object-cover relative overflow-hidden">
      <h1 className="font-source-sans text-white font-bold text-2xl absolute top-2 left-4">
        {title}
      </h1>
      <img src={imageUrl} className="w-full h-full object-cover" />
    </div>
    // </Link>
  );
}
