import { useSearchParams } from "react-router-dom";
import Select from "./select";

type Props = { isPlaceholderData: boolean; totalPages: number };

const Pagination = ({ isPlaceholderData, totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";

  const handleSetSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-center">
        <span>Current Page: {page}</span>
        <button
          onClick={() => handleSetSearchParams("page", (+page - 1).toString())}
          disabled={page === "1"}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (!isPlaceholderData && totalPages > +page) {
              handleSetSearchParams("page", (+page + 1).toString());
            }
          }}
          disabled={isPlaceholderData}
        >
          Next Page
        </button>
      </div>

      <Select
        label=""
        options={[
          { label: "5", value: "5" },
          { label: "10", value: "10" },
          { label: "15", value: "15" },
        ]}
        searchParamValue="limit"
      />
    </div>
  );
};

export default Pagination;
