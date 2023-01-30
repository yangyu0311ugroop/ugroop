import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import { Can } from 'apis/components/Ability/components/Can';
import { FOLDER } from 'utils/modelConstants';
import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import { isEmptyString } from 'utils/stringAdditions';
import GroupButton from 'ugcomponents/Buttons/GroupButton/index';
import AddTemplateModal from 'containers/Templates/Modals/AddTemplateModal/index';
import TextField from 'viewComponents/Inputs/TextField';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import {
  BTN_ITEMS_TOUR_INDEX,
  DEFAULT_VIEW_TOUR_INDEX,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
} from 'containers/Templates/constants';
import { debounce } from 'lodash';
import ButtonActions from 'containers/Templates/Components/ButtonActions/index';
import { getQueryParamForRoute } from 'containers/Templates/utils/query';
import Button from 'viewComponents/Button';
import classnames from 'classnames';
import Form from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import { InputAdornment } from '@material-ui/core';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField';
import NewTour from 'smartComponents/Node/components/NewTour';
import Box from '@material-ui/core/Box';
import JText from 'components/JText';
import Select from 'viewComponents/Inputs/SelectField';
import {
  DURATION_ASC,
  DURATION_DESC,
  LEAST_RECENTLY_UPDATED,
  NAME_ASC,
  NAME_DESC,
  NEWEST,
  OLDEST,
  RECENTLY_UPDATED,
  START_DATE_ASC,
  START_DATE_DESC,
} from 'appConstants';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export function PageActions(props) {
  /* eslint-disable no-param-reassign,no-return-assign, react/no-unused-prop-types */

  useEffect(() => {
    const params = parseQueryParam(props.location.search);
    onInitViewRedux(params);
  }, []);

  useEffect(() => {
    const { location } = props;
    const nextPropSearch = location.search;
    const nextLocationParsed = parseQueryParam(nextPropSearch);
    if (nextLocationParsed.view) {
      onInitViewRedux(nextLocationParsed);
    }
  }, [props.location]);

  let debouncedChangeSearch = null;

  const getSortByOptions = () => {
    const { isSharedTours } = props;
    const newSortOptions = !isSharedTours
      ? [
          {
            value: DURATION_ASC,
            children: props.intl.formatMessage(m.durationShortest),
          },
          {
            value: DURATION_DESC,
            children: props.intl.formatMessage(m.durationLongest),
          },
          {
            value: START_DATE_ASC,
            children: props.intl.formatMessage(m.startDateEarliest),
          },
          {
            value: START_DATE_DESC,
            children: props.intl.formatMessage(m.startDateLatest),
          },
        ]
      : [];
    const sortOptions = [
      {
        value: NEWEST,
        children: props.intl.formatMessage(m.newest),
      },
      {
        value: OLDEST,
        children: props.intl.formatMessage(m.oldest),
      },
      {
        value: NAME_ASC,
        children: props.intl.formatMessage(m.nameAsc),
      },
      {
        value: NAME_DESC,
        children: props.intl.formatMessage(m.nameDesc),
      },
      {
        value: RECENTLY_UPDATED,
        children: props.intl.formatMessage(m.recentUpdate),
      },
      {
        value: LEAST_RECENTLY_UPDATED,
        children: props.intl.formatMessage(m.leastRecentUpdate),
      },
      ...newSortOptions,
    ];

    return sortOptions;
  };

  const handleSearch = value => {
    if (!debouncedChangeSearch) {
      debouncedChangeSearch = debounce(changeSearch, 300);
    }
    // will debounce
    debouncedChangeSearch(value);
  };

  const changeSearch = search => {
    props.resaga.setValue({ search });
  };

  const clearSearch = () => {
    props.resaga.setValue({ search: '' });
  };

  const onInitViewRedux = queryParams => {
    const { layout, location, history } = props;
    const pathname = location.pathname;
    const copyQueryParam = queryParams;

    if (queryParams.view && isEmptyString(layout)) {
      props.resaga.setValue({
        layout: queryParams.view,
      });
    } else if (!queryParams.view && !isEmptyString(layout)) {
      copyQueryParam.view = layout;
      const stringifiedParam = stringifyParam(copyQueryParam);
      history.replace(`${pathname}?${stringifiedParam}`);
    } else if (queryParams.view && !isEmptyString(layout)) {
      props.resaga.setValue({
        layout: queryParams.view,
      });
    } else {
      props.resaga.setValue({
        layout: DEFAULT_VIEW_TOUR_INDEX,
      });
    }
  };

  const onLayoutChange = val => {
    const { location } = props;
    const qsParsed = parseQueryParam(location.search);
    qsParsed.view = val;
    const stringifiedParam = stringifyParam(qsParsed);

    props.history.replace(`${location.pathname}?${stringifiedParam}`);
  };

  const renderLayoutButtons = viewSelected => (
    <GroupButton
      btnItems={BTN_ITEMS_TOUR_INDEX}
      initSelected={viewSelected}
      onClick={onLayoutChange}
      iconProps={{ size: 'small' }}
      // buttonClassname={this.props.classes.groupButton}
    />
  );

  // renderNewTourButton = () => <NewTour />;

  const renderAddButtons = () => buttonActions => (
    <GridContainer alignItems="center" justify="flex-end">
      <Can do="create" on={FOLDER}>
        <GridItem>
          <Button
            size="extraSmall"
            color="primary"
            variant="outline"
            dense
            weight="bold"
            onClick={buttonActions.onAddFolderBtnClicked}
          >
            <GridContainer
              direction="row"
              alignItems="center"
              spacing={1}
              wrap="nowrap"
            >
              <GridItem>
                <Icon size="xsmall" icon="lnr-plus" bold />
              </GridItem>
              <GridItem className={props.classes.noTextWrap}>
                <M {...m.btnFolder} />
              </GridItem>
            </GridContainer>
          </Button>
        </GridItem>
      </Can>
    </GridContainer>
  );

  const renderModal = prop => buttonActions => {
    const { folderId, isAddTemplateModalOpen } = prop;
    return (
      <AddTemplateModal
        parentNodeId={folderId}
        active={isAddTemplateModalOpen}
        closeModal={buttonActions.onCloseAddTemplateModal}
        templateQueryParam={getQueryParamForRoute(prop.currentRoute)}
      />
    );
  };

  const renderAddButtonContainer = () => {
    const { folderId, parentNodeId } = props;
    const id = parentNodeId ? folderId : null;

    return <ButtonActions>{renderAddButtons(id)}</ButtonActions>;
  };

  const renderModalContainer = () => (
    <ButtonActions>{renderModal(props)}</ButtonActions>
  );

  const renderSortButton = () => {
    const { sortFieldValue, sortOrderValue, classes } = props;
    return (
      <Select
        value={`${sortFieldValue}.${sortOrderValue}`}
        onChange={onChangeSorting}
        options={getSortByOptions()}
        InputProps={{
          disableUnderline: true,
          classes: { input: classes.selectInput },
        }}
        component={TextField}
        className={classnames(classes.wrapperClass, classes.selectCustom)}
        data-testid="search-input"
      />
    );
  };

  const renderSearch = () => {
    const { search, classes } = props;
    return (
      <Form>
        <ValidationTextField
          name="searchFolders"
          value={search}
          InputProps={{
            disableUnderline: true,
            classes: { input: classes.input },
          }}
          onChange={handleSearch}
          placeholder="Search by name..."
          startAdornment={
            <InputAdornment className={classes.adornment} position="start">
              <Icon icon="magnifier" size="small" />
            </InputAdornment>
          }
          endAdornment={
            search && (
              <InputAdornment className={classes.adornment} position="end">
                <Button
                  dense
                  noPadding
                  size="extraSmall"
                  onClick={clearSearch}
                  className={classnames(classes.navButton)}
                >
                  <Icon icon="lnr-cross" size="small" />
                </Button>
              </InputAdornment>
            )
          }
          wrapperClassName={classes.wrapperClass}
        />
      </Form>
    );
  };

  const onChangeSorting = ev => {
    const sortValue = ev.target.value.split('.');
    props.onSortChange(sortValue[1], sortValue[0]);
  };

  // eslint-disable-next-line react/prop-types
  const renderNewTourButton = ({ onClick }) => (
    <GridItem>
      <Button
        tooltipProps={{
          title: 'Add a new tour, trip or journey',
        }}
        size="extraSmall"
        color="primary"
        variant="outline"
        dense
        weight="bold"
        onClick={onClick}
      >
        <GridContainer
          direction="row"
          alignItems="center"
          spacing={1}
          wrap="nowrap"
        >
          <GridItem>
            <Icon size="xsmall" icon="lnr-plus" bold />
          </GridItem>
          <GridItem>Add a new tour, trip or journey</GridItem>
        </GridContainer>
      </Button>
    </GridItem>
  );

  const renderNewTour = () => {
    const { organisationId, userId } = props;

    return (
      <NewTour organisationId={organisationId} userId={userId}>
        {renderNewTourButton}
      </NewTour>
    );
  };

  const headerButtons = () => {
    const { classes, location, smDown } = props;
    const parsedSearch = parseQueryParam(location.search);

    const viewSelected = parsedSearch.view
      ? parsedSearch.view
      : DEFAULT_VIEW_TOUR_INDEX;

    return (
      <GridContainer justify="space-between">
        <GridItem className={smDown && classes.grow}>
          <Box pr={LOGIC_HELPERS.ifElse(!smDown, 2, 0)}>
            <GridContainer
              alignItems="center"
              justify={LOGIC_HELPERS.ifElse(smDown, 'space-between', 'inherit')}
              noWrap
            >
              <GridItem>{renderLayoutButtons(viewSelected)}</GridItem>
              <GridItem>
                <GridContainer alignItems="center" noWrap>
                  <GridItem>
                    <JText bold nowrap>
                      Sort
                    </JText>
                  </GridItem>
                  <GridItem>{renderSortButton()}</GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </Box>
        </GridItem>
        <GridItem xs={12} md={6}>
          {renderSearch()}
        </GridItem>
        {viewSelected === BTN_ITEMS_TOUR_INDEX[1].value && (
          <GridItem>
            <GridContainer>
              <GridItem>{renderAddButtonContainer()}</GridItem>
              <GridItem>{renderNewTour()}</GridItem>
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };
  const { classes, folderChildren } = props;
  let buttons = (
    <React.Fragment>
      <GridItem xs>{headerButtons()}</GridItem>
    </React.Fragment>
  );
  if (Array.isArray(folderChildren) && folderChildren.length < 1) {
    buttons = null;
  }

  return (
    <GridContainer className={classes.root} spacing={2} alignItems="center">
      {buttons}
      {renderModalContainer()}
    </GridContainer>
  );
}

PageActions.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  smDown: PropTypes.bool,

  // parent props
  folderId: PropTypes.number.isRequired,
  currentRoute: PropTypes.string,
  isSharedTours: PropTypes.bool,
  onSortChange: PropTypes.func,
  organisationId: PropTypes.number,

  // resaga props
  folderChildren: PropTypes.array,
  search: PropTypes.string,
  isAddTemplateModalOpen: PropTypes.bool,
  layout: PropTypes.string,
  parentNodeId: PropTypes.number,
  sortFieldValue: PropTypes.string,
  sortOrderValue: PropTypes.string,
  userId: PropTypes.number,
};

PageActions.defaultProps = {
  currentRoute: '',
  isAddTemplateModalOpen: false,
  folderChildren: [],
  layout: DEFAULT_VIEW_TOUR_INDEX,
  sortOrderValue: DEFAULT_SORT_ORDER,
  sortFieldValue: DEFAULT_SORT_FIELD,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'PageActions' }),
  withSMDown,
  injectIntl,
  resaga(CONFIG),
)(React.memo(PageActions));
