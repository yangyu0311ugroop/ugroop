import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TourPrintHeader } from '../index';

describe('<TourPrintHeader />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const metaInfo = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  const props = {
    resaga,
    classes: {},
    templatePhotoUrl: '#',
    createdBy: { photo: '#', name: 'test', metaInfo },
    startDate: '12/01/2018',
    ...metaInfo,
  };

  beforeEach(() => {
    rendered = shallow(<TourPrintHeader {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourPrintHeader).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('should render without templateHeader', () => {
      rendered.setProps({ templatePhotoUrl: '' });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('should render orgPhoto', () => {
      rendered.setProps({
        createdBy: { photo: 'url' },
        hashkey: 'abcd',
        hasOrg: true,
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
