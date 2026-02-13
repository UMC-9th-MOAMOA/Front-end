import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/common/header/Header";
import CategoryDetailView from "./views/CategoryDetailView";
import KeywordSearchView from "./views/KeywordSearchView";
import MainSearchView from "./views/MainSearchView";

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const getHeaderTitle = () => {
    if (mode === "category") return "Category";
    return "미션 수행하기";
  };

  const getHeaderProperty = (): "search" | "heart" => {
    if (mode === "category") return "search";
    return "heart";
  };

  const handleBackToMain = () => {
    navigate("/search");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      {mode !== "keyword" && (
        <Header
          title={getHeaderTitle()}
          property={getHeaderProperty()}
          onBack={mode ? handleBackToMain : handleBackToHome}
          onRightIconClick={
            mode === "category"
              ? () => navigate("/search?mode=keyword")
              : () => navigate("/mypage?tab=mission")
          }
        />
      )}

      {!mode && <MainSearchView />}
      {mode === "category" && <CategoryDetailView />}
      {mode === "keyword" && <KeywordSearchView />}
    </>
  );
}
