import { ability } from 'apis/components/Ability/ability';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import PeopleTabRedirect from 'smartComponents/Node/logics/PeopleTabRedirect';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_SHARE, TOUR_CONTRIBUTOR } from 'utils/modelConstants';
import NavLink from 'ugcomponents/NavLink';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { CONFIG, CONFIG_0 } from './config';
import styles from './styles';

export class PeopleLink extends PureComponent {
  getPeopleTabUrl = () => {
    const { location, peopleTabIndex, calculatedPeopleTabId } = this.props;
    const { pathname } = location;

    const tabIndex = LOGIC_HELPERS.ifElse(
      peopleTabIndex > -1,
      peopleTabIndex,
      0,
    );

    if (peopleTabIndex === -1 && calculatedPeopleTabId > 0) {
      return `${pathname}?tabId=${calculatedPeopleTabId}`;
    }

    return `${pathname}?tab=${tabIndex}`;
  };

  canCreate = () => ability.can('execute', { type: NODE_SHARE });

  setPeopleView = ({ peopleView, filterView = {} }) => () =>
    this.props.resaga.setValue({ peopleView, ...filterView });

  showLink = () => {
    const {
      calculatedVisibleChildren,
      privateIds,
      calculatedPeopleTabId,
      hiddenIds,
    } = this.props;

    // Person not yet create
    let tabIds = calculatedVisibleChildren.concat(hiddenIds);
    if (this.canCreate()) {
      tabIds = tabIds.concat(privateIds);
    }
    const hasAccess = tabIds.indexOf(calculatedPeopleTabId) !== -1;
    if (calculatedPeopleTabId === -1) {
      return this.canCreate();
    }

    return hasAccess;
  };

  renderlinkWrapper = props => {
    const {
      classes,
      peopleView,
      children,
      customProps,
      filterView,
    } = this.props;
    const peopleTabUrl = this.getPeopleTabUrl();
    return (
      <GridItem>
        <NavLink
          to={peopleTabUrl}
          className={classnames(classes.link, customProps)}
          onClick={props.handlePeopleRedirect({
            peopleView,
            filterView,
          })}
        >
          {children}
        </NavLink>
      </GridItem>
    );
  };

  render = () => {
    const { peopleTabIndex, children, readOnlyLabel } = this.props;
    if (!this.showLink()) return readOnlyLabel || children;

    let navLink = this.renderlinkWrapper({
      handlePeopleRedirect: this.setPeopleView,
    });
    if (!peopleTabIndex || peopleTabIndex === -1) {
      navLink = (
        <PeopleTabRedirect redirect={false}>
          {this.renderlinkWrapper}
        </PeopleTabRedirect>
      );
    }
    return navLink;
  };
}

PeopleLink.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  peopleTabIndex: PropTypes.number,
  peopleView: PropTypes.string,
  readOnlyLabel: PropTypes.string,
  children: PropTypes.node,
  customProps: PropTypes.string,
  filterView: PropTypes.object,

  // resaga props
  calculatedVisibleChildren: PropTypes.array,
  privateIds: PropTypes.array,
  hiddenIds: PropTypes.array,
  calculatedPeopleTabId: PropTypes.number,
};

PeopleLink.defaultProps = {
  calculatedPeopleTabId: 0,
  readOnlyLabel: '',
  peopleView: TOUR_CONTRIBUTOR,
  privateIds: [],
  hiddenIds: [],
  calculatedVisibleChildren: [],
  filterView: {},
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'PeopleLink' }),
  resaga(CONFIG_0),
  resaga(CONFIG),
)(PeopleLink);
