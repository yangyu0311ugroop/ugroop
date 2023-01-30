import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import {
  CONTENT,
  DEFAULT,
  PHOTO_TITLE_DATE,
  THE_BIG_DOT,
  URL_HELPERS,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import UGLink from 'components/NavLink';
import nth from 'lodash/nth';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { TRUNCATE_LENGTH } from 'sizeConstants';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import EventOnDayWithEventIds from 'smartComponents/Node/logics/EventsOnDay/eventOnDayWithEventIds';
import Content from 'smartComponents/Node/parts/Content';
import Description from 'smartComponents/Node/parts/Description';
import Location from 'smartComponents/Node/parts/Location';
import Photo from 'smartComponents/Node/parts/Photo';
import Trail from 'smartComponents/Node/parts/Trail';
import Type from 'smartComponents/Node/parts/Type';
import UpdatedAt from 'smartComponents/Node/parts/UpdatedAt';
import Event from 'smartComponents/Node/types/Event';
// parts
import OrganisationName from 'smartComponents/Organisation/parts/Name';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import UserCard from 'ugcomponents/Person/UserCard';
import { moment } from 'utils';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { DAY, TAB_TIMELINE } from 'utils/modelConstants';
import { isEmptyString } from 'utils/stringAdditions';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Hover from 'viewComponents/Hover';
import Padding from 'viewComponents/Padding';
import TableCell from 'viewComponents/Table/components/TableCell';
import TableRow from 'viewComponents/Table/components/TableRow';
import Tooltip from 'viewComponents/Tooltip';
import { H5 } from 'viewComponents/Typography';
import { CONFIG, USER_USERS_CONFIG } from './config';

import CalculatedEvents from './parts/CalculatedEvents';
import styles from './styles';

export class Day extends PureComponent {
  handleClick = model => () => {
    const { onClick, id, parentNodeId } = this.props;
    const passedId = model === DAY ? id : parentNodeId;
    LOGIC_HELPERS.ifFunction(onClick, [model, passedId])();
  };

  handleLinkClick = () => {
    const { onClick, id } = this.props;
    LOGIC_HELPERS.ifFunction(onClick, [id]);
  };

  getTrailRoot = () => {
    const { trail } = this.props;
    return nth(trail, -1);
  };

  getDayLink = templateId => {
    const { id } = this.props;
    const search = this.props.location.search;

    const parsedSearch = parseQueryParam(search);
    parsedSearch.selectedDay = id;
    parsedSearch.dayView = DAY;
    const queryParam = stringifyParam(parsedSearch);

    return `${URL_HELPERS.tours(templateId)}?${queryParam}`;
  };

  weekend = () => {
    const { time } = this.props;

    const dow = momentjs(time).day();

    return LOGIC_HELPERS.ifElse([dow === 0, dow === 6], true, false, true);
  };

  renderEventIcon = (param, index) => {
    const { id, trail, dayDate } = this.props;

    const templateId = trail[trail.length - 1];

    return (
      <>
        {LOGIC_HELPERS.ifElse(index === 0, <Hr half />)}

        <Event
          key={`${param.id}_${param.position}`}
          component={GridItem}
          smDown
          simplify
          middle
          dayId={id}
          templateId={templateId}
          dayDate={dayDate}
          readOnly
          {...param}
        />
      </>
    );
  };

  renderDefault = () => this.renderRow();

  renderRow = () => {
    const { id, parentNodeId, userId, orgId, description } = this.props;
    const desc = isEmptyString(description) ? (
      <Button
        textAlign="left"
        onClick={this.handleClick(DAY)}
        noPadding
        variant={VARIANTS.INLINE}
        size="extraSmall"
        color="black"
      >
        <Content
          truncateLength={TRUNCATE_LENGTH.MD}
          variant={VARIANTS.TEXT_ONLY}
          id={id}
        />
      </Button>
    ) : (
      <Tooltip
        isLight
        placement="left"
        title={<Description variant={VARIANTS.READ_ONLY} id={id} />}
      >
        <Button
          textAlign="left"
          onClick={this.handleClick(DAY)}
          noPadding
          variant={VARIANTS.INLINE}
          size="extraSmall"
          color="black"
        >
          <Content
            truncateLength={TRUNCATE_LENGTH.MD}
            variant={VARIANTS.TEXT_ONLY}
            id={id}
          />
        </Button>
      </Tooltip>
    );

    const separator = LOGIC_HELPERS.ifElse(orgId, ' - ', null);

    return (
      <TableRow key={id}>
        <TableCell isCapitalized>{desc}</TableCell>
        <TableCell isCapitalized>
          <Type id={id} />
        </TableCell>
        <TableCell isCapitalized>
          <Button
            textAlign="left"
            onClick={this.handleClick(TAB_TIMELINE)}
            noPadding
            variant={VARIANTS.INLINE}
            size="extraSmall"
            color="black"
          >
            <Content
              variant={VARIANTS.TEXT_ONLY}
              id={parentNodeId}
              fontWeight="bold"
            />
          </Button>
        </TableCell>
        <TableCell>
          <UpdatedAt id={id} />
        </TableCell>
        <TableCell isCapitalized>
          <Hover>
            {({ entered, anchorEl, handleMouseEnter, handleMouseLeave }) =>
              userId ? (
                <React.Fragment>
                  <Button
                    textAlign="left"
                    onClick={handleMouseEnter}
                    noPadding
                    variant={VARIANTS.INLINE}
                    size="extraSmall"
                    color="black"
                  >
                    <span>
                      <KnownAs id={userId} variant={VARIANTS.STRING_ONLY} />
                      {separator}
                      <OrganisationName
                        id={orgId}
                        variant={VARIANTS.STRING_ONLY}
                      />
                    </span>
                  </Button>
                  <Popover
                    id="mouse-over-popover"
                    open={entered}
                    anchorEl={anchorEl}
                    onClose={handleMouseLeave}
                    disableRestoreFocus
                  >
                    <UserCard id={userId} orgId={orgId} />
                  </Popover>
                </React.Fragment>
              ) : (
                ''
              )
            }
          </Hover>
        </TableCell>
      </TableRow>
    );
  };

  renderDateText = index => {
    const { startDate } = this.props;

    if (!startDate) return null;

    const date = momentjs(startDate).add(index, 'days');

    return moment.renderDateShorter(date);
  };

  renderDate = () => {
    const { classes, index, justify, startDate } = this.props;

    return (
      <GridItem>
        <GridContainer
          alignItems="center"
          className={classes.date}
          justify={justify}
          spacing={0}
        >
          <GridItem>#{index + 1}</GridItem>
          {startDate && (
            <Fragment>
              <GridItem>
                <span className={classes.padding}>{THE_BIG_DOT}</span>
              </GridItem>
              <GridItem>{this.renderDateText(index)}</GridItem>
            </Fragment>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  renderPhotoTitleDate = () => {
    const {
      classes,
      id,
      component: Component,
      contentClassName,
      ellipsisClassName,
      justify,
      direction,
    } = this.props;

    return (
      <Component>
        <GridContainer
          alignItems="center"
          justify={justify}
          direction={direction}
        >
          <Photo
            id={id}
            thumbnail
            editable={false}
            component={GridItem}
            showPreview={false}
          />
          <GridItem className={classes.grow}>
            <GridContainer direction="column" spacing={0} justify={justify}>
              <GridItem>
                <NodeProp
                  id={id}
                  valueKey={CONTENT}
                  editable={false}
                  showEmpty
                  ellipsis={!!ellipsisClassName}
                  className={contentClassName}
                  ellipsisClassName={ellipsisClassName}
                />
              </GridItem>
              {this.renderDate()}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Component>
    );
  };

  renderCardEvents = ({ events }) => events.map(this.renderEventIcon);

  renderCard = () => {
    const { classes, id, trail, isLast, photo } = this.props;

    const templateId = trail[trail.length - 1];
    const dayCount = trail.length - 2;

    const paddingProps = LOGIC_HELPERS.ifElse(
      isLast,
      {
        left: 'md',
        right: 'md',
        bottom: 'md',
      },
      {
        left: 'md',
        right: 'md',
      },
    );

    const img = !isEmptyString(photo) ? (
      <GridItem>
        <Photo type={DAY} id={id} editable={false} size={48} />
      </GridItem>
    ) : null;

    return (
      <Padding {...paddingProps}>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <GridContainer spacing={2} wrap="nowrap" alignItems="center">
              <GridItem className={classes.calendarBlock}>
                <UGLink
                  onClick={this.handleLinkClick}
                  to={this.getDayLink(templateId)}
                  className={classes.link}
                >
                  <div className={classes.calendar}>
                    <GridContainer direction="column" spacing={0}>
                      <GridItem>
                        <div
                          className={classnames(
                            classes.firstRow,
                            LOGIC_HELPERS.ifElse(
                              this.weekend(),
                              classes.firstRowWeekend,
                            ),
                          )}
                        >
                          Day
                        </div>
                      </GridItem>
                      <GridItem>
                        <div className={classes.secondRow}>{dayCount}</div>
                      </GridItem>
                    </GridContainer>
                  </div>
                </UGLink>
              </GridItem>
              <GridItem className={classes.grow}>
                <GridContainer direction="column" spacing={0}>
                  <GridItem className={classes.subtitle}>
                    <Trail showDayTrail={false} id={id} />
                  </GridItem>
                  <GridItem>
                    <UGLink
                      onClick={this.handleLinkClick}
                      to={this.getDayLink(templateId)}
                      className={classes.link}
                    >
                      <H5 weight="bolder" dense>
                        <Content
                          id={id}
                          showEmpty={false}
                          bold
                          className={classes.dayTitle}
                        />
                      </H5>
                    </UGLink>
                  </GridItem>
                  <Location id={id} />
                </GridContainer>
              </GridItem>
              {img}
            </GridContainer>
          </GridItem>

          <GridItem>
            <div className={classes.offsetLeft}>
              <GridContainer direction="column">
                <EventOnDayWithEventIds id={id}>
                  {this.renderCardEvents}
                </EventOnDayWithEventIds>
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
      </Padding>
    );
  };

  renderLogic = () => {
    const { id, eids } = this.props;
    return (
      <CalculatedEvents templateId={this.getTrailRoot()} id={id} eids={eids} />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderRow,
      [PHOTO_TITLE_DATE]: this.renderPhotoTitleDate,
      [VARIANTS.CARD]: this.renderCard,
      [VARIANTS.LOGIC]: this.renderLogic,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Day.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,

  // parent props
  variant: PropTypes.string,
  onClick: PropTypes.func,
  index: PropTypes.number,
  startDate: PropTypes.string,
  isLast: PropTypes.bool,

  // resaga props
  id: PropTypes.number,
  parentNodeId: PropTypes.number,
  userId: PropTypes.number,
  orgId: PropTypes.number,
  description: PropTypes.string,
  trail: PropTypes.array,
  photo: PropTypes.string,
  time: PropTypes.string,
  eids: PropTypes.array,
  dayDate: PropTypes.any,

  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  contentClassName: PropTypes.string,
  ellipsisClassName: PropTypes.string,
  justify: PropTypes.string,
  direction: PropTypes.string,
};

Day.defaultProps = {
  id: 0,
  variant: '',
  parentNodeId: 0,
  userId: 0,
  orgId: 0,
  description: '',
  component: 'span',
  trail: [],
  isLast: false,
  photo: '',
  location: {},
};

export default compose(
  withStyles(styles, { name: 'Day' }),
  withRouter,
  resaga(CONFIG),
  resaga(USER_USERS_CONFIG),
)(Day);
