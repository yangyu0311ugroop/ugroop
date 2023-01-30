/**
 * Created by stephenkarpinskyj on 17/4/18.
 */

import React from 'react';
import { FormContext } from './FormContext';

export const renderWrappedComponent = (
  WrappedComponent,
  props,
  ref,
) => form => <WrappedComponent {...props} {...form} ref={ref} />;

/**
 * Subset of withFormsy HOC for easy access to form context by any component, not necessarily inputs.
 */
const withFormContext = WrappedComponent =>
  React.forwardRef((props, ref) => (
    <FormContext.Consumer>
      {renderWrappedComponent(WrappedComponent, props, ref)}
    </FormContext.Consumer>
  ));

export default withFormContext;
