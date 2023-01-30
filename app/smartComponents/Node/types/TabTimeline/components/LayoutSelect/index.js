import { DEFAULT, LIST } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import MenuButton from 'components/Popper/components/MenuButton';
import MenuItem from 'components/Popper/components/MenuItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import resaga from 'resaga';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DAY } from 'utils/modelConstants';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG, TEMPLATE_ID_CONFIG } from './config';
import styles from './styles';

export class LayoutSelect extends PureComponent {
  handleViewChange = value => () => {
    const { location, history, timelineId, visibleChildren } = this.props;

    const timelineIndex = visibleChildren.indexOf(timelineId);

    const { pathname } = location;

    if (timelineIndex !== -1) {
      history.push(`${pathname}?tab=${timelineIndex}&dayView=${value}`);
    } else {
      history.push(`${pathname}?tabId=${timelineId}&dayView=${value}`);
    }

    this.props.resaga.setValue({ layout: value });
  };

  renderLayoutIcon = value =>
    LOGIC_HELPERS.switchCase(value, {
      day: 'lnr-calendar-31',
      card: 'lnr-grid',
      timeline: 'lnr-calendar-full',
      map: 'lnr-map-marker',
      risk: 'lnr-warning',
      room: 'lnr-bed',
      [DEFAULT]: 'lnr-list4',
    });

  renderLayoutLabel = value => (
    <JText gray>
      {LOGIC_HELPERS.switchCase(value, {
        day: 'Day view',
        card: 'Card view',
        timeline: 'Timeline view',
        map: 'Map view',
        risk: 'Risk Assessment',
        room: 'Rooms',
        [DEFAULT]: 'List view',
      })}
    </JText>
  );

  openEventDialog = () => {
    const { id, dayIds } = this.props;

    PORTAL_HELPERS.openViewEvent(
      {
        dayId: dayIds[0],
        templateId: id,
        showAllDays: true,
      },
      this.props,
    );
  };

  renderLayoutButton = ({ openMenu, layout }) => {
    const { classes, simple } = this.props;

    const icon = this.renderLayoutIcon(layout);
    const label = this.renderLayoutLabel(layout);

    if (simple) {
      return (
        <MenuButton onClick={openMenu}>
          <Icon icon={icon} size="xsmall" />
        </MenuButton>
      );
    }

    return (
      <MenuButton onClick={openMenu}>
        <GridContainer
          alignItems="center"
          spacing={0}
          className={classes.marginBottom}
        >
          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <Icon icon={icon} size="small" />
              </GridItem>
              <GridItem className={classes.label}>{label}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xxsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </MenuButton>
    );
  };

  renderLayoutMenu = ({ closeMenu, layout }) => {
    const { classes, isPublic } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={layout === LIST}
            icon={this.renderLayoutIcon(LIST)}
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.handleViewChange('list')}
          >
            {this.renderLayoutLabel(LIST)}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={layout === DAY}
            icon={this.renderLayoutIcon(DAY)}
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.handleViewChange(DAY)}
          >
            {this.renderLayoutLabel(DAY)}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={layout === 'card'}
            icon={this.renderLayoutIcon('card')}
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.handleViewChange('card')}
          >
            {this.renderLayoutLabel('card')}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={layout === 'timeline'}
            icon={this.renderLayoutIcon('timeline')}
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.handleViewChange('timeline')}
          >
            {this.renderLayoutLabel('timeline')}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={layout === 'map'}
            icon={this.renderLayoutIcon('map')}
            iconClassName={classes.menuIcon}
            closeMenu={closeMenu}
            onClick={this.handleViewChange('map')}
          >
            {this.renderLayoutLabel('map')}
          </MenuItem>
        </GridItem>
        {!isPublic && (
          <React.Fragment>
            <GridItem>
              <MenuItem
                selected={layout === 'risk'}
                icon={this.renderLayoutIcon('risk')}
                iconClassName={classes.menuIcon}
                closeMenu={closeMenu}
                onClick={this.handleViewChange('risk')}
                className={classes.label}
              >
                {this.renderLayoutLabel('risk')}
              </MenuItem>
            </GridItem>
            <GridItem>
              <MenuItem
                selected={layout === 'room'}
                icon={this.renderLayoutIcon('room')}
                iconClassName={classes.menuIcon}
                closeMenu={closeMenu}
                onClick={this.handleViewChange('room')}
                className={classes.label}
              >
                {this.renderLayoutLabel('room')}
              </MenuItem>
            </GridItem>
          </React.Fragment>
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, layout, row } = this.props;

    if (row) {
      return (
        <GridContainer
          alignItems="center"
          className={classes.marginBottom}
          spacing={0}
        >
          <GridItem>
            <MenuItem
              selected={layout === LIST}
              icon={this.renderLayoutIcon(LIST)}
              iconClassName={classes.menuIcon}
              onClick={this.handleViewChange('list')}
            >
              {this.renderLayoutLabel(LIST)}
            </MenuItem>
          </GridItem>
          <GridItem>
            <MenuItem
              selected={layout === DAY}
              icon={this.renderLayoutIcon(DAY)}
              iconClassName={classes.menuIcon}
              onClick={this.handleViewChange(DAY)}
            >
              {this.renderLayoutLabel(DAY)}
            </MenuItem>
          </GridItem>
          <GridItem>
            <MenuItem
              selected={layout === 'card'}
              icon={this.renderLayoutIcon('card')}
              iconClassName={classes.menuIcon}
              onClick={this.handleViewChange('card')}
            >
              {this.renderLayoutLabel('card')}
            </MenuItem>
          </GridItem>
          <GridItem>
            <MenuItem
              selected={layout === 'timeline'}
              icon={this.renderLayoutIcon('timeline')}
              iconClassName={classes.menuIcon}
              onClick={this.handleViewChange('timeline')}
            >
              {this.renderLayoutLabel('timeline')}
            </MenuItem>
          </GridItem>
          <GridItem>
            <MenuItem
              selected={layout === 'map'}
              icon={this.renderLayoutIcon('map')}
              iconClassName={classes.menuIcon}
              onClick={this.handleViewChange('map')}
            >
              {this.renderLayoutLabel('map')}
            </MenuItem>
          </GridItem>
          <GridItem>
            <JButton>
              <JText gray>|</JText>
            </JButton>
          </GridItem>
          <GridItem>
            <JButton onClick={this.openEventDialog}>
              <GridContainer alignItems="center" wrap="nowrap">
                <GridItem>
                  <Icon icon="lnr-calendar-check" color="gray" />
                </GridItem>
                <GridItem>
                  <JText gray>Events</JText>
                </GridItem>
              </GridContainer>
            </JButton>
          </GridItem>
        </GridContainer>
      );
    }

    return (
      <Popper
        renderButton={this.renderLayoutButton}
        layout={layout}
        stopPropagation
        noPadding
        menuHeader="Layout"
      >
        {this.renderLayoutMenu}
      </Popper>
    );
  };
}

LayoutSelect.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // withRouter props
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  dayIds: PropTypes.array,
  simple: PropTypes.bool,
  row: PropTypes.bool,
  id: PropTypes.number,

  // resaga props
  layout: PropTypes.string,
  visibleChildren: PropTypes.array,
  timelineId: PropTypes.number,
  isPublic: PropTypes.bool,
};

LayoutSelect.defaultProps = {
  visibleChildren: [],
  dayIds: [],
  layout: LIST,
};

export default compose(
  withStyles(styles, { name: 'LayoutSelect' }),
  withRouter,
  withDayIds,
  resaga(TEMPLATE_ID_CONFIG),
  resaga(CONFIG),
)(LayoutSelect);
