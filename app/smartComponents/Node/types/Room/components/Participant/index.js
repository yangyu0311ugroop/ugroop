import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import React from 'react';
import { ability } from 'apis/components/Ability/ability';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import { DEFAULT, PERSON_DATA_STORE } from 'appConstants';

import { VARIANTS } from 'variantsConstants';
import { PARTICIPANT_LINKEE, PARTICIPANT } from 'utils/modelConstants';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import P, { H4, H5, H6 } from 'viewComponents/Typography';
import Editable from 'viewComponents/Editable';
import { PeopleListRow } from 'viewComponents/People';
import { ConditionsBorderStyle } from 'smartComponents/Node/logics';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import Name from 'smartComponents/Node/parts/Name';
import Passport from 'smartComponents/Node/parts/Passport';
import Medicals from 'smartComponents/Node/parts/Medicals';
import Dietaries from 'smartComponents/Node/parts/Dietaries';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
import AgeType from 'smartComponents/Node/parts/AgeType';
import HonorificTitle from 'smartComponents/Node/parts/HonorificTitle';
import { FormattedMessage as M } from 'react-intl';
import isFunction from 'lodash/isFunction';
import { TableCell } from 'viewComponents/Table';
import { CONFIG, CONFIG_PARENT, CONFIG_3 } from './config';
import m from './messages';
import styles from './styles';

export class Participant extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  canExecuteParticipant = () => ability.can('execute', PARTICIPANT);

  renderPart = (Component, variant, props = {}) => {
    const { accessLevel } = this.props;
    return (
      <Component
        {...this.props}
        readOnly={accessLevel !== PARTICIPANT_ACCESS_LEVELS.full}
        variant={variant}
        {...props}
      />
    );
  };

  renderPersonPart = (Component, variant, props = {}) => {
    const { personId } = this.props;
    return this.renderPart(Component, variant, {
      id: personId,
      dataStore: PERSON_DATA_STORE,
      ...props,
    });
  };

  renderRowTitle = (value, userId) => {
    const { heading } = this.props;
    const Typography = heading ? H4 : P;
    const weight = 'bold';
    const title = userId
      ? undefined
      : 'This participant is not yet connected to someone registered on uGroop.';
    return (
      <Typography dense weight={weight} title={title} color="primary">
        {value}
      </Typography>
    );
  };

  renderRowSubtitle = value => <H6 dense>{value}</H6>;

  isFromRyi = () => !this.props.createdBy;

  renderCreatedAt = () => (
    <GridItem>
      <H6 dense>
        {
          <M
            {...LOGIC_HELPERS.ifElse(
              this.isFromRyi(),
              m.subheadingPrefix,
              m.subheadingPrefixFromTour,
            )}
            values={{
              date: this.renderPart(CreatedAt, DEFAULT, { showFromNow: true }),
            }}
          />
        }
      </H6>
    </GridItem>
  );

  renderRowConditions = () => {
    const { accessLevel } = this.props;
    return (
      accessLevel === PARTICIPANT_ACCESS_LEVELS.full && (
        <React.Fragment>
          {this.renderPart(Medicals, VARIANTS.ICON)}
          {this.renderPart(Dietaries, VARIANTS.ICON)}
          {this.renderPart(Passport, VARIANTS.ICON)}
        </React.Fragment>
      )
    );
  };

  // HACK: Add nested function so it re-renders on role removal while list dialog is open
  renderRowAvatarWithClassName = () => className => {
    const { personEmail } = this.props;
    return this.renderPart(Name, VARIANTS.AVATAR, {
      className,
      PersonAvatarProps: {
        showAvatarDetails: this.state.anchorEl === null,
        personEmail,
      },
      tooltipText: this.renderTextOnly(),
    });
  };

  renderRowAvatar = () => {
    const { id, accessLevel } = this.props;
    if (accessLevel === PARTICIPANT_ACCESS_LEVELS.full) {
      return (
        <ConditionsBorderStyle id={id}>
          {this.renderRowAvatarWithClassName()}
        </ConditionsBorderStyle>
      );
    }
    return this.renderRowAvatarWithClassName()();
  };

  renderRowSimpleContent = () => {
    const { classes, readOnlyStatus, handleEditableClick } = this.props;

    return (
      <GridItem xs>
        <Editable
          readOnly={readOnlyStatus}
          onClick={
            isFunction(handleEditableClick)
              ? handleEditableClick
              : this.handleEditableClick
          }
        >
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem xs>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer alignItems="baseline" wrap="nowrap">
                    <GridItem className={classes.itemName}>
                      {this.renderPart(Name, DEFAULT, {
                        renderValue: this.renderRowTitle,
                        boldFromNode: false,
                      })}
                    </GridItem>
                    {this.renderRowConditions()}
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Editable>
      </GridItem>
    );
  };

  ShowParticipant = () => {
    const { id, isDialogOpen } = this.props;
    if (isDialogOpen) return;
    this.props.resaga.setValue({
      participantViewOpen: true,
      participantViewId: id,
    });
  };

  renderRowSimple = () => {
    const { showAvatar } = this.props;

    return (
      <GridItem clickable onClick={this.ShowParticipant}>
        <PeopleListRow>
          <GridContainer alignItems="center" spacing={1}>
            {showAvatar && <GridItem>{this.renderRowAvatar()}</GridItem>}
            {this.renderRowSimpleContent(VARIANTS.TEXT_ONLY)}
          </GridContainer>
        </PeopleListRow>
      </GridItem>
    );
  };

  renderTextOnlyNameValue = value => {
    const { textComponent: Component } = this.props;
    return (
      <Component dense weight="bold">
        {value}
      </Component>
    );
  };

  renderTextOnly = (variant = VARIANTS.TEXT_ONLY) => () => {
    const { accessLevel } = this.props;
    if (variant === VARIANTS.READ_ONLY)
      return this.renderPart(Name, variant, {
        renderValue: this.renderTextOnlyNameValue,
      });
    return (
      <GridContainer direction="column">
        <GridItem>
          {this.renderPart(Name, variant, {
            renderValue: this.renderTextOnlyNameValue,
          })}
        </GridItem>
        {accessLevel === PARTICIPANT_ACCESS_LEVELS.full && (
          <React.Fragment>
            {this.renderPart(Medicals, variant)}
            {this.renderPart(Dietaries, variant)}
          </React.Fragment>
        )}
      </GridContainer>
    );
  };

  renderTableRow = () => {
    const { classes, smDown } = this.props;

    // Is Mobile
    if (smDown) {
      return (
        <React.Fragment>
          <TableCell
            className={classnames(
              classes.tableCellPadding,
              classes.cellContent,
            )}
          >
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                {this.renderPart(HonorificTitle, DEFAULT, {
                  variant: VARIANTS.TEXT_ONLY,
                })}
              </GridItem>
              <GridItem>
                {this.renderPart(Name, DEFAULT, {
                  boldFromNode: false,
                })}
              </GridItem>
              <GridItem>
                {this.renderPart(AgeType, DEFAULT, {
                  variant: VARIANTS.TEXT_ONLY,
                })}
              </GridItem>
            </GridContainer>
          </TableCell>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <TableCell
          className={classnames(classes.tableCellPadding, classes.cellContent)}
        >
          {this.renderPart(HonorificTitle, DEFAULT, {
            variant: VARIANTS.TEXT_ONLY,
          })}
        </TableCell>
        <TableCell
          className={classnames(classes.tableCellPadding, classes.cellContent)}
        >
          {this.renderPart(Name, DEFAULT, {
            boldFromNode: false,
          })}
        </TableCell>
        <TableCell
          className={classnames(classes.tableCellPadding, classes.cellContent)}
        >
          {this.renderPart(AgeType, DEFAULT, {
            variant: VARIANTS.TEXT_ONLY,
          })}
        </TableCell>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.ROW_SIMPLE]: this.renderRowSimple,
      [VARIANTS.TABLE]: this.renderTableRow,
      [VARIANTS.AVATAR_ONLY]: this.renderRowAvatar,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly(VARIANTS.READ_ONLY),
      [DEFAULT]: this.renderTableRow(),
    });
  };
}

