import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import { DeleteButton } from '../index';

describe('<DeleteButton />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<DeleteButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DeleteButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleError', () => {
    it('should should snackbar', () => {
      SNACKBAR_HELPER.openErrorSnackbar = jest.fn();
      instance.handleError({})();

      expect(SNACKBAR_HELPER.openErrorSnackbar).toBeCalled();
      expect(SNACKBAR_HELPER.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleSuccess', () => {
    it('should should snackbar', () => {
      SNACKBAR_HELPER.openSuccessSnackbar = jest.fn();
      instance.handleSuccess({})();

      expect(SNACKBAR_HELPER.openSuccessSnackbar).toBeCalled();
      expect(SNACKBAR_HELPER.openSuccessSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleDelete', () => {
    it('should delete attachment api and pass templateId, eventId and attachmentId', () => {
      TEMPLATE_API_HELPERS.deleteEventAttachment = jest.fn();
      rendered.setProps({
        templateId: 1,
        eventId: 1,
        attachmentId: 1,
      });
      const mockedEv = {
        stopPropagation: jest.fn(),
      };
      instance.handleDelete(mockedEv);

      expect(TEMPLATE_API_HELPERS.deleteEventAttachment).toBeCalledWith(
        expect.objectContaining({
          templateId: 1,
          eventId: 1,
          attachmentId: 1,
        }),
        resaga,
      );
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
