import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import { TOUR_CONNECTION_MODES } from 'datastore/templateManagementStore/selectors';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { withStyles } from 'components/material-ui';
import { DEFAULT, VALUE } from 'appConstants';
import { Name } from 'ugcomponents/Person';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Email from 'smartComponents/Person/parts/Email';
import JDialog from 'ugcomponents/JDialog';
import NodeName from 'smartComponents/Node/parts/Name';

import UserNodeListByOwner from './components/UserNodeListByOwner';
import UserNodeList from './components/UserNodeList';
import UserNodeActions from './components/UserNodeActions';
import { CONFIG } from './config';
import styles from './styles';

export const mockFunc = () => {};

export class TourConnectionDialog extends React.PureComponent {
  handleCloseClick = () => {
    this.props.onClose();
  };

  handleRemoveUser = () => {
    this.props.onClose();
  };

  renderContent = () => {
    const { id, mode } = this.props;
    return LOGIC_HELPERS.switchCase(mode, {
      [TOUR_CONNECTION_MODES.owner]: <UserNodeListByOwner id={id} />,
      [TOUR_CONNECTION_MODES.userNode]: <UserNodeList id={id} />,
      [DEFAULT]: null,
    });
  };

  renderActions = () => {
    const { id, mode } = this.props;
    return LOGIC_HELPERS.switchCase(mode, {
      [TOUR_CONNECTION_MODES.userNode]: (
        <GridContainer justify="flex-end" alignItems="flex-end">
          <UserNodeActions id={id} onRemoveUser={this.handleRemoveUser} />
        </GridContainer>
      ),
      [DEFAULT]: null,
    });
  };

  renderSubTitle = () => {
    const { userId, ownerUserId } = this.props;
    return (
      <JText sm gray>
        <Email
          id={LOGIC_HELPERS.ifElse(ownerUserId !== null, ownerUserId, userId)}
          variant={VARIANTS.TEXT_ONLY}
          disabled
        />
      </JText>
    );
  };

  render = () => {
    const { userId, open, ownerUserId, classes } = this.props;
    const ownerLabel = LOGIC_HELPERS.ifElse(
      ownerUserId !== null,
      <JText gray> (Owner)</JText>,
      null,
    );
    const headlineTitle = (
      <GridContainer
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <GridItem>
          <NodeName
            AvatarProps={{
              lg: true,
              sm: false,
              md: false,
              xs: false,
              imageSize: IMAGE_SIZES_CONSTANTS.MEDIUM,
            }}
            variant={VARIANTS.AVATAR}
            userId={LOGIC_HELPERS.ifElse(
              ownerUserId !== null,
              ownerUserId,
              userId,
            )}
          />
        </GridItem>
        <GridItem data-testid="tourConnectionUserName">
          <JText xl bold ellipsis>
            <Name
              id={LOGIC_HELPERS.ifElse(
                ownerUserId !== null,
                ownerUserId,
                userId,
              )}
              variant={VALUE}
            />
            {ownerLabel}
          </JText>
        </GridItem>
        <GridItem>{this.renderSubTitle()}</GridItem>
      </GridContainer>
    );

    return (
      <JDialog
        maxWidth="xs"
        fullWidth
        onClose={this.handleCloseClick}
        open={open}
        hideSubmitButton
        header={
          <JText md uppercase bold>
            Tour Connection
          </JText>
        }
        contentClassName={classes.overrideSM}
      >
        {headlineTitle}
        <br />
        <GridContainer>{this.renderContent()}</GridContainer>
        {this.renderActions()}
      </JDialog>
    );
  };
}

TourConnectionDialog.propTypes = {
  // hoc
  classes: PropTypes.object,

  // parent
  open: PropTypes.bool,
  id: PropTypes.number,
  mode: PropTypes.string,
  onClose: PropTypes.func,

  // resaga
  userId: PropTypes.number,
  ownerUserId: PropTypes.number,
};

TourConnectionDialog.defaultProps = {
  open: false,
  id: null,
  mode: null,
  ownerUserId: null,
  onClose: mockFunc,
};

export default compose(
  withStyles(styles, { name: 'TourConnectionDialog' }),
  resaga(CONFIG),
)(TourConnectionDialog);
