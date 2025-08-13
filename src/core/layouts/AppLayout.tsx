import AppNavbar from "core/components/AppNavbar";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import GenericLayout from "shared/layouts/GenericLayout";

const AppLayout: FC = () => {
  return <GenericLayout header={<AppNavbar />} body={<Outlet />} />;
};

export default AppLayout;
