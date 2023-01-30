import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';

import { ability } from 'apis/components/Ability/ability';
import {
  CARD,
  COMPRESSED,
  DEFAULT,
  DO_NOTHING,
  CHECK_INPUT,
  LOGIC,
  OPTION,
  READ_ONLY,
  TEXT,
  UP_NEXT,
  TOTAL,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Hidden,
} from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { TRUNCATE_LENGTH } from 'sizeConstants';
import ChecklistButton from 'smartComponents/Node/components/ChecklistIcon/components/ChecklistButton';
import BadgeProgress from 'smartComponents/Node/parts/BadgeProgress';
import CompletedBy from 'smartComponents/Node/parts/CompletedBy';
import Content from 'smartComponents/Node/parts/Content';
import Description from 'smartComponents/Node/parts/Description';
import DueDate from 'smartComponents/Node/parts/DueDate';
import Trail from 'smartComponents/Node/parts/Trail';
import { NODE_STATUS_HELPERS } from 'smartComponents/Node/parts/Status/helpers';
import Type from 'smartComponents/Node/parts/Type';
import UpdatedAt from 'smartComponents/Node/parts/UpdatedAt';
import DayIndex from 'smartComponents/Node/types/Day/parts/DayIndex';
import OrganisationName from 'smartComponents/Organisation/parts/Name';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import Status from 'smartComponents/Node/parts/Status';
import Icon from 'ugcomponents/Icon';
import UserCard from 'ugcomponents/Person/UserCard';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKLIST, DAY, TEMPLATE, TOUR } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Hover from 'viewComponents/Hover';
import TableCell from 'viewComponents/Table/components/TableCell';
import TableRow from 'viewComponents/Table/components/TableRow';
import Badge, { BadgeColor } from 'viewComponents/Badge';
import { ConvertNextNode } from '../../logics';
import ChecklistMenu from './components/ChecklistMenu';
import { CONFIG, SETTER_CONFIG, USER_USERS_CONFIG } from './config';
import styles from './styles';
import { STRING_HELPERS } from '../../../../utils/stringAdditions';

export class Checklist extends PureComponent {
  state = {
    // they are used in renderBody function
    // eslint-disable-next-line react/no-unused-state
    showCompleted: false,
    // eslint-disable-next-line react/no-unused-state
    showOutstanding: true,
    showCheckItems: false,
    expandedState: this.props.useExpandedState,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.panelSummaryClasses = {
      content: classes.expansionPanelSummaryContent,
      expanded: classes.expansionPanelSummaryExpanded,
      expandIcon: classes.expansionPanelSummaryExpandIcon,
    };
  };

  canUpdate = () => {
    const { createdBy, readOnly } = this.props;
    return !readOnly && ability.can('update', { type: CHECKLIST, createdBy });
  };

  canDoSomething = () => {
    const { readOnly } = this.props;
    return (
      (!readOnly &&
        ability.can('create', {
          type: CHECKLIST,
          createdBy: this.props.createdBy,
        })) ||
      (!readOnly &&
        ability.can('delete', {
          type: CHECKLIST,
          createdBy: this.props.createdBy,
        }))
    );
  };

  isClosed = () => {
    const { status } = this.props;

    return NODE_STATUS_HELPERS.isClosed(status);
  };

  isExpanded = () => {
    const { expanded, useExpandedState } = this.props;
    const { expandedState } = this.state;
    if (useExpandedState) return expandedState;

    return expandedState || expanded;
  };

  toggleExpanded = () => {
    const { id, expanded, useExpandedState } = this.props;
    const { expandedState } = this.state;
    this.props.resaga.setValue({
      expandedChecklistId: expanded || expandedState ? 0 : id,
    });
    if (useExpandedState) {
      this.setState({ expandedState: !expandedState });
    }
  };

  toggleShowCompleted = event => {
    this.stopPropagation(event);
    const { showCompleted } = this.state;
    this.setState({
      showCompleted: !showCompleted,
    });
  };

  toggleShowOutstanding = event => {
    this.stopPropagation(event);
    const { showOutstanding } = this.state;

    this.setState({
      showOutstanding: !showOutstanding,
    });
  };

  toggleShowCheckItems = () => {
    this.setState(({ showCheckItems }) => ({
      showCheckItems: !showCheckItems,
    }));
  };

  stopPropagation = event => event.stopPropagation && event.stopPropagation();

  handleClick = () => {
    LOGIC_HELPERS.ifFunction(this.props.onClick, [
      DAY,
      this.props.parentNodeId,
    ])();
  };

