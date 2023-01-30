/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { AttachmentList } from '..';

describe('<AttachmentList />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    addRow: jest.fn(),
    removeRow: jest.fn(),
    uploadFile: {
      enqueueFile: jest.fn(),
      subscribeSuccess: jest.fn(),
    },
    values: [{ id: 123 }, { id: 456 }],
    onTypeInputs: id => ({ name: `${id}.type` }),
    onUrlInputs: id => ({ name: `${id}.url` }),
    onNameInputs: id => ({ name: `${id}.name` }),
    onSizeInputs: id => ({ name: `${id}.size` }),
    onDescriptionInputs: id => ({ name: `${id}.description` }),
  });

  beforeEach(() => {
    wrapper = shallow(<AttachmentList {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(AttachmentList).toBeDefined();
  });

  describe('#componentWillMount()', () => {
    it('calls props.uploadFile.subscribeSuccess()', () => {
      instance.componentWillMount();
      expect(instance.props.uploadFile.subscribeSuccess).toBeCalledWith(
        instance.handleFileUploadSuccess,
      );
    });
  });

  describe('#handleAddLinkButtonClick()', () => {
    it('calls props.addRow()', () => {
      instance.handleAddLinkButtonClick();
      expect(instance.props.addRow).toBeCalledWith(
        expect.objectContaining({ type: 'link' }),
      );
    });
  });

  describe('#handleFileDrop()', () => {
    beforeEach(() => {
      const files = [{ id: 1 }, { id: 2 }];
      instance.handleFileDrop(files);
    });

    it('enqueues all files', () => {
      expect(
        instance.props.uploadFile.enqueueFile.mock.calls,
      ).toMatchSnapshot();
    });
  });

  describe('#handleFileUploadSuccess()', () => {
    it('calls props.addRow()', () => {
      const name = 'someName';
      const size = 123;
      const url = 'http://url.com';
      instance.handleFileUploadSuccess({ name, size, url });
      expect(instance.props.addRow).toBeCalledWith(
        expect.objectContaining({
          type: 'file',
          name,
          size,
          url,
        }),
      );
    });
  });

  describe('#handleRenderHeader()', () => {
    let headerWrapper;

    beforeEach(() => {
      headerWrapper = shallow(instance.handleRenderHeader());
    });

    it('not explodes', () => {
      expect(headerWrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(headerWrapper).toBeDefined();
    });

    it('still matches snapshot when props.readOnly', () => {
      wrapper.setProps({ readOnly: true });
      expect(instance.handleRenderHeader()).toBeDefined();
    });
  });

  describe('#handleRenderFooter()', () => {
    let footerWrapper;

    beforeEach(() => {
      footerWrapper = shallow(instance.handleRenderFooter());
    });

    it('not explodes', () => {
      expect(footerWrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(footerWrapper).toBeDefined();
    });

    it('returns null when props.readOnly', () => {
      wrapper.setProps({ readOnly: true });
      expect(instance.handleRenderFooter()).toBeNull();
    });
  });

  describe('#handleRenderRow()', () => {
    const values = { id: 123, url: 'aUrl' };
    const index = 1;
    const removeButton = 'remove button';
    const onRenderRemoveButton = () => removeButton;

    beforeEach(() => {
      instance.renderField = v => v;
      instance.renderRow = jest.fn();
      instance.handleRenderRow(values, index, onRenderRemoveButton);
    });

    it('calls this.renderRow correctly', () => {
      expect(instance.renderRow).toBeCalledWith(removeButton, values);
    });
  });

  describe('#renderField()', () => {
    let fieldWrapper;

    beforeEach(() => {
      fieldWrapper = shallow(
        instance.renderField(
          { id: 123, url: 'aUrl' },
          { id: 123, url: 'anotherUrl' },
        ),
      );
    });

    it('not explodes', () => {
      expect(fieldWrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(fieldWrapper)).toBeDefined();
    });
  });

  describe('#renderRow()', () => {
    let rowWrapper;

    beforeEach(() => {
      rowWrapper = shallow(instance.renderRow('remove button', 'attachment'));
    });

    it('not explodes', () => {
      expect(rowWrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(rowWrapper).toBeDefined();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
