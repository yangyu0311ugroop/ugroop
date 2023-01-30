/**
 * Created by edil on 8/8/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { UGImagePlaceholder } from '../index';
import CoolTheme from '../../../theme/coolTheme';

const placeholderProps = {
  imgSrc: '',
  fileId: '',
  placeholder: <p>Test</p>,
  facadeURLPrefix: false,
  classes: {},
  className: '',
};

const placeholderProps2 = {
  imgSrc: 'url',
  fileId: 'placeholder',
  placeholder: <p>Test</p>,
  facadeURLPrefix: true,
};

const placeholderProps3 = {
  imgSrc: 'url',
  placeholder: <p>Test</p>,
  imgStyle: 'round-button-img',
  facadeURLPrefix: false,
};

describe('<Placeholder />', () => {
  let wrapper = shallow(
    <UGImagePlaceholder {...placeholderProps} classes={{}} />,
  );
  it('should render something', () => {
    expect(wrapper.render()).toBeDefined();
  });
  it('should return the custom placeholder', () => {
    expect(wrapper.html()).toEqual('<div><p>Test</p></div>');
  });
  it('should render proper display for placeholder', () => {
    const expected = {
      imgSrc: '',
      fileId: '',
      placeholder: <p>Test</p>,
      facadeURLPrefix: false,
      classes: {},
      className: '',
      cropMetaInfo: {},
      deleteIcon: false,
      resizeSide: 'width',
      deleteTitle: 'DELETE IMAGE',
      rotate: 0,
      largeIcons: false,
      smallIcons: false,
      showIconOnHover: false,
      showUploadIcon: true,
      showMoveIcon: true,
    };
    expect(wrapper.instance().props).toEqual(expected);
  });
  it('should render proper display for placeholder', () => {});
  it('should return the image placeholder', () => {
    placeholderProps.imgSrc = 'some.url';
    wrapper = shallow(<UGImagePlaceholder {...placeholderProps} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

// test.js
describe('<Placeholder with facadeURLPrefix On/>', () => {
  let wrapper;
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should render largeIcons', () => {
    wrapper = shallow(
      <MuiThemeProvider theme={CoolTheme}>
        <UGImagePlaceholder {...placeholderProps2} classes={{}} />
      </MuiThemeProvider>,
    );
    wrapper.setProps({ largeIcons: true });
    expect(wrapper.render()).toBeDefined();
  });
  it('should render smallIcons', () => {
    wrapper = shallow(
      <MuiThemeProvider theme={CoolTheme}>
        <UGImagePlaceholder {...placeholderProps2} classes={{}} />
      </MuiThemeProvider>,
    );
    wrapper.setProps({ smallIcons: true });
    expect(wrapper.render()).toBeDefined();
  });
  it('should render centerIcons', () => {
    wrapper = shallow(
      <MuiThemeProvider theme={CoolTheme}>
        <UGImagePlaceholder {...placeholderProps2} classes={{}} />
      </MuiThemeProvider>,
    );
    wrapper.setProps({ centerIcons: true });
    expect(wrapper.render()).toBeDefined();
  });
  it('should render deleteIcon', () => {
    wrapper = shallow(
      <MuiThemeProvider theme={CoolTheme}>
        <UGImagePlaceholder {...placeholderProps2} classes={{}} />
      </MuiThemeProvider>,
    );
    wrapper.setProps({ deleteIcon: true });
    expect(wrapper.render()).toBeDefined();
  });
  it('should render something', () => {
    wrapper = shallow(
      <MuiThemeProvider theme={CoolTheme}>
        <UGImagePlaceholder {...placeholderProps2} classes={{}} />
      </MuiThemeProvider>,
    );
    expect(wrapper.render()).toBeDefined();
  });
  it('should render something', () => {
    wrapper = shallow(
      <MuiThemeProvider theme={CoolTheme}>
        <UGImagePlaceholder {...placeholderProps3} classes={{}} />
      </MuiThemeProvider>,
    );
    expect(wrapper.render()).toBeDefined();
  });
});

describe('onDelete', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(
      <UGImagePlaceholder {...placeholderProps2} classes={{}} />,
    );
    instance = wrapper.instance();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render dialog', () => {
    wrapper.setState({ open: true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('open() instance', () => {
    wrapper.setState({ open: false });
    instance.open();
    expect(instance.state.open).toBe(true);
  });
  it('close() instance', () => {
    wrapper.setState({ open: true });
    instance.close();
    expect(instance.state.open).toBe(false);
  });
  it('handleDelete() instance', () => {
    const mockOnDeleteClick = jest.fn();
    wrapper.setProps({ onDeleteClick: mockOnDeleteClick });
    wrapper.setState({ open: true });
    instance.handleDelete();

    expect(instance.state.open).toBe(false);
    expect(mockOnDeleteClick).toHaveBeenCalled();
  });
});
