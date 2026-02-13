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
    to: "/home",
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
      className="flex flex-1 flex-col items-center justify-center pt-10 pb-22"
    >
      {({ isActive }) => (
        <>
          <div className="flex h-40 w-40 items-center justify-center">
            <Icon
              className={`${isActive ? "text-moamoa-400" : "text-moamoa-100"}`}
            />
          </div>
          <span
            className={`mt-6 font-normal text-[14px] leading-[130%] ${isActive ? "text-black" : "text-gray-600"}`}
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
      className="fixed right-0 bottom-0 left-0 z-20 mx-auto w-full bg-white pb-safe-bottom"
      style={{
        boxShadow: "0px -8px 50px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex w-full">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </div>
    </nav>
  );
}
