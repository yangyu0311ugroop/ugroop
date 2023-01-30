import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import Tooltip from 'viewComponents/Tooltip';
import classNames from 'classnames';
import resaga from 'resaga';
import { DEFAULT, THE_BIG_DOT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { H4, H5 } from 'viewComponents/Typography';
import { EditableLabel } from 'viewComponents/Editable';
import Participant from 'smartComponents/Node/types/Participant';
import { CONFIG, GET_LINKS } from './config';
import m from './messages';
import style from './style';

export class Participants extends React.PureComponent {
  componentWillMount = () => {
    const { mode } = this.props;
    if (mode === 'forms') {
      this.fetchParticipants();
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.mode !== 'forms' && this.props.mode === 'forms') {
      this.fetchParticipants();
    }
  };

  getBadgeClasses = () => {
    const { classes, status } = this.props;
    return {
      root: classes.badgeRoot,
      badge: classNames({
        [classes.badge]: true,
        [classes.complete]: !!status,
        [classes.pending]: !status,
      }),
    };
  };

  fetchParticipants = () => {
    const { templateId: id, value: ids } = this.props;
    TEMPLATE_API_HELPERS.getParticipants({ id, ids }, this.props);
  };

  handleAddButtonClick = () => {
    const { id, readOnlyStatus } = this.props;
    return this.props.resaga.setValue({
      participantCreateOpen: true,
      participantCreateParentNodeId: id,
      participantCreateMode: readOnlyStatus ? 'readOnlyStatus' : null,
      participantWithRelationship: true,
    });
  };

  renderRowTail = () => <GridItem>Relationship</GridItem>;

  renderPart = (Component, variant, props) => {
    const { id, templateId, readOnly } = this.props;
    return (
      <Component
        id={id}
        templateId={templateId}
        readOnly={readOnly}
        variant={variant}
        {...props}
      />
    );
  };

  renderTextOnly = () => {
    const { value, prevNodeIds } = this.props;
    const tooltipMsg = LOGIC_HELPERS.switchCase(
      prevNodeIds.length + value.length,
      {
        1: '1 participant has been added',
        0: 'No participant has been added',
        [DEFAULT]: `${value.length +
          prevNodeIds.length} participants have been added`,
      },
    );
    return (
      <GridItem>
        <Tooltip title={tooltipMsg}>
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>
              <Icon icon="lnr-user" size="xsmall" paddingRight />
            </GridItem>
            <GridItem>{value.length + prevNodeIds.length}</GridItem>
          </GridContainer>
        </Tooltip>
      </GridItem>
    );
  };

  renderEditableValue = (showWithRelationship = false) => {
    const {
      value,
      prevNodeIds,
      readOnlyStatus,
      mode,
      loading,
      parentId,
      hideInviteButtons,
      itemsVariant,
    } = this.props;
    const items = LOGIC_HELPERS.ifElse(
      showWithRelationship,
      prevNodeIds,
      value,
    );
    if (items.length) {
      return items.map(id =>
        this.renderPart(Participant, itemsVariant, {
          key: id,
          id,
          parentId,
          readOnlyStatus,
          mode,
          loading,
          canMove: false,
          showDetails: false,
          onRenderRowTail: this.renderRowTail,
          hideRenderRowTail: !showWithRelationship,
          hasNoLink: !showWithRelationship,
          hideInviteButton: hideInviteButtons,
        }),
      );
    }
    return (
      <GridItem>
        <H5 dense fontStyle="italic">
          <M {...m.emptyLabel} values={{ paxLabel: this.props.paxLabel }} />
        </H5>
      </GridItem>
    );
  };

  renderList = () => {
    const { value } = this.props;

    if (value.length === 0)
      return (
        <GridContainer direction="column">
          {this.renderEditableValue(true)}
        </GridContainer>
      );

    return (
      <GridContainer direction="column">
        <GridItem>
          <H5 dense weight="bold">
            With Defined Relationships
          </H5>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            {this.renderEditableValue(true)}
          </GridContainer>
          <br />
        </GridItem>
        <GridItem>
          <H5 dense weight="bold">
            Without Defined Relationships
          </H5>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            {this.renderEditableValue()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderEditable = () => {
    const { readOnlyStatus } = this.props;
    const addParticipant = LOGIC_HELPERS.ifElse(
      readOnlyStatus,
      null,
      <>
        <GridItem>
          <H4 dense>{THE_BIG_DOT}</H4>
        </GridItem>
        <GridItem>
          <Button
            size="large"
            color="primary"
            variant={VARIANTS.INLINE}
            onClick={this.handleAddButtonClick}
          >
            <H4 dense primary weight="bold">
              <M {...m.addNewLabel} />
            </H4>
          </Button>
        </GridItem>
      </>,
    );
    return (
      <GridItem>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer alignItems="flex-end">
              <GridItem>
                <EditableLabel Typography={H4}>
                  {this.props.paxLabel}
                </EditableLabel>
              </GridItem>
              {addParticipant}
            </GridContainer>
          </GridItem>
          <GridItem>{this.renderList()}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Participants.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  parentId: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  readOnlyStatus: PropTypes.bool,
  mode: PropTypes.string,
  showDetails: PropTypes.bool,
  hideInviteButtons: PropTypes.bool,
  itemsVariant: PropTypes.string,
  paxLabel: PropTypes.string,

  // resaga value
  value: PropTypes.array,
  status: PropTypes.string,
  prevNodeIds: PropTypes.array,

  // resaga isLoading
  loading: PropTypes.bool,
};

Participants.defaultProps = {
  id: null,
  templateId: null,
  variant: null,
  readOnly: false,
  readOnlyStatus: false,
  mode: null,
  showDetails: false,
  hideInviteButtons: false,
  itemsVariant: VARIANTS.ROW,

  value: [],
  prevNodeIds: [],
  status: null,

  loading: false,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Node/parts/Participants' }),
  resaga(GET_LINKS),
  resaga(CONFIG),
)(Participants);
