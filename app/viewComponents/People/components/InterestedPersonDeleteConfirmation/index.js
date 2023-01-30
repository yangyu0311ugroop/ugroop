import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage as M } from 'react-intl';
import { DeleteConfirmationDialog } from 'ugcomponents/DialogPopup';
import m from './messages';

export class InterestedPersonDeleteConfirmation extends React.PureComponent {
  renderTitle = () => <M {...m.title} />;

  renderHeadline = () => {
    const { firstName, lastName } = this.props;
    if (firstName || lastName) {
      return <M {...m.headlineWithName} values={{ firstName, lastName }} />;
    }
    return <M {...m.headlineWithoutName} />;
  };

  renderText = () => <M {...m.text} />;

  renderConfirmButtonText = () => <M {...m.confirmButton} />;

  render = () => (
    <DeleteConfirmationDialog
      dialogTitle={this.renderTitle()}
      headlineTitle={this.renderHeadline()}
      headlineText={this.renderText()}
      confirmButton={this.renderConfirmButtonText()}
      {..._.omitBy(this.props, InterestedPersonDeleteConfirmation.defaultProps)}
    />
  );
}

InterestedPersonDeleteConfirmation.propTypes = {
  // parent
  firstName: PropTypes.any,
  lastName: PropTypes.any,
};

InterestedPersonDeleteConfirmation.defaultProps = {
  firstName: null,
  lastName: null,
};

export default InterestedPersonDeleteConfirmation;
