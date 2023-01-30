import React from 'react';
import '@testing-library/jest-dom';
import { PERSON_DATA_STORE } from 'appConstants';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { CommencementDate } from '../index';
import { VARIANTS } from '../../../../../../../variantsConstants';
import Form from '../../../../../../../ugcomponents/Form';

describe('CommencementDate', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    id: 1,
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by default', () => {
    renderWithRedux(<CommencementDate {...props} />);
  });
  it('should render properly by default', () => {
    const { store } = renderWithRedux(<CommencementDate {...props} />);
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        commencementDate: '2020-06-01',
      },
    });
    expect(screen.getByText(/2020-06-01/i)).toBeInTheDocument();
  });
  it('should render properly by text field', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Form>
          <CommencementDate {...props} variant={VARIANTS.TEXT_FIELD} />
        </Form>
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        commencementDate: '2020-06-01',
      },
    });
    expect(screen.getByText(/Commencement Date/i)).toBeInTheDocument();
  });
  it('should render properly by editable field', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Form>
          <CommencementDate {...props} variant={VARIANTS.EDITABLE} />
        </Form>
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        commencementDate: '2020-06-01',
      },
    });
    expect(screen.getByText(/Commencement Date/i)).toBeInTheDocument();
  });
});
