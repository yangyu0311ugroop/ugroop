import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TRANSFER_TOUR_TYPE } from 'variantsConstants';
import { FormattedMessage as M } from 'react-intl';
import { H5 } from 'viewComponents/Typography';

import { CONFIG } from './config';
import styles from './styles';
import m from './messages';
import TransferByUser from '../TransferByUser';
import Transferee from '../Transferee';

export class TransferContent extends PureComponent {
  renderTransferByMember = () => {
    const { id, orgId } = this.props;
    return (
      <GridItem>
        <TransferByUser
          id={id}
          variant={this.props.transferByType}
          orgId={orgId}
        />
      </GridItem>
    );
  };

  renderTransferByAnyone = () => (
    <GridItem>
      <H5>
        <M {...m.anyOneText} />
      </H5>
    </GridItem>
  );

  renderTransferPending = () => {
    const { transferByType } = this.props;
    return LOGIC_HELPERS.switchCase(transferByType, {
      [TRANSFER_TOUR_TYPE.EMAIL]: this.renderTransferByAnyone,
      [DEFAULT]: this.renderTransferByMember,
    });
  };

  renderTransferReady = () => {
    const {
      classes,
      transferToUserId,
      transferToEmail,
      isAwaiting,
      emailSent,
    } = this.props;
    const label = LOGIC_HELPERS.ifElse(
      isAwaiting,
      <M {...m.awaitingLabel} />,
      <M {...m.readyLabel} />,
    );

    const labelClasss = LOGIC_HELPERS.ifElse(
      isAwaiting,
      classes.awaingLabelText,
      classes.readyWarningText,
    );

    return (
      <GridItem>
        <GridContainer direction="column">
          <GridItem>
            <H5 className={labelClasss}>
              {label}
              &nbsp;
            </H5>
          </GridItem>
          <GridItem>
            <Transferee
              userId={transferToUserId}
              email={transferToEmail}
              noanimate
            />
          </GridItem>
          {emailSent && (
            <GridItem>
              <H5 className={labelClasss}>
                <M {...m.emailSentlabel} />
                &nbsp;
              </H5>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { isPending } = this.props;

    if (isPending) return this.renderTransferPending();
    return this.renderTransferReady();
  };
}

TransferContent.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  orgId: PropTypes.number,
  isPending: PropTypes.bool,
  isAwaiting: PropTypes.bool,
  emailSent: PropTypes.bool,

  // resaga props
  createdBy: PropTypes.number,
  me: PropTypes.number,
  transferByType: PropTypes.string,
  // Awaiting Transfer
  transferStatus: PropTypes.string,
  transferToUserId: PropTypes.number,
  transferToEmail: PropTypes.string,
};

TransferContent.defaultProps = {
  isPending: false,
  isAwaiting: false,
  emailSent: false,
};

export default compose(
  withStyles(styles, { name: 'TransferStatus' }),
  resaga(CONFIG),
)(TransferContent);
