import React from 'react';
import ChatDown from '../index';
test('ChatDown', () => {
  expect(<ChatDown type="error" text="another error" />).toMatchSnapshot();
});
