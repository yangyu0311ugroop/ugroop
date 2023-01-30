import React from 'react';
import { render } from '@testing-library/react';

import { FontWeightWithText } from '../index';

test('FontWeightWithText', () => {
  const { queryByText } = render(
    <FontWeightWithText content="a" fontWeight={0} />,
  );
  expect(queryByText('a')).not.toBeNull();
});

test('FontWeightWithText with font Weight 400', () => {
  const { container } = render(
    <FontWeightWithText content="a" fontWeight={400} />,
  );
  // eslint-disable-next-line no-underscore-dangle
  expect(container.firstChild.style._values).toEqual({ 'font-weight': '400' });
});
