import { DEFAULT } from 'appConstants';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import { PRINT_FORM_VARIANTS } from 'variantsConstants';
import PrintParticipants from './components/PrintParticipants';
import { CONFIG } from './config';
import styles from './styles';

export class PrintPdfForm extends PureComponent {
  state = {};

  handleClose = () => {
    PORTAL_HELPERS.close(this.props);
  };

  renderContent = () => {
    const { printType, id } = this.props;
    return LOGIC_HELPERS.switchCase(printType, {
      [PRINT_FORM_VARIANTS.PEOPLE_PARTICIPANTS]: (
        <PrintParticipants id={id} handleClose={this.handleClose} />
      ),
      [DEFAULT]: <PrintParticipants id={id} handleClose={this.handleClose} />,
    });
  };

  render = () => (
    <Dialog maxWidth="xs" fullWidth open onClose={this.handleClose}>
      <DialogTitle noPaddingBottom>
        <Title heading="Processing..." />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
    </Dialog>
  );
}

PrintPdfForm.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  printType: PropTypes.string,

  // resaga props
};

PrintPdfForm.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'PrintPdfForm' }),
  resaga(CONFIG),
)(PrintPdfForm);
