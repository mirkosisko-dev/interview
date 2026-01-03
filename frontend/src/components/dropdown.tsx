import React from "react";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const OUTER_OPTIONS = ["Status", "Item Count"];
const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "shipped",
    label: "Shipped",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];
const ITEM_COUNT_OPTIONS = [
  { value: "lt", label: "Larger than" },
  { value: "eq", label: "Equal" },
  { value: "st", label: "Smaller than" },
];

const Dropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOuterOptions, setSelectedOuterOptions] = React.useState<
    string[]
  >([]);
  const [selectedInnerOptions, setSelectedInnerOptions] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [searchQ, setSearchQ] = React.useState("");
  const [itemCount, setItemCount] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUpdateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const existing = newParams.get(key);
    if (key === "status") {
      if (existing) {
        newParams.set(key, `${existing},${value}`);
      } else {
        newParams.set(key, value);
      }
    } else newParams.set(key, value);
    setSearchParams(newParams);
  };

  const filterOptions = () => {
    let options: { value: string; label: string }[] = [];

    if (selectedOuterOptions.includes("Status")) {
      options = [...options, ...STATUS_OPTIONS];
    }
    if (selectedOuterOptions.includes("Item Count")) {
      options = [...options, ...ITEM_COUNT_OPTIONS];
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQ.toLowerCase()),
    );
  };

  const handleSelectOuterOption = (o: string) => {
    if (!selectedOuterOptions.includes(o)) {
      setSelectedOuterOptions((prev) => [...prev, o]);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  };

  const handleSelectInnerOption = (o: { label: string; value: string }) => {
    if (!selectedInnerOptions.includes(o)) {
      setSearchQ("");
      setSelectedInnerOptions((prev) => [...prev, o]);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  };

  const handleRemoveOption = (o: { label: string; value: string }) => {
    const newParams = new URLSearchParams(searchParams);
    const statusString = searchParams.get("status");
    if (statusString) {
      const statusArray = statusString.split(",").filter((s) => s !== o.value);

      if (statusArray.length > 0) {
        newParams.set("status", statusArray.join(","));
      } else {
        newParams.delete("status");
      }
      setSearchParams(newParams);
    }
    setSelectedInnerOptions((prev) =>
      prev.filter((option) => option.value !== o.value),
    );
  };

  const handleClearAll = () => {
    setSearchQ("");
    setItemCount("");
    setSelectedOuterOptions([]);
    setSelectedInnerOptions([]);
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  const renderInnerOptions = () => {
    if (selectedOuterOptions.length > 0) {
      if (filterOptions().length > 0) {
        return (
          <>
            {selectedOuterOptions.includes("Status") &&
              STATUS_OPTIONS.filter((so) =>
                so.label.toLowerCase().includes(searchQ.toLowerCase()),
              ).map((so) => (
                <div
                  key={so.value}
                  className={`hover:bg-white p-2 rounded-lg cursor-pointer ${selectedInnerOptions.includes(so) ? "bg-gray-200/80" : ""}`}
                  onClick={() => {
                    handleSelectInnerOption(so);
                    handleUpdateSearchParams("status", so.value);
                  }}
                >
                  {so.label}
                </div>
              ))}
            {selectedOuterOptions.includes("Item Count") && (
              <div>
                <input
                  name="item count"
                  type="text"
                  placeholder="Insert item count"
                  className="border-2 border-gray-400 w-full rounded-lg p-1 outline-none"
                  value={itemCount}
                  onChange={(e) => {
                    setItemCount(e.target.value);
                    setTimeout(
                      () =>
                        handleUpdateSearchParams("itemCount", e.target.value),
                      500,
                    );
                  }}
                />
                {ITEM_COUNT_OPTIONS.filter((ico) =>
                  ico.label.toLowerCase().includes(searchQ.toLowerCase()),
                ).map((ico) => (
                  <div
                    key={ico.value}
                    className={`hover:bg-white p-2 rounded-lg cursor-pointer ${selectedInnerOptions.includes(ico) ? "bg-gray-200/80" : ""}`}
                    onClick={() => {
                      handleSelectInnerOption(ico);
                      handleUpdateSearchParams("countFilter", ico.value);
                    }}
                  >
                    {ico.label}
                  </div>
                ))}
              </div>
            )}
          </>
        );
      } else return <div className="p-2">No filter found</div>;
    }
  };

  return (
    <div className="flex flex-col gap-2" onClick={() => setShowDropdown(true)}>
      <div className="flex items-center border-2 border-neutral-500 p-2 rounded-lg flex-col gap-2">
        <div className="flex gap-2 items-center flex-wrap">
          {selectedInnerOptions.map((so) => (
            <div
              key={so.value}
              className="flex items-center gap-2 bg-gray-200/30 p-1 rounded-lg"
            >
              {so.label}
              <IoMdClose
                size={20}
                className="hover:bg-gray-200 rounded-full p-1 cursor-pointer"
                onClick={() => handleRemoveOption(so)}
              />
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none"
            value={searchQ}
            ref={inputRef}
            onChange={(e) => setSearchQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSearchQ("");
            }}
          />

          {selectedOuterOptions.length > 0 && (
            <div className="hover:bg-neutral-100/5 p-1 rounded-lg absolute-right-6 cursor-pointer">
              <IoMdClose onClick={handleClearAll} />
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div className="bg-gray-200/60 p-2 flex flex-col rounded-lg gap-1">
          {OUTER_OPTIONS.map((oo) => (
            <div
              key={oo}
              onClick={() => handleSelectOuterOption(oo)}
              className={`hover:bg-white p-2 rounded-lg cursor-pointer ${selectedOuterOptions.includes(oo) ? "bg-gray-200/80" : ""}`}
            >
              {oo}
            </div>
          ))}
          {renderInnerOptions()}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
