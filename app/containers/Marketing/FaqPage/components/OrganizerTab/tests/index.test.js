import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { OrganizerTab } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('FAQPageOrganizerTab', stylesheet, theme);

describe('OrganizerTab', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<OrganizerTab classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  describe('onHandleTableContentClick', () => {
    it('should setState of the tableContentSelected state', () => {
      const wrapper = shallow(<OrganizerTab classes={mockStyle} />);
      const e = {
        preventDefault: jest.fn(),
        target: {
          attributes: {
            getNamedItem: () => ({
              value: 7,
            }),
          },
        },
      };
      wrapper.instance().onHandleTableContentClick(e);

      expect(e.preventDefault).toBeCalled();
      expect(wrapper.state().tableContentSelected).toBe(7);
    });
  });
});
