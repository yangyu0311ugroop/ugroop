import { CONTENT, MENU_ITEM, TAB_ACTION, URL_HELPERS } from 'appConstants';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hidden from '@material-ui/core/Hidden';
import OrgMenu from 'smartComponents/Person/components/OrgRoles';
import { VARIANTS } from 'variantsConstants';
import Margin from 'viewComponents/Margin';
import { ABILITY_API, FIND_MY_TOURS } from 'apis/constants';
import Icon from 'ugcomponents/Icon';
import Headx from 'ugcomponents/Headx';
import JText from 'components/JText';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import JDialog from 'ugcomponents/JDialog';
import Content from 'smartComponents/Node/parts/Content';
import { CONFIG, USER_CONFIG } from './config';
import styles from './styles';
import TargetTour from './components/TargetTour';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';
import NavLink from '../../../../ugcomponents/NavLink';

export class CopyTabOther extends PureComponent {
  state = {
    loading: false,
    selected: null,
    tabMoved: false,
  };

  componentDidMount = () => {
    const { fetchTour } = this.props;
    if (fetchTour) {
      // Only fetch when page hard refresh
      this.fetUserTour();
    }
  };

  fetchAbilityDone = () => {
    this.setState({ loading: false });
  };

  fetUserTour = () => {
    this.setState({ loading: true });
    this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_TOURS, {
      onSuccess: this.fetchAbilityDone,
      onError: this.fetchAbilityDone,
    });
  };

  handleClose = () => {
    this.setSelected(null);
    this.setState({ tabMoved: false, selected: null });
    this.handleClickOrg(null)();
    PORTAL_HELPERS.close(this.props);
  };

  onSuccess = () => {
    const { action } = this.props;
    const values = LOGIC_HELPERS.ifElse(
      action === TAB_ACTION.COPY,
      { tabMoved: true, selected: null },
      { tabMoved: true },
    );
    this.setState(values);
  };

  handleClickOrg = id => () =>
    this.props.resaga.setValue({ selectedOrgId: id });

  renderOrganisationHeader = () => (
    <GridContainer alignItems="center">
      <GridItem>
        <Icon color="blue" size="normal" icon="lnr-group-work" />
      </GridItem>
      <GridItem>Organisations</GridItem>
    </GridContainer>
  );

  setSelected = selected => this.setState({ selected });

  renderTours = () => {
    const { tours, templateId, selectedOrgId, id, action } = this.props;
    const ids = tours.filter(item => item !== templateId);
    if (!ids.length)
      return this.renderEmpty(
        LOGIC_HELPERS.ifElse(
          selectedOrgId,
          'No Travels yet',
          'Choose organisation',
        ),
      );
    return (
      <GridContainer direction="column">
        {ids.map(tourId => (
          <TargetTour
            id={id}
            tabId={id}
            targetTourId={tourId}
            templateId={templateId}
            orgId={selectedOrgId}
            onSuccess={this.onSuccess}
            selected={this.state.selected}
            onSelect={this.setSelected}
            action={action}
          />
        ))}
      </GridContainer>
    );
  };

  renderHeader = () => {
    const { id, classes, action } = this.props;
    return (
      <GridContainer noWrap>
        <GridItem className={classes.noWrapText}>{action} Tab</GridItem>
        <GridItem>
          <JText ellipsis bold>
            <NodeProp
              id={id}
              valueKey={CONTENT}
              isCustomData={false}
              editable={false}
              variant={VARIANTS.TEXT_ONLY}
            />
          </JText>
        </GridItem>
      </GridContainer>
    );
  };

  renderEmpty = label => {
    const { classes } = this.props;
    return (
      <GridContainer direction="column" spacing={0} alignItems="center">
        <GridItem className={classes.empty}>
          <JText lg italic gray>
            {label}
          </JText>
        </GridItem>
      </GridContainer>
    );
  };

  renderTourLink = id => {
    const { classes } = this.props;
    if (!id) return null;
    const link = URL_HELPERS.tours(id);
    return (
      <GridItem>
        <NavLink
          to={link}
          className={classes.navTitle}
          stopPropogationLink
          onClick={this.handleClose}
        >
          <JText ellipsis lg>
            <Content id={id} variant={VARIANTS.VALUE_ONLY} />
          </JText>
        </NavLink>
      </GridItem>
    );
  };

  renderMovedPlaceHolder = () => (
    <GridContainer justify="center" noWrap>
      <GridItem>
        <JText lg dark>
          Tab successfully moved to
        </JText>
      </GridItem>
      {this.renderTourLink(this.state.selected)}
    </GridContainer>
  );

  renderContent = () => {
    const { classes, orgUserIds, action } = this.props;
    const { loading, tabMoved } = this.state;
    if (tabMoved && action === TAB_ACTION.MOVE)
      return this.renderMovedPlaceHolder();
    if (loading) return 'loading...';
    return (
      <GridContainer spacing={2}>
        <GridItem xs={12} md={4} className={classes.borderRight}>
          <Headx>{this.renderOrganisationHeader()}</Headx>
          <Margin bottom="md" />
          <Hidden smDown>
            <OrgMenu
              ids={orgUserIds}
              // orgId={-1}
              onClickMenu={this.handleClickOrg}
              variant={VARIANTS.LIST}
              showPersonal
            />
          </Hidden>
          <Hidden mdUp>
            <OrgMenu
              ids={orgUserIds}
              // orgId={first(orgUserIds)}
              onClickMenu={this.handleClickOrg}
              variant={MENU_ITEM}
              showPersonal
            />
          </Hidden>
        </GridItem>
        <GridItem xs={12} md={8}>
          <Headx>Travel List</Headx>
          <Margin bottom="md" />
          {this.renderTours()}
        </GridItem>
        <Margin bottom="md" />
      </GridContainer>
    );
  };

  render = () => (
    <JDialog
      open
      popper
      fullWidth
      fullScreen={false}
      onClose={this.handleClose}
      hideSubmitButton
      header={this.renderHeader()}
      headerNoWrap
    >
      {this.renderContent()}
    </JDialog>
  );
}

CopyTabOther.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // participant Id
  templateId: PropTypes.number, // Template Id
  action: PropTypes.string,

  // resaga props
  orgUserIds: PropTypes.array,
  fetchTour: PropTypes.bool,
  tours: PropTypes.array,
  selectedOrgId: PropTypes.number,
};

CopyTabOther.defaultProps = {
  orgUserIds: [],
  tours: [],
  action: TAB_ACTION.MOVE,
};

export default compose(
  withStyles(styles, { name: 'CopyTabOther' }),
  resaga(USER_CONFIG),
  resaga(CONFIG),
)(CopyTabOther);
