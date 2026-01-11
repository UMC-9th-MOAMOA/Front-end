import { NavLink } from "react-router-dom";
import IcHomeActive from "@/assets/icons/ic_home_active.svg?react";
import IcHomeDefault from "@/assets/icons/ic_home_default.svg?react";
import IcMyActive from "@/assets/icons/ic_my_active.svg?react";
import IcMyDefault from "@/assets/icons/ic_my_default.svg?react";
import IcSearchActive from "@/assets/icons/ic_search_active.svg?react";
import IcSearchDefault from "@/assets/icons/ic_search_default.svg?react";
import IcSettingActive from "@/assets/icons/ic_setting_active.svg?react";
import IcSettingDefault from "@/assets/icons/ic_setting_default.svg?react";

interface NavItemProps {
  to: string;
  label: string;
  ActiveIcon: any;
  DefaultIcon: any;
}

const NAV_ITEMS: NavItemProps[] = [
  {
    to: "/",
    label: "홈",
    ActiveIcon: IcHomeActive,
    DefaultIcon: IcHomeDefault,
  },
  {
    to: "/search",
    label: "탐색",
    ActiveIcon: IcSearchActive,
    DefaultIcon: IcSearchDefault,
  },
  {
    to: "/my",
    label: "MY",
    ActiveIcon: IcMyActive,
    DefaultIcon: IcMyDefault,
  },
  {
    to: "/settings",
    label: "설정",
    ActiveIcon: IcSettingActive,
    DefaultIcon: IcSettingDefault,
  },
];

function NavItem({ to, label, ActiveIcon, DefaultIcon }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center justify-center gap-2 ${
          isActive ? "text-black" : "text-gray-600"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <ActiveIcon className="h-6 w-6" />
          ) : (
            <DefaultIcon className="h-6 w-6" />
          )}
          <span className="detail-sm">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function BottomNavigation() {
  return (
    <nav
      className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-(--width-app) bg-white pb-safe-bottom"
      style={{
        boxShadow: "0px -8px 50px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="mx-auto flex h-24 w-full max-w-(--width-design-base) items-center">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </div>
    </nav>
  );
}
