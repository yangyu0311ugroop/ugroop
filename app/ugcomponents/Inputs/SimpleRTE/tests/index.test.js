import { ADVANCED_EDIT_MODE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { SimpleRTE } from '../index';

describe('SimpleRTE/tests/index.test.js', () => {
  let rendered;
  let instance;
  const history = { push: jest.fn(), replace: jest.fn() };

  const resaga = {
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {
      root: 'root',
      readOnly: 'readOnly',
    },
    resaga,
    getValue: jest.fn(),
    setValue: jest.fn(),
    history,
  };

  beforeEach(() => {
    rendered = shallow(<SimpleRTE {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
    history.push.mockReset();
    history.replace.mockReset();
  });

  describe('<SimpleRTE />', () => {
    it('should exists', () => {
      expect(SimpleRTE).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('componentDidMount()', () => {
    it('should call focus', () => {
      rendered.setProps({ autoFocus: true });
      instance.quill = { focus: jest.fn() };

      instance.componentDidMount();

      expect(instance.quill.focus).toBeCalledWith();
    });
  });

  describe('wrapperClassName()', () => {
    it('should return readOnly', () => {
      rendered.setProps({ readOnly: true });

      expect(instance.wrapperClassName()).toMatchSnapshot();
    });
  });

  describe('handleRef()', () => {
    it('should return readOnly', () => {
      instance.handleRef(123);

      expect(instance.quill).toBe(123);
    });
  });

  describe('convertHrefToURL()', () => {
    it('test url my-tours', () => {
      const orginalURL = `http://localhost:3000/my-tours`;
      const pathAndQuery = `/my-tours`;

      expect(instance.convertHrefToURL(orginalURL)).toBe(pathAndQuery);
    });
    it('test url my-tours', () => {
      const orginalURL = `http://localhost:3000/my-tours`;
      const pathAndQuery = `/my-tours`;

      expect(instance.convertHrefToURL(orginalURL)).toBe(pathAndQuery);
    });
    it('test url marketplace category Featured', () => {
      const orginalURL =
        'http://localhost:3000/marketplace?category=Featured%20Tours';

      expect(instance.convertHrefToURL(orginalURL)).toBe(
        '/marketplace?category=Featured%20Tours',
      );
    });
    it('test url marketplace category Featured', () => {
      const orginalURL = 'http://localhost:3000/marketplace?category=Checklist';

      expect(instance.convertHrefToURL(orginalURL)).toBe(
        '/marketplace?category=Checklist',
      );
    });
    it('test url public template', () => {
      const orginalURL =
        'http://localhost:3000/public/template/a744a320d2dc4b54bb5823126ad40d9a';

      expect(instance.convertHrefToURL(orginalURL)).toBe(
        '/public/template/a744a320d2dc4b54bb5823126ad40d9a',
      );
    });
    it('test url https://www.google.com', () => {
      const orginalURL = 'https://www.google.com';

      expect(instance.convertHrefToURL(orginalURL)).toBe('/');
    });
  });

  describe('validatingTargetOfHostname()', () => {
    it('should return readOnly', () => {
      const event = { preventDefault: jest.fn() };
      const linkUrl = 'http://localhost:3000/org/298/tours?view=card&page=1';
      const pathAndQuery = `/org/298/tours?view=card&page=1`;
      instance.searchQlEditor = jest.fn().mockReturnValue([
        {
          addEventListener: jest.fn().mockImplementation((action, cb) => {
            cb(event);
          }),
          getAttribute: jest.fn().mockReturnValue(linkUrl),
          setAttribute: jest.fn(),
        },
      ]);
      instance.validatingTargetOfHostname();
      instance.convertHrefToURL(linkUrl);
      expect(history.push).toBeCalledWith(pathAndQuery);
    });
  });

  describe('handleValueRef()', () => {
    it('should return readOnly', () => {
      instance.handleValueRef(123);

      expect(instance.attachments).toBe(123);
    });
  });
  describe('imageHandler()', () => {
    it('insertEmbed should be called', () => {
      instance.quill = {
        focus: jest.fn(),
        getEditor: jest.fn(() => ({
          getSelection: jest.fn(() => ({ index: 1 })),
          insertEmbed: jest.fn(),
        })),
      };
      instance.quill.getEditor.insertEmbed = jest.fn();
      instance.imageHandler(123, { link: 'www.ugroop.com/upload/image.jpg' });
    });
    it('should return range is 0', () => {
      instance.quill = {
        focus: jest.fn(),
        getEditor: jest.fn(() => ({
          getSelection: jest.fn(),
          insertEmbed: jest.fn(),
        })),
      };
      instance.imageHandler(123, { link: 'www.ugroop.com/upload/image.jpg' });
    });
    it('should return quillRef not valid should not explode', () => {
      instance.quill = {
        getEditor: jest.fn(() => null),
      };
      instance.imageHandler(123, { link: 'www.ugroop.com/upload/image.jpg' });
    });
    it('should return getEditor is not function, should not explode', () => {
      instance.quill = {
        focus: jest.fn(),
        getEditor: '',
      };
      instance.imageHandler(123, { link: 'www.ugroop.com/upload/image.jpg' });
    });
    it('should not explode if quill is not valid', () => {
      instance.imageHandler(123, { link: 'somelink' });
    });
    it('should return readOnly', () => {
      instance.quill = { focus: jest.fn(), getEditor: jest.fn(() => 'test') };
      instance.imageHandler(123, { a: '' });
    });
    it('should return readOnly', () => {
      instance.imageHandler();
    });
  });

  describe('handleChange()', () => {
    it('should call LOGIC_HELPERS.ifFunction', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      instance.handleChange(123);

      TEST_HELPERS.expectCalledAndMatchSnapshot(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('render()', () => {
    it('should return normal', () => {
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return with See More', () => {
      rendered.setProps({
        readOnly: true,
        editing: false,
        renderSeeMore: true,
      });
      rendered.setState({ dimensions: { height: 200 }, collapse: true });
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return with See Less', () => {
      rendered.setProps({
        readOnly: true,
        editing: false,
        renderSeeMore: true,
      });
      rendered.setState({ dimensions: { height: 200 }, collapse: false });
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render ADVANCED_EDIT_MODE', () => {
      rendered.setProps({ mode: ADVANCED_EDIT_MODE });
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleCreateLinkSuccess()', () => {
    it('should handleCreateLinkSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkSuccess);
    });
    it('should handleCreateLinkSuccess', () => {
      rendered.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkSuccess);
    });
  });
});
