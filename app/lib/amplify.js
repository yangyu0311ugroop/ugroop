import { API } from '@aws-amplify/api';

export const getAmplifyConfig = () => {
  const env = `${process.env.NODE_ENV}`;
  if (env === 'test') {
    return {};
  }

  return {
    aws_project_region: process.env.AWS_PROJECT_REGION,
    aws_appsync_graphqlEndpoint: process.env.AWS_APPSYNC_GRAPHQLENDPOINT,
    aws_appsync_region: process.env.AWS_APPSYNC_REGION,
    aws_appsync_authenticationType: process.env.AWS_APPSYNC_AUTHTYPE,
    aws_appsync_apiKey: process.env.AWS_APPSYNC_APIKEY,
  };
};

export const initializeAmplifyAPI = () => {
  const config = getAmplifyConfig();

  API.configure(config);
};
