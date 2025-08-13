import { FC } from "react";
import { Outlet } from "react-router";
import SampleProvider from "./providers/SampleProvider";

const Sample: FC = () => {
  return (
    <SampleProvider>
      <Outlet />
    </SampleProvider>
  );
};

export default Sample;
