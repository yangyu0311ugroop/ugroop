import React from 'react';
import popOverButton from './popOverButton';

export const withPopoverButtonHook = Component => props => (
  <Component buttonPopover={popOverButton} {...props} />
);
