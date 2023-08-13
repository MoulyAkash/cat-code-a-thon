import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import CATLogo from "../../assets/logo.png";
import "./sidebar.css";

import { sideBarItems } from "../../routes";

type SideBarElementProps = {
  Icon: any;
  title?: string;
  onClick?: any;
  path?: string;
  ignoreExpand?: boolean;
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const SideBarElement: React.FC<SideBarElementProps> = ({
    onClick,
    Icon,
    title,
    path,
    ignoreExpand,
  }) => (
    <div className="sidebar-icon-container">
      <div
        className={`sidebar-icon noselect ${
          expanded && !ignoreExpand ? "expanded" : ""
        } ${ignoreExpand && expanded ? "menu" : ""} ${
          path === location.pathname ? "active" : ""
        }`}
        onClick={onClick ? onClick : () => path && navigate(path)}
      >
        {Icon}
        <div
          className={`sidebar-icon-title noselect ${
            path === location.pathname ? "active" : ""
          } ${expanded ? "" : "hidden"}`}
        >
          {title}
        </div>
      </div>
      {title && (
        <div className={`tool-tip noselect ${expanded ? "expanded" : ""}`}>
          {title}
        </div>
      )}
    </div>
  );

  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`}>
      <SideBarElement
        Icon={<BiMenu />}
        onClick={() => setExpanded((old) => !old)}
        ignoreExpand
      />
      <div className={`sidebar-logo noselect ${expanded ? "expanded" : ""}`}>
        <img src={CATLogo} />
        <div
          className={`sidebar-logo-title noselect ${expanded ? "" : "hidden"}`}
        >
          Caterpillar
        </div>
      </div>
      {sideBarItems.map((item: any, index: number) => (
        <SideBarElement
          key={index}
          Icon={<item.Icon />}
          path={item?.path}
          title={item?.title}
        />
      ))}
    </div>
  );
}
