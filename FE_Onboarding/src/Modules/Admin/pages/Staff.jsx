import React, { useContext, useEffect } from "react";
import { UIContext } from "../../../Global/Context";
import { BsPeople } from "react-icons/bs";
import { StaffDashboard } from "../components/StaffDashboard";

export const Staff = () => {
  const { setEntityIcon } = useContext(UIContext);

  useEffect(() => {
    setEntityIcon(<BsPeople />);
  }, [setEntityIcon]);

  return <StaffDashboard />;
};
