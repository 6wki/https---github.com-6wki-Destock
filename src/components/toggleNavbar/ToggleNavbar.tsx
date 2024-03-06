"use client";

import { useState } from "react";

const ToggleNavbar = () => {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("navbarToggle") === "true"
  );

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    localStorage.setItem("navbarToggle", String(newValue));
  };

  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label className="toggle" htmlFor="checkbox">
        <div id="bar1" className="bars"></div>
        <div id="bar2" className="bars"></div>
        <div id="bar3" className="bars"></div>
      </label>
    </>
  );
};

export default ToggleNavbar;
