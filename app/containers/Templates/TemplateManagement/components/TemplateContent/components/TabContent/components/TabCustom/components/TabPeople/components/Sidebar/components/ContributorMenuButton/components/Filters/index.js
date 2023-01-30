import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
} from 'apis/components/Ability/roles';
import {
  CONFIRMED,
  DEFAULT,
  PEOPLE_FILTERS,
  PEOPLE_TAB_OPTIONS,
} from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANT } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';

import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';

import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';

import m from './messages';
import { CONFIG, CONFIG_IDS } from './config';
import styles from './styles';
import { withNodeRole } from '../../../../../../../../../../../../../../../../../smartComponents/Node/hoc/withNodeRole';
import { ability } from '../../../../../../../../../../../../../../../../../apis/components/Ability/ability';
import PeopleCount from './peopleCount';

export class Filters extends PureComponent {
  componentWillUnmount() {
    this.props.resaga.setValue({
      shareListFilter: CONFIRMED,
    });
  }

  handleShareFilter = shareListFilter => () => {
    this.props.resaga.setValue({
      shareListFilter,
    });
  };

  handleFilterRole = (filterRoleBy, peopleTabOptionSelected) => () => {
    this.props.resaga.setValue({
      filterRoleBy,
      peopleTabOptionSelected,
      peopleFilterSelected: PEOPLE_FILTERS.CONTRIBUTORS,
    });
  };

  canViewOtherRole = () => {
    // Hack, will need to add ability for this
    const { roles } = this.props;
    return (
      ability.can('execute', PARTICIPANT) ||
      roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_COLLABORATOR) ||
      roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER)
    );
  };

  renderButton = ({ openMenu }) => {
    const { classes, peopleTabOptionSelected } = this.props;
    return (
      <GridContainer
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        // card
        spacing={0}
        dense
      >
        <GridItem xs={12}>
          <Button
            noMargin
            size="base"
            color="normal"
            onClick={openMenu}
            className={classes.menuButton}
            variant={VARIANTS.INLINE}
          >
            {this.getName(peopleTabOptionSelected)}
            <Icon
              size="xsmall"
              icon="lnr-chevron-down"
              className={classes.addMarginLeft}
            />
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  getName = () => {
    const { peopleTabOptionSelected } = this.props;
    return LOGIC_HELPERS.switchCase(peopleTabOptionSelected, {
      [PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS]: <M {...m.connected} />,
      [PEOPLE_TAB_OPTIONS.ONLY_ORGANISERS]: <M {...m.organisers} />,
      [PEOPLE_TAB_OPTIONS.TOUR_COLLABORATOR]: <M {...m.collaborators} />,
      [PEOPLE_TAB_OPTIONS.ONLY_VIEWERS]: <M {...m.viewers} />,
      [DEFAULT]: <M {...m.connected} />,
    });
  };

  renderMenuItems = ({ closeMenu }) => {
    const { peopleTabOptionSelected } = this.props;
    return (
      <GridContainer direction="column" wrap="nowrap">
        <GridItem>
          <MenuItem
            onClick={this.handleFilterRole(
              TOUR_CONTRIBUTOR_ROLE_TYPES,
              PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS,
            )}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS
            }
          >
            <M {...m.connected} />
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            onClick={this.handleFilterRole(
              [TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER],
              PEOPLE_TAB_OPTIONS.ONLY_ORGANISERS,
            )}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ONLY_ORGANISERS
            }
          >
            <M {...m.organisers} />
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            onClick={this.handleFilterRole(
              [TOUR_CONTRIBUTOR_ROLE.TOUR_COLLABORATOR],
              PEOPLE_TAB_OPTIONS.TOUR_COLLABORATOR,
            )}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.TOUR_COLLABORATOR
            }
          >
            <M {...m.collaborators} />
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            onClick={this.handleFilterRole(
              [TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER],
              PEOPLE_TAB_OPTIONS.ONLY_VIEWERS,
            )}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ONLY_VIEWERS
            }
          >
            <M {...m.viewers} />
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderPopper = () => {
    const { peopleTabOptionSelected } = this.props;
    return (
      <Popper
        placement="bottom"
        stopPropagation
        renderButton={this.renderButton}
        peopleTabOptionSelected={peopleTabOptionSelected}
      >
        {this.renderMenuItems}
      </Popper>
    );
  };

  canViewAll = () => ability.can('execute', PARTICIPANT);

  renderItem = ({
    clickable = true,
    option,
    selected,
    selectedRole,
    label,
    indent = false,
  }) => {
    const { classes } = this.props;
    return (
      <GridItem
        onClick={this.handleFilterRole(selectedRole, option)}
        clickable={clickable}
        className={indent && classes.indent}
      >
        <GridContainer justify="space-between" alignItems="center">
          <GridItem>
            <P
              whiteSpace="nowrap"
              dense
              weight={LOGIC_HELPERS.ifElse(
                selected === option,
                'bold',
                'light',
              )}
            >
              {label}
            </P>
          </GridItem>
          <PeopleCount selectedRole={selectedRole} />
        </GridContainer>
      </GridItem>
    );
  };

  renderList = () => {
    const { peopleTabOptionSelected } = this.props;

    return (
      <>
        {this.canViewOtherRole() &&
          this.renderItem({
            option: PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS,
            selected: peopleTabOptionSelected,
            selectedRole: TOUR_CONTRIBUTOR_ROLE_TYPES,
            label: <M {...m.connected} />,
          })}
        {this.renderItem({
          option: PEOPLE_TAB_OPTIONS.ONLY_ORGANISERS,
          selected: peopleTabOptionSelected,
          selectedRole: [TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER],
          label: <M {...m.organisers} />,
          indent: this.canViewAll(),
        })}
        {this.canViewOtherRole() && (
          <React.Fragment>
            {this.renderItem({
              option: PEOPLE_TAB_OPTIONS.ONLY_CONTRIBUTORS,
              selected: peopleTabOptionSelected,
              selectedRole: [TOUR_CONTRIBUTOR_ROLE.TOUR_COLLABORATOR],
              label: <M {...m.collaborators} />,
              indent: this.canViewAll(),
            })}
            {this.renderItem({
              option: PEOPLE_TAB_OPTIONS.ONLY_VIEWERS,
              selected: peopleTabOptionSelected,
              selectedRole: [TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER],
              label: <M {...m.viewers} />,
              indent: this.canViewAll(),
            })}
          </React.Fragment>
        )}
      </>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.MENU_ITEM]: this.renderPopper,
      [DEFAULT]: this.renderList,
    });
  };
}

Filters.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array,

  // parent props
  variant: PropTypes.string,
  // resaga props
  shareListFilter: PropTypes.string,
  filterRoleBy: PropTypes.array,
  templateId: PropTypes.number,
  orgId: PropTypes.number,
  orgUserIds: PropTypes.array,
  peopleTabOptionSelected: PropTypes.string,
};

Filters.defaultProps = {
  shareListFilter: CONFIRMED,
  filterRoleBy: TOUR_CONTRIBUTOR_ROLE_TYPES,
  orgUserIds: [],
  roles: [],
};

export default compose(
  withStyles(styles, { name: 'Filters' }),
  resaga(CONFIG_IDS),
  withNodeRole,
  resaga(CONFIG),
)(Filters);
