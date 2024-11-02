import { axiosInstance } from "src/libs/api-client";
import { ExperimentQSTNAREWebApiApi } from "./generated";

const Api = new ExperimentQSTNAREWebApiApi(undefined, undefined, axiosInstance);

export default Api;
