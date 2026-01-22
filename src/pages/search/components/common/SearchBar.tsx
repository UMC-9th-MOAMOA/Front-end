import type { ChangeEvent, KeyboardEvent } from "react";
import IcSearch from "@/assets/icons/ic_search.svg?react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  showSearchButton?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "키워드 검색",
  showSearchButton = false,
}: SearchBarProps) {
  const isSearchable = value.trim() || showSearchButton;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isSearchable) {
      onSubmit?.();
    }
  };

  const handleSearchClick = () => {
    if (isSearchable) {
      onSubmit?.();
    }
  };

  return (
    <div className="flex w-full items-center gap-8 rounded-full border border-gray-400 bg-gray-100 px-17 py-8 focus-within:border-moamoa-200">
      <input
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="body-2 w-full bg-transparent text-black caret-moamoa-300 placeholder:text-gray-500 focus:outline-none"
      />
      <button type="button" onClick={handleSearchClick}>
        <IcSearch
          className={`size-24 shrink-0 ${isSearchable ? "text-black" : "text-gray-500"}`}
        />
      </button>
    </div>
  );
}
