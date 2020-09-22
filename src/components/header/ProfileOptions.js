import React from "react";
import NotificationsButton from "./NotificationsButton.js";
import ProfileMenu from "./ProfileMenu.js";

const ProfileOptions = () => {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      {/* <NotificationsButton /> */}
      <ProfileMenu />
    </div>
  );
};

export default ProfileOptions;
