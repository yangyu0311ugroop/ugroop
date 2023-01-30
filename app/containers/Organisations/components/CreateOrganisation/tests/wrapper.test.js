import { shallow } from 'enzyme';
import React from 'react';
import CreateOrganisationWrapper from '../createOrganisationWrapper';
test('CreateOrganisationWrapp', () => {
  const data = shallow(<CreateOrganisationWrapper />);
  expect(data).not.toBeNull();
});
