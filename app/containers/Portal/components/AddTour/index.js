import { Slide } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { USER_ID_CONFIG } from 'apis/components/User/config';
import { CREATE_NODE, NODE_API } from 'apis/constants';
import { DO_NOTHING, URL_HELPERS, LIST } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import inputs from 'containers/Templates/Modals/AddTemplateModal/defines/inputs';
import m from 'containers/Templates/Modals/AddTemplateModal/defines/messages';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import Organisation from 'smartComponents/Organisation';
import RootNodeId from 'smartComponents/Organisation/components/RootNodeId';
import Person from 'smartComponents/Person';
import OrganisationList from 'smartComponents/Users/components/OrganisationList';
import Icon from 'ugcomponents/Icon';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { TEMPLATE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { DatePicker } from 'material-ui-pickers';
import classnames from 'classnames';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepConnector from '@material-ui/core/StepConnector';
import { VARIANTS } from 'variantsConstants';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import JText from 'components/JText';
import JDialog from 'ugcomponents/JDialog';
import { CONFIG } from './config';
import styles from './styles';

export class AddTour extends PureComponent {
  state = {
    selectedOrganisationId: 0,
    loading: false,
    selectedDate: null,
    selectedDay: null,
    // eslint-disable-next-line react/no-unused-state
    activeStep: 0,
  };

  componentDidMount = () => {
    const orgId = this.organisationId();

    if (Number.isInteger(orgId)) {
      this.setState({ selectedOrganisationId: orgId });
    }

    this.portalSm = {
      fullScreen: true,
      TransitionComponent: Slide,
      TransitionProps: { direction: 'up' },
    };
  };

  componentWillReceiveProps = nextProps => {
    const orgId = this.organisationId();
    const nextOrgId = this.organisationId(nextProps);

    if (Number.isInteger(nextOrgId) && orgId !== nextOrgId) {
      this.setState({ selectedOrganisationId: nextOrgId });
    }
  };

  handlePickerRef = ref => {
    this.picker = ref;
  };

  parentNodeId = rootNodeId => {
    const { myRootNodeId, organisationId, folderId } = this.props;
    const { selectedOrganisationId } = this.state;

    if (folderId) return folderId;
    const selectedId = selectedOrganisationId || organisationId;

    if (selectedId > 0) {
      return rootNodeId;
    }

    return myRootNodeId;
  };

  organisationId = props => {
    const { minimise, organisationId, organisationIdFromURL, selectedOrgId } =
      props || this.props;

    // if organisationId is set, use it
    if (organisationId) {
      return organisationId;
    }

    // otherwise, if minimise variant, use redux store value
    if (minimise) {
      return selectedOrgId;
    }

    // if not, use URL value
    return organisationIdFromURL;
  };

  handleCloseDialog = () => PORTAL_HELPERS.close(this.props);

  handleValidSubmit = ({ rootNodeId, content, duration }) => {
    const { history, organisationId } = this.props;
    const { selectedOrganisationId, selectedDate, selectedDay } = this.state;
    const startDate = selectedDate;
    const weekDay = selectedDay;
    let displayDate = 'none';

    if (startDate !== null) {
      displayDate = 'startDate';
    } else if (weekDay !== null) {
      displayDate = 'weekDay';
    }
    const parentNodeId = this.parentNodeId(rootNodeId);

    const selectedId = selectedOrganisationId || organisationId;

    // unlikely to happen
    // probably the organisation rootNodeId isn't initialised yet
    if (!parentNodeId) {
      SnackbarHelper.openErrorSnackbar(
        'Please create tour inside selected organisation. You will be redirected there.',
        this.props.resaga,
      );
      return history.push(`${URL_HELPERS.orgIndex(selectedId)}`);
    }

    const template = {
      content,
      customData: {
        displayDate,
        startDate,
        weekDay,
        duration,
        organisationId: selectedId,
      },
      parentNodeId,
      type: TEMPLATE,
    };

    this.setState({ loading: true });
    return this.props.resaga.dispatchTo(NODE_API, CREATE_NODE, {
      payload: {
        node: template,
        keyPath: `${parentNodeId}.children`,
      },
      onSuccess: this.onCreateSuccess,
      onError: this.onCreateError,
    });
  };

  onCreateSuccess = ({ node }) => {
    const { history, onSuccess } = this.props;
    this.setState({ loading: false });

    history.push(`${URL_HELPERS.tours(node.id)}?tab=0&dayView=${LIST}`);

    this.handleCloseDialog();

    this.props.resaga.setValue({
      layout: LIST,
      editable: true,
    });

    return LOGIC_HELPERS.ifFunction(onSuccess, [{ node }]);
  };

  onCreateError = err => {
    this.setState({ loading: false });
    if (err.status === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
      SnackbarHelper.openErrorSnackbar(
        'You are not authorized in doing the action',
        this.props.resaga,
      );
      return this.handleCloseDialog();
    }

    return DO_NOTHING;
  };

  onDateChange = val => {
    if (val) val.utcOffset(0, true).startOf('d');
    const dateVal = val ? val.format() : null;
    this.setState({
      selectedDate: dateVal,
      selectedDay: null,
    });
  };

  renderSaveCancelButton = () => {
    const { loading } = this.state;

    return (
      <GridContainer alignItems="center" justify="flex-end">
        <GridItem>
          <Button
            noMargin
            color="gray"
            onClick={this.handleCloseDialog}
            disabled={loading}
          >
            Cancel
          </Button>
        </GridItem>
        <GridItem>
          <Button noMargin color="primary" type="submit" disabled={loading}>
            Create
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  selectOrganisationId = selectedOrganisationId => () =>
    this.setState({ selectedOrganisationId });

  renderOrganisation = ({ closeMenu, userId }) => id => {
    const { classes } = this.props;
    return (
      <GridItem key={id}>
        <MenuItem
          closeMenu={closeMenu}
          button
          onClick={this.selectOrganisationId(id)}
        >
          {id === -1 ? (
            <Person id={userId} variant={VARIANTS.PERSON_TYPE} />
          ) : (
            <Organisation id={id} ellipsisClassName={classes.newtourEllipsis} />
          )}
        </MenuItem>
      </GridItem>
    );
  };

  renderList = closeMenu => ({ organisations, userId }) =>
    organisations.map(this.renderOrganisation({ closeMenu, userId }));

  renderOrganisationList = ({ closeMenu }) => (
    <GridContainer direction="column">
      <GridItem>
        <MenuItem>Where would you like to store it?</MenuItem>
      </GridItem>

      <OrganisationList>{this.renderList(closeMenu)}</OrganisationList>
    </GridContainer>
  );

  renderOwnerButton = ({ openMenu }) => {
    const { classes, userId, folderId } = this.props;
    const { selectedOrganisationId } = this.state;

    const organisationId = this.organisationId();

    const selectedId = selectedOrganisationId || organisationId;

    let renderSelected;

    if (selectedId > 0) {
      renderSelected = (
        <>
          <Organisation id={selectedId} />
          <RootNodeId id={selectedId} />
        </>
      );
    } else {
      renderSelected = <Person id={userId} variant={VARIANTS.PERSON_TYPE} />;
    }

    return (
      <MenuItem
        block={false}
        button
        onClick={openMenu}
        className={classes.minHeight}
        disabled={folderId}
      >
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          className={classes.noWrap}
        >
          <GridItem className={classes.selectedContainer}>
            {renderSelected}
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" />
          </GridItem>
        </GridContainer>
      </MenuItem>
    );
  };

  handlePickWeekDay = weekDay => () => {
    const { selectedDay } = this.state;
    this.setState({
      selectedDay: LOGIC_HELPERS.ifElse(weekDay === selectedDay, null, weekDay),
      selectedDate: null,
    });
  };

  dayItem = (label, day) => {
    const { classes } = this.props;
    const { selectedDay } = this.state;
    const isWeekend = [0, 6].includes(day);
    const selected = selectedDay === day;
    return (
      <GridItem>
        <MenuItem
          button
          onClick={this.handlePickWeekDay(day)}
          className={classnames(
            classes.weekday,
            isWeekend && classes.weekend,
            selected && classes.selectedDay,
          )}
        >
          {label}
        </MenuItem>
      </GridItem>
    );
  };

  renderDayWeek = () => {
    const { smDown } = this.props;
    return (
      <GridContainer
        alignItems="center"
        justify={LOGIC_HELPERS.ifElse(smDown, 'center', 'left')}
      >
        {this.dayItem('Sun', 0)}
        {this.dayItem('Mon', 1)}
        {this.dayItem('Tue', 2)}
        {this.dayItem('Wed', 3)}
        {this.dayItem('Thu', 4)}
        {this.dayItem('Fri', 5)}
        {this.dayItem('Sat', 6)}
      </GridContainer>
    );
  };

  // eslint-disable-next-line react/no-unused-state
  onclickStep = val => () => this.setState({ activeStep: val });

  stepLabel = children => {
    const { classes } = this.props;
    return (
      <StepLabel
        StepIconProps={{
          classes: { root: classes.icon },
        }}
      >
        <div className={classes.label}>{children}</div>
      </StepLabel>
    );
  };

  stepContent = children => {
    const { classes } = this.props;
    return (
      <StepContent classes={{ root: classes.stepContent }}>
        {children}
      </StepContent>
    );
  };

  startPickDate = () => {
    this.picker.open();
  };

  dateField = () => {
    const { classes } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <GridContainer spacing={0} noWrap>
            <GridItem>
              <DatePicker
                ref={this.handlePickerRef}
                className={classes.datePicker}
                onBlur={null}
                value={this.state.selectedDate}
                onChange={this.onDateChange}
                invalidLabel=" "
                format={FORMATS_DATE_TIME.DATE}
                disablePast={false}
                fullWidth={false}
                leftArrowIcon={<Icon icon="arrow-left" />}
                rightArrowIcon={<Icon icon="arrow-right" />}
                placeholder="Pick a date"
                clearable
              />
            </GridItem>
            <GridItem>
              <Button
                dense
                noPadding
                size="extraSmall"
                color="black"
                variant={VARIANTS.BORDERLESS}
                className={classes.calendarBtn}
                onClick={this.startPickDate}
                iconButton
                icon="lnr-calendar-full"
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  getStepProps = index => ({
    key: `step-${index}`,
    expanded: true,
    active: true, // this.state.activeStep === index,
    onFocus: this.onclickStep(index),
  });

  render = () => {
    const { smDown, classes } = this.props;
    const { selectedOrganisationId, selectedDate } = this.state;
    const mobileProps = LOGIC_HELPERS.ifElse(smDown, this.portalSm, {});

    return (
      <JDialog
        open
        fullWidth
        fullScreen={false}
        onValidSubmit={this.handleValidSubmit}
        onClose={this.handleCloseDialog}
        contentClassName={classes.content}
        submitButton="Create"
        header={
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText bold xxl>
                <M {...m.ugAddTemplateModalHeader} />
              </JText>
            </GridItem>
            <GridItem>{<M {...m.ugAddTemplateModalSub} />}</GridItem>
          </GridContainer>
        }
        headerNoWrap
        headerContainerAlign="baseline"
        {...mobileProps}
      >
        <Stepper
          orientation="vertical"
          connector={
            <StepConnector
              classes={{
                line: classes.stepVerical,
              }}
            />
          }
        >
          <Step {...this.getStepProps(0)}>
            {this.stepLabel(
              'Select where you would like to store your itinerary?',
            )}
            {this.stepContent(
              <Popper
                placement="bottom-start"
                renderButton={this.renderOwnerButton}
                value={selectedOrganisationId}
              >
                {this.renderOrganisationList}
              </Popper>,
            )}
          </Step>
          <Step {...this.getStepProps(1)}>
            {this.stepLabel('What name would you like your itinerary to have?')}
            {this.stepContent(
              <TextField label={<M {...m.titleLabel} />} {...inputs.TITLE} />,
            )}
          </Step>
          <Step {...this.getStepProps(2)}>
            {this.stepLabel(
              "How many days is this going to be? Don't worry, you can\n" +
                '                    always change it later.',
            )}
            {this.stepContent(
              <TextField
                label={<M {...m.durationLabel} />}
                fullWidth={false}
                {...inputs.DURATION}
              />,
            )}
          </Step>
          <Step {...this.getStepProps(3)}>
            {this.stepLabel(
              'Do you know what date you will leave? If not, you can always add or change later.',
            )}
            {this.stepContent(this.dateField())}
          </Step>
          {!selectedDate && (
            <Step {...this.getStepProps(4)}>
              {this.stepLabel(
                'Do you have an idea of the day of the week it will start?',
              )}
              {this.stepContent(this.renderDayWeek())}
            </Step>
          )}
        </Stepper>
      </JDialog>
    );
  };
}

AddTour.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  onSuccess: PropTypes.func,
  children: PropTypes.func,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  parentNodeId: PropTypes.number,
  organisationId: PropTypes.number,
  folderId: PropTypes.number,

  // resaga props
  userId: PropTypes.number,
  myRootNodeId: PropTypes.number,
  organisations: PropTypes.array,
  orgUsers: PropTypes.object,
};

AddTour.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddTour' }),
  withRouter,
  withSMDown,
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(AddTour);
