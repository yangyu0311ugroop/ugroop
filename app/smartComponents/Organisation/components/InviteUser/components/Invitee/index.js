import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Grow } from '@material-ui/core';
import Icon from 'ugcomponents/Icon';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { H5 } from 'viewComponents/Typography';
import { SimpleRTE } from 'ugcomponents/Inputs';
import { Avatar, Name } from 'ugcomponents/Person';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import Role from 'smartComponents/Organisation/parts/Members/parts/Role';
import Hidden from '@material-ui/core/Hidden';
import { CONFIG } from './config';
import {
  ANIMATION_MAX_INDEX,
  ANIMATION_TIMEOUT,
  INCREMENT_TIMEOUT,
  NO_ANIMATION_TIMEOUT,
} from './constants';
import styles from './styles';

export class Invitee extends PureComponent {
  state = {
    show: false,
  };

  componentWillMount = () => {
    const { index } = this.props;

    // only show animation of the first ANIMATION_MAX_INDEX items
    let timeout;

    if (index < ANIMATION_MAX_INDEX) {
      timeout = ANIMATION_TIMEOUT + index * INCREMENT_TIMEOUT;
    } else {
      timeout = NO_ANIMATION_TIMEOUT;
    }
    this.show = setTimeout(() => this.setState({ show: true }), timeout);
  };

  componentWillUnmount = () => {
    clearTimeout(this.show);
  };

  seeDetail = () => {
    const { token } = this.props;

    this.props.resaga.setValue({ seeDetail: token, fromOrg: true });
  };

  renderStatus = () => {
    const { registered, fromOtherOrg } = this.props;
    if (registered) {
      return `REGISTERED USER ${fromOtherOrg ? 'FROM OTHER ORGANISATION' : ''}`;
    }

    return 'NEW USER';
  };

  renderUserStatus = () => {
    const { classes, creating } = this.props;

    // don't render for exist invitees
    if (!creating) return '';

    return (
      <GridItem>
        <span className={classes.userStatus}>{this.renderStatus()}</span>
      </GridItem>
    );
  };

  renderSeeDetail = () => {
    const { creating } = this.props;
    if (creating) return null;

    return (
      <GridItem>
        <Button
          dense
          iconButton
          size="small"
          color="gray"
          icon="ellipsis"
          variant="borderless"
          onClick={this.seeDetail}
        />
      </GridItem>
    );
  };

  renderPersonalMessage = () => {
    const { classes, content } = this.props;

    if (!content) return null;

    return (
      <GridItem className={classes.messageRoot}>
        <GridContainer direction="row" alignItems="center" justify="flex-start">
          <GridItem>
            <H5 className={classes.h5}>Message: </H5>
          </GridItem>
          <GridItem>
            <SimpleRTE
              name="pm"
              value={content}
              className={classes.message}
              readOnly
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderContent = () => {
    const { ownerId, invited, accepted, fromOtherOrg, token } = this.props;

    if (invited || ownerId || accepted || fromOtherOrg || token) {
      return this.renderAccepted();
    }
    return this.renderPending();
  };

  renderPending = () => {
    const { classes, userId, email, token, isSending } = this.props;

    return (
      <GridContainer direction="column" className={classes.root} spacing={0}>
        {this.renderUserStatus()}
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem>
              <Icon icon="lnr-envelope" className={classes.listItemIcon} />
            </GridItem>
            <GridItem className={classes.flex}>
              <Name id={userId} email={email} />
            </GridItem>
            <GridItem>
              <Role
                id={userId}
                token={token}
                variant={ORG_FIELD_VARIANTS.TEXT_EDITING}
                disableEditing={isSending}
              />
            </GridItem>
            {this.renderSeeDetail()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderAccepted = () => {
    const { classes, userId, email, token } = this.props;

    return (
      <GridContainer direction="column" className={classes.root} spacing={0}>
        {this.renderUserStatus()}
        <GridItem>
          <GridContainer alignItems="center">
            <Hidden smDown>
              <GridItem>
                <Avatar noTooltip sm userId={userId} />
              </GridItem>
            </Hidden>
            <GridItem>
              <Name id={userId} email={email} />
            </GridItem>
            <GridItem className={classes.role}>
              <Role
                id={userId}
                token={token}
                variant={ORG_FIELD_VARIANTS.TEXT_READ_ONLY}
              />
            </GridItem>
            {this.renderSeeDetail()}
          </GridContainer>
        </GridItem>
        {this.renderPersonalMessage()}
      </GridContainer>
    );
  };

  render = () => {
    const { index, noanimate } = this.props;
    const { show } = this.state;
    const content = this.renderContent();

    if (index < ANIMATION_MAX_INDEX) {
      if (noanimate) return content;

      return (
        <Grow in={show} timeout={ANIMATION_TIMEOUT / 2}>
          {content}
        </Grow>
      );
    }

    return show && content;
  };
}

Invitee.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  ownerId: PropTypes.number, // ownerId
  token: PropTypes.string, // invitation token
  index: PropTypes.number,
  noanimate: PropTypes.bool,
  creating: PropTypes.bool,
  fromOtherOrg: PropTypes.bool,
  isSending: PropTypes.bool,
  // resaga props
  userId: PropTypes.number,
  email: PropTypes.string,
  accepted: PropTypes.bool,
  registered: PropTypes.bool,
  invited: PropTypes.bool,
  content: PropTypes.string,
};

Invitee.defaultProps = {
  ownerId: 0,
  userId: 0,
  index: 0,
  token: '',
  email: '',
  noanimate: false,
  creating: false,
  accepted: false,
  registered: false,
  invited: false,
  fromOtherOrg: false,
  isSending: false,
};

export default compose(
  withStyles(styles, { name: 'Invitee' }),
  resaga(CONFIG),
)(Invitee);
