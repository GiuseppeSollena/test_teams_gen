import useApiClient from "core/hooks/UseApiClient"
import { sampleDataMock } from "../mocks/SampleMocks"
import { SampleTable } from "../models/SampleModels"

const SampleService = () => {
    const {get} = useApiClient()

    const fetchSampleData = (): Promise<SampleTable[]> => {
        return new Promise((resolve,) => {
            setTimeout(() => {
                resolve(sampleDataMock)
            }, 2000)
        })

        return get<SampleTable[]>("/sample")
    }

    return {
        fetchSampleData,
    }
}

export default SampleService