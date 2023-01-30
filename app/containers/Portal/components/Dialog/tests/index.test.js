import {
  ADD_HAZARD,
  ADD_RISK,
  ADD_ROUTE,
  DATES_SELECT,
  MANAGE_TABS,
  PHOTO_PREVIEW,
  PROMPT,
  UPLOAD_PHOTOS,
  ADD_TOUR,
  CREATE_CHAT_CHANNEL,
  EDIT_CHAT_DESCRIPTION,
  ADD_PEOPLE_IN_CHANNEL,
  HIDE_CHAT_DESCRIPTION,
  LEAVE_CHAT_DESCRIPTION,
  DELETE_CHAT_DESCRIPTION,
  POPPER_DIALOG,
  CLONE_TEMPLATE,
  VIEW_EVENT,
  ADD_ROOM,
  ADD_ROOM_PAX,
  CREATE_TOUR_EMAIL,
  ADD_EVENT,
  PRINT_PDF_FORM,
  COPY_PARTICIPANT,
  ADD_TAB,
  PARTICIPANT_LIST,
  COPY_TAB_OTHER,
  HELP_DIALOG,
  SHOW_SYSTEM_UPDATE,
  ADD_EDIT_INSURANCE,
} from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Dialog } from '../index';

describe('<Dialog />', () => {
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
    rendered = shallow(<Dialog {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Dialog).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('component()', () => {
    it('should return null', () => {
      expect(instance.component()).toBe(null);
    });

    it('should return PHOTO_PREVIEW', () => {
      expect(instance.component(PHOTO_PREVIEW)).toBeDefined();
    });

    it('should return PROMPT', () => {
      expect(instance.component(PROMPT)).toBeDefined();
    });

    it('should return UPLOAD_PHOTOS', () => {
      expect(instance.component(UPLOAD_PHOTOS)).toBeDefined();
    });

    it('should return ADD_ROUTE', () => {
      expect(instance.component(ADD_ROUTE)).toBeDefined();
    });

    it('should return MANAGE_TABS', () => {
      expect(instance.component(MANAGE_TABS)).toBeDefined();
    });

    it('should return ADD_RISK', () => {
      expect(instance.component(ADD_RISK)).toBeDefined();
    });

    it('should return ADD_HAZARD', () => {
      expect(instance.component(ADD_HAZARD)).toBeDefined();
    });

    it('should return ADD_TOUR', () => {
      expect(instance.component(ADD_TOUR)).toBeDefined();
    });

    it('should return DATES_SELECT', () => {
      expect(instance.component(DATES_SELECT)).toBeDefined();
    });
    it('should return CREATE_CHAT_CHANNEL', () => {
      expect(instance.component(CREATE_CHAT_CHANNEL)).toBeDefined();
    });
    it('should return EDIT_CHAT_DESCRIPTION', () => {
      expect(instance.component(EDIT_CHAT_DESCRIPTION)).toBeDefined();
    });
    it('should return ADD_PEOPLE_IN_CHANNEL', () => {
      expect(instance.component(ADD_PEOPLE_IN_CHANNEL)).toBeDefined();
    });
    it('should return HIDE_CHAT_DESCRIPTION', () => {
      expect(instance.component(HIDE_CHAT_DESCRIPTION)).toBeDefined();
    });
    it('should return LEAVE_CHAT_DESCRIPTION', () => {
      expect(instance.component(LEAVE_CHAT_DESCRIPTION)).toBeDefined();
    });
    it('should return DELETE_CHAT_DESCRIPTION', () => {
      expect(instance.component(DELETE_CHAT_DESCRIPTION)).toBeDefined();
    });
    it('should return POPPER_DIALOG', () => {
      expect(instance.component(POPPER_DIALOG)).toBeDefined();
    });
    it('should return CLONE_TEMPLATE', () => {
      expect(instance.component(CLONE_TEMPLATE)).toBeDefined();
    });

    it('should return VIEW_EVENT', () => {
      expect(instance.component(VIEW_EVENT)).toBeDefined();
    });
    it('should return ADD_ROOM', () => {
      expect(instance.component(ADD_ROOM)).toBeDefined();
    });
    it('should return ADD_ROOM_PAX', () => {
      expect(instance.component(ADD_ROOM_PAX)).toBeDefined();
    });
    it('should return CREATE TOUR EMAIL', () => {
      expect(instance.component(CREATE_TOUR_EMAIL)).toBeDefined();
    });

    it('should return ADD_EVENT', () => {
      expect(instance.component(ADD_EVENT)).toBeDefined();
    });
    it('should return PRINT_PDF_FORM', () => {
      expect(instance.component(PRINT_PDF_FORM)).toBeDefined();
    });
    it('should return COPY_PARTICIPANT', () => {
      expect(instance.component(COPY_PARTICIPANT)).toBeDefined();
    });
    it('should return ADD_TAB', () => {
      expect(instance.component(ADD_TAB)).toBeDefined();
    });
    it('should return PARTICIPANT_LIST', () => {
      expect(instance.component(PARTICIPANT_LIST)).toBeDefined();
    });
    it('should return COPY_TAB_OTHER', () => {
      expect(instance.component(COPY_TAB_OTHER)).toBeDefined();
    });
    it('should return HELP_DIALOG', () => {
      expect(instance.component(HELP_DIALOG)).toBeDefined();
    });
    it('should return ADD_EDIT_INSURANCE', () => {
      expect(instance.component(ADD_EDIT_INSURANCE)).toBeDefined();
    });
    it('should return SHOW_SYSTEM_UPDATE', () => {
      expect(instance.component(SHOW_SYSTEM_UPDATE)).toBeDefined();
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ dialogData: { type: undefined } });

      expect(instance.render()).toBe(null);
    });

    it('should render component null', () => {
      instance.component = jest.fn(() => null);

      rendered.setProps({ dialogData: { type: PHOTO_PREVIEW } });

      expect(instance.render()).toBe(null);
    });

    it('should render component', () => {
      instance.component = jest.fn(() => 'span');

      rendered.setProps({ dialogData: { type: PHOTO_PREVIEW } });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
