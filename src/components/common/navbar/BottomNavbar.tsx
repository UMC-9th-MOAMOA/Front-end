import { NavLink } from "react-router-dom";
import IcHome from "@/assets/icons/navbar/ic_home.svg?react";
import IcMyPage from "@/assets/icons/navbar/ic_my.svg?react";
import IcSearch from "@/assets/icons/navbar/ic_search.svg?react";
import IcSettings from "@/assets/icons/navbar/ic_settings.svg?react";

interface NavItemProps {
  to: string;
  label: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const NAV_ITEMS: NavItemProps[] = [
  {
    to: "/",
    label: "홈",
    Icon: IcHome,
  },
  {
    to: "/search",
    label: "탐색",
    Icon: IcSearch,
  },
  {
    to: "/mypage",
    label: "MY",
    Icon: IcMyPage,
  },
  {
    to: "/settings",
    label: "설정",
    Icon: IcSettings,
  },
];

function NavItem({ to, label, Icon }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className="flex flex-1 flex-col items-center justify-center gap-1"
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`h-40 w-40 ${isActive ? "text-moamoa-400" : "text-moamoa-100"}`}
          />
          <span
            className={`body-4-rg ${isActive ? "text-black" : "text-gray-600"}`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function BottomNavigation() {
  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-20 mx-auto w-full max-w-(--width-app) bg-white pb-safe-bottom"
      style={{
        boxShadow: "0px -8px 50px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="mx-auto flex h-96 w-full max-w-(--width-design-base) items-center px-6 py-4">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </div>
    </nav>
  );
}
