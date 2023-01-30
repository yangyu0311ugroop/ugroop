import { ability } from 'apis/components/Ability/ability';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import ImageUtility from 'utils/imageUtils';
import { DayContent } from '../dayContent';

describe('DayContent', () => {
  let render;
  let instance;
  let mockFn;
  const onTitleChangeMocked = jest.fn();
  const onRichContentTextChangeMocked = jest.fn();
  const handleTitleChangedMocked = jest.fn();
  const handleImageChangedMocked = jest.fn();
  const handleDescriptionChangedMocked = jest.fn();
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  const uploadFile = {
    enqueueData: jest.fn(),
    subscribeSuccess: jest.fn(),
  };
  beforeEach(() => {
    mockFn = jest.fn(() => ({
      promise: {
        then: cb => {
          cb({ image: 'image', data: 'data' });
          return { catch: c => c({}) };
        },
      },
    }));
    ImageUtility.fetchAndProcessImage = mockFn;
    render = shallow(
      <DayContent
        dayId={1}
        editor={false}
        index={1}
        classes={{ label: {} }}
        content="content"
        description="description"
        photoUrl="abcd"
        x={1}
        y={1}
        width={1}
        height={1}
        onTitleChange={onTitleChangeMocked}
        handleTitleChanged={handleTitleChangedMocked}
        handleImageChanged={handleImageChangedMocked}
        handleDescriptionChanged={handleDescriptionChangedMocked}
        onRichContentTextChange={onRichContentTextChangeMocked}
        resaga={resaga}
        uploadFile={uploadFile}
      />,
    );
    instance = render.instance();
    Date.now = jest.fn(() => 1);
  });
  afterEach(() => {
    mockFn.mockClear();
  });

  it('onTextChange', () => {
    instance.onTextChange('title');
    expect(onTitleChangeMocked).toHaveBeenCalledWith('title');
  });

  it('onRichContentTextChange', () => {
    instance.onRichContentTextChange('title');
    expect(onRichContentTextChangeMocked).toHaveBeenCalledWith('title');
  });

  describe('handleChange()', () => {
    it('should handleChange', () => {
      sections.upsert = jest.fn(() => 'sections.upsert');
      instance.handleChange('title')('some title');

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('canEdit()', () => {
    it('should return true', () => {
      render.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });
  });

  describe('openDayView()', () => {
    it('should call resaga.setValue', () => {
      render.setProps({ dayId: 999 });

      instance.openDayView();

      TEST_HELPERS.expectMatchSnapshot(resaga.setValue);
    });
  });

  describe('view mode', () => {
    it('render view mode 1', () => {
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('render view mode 2', () => {
      render.setProps({ editor: false, content: null, description: null });
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('render view mode 3', () => {
      render.setProps({
        photoUrl: '',
        editor: false,
        content: null,
        description: 'some data',
      });
      expect(render.instance().props.photoUrl).toBe('');
      expect(
        toJSON(shallow(<div>{render.instance().viewMode()}</div>)),
      ).toMatchSnapshot();
    });
    it('render view mode 4', () => {
      render.setProps({
        photoUrl: '',
        editor: false,
        location: 'some location',
        content: null,
        description: '',
      });
      expect(render.instance().props.photoUrl).toBe('');
      expect(
        toJSON(shallow(<div>{render.instance().viewMode()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('onUrlChange', () => {
    it('should call this.props.onUrlChange', () => {
      const onUrlChange = jest.fn();
      render.setProps({
        onUrlChange,
      });
      instance.onUrlChange('value');
      expect(onUrlChange).toHaveBeenCalledWith('value');
    });
  });

  describe('edit mode', () => {
    it('render edit mode', () => {
      render.setProps({ editor: true, photoUrl: '' });
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('render edit mode 2', () => {
      render.setProps({ editor: true, photoUrl: 'abcd' });
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('render edit mode with state uploadImageData ', () => {
      render.setProps({ editor: true, photoUrl: 'abcd' });
      render.setState({
        editImage: 'editImage',
        uploadImageData: [{ url: 'abcd' }],
      });
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('render edit mode with state uploadImageData ', () => {
      render.setProps({ editor: true, photoUrl: 'abcd' });
      render.setState({
        editImage: 'editImage',
        uploadImageData: [],
        noBorder: true,
      });
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('render edit mode with no photo, no uploadImageDATA ', () => {
      render.setProps({ editor: true, photo: null });
      render.setState({ uploadImageData: [], noBorder: false });
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('toggleEdit()', () => {
      const mockedfn = jest.fn();
      const mockedfn2 = jest.fn();
      const event = { preventDefault: mockedfn };
      const toolBarFunc = { toggleEdit: mockedfn2 };
      render.setProps({ toolBarFunc });
      instance.toggleEdit(event);
      expect(mockedfn).toHaveBeenCalled();
      expect(mockedfn2).toHaveBeenCalled();
    });
  });
});
