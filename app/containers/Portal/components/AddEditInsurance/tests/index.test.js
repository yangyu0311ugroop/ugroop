import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { AddEditInsurance } from '../index';
import { VARIANTS } from '../../../../../variantsConstants';

describe('AddEditInsurance', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    open: true,
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by default', () => {
    renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AddEditInsurance
          {...props}
          canEdit
          canDelete
          variant={VARIANTS.TEXT_ONLY}
        />
      </MuiPickersUtilsProvider>,
    );
    act(() => {
      userEvent.click(screen.getByTestId('add-insurance-save'));
    });
  });
  it('should render properly by create', () => {
    renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AddEditInsurance
          {...props}
          canEdit
          canDelete
          variant={VARIANTS.TEXT_ONLY}
          id={0}
        />
      </MuiPickersUtilsProvider>,
    );
    expect(screen.getByText(/Add Insurance Policy/i)).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('add-insurance-save'));
    });
    act(() => {
      userEvent.click(screen.getByTestId('add-insurance-delete'));
    });
    act(() => {
      userEvent.click(screen.getByTestId('add-insurance-discard'));
    });
  });
  it('should render properly by editable', () => {
    renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AddEditInsurance
          {...props}
          canEdit
          canDelete
          variant={VARIANTS.TEXT_ONLY}
          id={1}
        />
      </MuiPickersUtilsProvider>,
    );
    expect(screen.getByText(/Edit Insurance Policy/i)).toBeInTheDocument();
  });
});
