import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Attachment } from '../index';

describe('<Attachment />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    sectionId: 3,
    id: 13,
    classes: {},
    hasPhoto: false,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Attachment {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Attachment).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderFileName()', () => {
    it('should render pending', () => {
      rendered.setProps({ fileSize: 0 });

      const snapshot = shallow(<div>{instance.renderFileName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render link', () => {
      rendered.setProps({
        fileSize: 123,
        name: 'hello',
        attachmentURL: 'holla',
      });

      const snapshot = shallow(<div>{instance.renderFileName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent()', () => {
    it('should render empty span', () => {
      rendered.setProps({ fileSize: 0, description: '' });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render file size', () => {
      rendered.setProps({ fileSize: 123, description: '' });
      instance.renderFileName = () => 'renderFileName';

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render description', () => {
      rendered.setProps({ fileSize: 0, description: 'abccc' });
      instance.renderFileName = () => 'renderFileName';

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render both', () => {
      rendered.setProps({ fileSize: 123, description: 'abccc' });
      instance.renderFileName = () => 'renderFileName';

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render with hasPhoto', () => {
      rendered.setProps({ hasPhoto: true });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