Participant.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // resaga
  createdBy: PropTypes.number,
  linkedUserId: PropTypes.number,
  followers: PropTypes.array,
  // parent
  id: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
  personEmail: PropTypes.string,
  heading: PropTypes.bool,
  userConnected: PropTypes.bool,
  showAvatar: PropTypes.bool,
  invitationPending: PropTypes.bool,
  noName: PropTypes.bool,
  accessLevel: PropTypes.string,
  readOnlyStatus: PropTypes.bool,
  parentId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  hideRenderRowTail: PropTypes.bool,
  index: PropTypes.number,

  personId: PropTypes.number,
  personType: PropTypes.string,
  userId: PropTypes.number,
  participantEmail: PropTypes.string,
  shareToken: PropTypes.string,
  handleEditableClick: PropTypes.func,
  showSubDetail: PropTypes.bool,
  smDown: PropTypes.bool,
  textComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  isDialogOpen: PropTypes.bool,
};

Participant.defaultProps = {
  id: null,
  variant: null,
  heading: false,
  showAvatar: true,
  noName: false,
  accessLevel: PARTICIPANT_ACCESS_LEVELS.full,
  readOnlyStatus: false,
  hideRenderRowTail: false,
  index: 0,

  personId: null,
  personType: null,
  followers: [],
  showSubDetail: true,
  textComponent: H5,
};

export default compose(
  withStyles(styles, { name: 'ParticipantNode' }),
  selectLinkedUserData({ nodeIdProp: 'id', roles: [PARTICIPANT_LINKEE] }), // TODO: Filter by role
  resaga(CONFIG_PARENT),
  resaga(CONFIG),
  resaga(CONFIG_3),
  withSMDown,
)(Participant);
