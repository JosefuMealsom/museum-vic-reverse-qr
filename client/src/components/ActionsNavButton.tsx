import { Link } from "react-router-dom";

export default function ActionsNavButton() {
  return (
    <Link to="/my-actions">
      <button
        className="bg-mv-color px-5 py-2 text-white rounded-lg block font-bold"
        type="button"
      >
        View all my actions
      </button>
    </Link>
  );
}
