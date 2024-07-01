export default function parseIdsFromQuery() {
  const searchParams = new URLSearchParams(location.search);
  return (
    searchParams
      .get("ids")
      ?.split(",")
      .map((item) => Number(item)) || []
  );
}
