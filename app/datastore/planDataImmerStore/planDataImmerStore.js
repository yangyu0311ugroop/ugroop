import React from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import { PLAN_STORE_IMMER } from '../../appConstants';
import planDataReducer from './reducer';

function PlanDataImmerStore() {
  useInjectReducer({ key: PLAN_STORE_IMMER, reducer: planDataReducer });
  return <React.Fragment />;
}

export default PlanDataImmerStore;
