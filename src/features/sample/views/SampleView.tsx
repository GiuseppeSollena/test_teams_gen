import { FC } from "react";
import GenericLayout from "shared/layouts/GenericLayout";
import SampleBody from "../components/SampleBody";
import useSampleContext from "../hooks/UseSampleContext";

const SampleView: FC = () => {
  const { isLoading } = useSampleContext();
  
  return (
    <GenericLayout isLoading={isLoading} body={<SampleBody />}></GenericLayout>
  );
};

export default SampleView;
