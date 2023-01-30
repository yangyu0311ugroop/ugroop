/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

import { FlightBooking } from '..';

describe('<FlightBooking />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<FlightBooking {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(FlightBooking).toBeDefined();
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderEditable()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderField()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderLabel()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderLabel()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderOption()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.renderOption()}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('renderEmptyField()', () => {
    it('should renderEmptyField', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmptyField);
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

  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });

  describe('renderLabelHeading()', () => {
    it('should renderLabelHeading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabelHeading);
    });
  });

  describe('renderValueOnly()', () => {
    it('should renderValueOnly', () => {
      TEST_HELPERS.expectDefined(instance.renderValueOnly);
    });
  });
});
