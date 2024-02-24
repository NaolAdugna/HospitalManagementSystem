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
    link: "/doctor",
  },

  {
    title: "Report",
    icon: faRepublican,
    link: "/doctor",
  },

  {
    title: "Analytics",
    icon: faEnvelope,
    link: "/",
  },

  {
    title: "Overview",
    icon: faChartSimple,
    link: "/",
  },
];

export default SideBarData;
