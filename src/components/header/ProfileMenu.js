import React, { useState } from "react";
import ProfileButton from "./ProfileButton.js";
import ProfileDropdown from "./ProfileDropdown.js";

const ProfileMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="ml-3 relative" onClick={() => setShow(!show)}>
      <ProfileButton />
      <ProfileDropdown showProfile={show} />
    </div>
  );
};

export default ProfileMenu;
