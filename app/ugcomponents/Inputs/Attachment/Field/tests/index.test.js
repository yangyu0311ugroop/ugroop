/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import { shallow } from 'enzyme';
import React from 'react';

import { AttachmentField } from '..';

describe('<AttachmentField />', () => {
  let wrapper;
  let instance;

  const makeFileAttachment = () => ({
    id: 123,
    type: 'file',
    url: 'file://url.com',
    name: 'some name',
    size: 111,
    description: 'some description',
  });
  const makeLinkAttachment = (url = 'http://url.com') => ({
    id: 456,
    type: 'link',
    url,
    description: 'some description',
  });
  const makeUnknownAttachment = () => ({
    id: 789,
    type: 'someType',
    description: 'some description',
  });

  const makeProps = () => ({
    values: makeFileAttachment(),
    onTypeInputs: id => ({ name: `${id}.type` }),
    onUrlInputs: id => ({ name: `${id}.url` }),
    onNameInputs: id => ({ name: `${id}.name` }),
    onSizeInputs: id => ({ name: `${id}.size` }),
    onDescriptionInputs: id => ({ name: `${id}.description` }),
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<AttachmentField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(AttachmentField).toBeDefined();
  });

  describe('#handleLinkUrlChange()', () => {
    const value = 'someValue';

    beforeEach(() => {
      instance.setState = jest.fn();
      instance.handleLinkUrlChange(value);
    });

    it('sets state.url', () => {
      expect(instance.setState).toHaveBeenCalledWith(
        expect.objectContaining({ url: value }),
      );
    });
  });

  describe('#renderRemoveButton()', () => {
    let removeButtonWrapper;

    beforeEach(() => {
      wrapper.setProps({ onRemove: () => {} });
      removeButtonWrapper = shallow(instance.renderRemoveButton(true));
    });

    it('not explodes', () => {
      expect(removeButtonWrapper).toHaveLength(1);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot for link attachment', () => {
      wrapper.setProps({ values: makeLinkAttachment() });
      expect(instance.render()).toBeDefined();
    });

    it('still matches snapshot for link attachment with no url', () => {
      wrapper.setProps({ values: makeLinkAttachment(null) });
      expect(instance.render()).toBeDefined();
    });

    it('still matches snapshot for readOnly link attachment', () => {
      wrapper.setProps({ readOnly: true, values: makeLinkAttachment() });
      expect(instance.render()).toBeDefined();
    });

    it('still matches snapshot for unknown attachment', () => {
      wrapper.setProps({ values: makeUnknownAttachment() });
      expect(instance.render()).toBeDefined();
    });
  });
});
