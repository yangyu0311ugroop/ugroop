import { withStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import {
  PERSON_DETAIL_API,
  GET_PERSON_DETAIL,
  GET_PERSONAL_PREFERENCES,
  USER_API,
} from 'apis/constants';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { withRouter } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import Container from 'components/Container';
import LoadingText from 'ugcomponents/Progress/LoadingText';

import Sticky from 'react-stickynode';
import Popper from 'components/Popper';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import {
  DEFAULT_PERSON_TAB_INDEX,
  TAB_ITEMS_PERSON,
} from 'containers/Profile/constants';
import MenuItem from 'components/Popper/components/MenuItem';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { VARIANTS } from 'variantsConstants';
import OrgRoles from 'smartComponents/Person/components/OrgRoles';
import { PERSON_PROFILE_VIEW_STORE } from './constants';
import TabHeader from './components/TabHeader';
import Content from './components/Content';
import { CONFIG } from './config';
import styles from './styles';

export class Person extends React.PureComponent {
  componentDidMount = () => {
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, GET_PERSON_DETAIL, {
      payload: {
        userId: this.props.userId,
      },
      onSuccess: this.getUserPreference,
    });
  };

  getUserPreference = () => {
    const { userId } = this.props;
    this.props.resaga.dispatchTo(USER_API, GET_PERSONAL_PREFERENCES, {
      payload: {
        id: userId,
      },
    });
  };

  renderLoading = () => {
    const { classes } = this.props;
    return (
      <GridContainer direction="column" alignItems="center">
        <GridItem className={classes.root}>
          <LoadingText />
        </GridItem>
      </GridContainer>
    );
  };

  onClickRenderPage = item => () => {
    const { history, location } = this.props;
    const index = item.id;
    const parsedParams = parseQueryParam(location.search);
    parsedParams.tab = index;
    const stringified = stringifyParam(parsedParams);

    history.push(`${location.pathname}?${stringified}`);
  };

  renderPersonalItems = closeMenu => {
    const { location } = this.props;
    const parsedUrl = parseQueryParam(location.search);
    const activeLink = Number(parsedUrl.tab) || DEFAULT_PERSON_TAB_INDEX;
    return TAB_ITEMS_PERSON.map(item => (
      <GridItem key={item.id}>
        <MenuItem
          onClick={this.onClickRenderPage(item)}
          closeMenu={closeMenu}
          selected={activeLink === item.id}
        >
          {item.label}
        </MenuItem>
      </GridItem>
    ));
  };

  renderPersonalList = closeMenu => {
    const { classes } = this.props;
    return (
      <GridContainer
        direction="column"
        wrap="nowrap"
        className={classes.dropDownMenu}
      >
        <GridItem className={classes.headerSettingTitle}>
          Personal Settings
        </GridItem>
        {this.renderPersonalItems(closeMenu)}
      </GridContainer>
    );
  };

  renderSettingTabDropDownMenu = ({ closeMenu }) => (
    <>
      {this.renderPersonalList(closeMenu)}
      {this.renderOrgList(closeMenu)}
    </>
  );

  renderOrgList = closeMenu => {
    const { classes } = this.props;
    return (
      <GridContainer
        direction="column"
        wrap="nowrap"
        className={classes.dropDownMenu}
      >
        <GridItem className={classes.orgHeaderSettingTitle}>
          Organisation Settings
        </GridItem>
        {this.renderOrgItems(closeMenu)}
      </GridContainer>
    );
  };

  renderOrgItems = closeMenu => {
    const { orgUserIds } = this.props;
    return (
      <GridItem>
        <OrgRoles
          ids={orgUserIds}
          variant={VARIANTS.LIST_ITEM}
          closeMenu={closeMenu}
        />
      </GridItem>
    );
  };

  renderSettingTabDropDownButton = ({ openMenu }) => {
    const { classes, location } = this.props;
    const parsedUrl = parseQueryParam(location.search);
    const activeLink = Number(parsedUrl.tab) || DEFAULT_PERSON_TAB_INDEX;
    const activeLinkText = TAB_ITEMS_PERSON.map(item =>
      activeLink === item.id ? item.label : '',
    );

    return (
      <GridContainer
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        card
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
          >
            {activeLinkText}
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

  renderSettingTabDropDown = () => (
    <Popper
      placement="bottom-end"
      renderButton={this.renderSettingTabDropDownButton}
      quarterPadding
    >
      {this.renderSettingTabDropDownMenu}
    </Popper>
  );

  renderSettingTabMobile = () => {
    const { userId, getPersonDetailsLoading, classes } = this.props;
    return (
      <>
        <Sticky enabled top={38} innerZ={1000}>
          <GridItem className={classes.grow}>
            {this.renderSettingTabDropDown()}
          </GridItem>
        </Sticky>
        <Container className={classes.contentMobileView}>
          <GridContainer>
            {getPersonDetailsLoading ? (
              this.renderLoading()
            ) : (
              <Content userId={userId} />
            )}
          </GridContainer>
        </Container>
      </>
    );
  };

  renderSettingTab = () => {
    const { userId, getPersonDetailsLoading, classes } = this.props;
    return (
      <Container className={classes.contentView}>
        <GridContainer className={classes.settingTab}>
          <GridItem xs={12} md={3}>
            <GridContainer className={classes.tabHeader}>
              <TabHeader id={userId} />
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={9}>
            <GridContainer>
              {getPersonDetailsLoading ? (
                this.renderLoading()
              ) : (
                <Content userId={userId} />
              )}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Container>
    );
  };

  render = () => {
    const content = (
      <>
        <Hidden smDown>{this.renderSettingTab()}</Hidden>
        <Hidden mdUp>{this.renderSettingTabMobile()}</Hidden>
      </>
    );
    return content;
  };
}

Person.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  userId: PropTypes.number.isRequired,

  // resaga props
  getPersonDetailsLoading: PropTypes.bool,

  orgUserIds: PropTypes.array,
};

Person.defaultProps = {
  getPersonDetailsLoading: false,
};

const viewStore = injectReducer({
  key: PERSON_PROFILE_VIEW_STORE,
  reducer: reducer(PERSON_PROFILE_VIEW_STORE),
  orgUserIds: [],
});

export default compose(
  viewStore,
  withRouter,
  withStyles(styles, { name: 'Person' }),
  resaga(CONFIG),
)(Person);
