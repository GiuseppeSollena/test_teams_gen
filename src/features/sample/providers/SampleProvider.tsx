import { FC, PropsWithChildren } from "react";
import SampleContext from "../context/SampleContext";
import { useFetchSampleData } from "../hooks/UseSampleApi";

const SampleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, isFetching } = useFetchSampleData();

  return (
    <SampleContext.Provider value={{ data, isLoading: isFetching }}>
      {children}
    </SampleContext.Provider>
  );
};

export default SampleProvider;
