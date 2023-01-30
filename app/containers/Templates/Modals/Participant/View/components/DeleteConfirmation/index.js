import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { FormattedMessage as M } from 'react-intl';
import { VARIANTS } from 'variantsConstants';
import { DeleteConfirmationDialog } from 'ugcomponents/DialogPopup';
import Name from 'smartComponents/Node/parts/Name';
import m from './messages';

export class ParticipantDeleteConfirmation extends React.PureComponent {
  getRestProps = () => omit(this.props, ['personType']);

  renderTitle = () => {
    const { personType } = this.props;
    return <M {...m.title} values={{ personType }} />;
  };

  renderHeadline = () => (
    <M
      {...m.headlineWithName}
      values={{ name: <Name {...this.props} variant={VARIANTS.TEXT_ONLY} /> }}
    />
  );

  renderText = () => <M {...m.text} />;

  renderConfirmButtonText = () => <M {...m.confirmButton} />;

  render = () => (
    <DeleteConfirmationDialog
      dialogTitle={this.renderTitle()}
      headlineTitle={this.renderHeadline()}
      headlineText={this.renderText()}
      confirmButton={this.renderConfirmButtonText()}
      {...this.getRestProps()}
    />
  );
}

ParticipantDeleteConfirmation.propTypes = {
  // parent
  personType: PropTypes.string,
};

ParticipantDeleteConfirmation.defaultProps = {
  personType: null,
};

export default ParticipantDeleteConfirmation;
