import dynamic from "next/dynamic";
import React from "react";
const Profile = dynamic(() => import("../../src/User/Profile"), { ssr: false });

function dashboard() {
  return (
    <div>
      <Profile />
    </div>
  );
}

export default dashboard;
