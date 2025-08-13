import { useQuery } from "@tanstack/react-query"
import SampleService from "../services/SampleService"


export const useFetchSampleData = () => {
    const { fetchSampleData } = SampleService()

    return useQuery({
        queryKey: ["sample-data"],
        queryFn: fetchSampleData,

    })
}