import axiosInstance, { baseUrl } from "src/libs/api-client";
import { ExperimentQSTNAREWebApiApi } from "./generated";

const Api = new ExperimentQSTNAREWebApiApi(undefined, baseUrl, axiosInstance);

export default Api;
