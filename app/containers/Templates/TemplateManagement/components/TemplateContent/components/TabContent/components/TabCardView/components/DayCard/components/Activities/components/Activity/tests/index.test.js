import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Activity } from '../index';

describe('<Activity />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    attachmentId: '/attachmentUrl',
  };

  beforeEach(() => {
    rendered = shallow(<Activity {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Activity).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render no attachment if attachmentId is null/undefined', () => {
      rendered.setProps({
        attachmentId: undefined,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render photoSection if photoId is not 0', () => {
      rendered.setProps({
        photoId: '/photoUrl',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render location if location is not blank space', () => {
      rendered.setProps({
        location: 'At the feet of the cross of Jesus Christ',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
