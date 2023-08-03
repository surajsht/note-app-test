"use client";

import React from "react";
import { CustomContext } from "../context/Context";

const Profile = () => {
  let { currentUser, Signout } = CustomContext();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-3">
        <div className="font-bold">
          Welcome <span> {currentUser?.displayName} </span>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => Signout()}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
