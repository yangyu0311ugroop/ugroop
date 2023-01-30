import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { AddTemplateDialogFlow } from '../index';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('AddTemplateDialogFlow', stylesheet);

describe('AddTemplateDialogFlow', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(
      <AddTemplateDialogFlow onClose={() => {}} classes={mockStyle}>
        qweqwe
      </AddTemplateDialogFlow>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
