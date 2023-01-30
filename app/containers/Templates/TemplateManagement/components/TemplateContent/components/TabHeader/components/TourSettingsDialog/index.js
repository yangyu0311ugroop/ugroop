import { DO_NOTHING, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import JDialog from 'ugcomponents/JDialog';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import JText from 'components/JText';
import Content from './components/Content';
import m from './messages';
import styles from './styles';

export class TourSettingsDialog extends PureComponent {
  componentWillMount = () => {
    const { classes } = this.props;

    this.dialogClasses = { paper: classes.paper };
  };

  closeSettings = () =>
    this.props.resaga.setValue({ tourSettingsDialog: false });

  handleClose = () => {
    const { onClose } = this.props;

    this.closeSettings();
    if (onClose) return onClose('tourSettingsDialog');

    return DO_NOTHING;
  };

  renderTitle = () => (
    <JText md uppercase bold>
      {<M {...m.header} />}
    </JText>
  );

  renderContent = () => <Content id={this.props.id} />;

  render = () => {
    const { tourSettingsDialog } = this.props;

    return (
      <JDialog
        open={tourSettingsDialog}
        onClose={this.handleClose}
        maxHeight={SIZE_CONSTANTS.SM}
        maxWidth="xs"
        fullWidth
        header={this.renderTitle()}
        hideSubmitButton
      >
        {this.renderContent()}
      </JDialog>
    );
  };
}

TourSettingsDialog.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),

  // parent props
  onClose: PropTypes.func,
  id: PropTypes.number,

  // resaga props
  tourSettingsDialog: PropTypes.bool,
};

TourSettingsDialog.defaultProps = {
  tourSettingsDialog: false,
  id: 0,
};

export default resaga({
  value: {
    tourSettingsDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'tourSettingsDialog'],
  },
  setValue: {
    tourSettingsDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'tourSettingsDialog'],
  },
})(
  withStyles(styles, { name: 'TourSettingsDialog' })(
    injectIntl(TourSettingsDialog),
  ),
);
