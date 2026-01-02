import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

type SortProps = {
  label: string;
  searchParamValue: string;
  options: { value: string; label: string }[];
};

const Sort = ({ label, searchParamValue, options }: SortProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(searchParamValue, e.target.value);
    setSearchParams(newParams);
  };

  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="sort"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        {label}
      </label>
      <select
        id="sort"
        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        onChange={handleOnChange}
      >
        <option>Select an option</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Sort;