  handleOnClickStatus = e => {
    e.stopPropagation();
    const { toggleNode } = this.props;
    if (toggleNode) return toggleNode(this.props)();
    return DO_NOTHING;
  };

  renderSummaryInfo = () => {
    const { classes, id } = this.props;

    if (this.isExpanded()) {
      return null;
    }

    return (
      <GridItem>
        <div className={classnames(classes.progressDiv)}>
          <BadgeProgress
            id={id}
            variant={LOGIC_HELPERS.ifElse(this.isTemplate(), UP_NEXT, TOTAL)}
          />
        </div>
      </GridItem>
    );
  };

  isTemplate = () => [TOUR, TEMPLATE, DAY].includes(this.props.parentType);

  renderSummary = () => {
    const {
      classes,
      id,
      index,
      parentNodeId,
      anchorDate,
      editing,
    } = this.props;

    const expanded = this.isExpanded();
    const canUpdate = this.canUpdate();

    const renderClosed = this.isTemplate() ? (
      <GridItem className={classes.firstColumnWidth}>
        <Status
          id={id}
          variant={CHECK_INPUT}
          paddingRight
          onClick={this.handleOnClickStatus}
          disabled={!canUpdate}
        />
      </GridItem>
    ) : (
      <GridItem className={classes.firstColumnWidthBadge}>
        <Badge color={BadgeColor(true)} variant={VARIANTS.ROUND} content=" " />
      </GridItem>
    );

    const doneClassName = LOGIC_HELPERS.ifElse(
      [!expanded, this.isClosed()],
      classes.done,
    );

    const renderSubHeader = this.isTemplate() ? (
      <GridItem className={classnames(classes.subHeader, doneClassName)}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <DueDate
              id={id}
              showTime={expanded}
              parentNodeId={parentNodeId}
              anchorDate={anchorDate}
              variant={this.canDoSomething() ? DEFAULT : READ_ONLY}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    ) : null;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <GridContainer alignItems="top" spacing={0}>
            {renderClosed}
            <GridItem className={classes.grow}>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer alignItems="center" spacing={0}>
                    <GridItem
                      className={classnames(
                        classes.grow,
                        doneClassName,
                        classes.summaryHeader,
                      )}
                    >
                      <Content
                        id={id}
                        variant={DEFAULT}
                        editable={canUpdate && editing && expanded}
                        bold
                        stopPropagation
                        multiline
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <Hidden mdUp>{this.renderSummaryInfo()}</Hidden>
                {renderSubHeader}
              </GridContainer>
            </GridItem>
            <Hidden mdDown>{this.renderSummaryInfo()}</Hidden>
            {this.canDoSomething() && (
              <ChecklistMenu
                id={id}
                index={index}
                parentNodeId={parentNodeId}
              />
            )}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderCardStatus = () => {
    const { classes, id } = this.props;

    if (!this.isClosed()) {
      return null;
    }

    return (
      <GridItem>
        <span
          className={classnames(
            LOGIC_HELPERS.ifElse(
              this.isClosed(),
              classes.closedStatusDiv,
              classes.openStatusDiv,
            ),
          )}
        >
          {LOGIC_HELPERS.ifElse(
            this.isClosed(),
            <span>
              Closed by <CompletedBy id={id} variant={TEXT} />
            </span>,
            'Open',
          )}
        </span>
      </GridItem>
    );
  };

  renderCardSummary = () => {
    const { classes, id, parentNodeId } = this.props;
    const { showCheckItems } = this.state;

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer alignItems="center" spacing={2} wrap="nowrap">
            <GridItem className={classes.left}>
              <ChecklistButton
                showChecklists={showCheckItems}
                small
                id={id}
                onClick={this.toggleShowCheckItems}
              />
            </GridItem>
            <GridItem className={classnames(classes.grow)}>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer
                    alignItems="center"
                    className={classnames(this.isClosed() && classes.done)}
                  >
                    <GridItem>
                      <Content id={id} bold />
                    </GridItem>
                  </GridContainer>
                </GridItem>

                {!this.isClosed() && (
                  <GridItem className={classes.subtitle}>
                    <GridContainer alignItems="center" spacing={2}>
                      <GridItem>
                        <DueDate
                          id={id}
                          variant={DEFAULT}
                          component={GridItem}
                          parentNodeId={parentNodeId}
                        />
                      </GridItem>
                      <GridItem>
                        <BadgeProgress id={id} variant={UP_NEXT} />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>

            {this.isClosed() && this.renderCardFooter()}
          </GridContainer>
        </GridItem>

        {!this.isClosed() && (
          <GridItem
            className={classnames(classes.subtitle, classes.offsetLeft)}
          >
            <Trail id={id} />
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderBody = () => {
    const { renderBody } = this.props;

    return LOGIC_HELPERS.ifFunction(renderBody, [
      this.props,
      this.state,
      {
        toggleShowCompleted: this.toggleShowCompleted,
        toggleShowOutstanding: this.toggleShowOutstanding,
      },
    ]);
  };

  renderDetails = () => {
    const { classes, id } = this.props;
    const expanded = this.isExpanded();

    // avoid pre-rendering to improve performance
    if (!expanded) {
      return <span />;
    }

    return (
      <GridContainer alignItems="center">
        <Hidden smDown>
          <GridItem className={classes.firstColumnWidth}>&nbsp;</GridItem>
        </Hidden>
        <GridItem className={classes.grow}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.shiftUp}>
                <Description
                  id={id}
                  variant={COMPRESSED}
                  showHeader={false}
                  showEmpty={false}
                />
              </div>
            </GridItem>
            <GridItem>
              <div className={classnames(classes.expansionPanelDetailsItems)}>
                {this.renderBody()}
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderCardDetails = () => {
    const { classes } = this.props;

    return (
      <div className={classnames(classes.expansionPanelDetailsCardItems)}>
        {this.renderBody()}
      </div>
    );
  };

  renderCardFooter = () => {
    const { classes, id, status, renderFooter } = this.props;

    const rendered = LOGIC_HELPERS.ifFunction(
      renderFooter,
      [{ id, status }],
      renderFooter,
    );

    if (!rendered) {
      return null;
    }

    return <GridItem className={classes.offsetLeft}>{rendered}</GridItem>;
  };

  renderDefaultFooter = () => {
    const { classes, id, status, renderFooter } = this.props;

    const rendered = LOGIC_HELPERS.ifFunction(
      renderFooter,
      [{ id, status }],
      renderFooter,
    );

    if (!rendered) {
      return null;
    }
    if (!this.isClosed()) {
      return <GridItem className={classes.defaulfooter} />;
    }

    return <GridItem className={classes.defaulfooter}>{rendered}</GridItem>;
  };

  expansionIcon = () => {
    const { checklists } = this.props;
    const text = `${LOGIC_HELPERS.ifElse(
      this.isExpanded(),
      'Hide',
      'Show',
    )} ${STRING_HELPERS.pluralise('Task', checklists.length || 1)}`;
    return (
      <span title={text}>
        <Icon size="small" icon="chevron-down" />
      </span>
    );
  };

  renderDefault = () => {
    const { classes, id, index, className, showClosed } = this.props;
    const expanded = this.isExpanded();

    if (this.isClosed() && !showClosed) {
      return null;
    }

    return (
      <div
        key={id}
        className={classnames(
          classes.checklist,
          LOGIC_HELPERS.ifElse(
            [expanded, index !== 0],
            classes.checklistSeparator,
          ),
          className,
        )}
      >
        <ExpansionPanel
          className={classes.expansionPanel}
          expanded={expanded}
          onChange={this.toggleExpanded}
        >
          <ExpansionPanelSummary
            classes={this.panelSummaryClasses}
            className={classnames(
              classes.expansionPanelSummary,
              LOGIC_HELPERS.ifElse(
                index === 0,
                classes.expansionPanelSummaryFirst,
              ),
              LOGIC_HELPERS.ifElse(
                !expanded,
                classes.expansionPanelSummaryHover,
              ),
            )}
            expandIcon={this.expansionIcon()}
            IconButtonProps={classes.IconButtonProps}
          >
            {this.renderSummary()}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            {this.renderDetails()}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <GridItem className={classes.defaulfooter} />
      </div>
    );
  };

  renderCard = () => {
    const { classes, id, className, showClosed } = this.props;
    const { showCheckItems } = this.state;

    if (this.isClosed() && !showClosed) {
      return null;
    }

    return (
      <div key={id} className={classnames(classes.checklistCard, className)}>
        <GridContainer direction="column">
          <GridItem>{this.renderCardSummary()}</GridItem>
          {showCheckItems && (
            <GridItem className={classes.offsetLeft}>
              {this.renderCardDetails()}
            </GridItem>
          )}
          {!this.isClosed() && this.renderCardFooter()}
        </GridContainer>
      </div>
    );
  };

  renderText = () => {
    const { content, checklists } = this.props;
    const isPlural = checklists.length > 1 ? 's' : '';
    const count = `(${checklists.length} task${isPlural})`;
    return `${content} ${count}`;
  };

  renderWithComponentOption = () => {
    const {
      content,
      component: Component,
      componentProps,
      isTextAttrb,
    } = this.props;
    const str = `· ${content}`;
    return (
      <Component {...componentProps} text={isTextAttrb && str}>
        str
      </Component>
    );
  };

  renderOption = () => {
    const { id, content, checklists } = this.props;

    const count = `(${checklists.length} task${LOGIC_HELPERS.ifElse(
      checklists.length > 1,
      's',
    )})`;

    return (
      <option key={id} value={id}>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {content} {count}
      </option>
    );
  };

  renderLogic = () => {
    const { id, parentNodeId } = this.props;
    return (
      <Fragment>
        <ConvertNextNode id={id} parentNodeId={parentNodeId} />
        {this.renderBody()}
      </Fragment>
    );
  };

  renderTableRow = () => {
    const { id, parentNodeId, parentType, userId, orgId } = this.props;
    if (parentType === TEMPLATE) {
      return null;
    }

    const separator = LOGIC_HELPERS.ifElse(orgId, ' - ', null);

    return (
      <TableRow key={id}>
        <TableCell isCapitalized>
          <Button
            textAlign="left"
            onClick={this.handleClick}
            noPadding
            variant={VARIANTS.INLINE}
            size="extraSmall"
            color="black"
          >
            <Content
              truncateLength={TRUNCATE_LENGTH.MD}
              id={id}
              variant={VARIANTS.TEXT_ONLY}
            />
          </Button>
        </TableCell>
        <TableCell isCapitalized>
          <Type id={id} />
        </TableCell>
        <TableCell isCapitalized>
          <Button
            textAlign="left"
            onClick={this.handleClick}
            noPadding
            variant={VARIANTS.INLINE}
            size="extraSmall"
            color="black"
          >
            <span>
              <strong>
                (Day <DayIndex id={parentNodeId} />)
              </strong>{' '}
              <Content
                truncateLength={TRUNCATE_LENGTH.MD}
                id={parentNodeId}
                variant={VARIANTS.TEXT_ONLY}
              />
            </span>
          </Button>
        </TableCell>
        <TableCell>
          <UpdatedAt id={id} />
        </TableCell>
        <TableCell isCapitalized>
          <Hover>
            {hover => (
              <React.Fragment>
                <Button
                  textAlign="left"
                  onClick={hover.handleMouseEnter}
                  noPadding
                  variant={VARIANTS.INLINE}
                  size="extraSmall"
                  color="black"
                >
                  <KnownAs id={userId} variant={VARIANTS.STRING_ONLY} />
                  {separator}
                  <OrganisationName id={orgId} variant={VARIANTS.STRING_ONLY} />
                </Button>
                <Popover
                  anchorEl={hover.anchorEl}
                  onClose={hover.handleMouseLeave}
                  open={hover.entered}
                >
                  <UserCard id={userId} orgId={orgId} />
                </Popover>
              </React.Fragment>
            )}
          </Hover>
        </TableCell>
      </TableRow>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [LOGIC]: this.renderLogic,
      [OPTION]: this.renderOption,
      [VARIANTS.TEXT_ONLY]: this.renderText,
      [VARIANTS.ONE_LINE_PREVIEW]: this.renderWithComponentOption,
      [CARD]: this.renderCard,
      [VARIANTS.TABLE]: this.renderTableRow,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Checklist.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  readOnly: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // checklist id
  variant: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  anchorDate: PropTypes.string,
  status: PropTypes.string,
  parentNodeId: PropTypes.number,
  index: PropTypes.number,
  renderBody: PropTypes.func,
  showClosed: PropTypes.bool,
  expanded: PropTypes.bool,
  renderFooter: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  onClick: PropTypes.func,
  toggleNode: PropTypes.func,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  componentProps: PropTypes.object,

  // resaga props
  checklists: PropTypes.array, // use in renderBody
  parentType: PropTypes.string,
  orgId: PropTypes.number,
  userId: PropTypes.number,
  createdBy: PropTypes.number,
  editing: PropTypes.bool,
  isTextAttrb: PropTypes.bool,
  useExpandedState: PropTypes.bool,
};

Checklist.defaultProps = {
  variant: '',
  content: '',
  className: '',
  anchorDate: '',
  status: '',
  parentNodeId: 0,
  index: 0,
  showClosed: false,
  expanded: false,
  parentType: '',
  orgId: 0,
  userId: 0,
  createdBy: 0,
  checklists: [],
  isTextAttrb: false,
  readOnly: false,
  useExpandedState: false,
};

export default compose(
  withStyles(styles, { name: 'Checklist' }),
  resaga(CONFIG),
  resaga(USER_USERS_CONFIG),
  resaga(SETTER_CONFIG),
)(Checklist);
