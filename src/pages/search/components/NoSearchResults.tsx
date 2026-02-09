import IcSearch from "@/assets/icons/ic_search.svg?react";

interface NoSearchResultsProps {
  searchText: string;
}

const NoSearchResults = ({ searchText }: NoSearchResultsProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-layout-side pt-100">
      <IcSearch className="text-gray-400" width={87} height={87} />
      <h2 className="heading6 mt-20 text-gray-800">결과 없음</h2>
      <p className="body5 mt-12 whitespace-nowrap text-center text-gray-600">
        {searchText} 와(과) 일치하는 검색어에
        <br />
        대한 검색 결과가 없습니다
      </p>
      <p className="body5 mt-8 whitespace-nowrap text-center text-gray-600">
        다른 검색어 또는 보다 적은 검색어를 사용하여
        <br />
        다시 검색해 보세요
      </p>
    </div>
  );
};

export default NoSearchResults;
