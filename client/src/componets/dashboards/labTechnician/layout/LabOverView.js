import React, { useState } from "react";
import "../style/LabOverView.css";

import LabRoot from "./LabRoot";

export default function LabOverView() {
  return (
    <div>
      <LabRoot component={<div>labDashboard</div>} />
    </div>
  );
}
