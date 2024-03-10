import React from "react";
import {
  faEnvelope,
  faChartSimple,
  faHouse,
  faRepublican,
} from "@fortawesome/free-solid-svg-icons";

export const SideBarData = [
  {
    title: "Dashboard",
    icon: faHouse,
    link: "/admin",
  },

  {
    title: "Report",
    icon: faRepublican,
    link: "/admin/report",
  },

  {
    title: "Overview",
    icon: faChartSimple,
    link: "/admin/overview",
  },
];

export default SideBarData;
