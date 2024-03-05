import React from "react";
import Overview from "./rootLayouts/Overview";
export default function Doctor() {
  return (
    <div>
      <Overview />
    </div>
  );
}
// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Overview from "./rootLayouts/Overview";
// import Report from "./rootLayouts/Report";

// const router = createBrowserRouter([
//   {
//     path: "/doctor/overview",
//     element: <Overview></Overview>,
//   },
//   {
//     path: "/doctor/report",
//     element: <Report></Report>,
//   },
// ]);

// export default function Doctor() {
//   return (
//     <div>
//       <RouterProvider router={router}></RouterProvider>
//     </div>
//   );
// }
