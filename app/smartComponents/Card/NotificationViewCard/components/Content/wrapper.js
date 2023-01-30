import { DO_NOTHING_FUNC } from 'appConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import { moment } from 'utils';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Button from 'viewComponents/Button';
import Avatar from 'ugcomponents/Person/AvatarById';
import NodeContent from 'ugcomponents/Card/InvitationCard/components/Content/components/NodeContent';
import { compose } from 'redux';
import UGNavLink from 'components/NavLink';
import { withStyles } from '@material-ui/core';
import resaga from 'resaga';
import OrgName from 'smartComponents/Organisation/parts/Name';
import styles from './styles';
import { CONTENT_CONFIG } from './config';
import DaySeparator from '../../../parts/DaySeparator';
import { VARIANTS } from '../../../../../variantsConstants';
import CreatedAt from '../../parts/createdAt';
import NotificationContent from '../../parts/notificationContent';
import { isEmptyString } from '../../../../../utils/stringAdditions';
import {
  NOTIFICATION_API,
  UPDATE_UGROOP_NOTIFICATION_STATUS,
} from '../../../../../apis/constants';
export class ContentWrapper extends PureComponent {
  componentWillMount = () => {
    this.personPhotoProps = {
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XS,
    };
  };

  markReadSuccess = () => {
    this.props.resaga.setValue({
      status: 'read',
    });
  };

  markReadAction = event => {
    const { userId, id } = this.props;
    this.props.resaga.dispatchTo(
      NOTIFICATION_API,
      UPDATE_UGROOP_NOTIFICATION_STATUS,
      {
        payload: {
          id: userId,
          ugroopid: id,
          data: {
            beforeId: id,
            status: 'read',
          },
        },
        onSuccess: this.markReadSuccess,
      },
    );
    event.preventDefault();
  };

  isSameDay = () => {
    const { createdAt, previousCreatedAt } = this.props;

    if (!previousCreatedAt) {
      return false;
    }

    return moment.isSameDay(createdAt, previousCreatedAt);
  };

  content = () => {
    const { orgId, nodeId, url, onClose, notificationStatus } = this.props;
    if (nodeId) {
      return (
        <NodeContent
          nodeId={nodeId}
          url={url}
          onClick={onClose}
          notificationStatus={notificationStatus}
        />
      );
    }
    return (
      <UGNavLink to={url} onClick={onClose}>
        <OrgName id={orgId} variant={VARIANTS.STRING_ONLY} />
      </UGNavLink>
    );
  };

  renderDayHeader = () => {
    const { createdAt, previousCreatedAt, first } = this.props;

    if (this.isSameDay()) {
      return null;
    }

    return (
      <GridItem>
        <DaySeparator
          previousCreatedAt={previousCreatedAt}
          createdAt={createdAt}
          first={first}
        />
      </GridItem>
    );
  };

  renderReadButton = () => {
    const { classes, status } = this.props;
    let text = 'Mark as unread';
    if (isEmptyString(status)) {
      text = 'Mark as read';
    } else if (status !== 'unread') {
      text = 'Mark as read';
    }
    if (status === 'read') {
      return null;
    }
    return (
      <Button
        transparent
        title={text}
        className={classes.readBtn}
        icon="lnr-circle"
        iconButton
        checked
        size="extraSmall"
        variant={VARIANTS.BORDERLESS}
        onClick={this.markReadAction}
        iconClassName={classes.iconClass}
      />
    );
  };

  render = () => {
    const { senderId, classes, content, status, method, simple } = this.props;

    if (simple) {
      if (method === 'tourInvitation') return '';

      return (
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          className={classes.simple}
        >
          <GridItem>
            <PersonPhoto id={senderId} {...this.personPhotoProps} />
          </GridItem>
          <GridItem>
            <NotificationContent
              status={status}
              id={senderId}
              content={content}
              method={method}
              simple={simple}
            />
          </GridItem>
        </GridContainer>
      );
    }

    return (
      <React.Fragment>
        {this.renderDayHeader()}
        <GridItem className={classes.root}>
          <GridContainer spacing={0}>
            <GridItem className={classes.spacing}>
              <Avatar sm userId={senderId} />
            </GridItem>
            <GridItem
              className={classnames(classes.grow, classes.invitationTitle)}
            >
              <GridContainer spacing={0} direction="column">
                <GridItem>
                  <NotificationContent
                    status={status}
                    id={senderId}
                    content={content}
                    method={method}
                  />
                </GridItem>
                <GridItem>{this.content()}</GridItem>
                <GridItem>
                  <CreatedAt id={this.props.id} />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>{this.renderReadButton()}</GridItem>
          </GridContainer>
        </GridItem>
      </React.Fragment>
    );
  };
}

ContentWrapper.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  onClose: PropTypes.func,
  simple: PropTypes.bool,

  // resaga props
  resaga: PropTypes.object.isRequired,
  senderId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  previousCreatedAt: PropTypes.string,
  first: PropTypes.bool.isRequired,
  notificationStatus: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string,
  nodeId: PropTypes.number,
  orgId: PropTypes.number,
  id: PropTypes.number,
  userId: PropTypes.number,
  status: PropTypes.string,
  method: PropTypes.string,
};

ContentWrapper.defaultProps = {
  onClose: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(styles, { name: 'ContentWrapper' }),
  resaga(CONTENT_CONFIG),
)(ContentWrapper);
