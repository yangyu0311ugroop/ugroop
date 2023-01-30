import { MENU_ITEM } from 'appConstants';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hidden from '@material-ui/core/Hidden';
import OrgMenu from 'smartComponents/Person/components/OrgRoles';
import { VARIANTS } from 'variantsConstants';
import { H2 } from 'viewComponents/Typography';
import Margin from 'viewComponents/Margin';
import { ABILITY_API, FIND_MY_TOURS } from 'apis/constants';
import Icon from 'ugcomponents/Icon';
import Headx from 'ugcomponents/Headx';
import Participant from 'smartComponents/Node/types/Room/components/Participant';
import { CONFIG, USER_CONFIG } from './config';
import styles from './styles';
import TargetTour from './components/TargetTour';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';
import JText from '../../../../components/JText';

export class CopyParticipant extends PureComponent {
  state = {
    loading: false,
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
    this.handleClickOrg(null)();
    PORTAL_HELPERS.close(this.props);
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

  renderTours = () => {
    const {
      tours,
      templateId,
      selectedOrgId,
      participantModel,
      personModel,
      personId,
    } = this.props;
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
            id={tourId}
            orgId={selectedOrgId}
            participantModel={participantModel}
            personId={personId}
            personModel={personModel}
          />
        ))}
      </GridContainer>
    );
  };

  renderHeader = () => {
    const { id, classes } = this.props;
    return (
      <GridContainer noWrap>
        <GridItem className={classes.noWrapText}>Copy Pax</GridItem>
        <GridItem>
          <Participant
            id={id}
            variant={VARIANTS.TEXT_ONLY}
            showSubDetail={false}
            showAvatar={false}
            textComponent={H2}
          />
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

  renderContent = () => {
    const { classes, orgUserIds } = this.props;
    const { loading } = this.state;
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
    <Dialog maxWidth="sm" fullWidth open onClose={this.handleClose}>
      <DialogTitle noPaddingBottom>
        <Title heading={this.renderHeader()} />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
    </Dialog>
  );
}

CopyParticipant.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // participant Id
  templateId: PropTypes.number, // Template Id

  // resaga props
  orgUserIds: PropTypes.array,
  fetchTour: PropTypes.bool,
  tours: PropTypes.array,
  selectedOrgId: PropTypes.number,
  participantModel: PropTypes.object,
  personModel: PropTypes.object,
  personId: PropTypes.number,
};

CopyParticipant.defaultProps = {
  orgUserIds: [],
  tours: [],
  personModel: {},
};

export default compose(
  withStyles(styles, { name: 'CopyParticipant' }),
  resaga(USER_CONFIG),
  resaga(CONFIG),
)(CopyParticipant);
