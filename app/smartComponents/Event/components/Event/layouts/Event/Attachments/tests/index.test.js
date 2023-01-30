import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Attachments } from '../index';

describe('<Attachments />', () => {
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
    rendered = shallow(<Attachments {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Attachments).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSuccess', () => {
    it('should open snackbar', () => {
      SNACKBAR_HELPER.openSuccessSnackbar = jest.fn();
      instance.handleSuccess();

      expect(SNACKBAR_HELPER.openSuccessSnackbar).toBeCalled();
      expect(SNACKBAR_HELPER.openSuccessSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleError', () => {
    it('should open snackbar', () => {
      SNACKBAR_HELPER.openErrorSnackbar = jest.fn();
      instance.handleError();

      expect(SNACKBAR_HELPER.openErrorSnackbar).toBeCalled();
      expect(SNACKBAR_HELPER.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleSubmit', () => {
    it('should call patchEventAttachment api', () => {
      TEMPLATE_API_HELPERS.patchEventAttachment = jest.fn();
      const model = {
        link: {
          url: '/sample',
          name: 'sample',
        },
        description: 'desc',
      };
      rendered.setProps({
        dataId: 1,
        templateId: 1,
      });
      instance.handleSubmit(1)({
        model,
        onSuccess: jest.fn(),
      });

      expect(TEMPLATE_API_HELPERS.patchEventAttachment).toBeCalledWith(
        {
          templateId: 1,
          eventId: 1,
          attachmentId: 1,
          data: {
            link: model.link.url,
            name: model.link.name,
            description: model.description,
          },
          onSuccess: instance.handleSuccess,
          onError: instance.handleError,
        },
        resaga,
      );
    });
  });

  describe('renderValue', () => {
    it('should match snapshot', () => {
      instance.renderDescription = jest.fn(() => 'desc');
      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDescription', () => {
    it('should match snapshot', () => {
      instance.renderName = jest.fn(() => 'name');
      const snapshot = shallow(<div>{instance.renderDescription()()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderName', () => {
    it('should match snapshot', () => {
      instance.renderLink = jest.fn(() => 'name');
      const snapshot = shallow(<div>{instance.renderName()()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLink', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLink()()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFormActions', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderFormActions()()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match if readOnly returns true', () => {
      rendered.setProps({
        readOnly: true,
      });
      const snapshot = shallow(<div>{instance.renderFormActions(1)()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        attachments: [1, 2, 3],
      });
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValueOnly()', () => {
    it('should return null', () => {
      rendered.setProps({ attachments: [] });

      expect(instance.renderValueOnly()).toBe(false);
    });

    it('should renderValueOnly', () => {
      rendered.setProps({ attachments: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderValueOnly);
    });
  });

  describe('render()', () => {
    it('should match snapshot', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
