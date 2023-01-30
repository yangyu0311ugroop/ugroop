import { DEFAULT, THE_BIG_DOT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { EditableLabel } from 'viewComponents/Editable';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import JText from 'components/JText';
import { H4 } from 'viewComponents/Typography';
import NewIcon from 'viewComponents/Icon';

import List from './components/List';
import Create from './components/Create';
import { CONFIG } from './config';
import styles from './styles';

export class Followers extends PureComponent {
  state = {
    showFollowers: true,
  };

  handleShowFollowers = () =>
    this.setState(prevState => ({
      showFollowers: !prevState.showFollowers,
    }));

  handleOpenFollowerDialog = () => {
    const { id } = this.props;
    this.props.resaga.setValue({
      interestedPersonCreateOpen: true,
      interestedPersonCreateParticipantId: id,
    });
  };

  renderEditable = () => {
    const { id, hasHeading, showUnlink, me, userId, templateId } = this.props;

    const heading = LOGIC_HELPERS.ifElse(
      hasHeading,
      <EditableLabel Typography={H4}>Followers</EditableLabel>,
      null,
    );

    return (
      <GridItem>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer justify="space-between">
              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem>{heading}</GridItem>
                  <GridItem>{THE_BIG_DOT}</GridItem>
                  <GridItem>
                    <Button
                      variant={VARIANTS.INLINE}
                      dense
                      color="primary"
                      onClick={this.handleOpenFollowerDialog}
                    >
                      <EditableLabel Typography={H4}>
                        <JText success>Add Follower</JText>
                      </EditableLabel>
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <Create id={id} />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <List
              showUnlink={showUnlink}
              id={id}
              templateId={templateId}
              userId={me}
              participantUserId={userId}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderRow = () => {
    const { id, readOnly, templateId, userId, me } = this.props;
    const { showFollowers } = this.state;

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer alignItems="center" onClick={this.handleShowFollowers}>
            <GridItem>
              <JText bold spacing2 sm gray uppercase>
                Followers (<List id={id} variant={VARIANTS.COUNT} />)
              </JText>
            </GridItem>
            <GridItem>
              <NewIcon
                icon={LOGIC_HELPERS.ifElse(
                  showFollowers,
                  'chevron-down',
                  'chevron-up',
                )}
                size="extraSmall"
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        {LOGIC_HELPERS.ifElse(
          showFollowers,
          <GridItem>
            <List id={id} readOnly={readOnly} />
            <List
              id={id}
              templateId={templateId}
              userId={me}
              participantUserId={userId}
              readOnly={readOnly}
            />
          </GridItem>,
          null,
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.ROW]: this.renderRow,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Followers.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  hasHeading: PropTypes.bool,
  showUnlink: PropTypes.bool,
  readOnly: PropTypes.bool,
  me: PropTypes.number,
  templateId: PropTypes.number,
  userId: PropTypes.number,

  // resaga props
};

Followers.defaultProps = {
  hasHeading: true,
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'Followers' }),
  resaga(CONFIG),
)(Followers);
