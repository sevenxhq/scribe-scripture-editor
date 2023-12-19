/* eslint-disable */
import { Configuration, PublicApi } from '@ory/kratos-client';
import React,{useState} from 'react';
// import configData from '../../config.json';

// const kratos = new PublicApi(new Configuration({ basePath: configData.base_url }));

const useApi = () => {
  const [config, setConfig] = useState();
  const getFlow = (flowId) => {
    kratos.getSelfServiceRegistrationFlow(flowId)
      .then(({ data: flow }) => {
        setConfig(flow.methods.password.config);
      });
  };
  return { state: { config }, action: { getFlow } };
};
export default useApi;
