import React from "react";
import Sidebar, { SidebarItem } from "./rootLayouts/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faLessThan,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
export default function Doctor() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}
