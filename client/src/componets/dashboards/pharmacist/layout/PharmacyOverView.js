import React, { useState } from "react";
import "../styles/PharmacyOverView.css";

import PharmacyRoot from "./PharmacyRoot";

export default function PharmacyOverView() {
  return (
    <div>
      <PharmacyRoot component={<div>pharmacy</div>} />
    </div>
  );
}
