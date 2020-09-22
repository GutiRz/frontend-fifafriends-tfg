import React, { useState } from "react";
import Logo from "./Logo.js";
import NavOptions from "./NavOptions.js";
import ProfileOptions from "./ProfileOptions.js";
import MobileMenuButton from "../mobile/MobileMenuButton.js";
import NavBarMobile from "../mobile//NavBarMobile.js";
import ClubNavigation from "./ClubNavigation";

const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  function handleIsMenuActive(newValue) {
    setIsMenuActive(newValue);
  }

  return (
    <nav className="bg-white shadow-sm">
      <ClubNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Logo />
            <NavOptions />
          </div>
          <ProfileOptions />
          <MobileMenuButton
            isMenuActive={isMenuActive}
            handleIsMenuActive={handleIsMenuActive}
          />
        </div>
      </div>
      <NavBarMobile isMenuActive={isMenuActive} />
    </nav>
  );
};

export default NavBar;
