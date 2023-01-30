import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import {
  BATCH_DELETE_CHILDREN,
  GET_PUB_TEMPLATE_TAB,
  GET_TEMPLATE_TAB_DETAIL,
  NODE_API,
  PUB_API,
  TEMPLATE_TAB_API,
} from 'apis/constants';
import {
  CONTENT,
  CREATED_AT,
  CREATED_BY,
  DEFAULT,
  DO_NOTHING,
  GRID_VIEW,
  LEAST_RECENTLY_UPLOADED,
  LIST_VIEW,
  MOST_LIKED,
  NONE,
  PHOTO_CARD,
  PREVIEW,
  RECENTLY_UPLOADED,
  SELECT,
  THE_LONG_DASH,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { DATA_HELPERS } from 'datastore/utils';
import difference from 'lodash/difference';
import intersection from 'lodash/intersection';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { scroller } from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import UploadPhotos from 'smartComponents/Node/components/UploadPhotos';
import GroupBy from 'smartComponents/Node/logics/GroupBy';
import SortByLikes from 'smartComponents/Node/logics/SortByLikes';
import Description from 'smartComponents/Node/parts/Description';
import Activity from 'smartComponents/Node/types/Activity';
import TabAccess from 'smartComponents/Node/types/TabOther/components/TabAccess';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import { COLOR_CONSTANTS } from 'theme/colorConstants';
import Icon from 'ugcomponents/Icon';
import { scrollOptions } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { ACTIVITY, PHOTO, TAB_GALLERY } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Badge from 'viewComponents/Badge';
import Button from 'viewComponents/Button';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import Select from 'viewComponents/Inputs/SelectField';
import InitialSection from './components/InitialSection';
import { CONFIG } from './config';
import styles from './styles';

export class Tab extends PureComponent {
  state = {
    confirmDeleteDialogId: 0,
    photoPreviewDialogId: 0,
    groupBy: NONE,
    sortBy: RECENTLY_UPLOADED,
    layout: GRID_VIEW,
    clickMode: PREVIEW,
    selectedIds: [],
    showingIds: [],
    page: 0,
    itemsPerPage: 12,
  };

  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.ROUND,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  componentDidMount = () => {
    this.fetchTab();
  };

  paginate = children => {
    const { page, itemsPerPage } = this.state;

    return children.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  };

  fetchTab = () => {
    const { id, templateId, isPublic, hashkey } = this.props;
    if (!isPublic) {
      this.props.resaga.dispatchTo(TEMPLATE_TAB_API, GET_TEMPLATE_TAB_DETAIL, {
        payload: {
          tab: { id, type: TAB_GALLERY },
          templateId,
        },
      });
    } else {
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_TAB, {
        payload: {
          id,
          hashkey,
        },
      });
    }
  };

  selectAll = () => {
    const { children } = this.props;
    const { showingIds } = this.state;

    this.setState({
      selectedIds: intersection(showingIds, children),
    });
  };

  deselectAll = () => {
    this.setState({
      selectedIds: [],
    });
  };

  toggleMode = () => {
    const { clickMode } = this.state;

    this.setState({
      clickMode: LOGIC_HELPERS.ifElse(clickMode === SELECT, PREVIEW, SELECT),
      selectedIds: [],
    });
  };

  handleClickPhoto = id => () => {
    const { clickMode } = this.state;

    if (clickMode === SELECT) {
      this.setState(({ selectedIds }) => {
        if (selectedIds.indexOf(id) !== -1) {
          return {
            selectedIds: DATA_HELPERS.arrayRemove(id)(selectedIds),
          };
        }

        return {
          selectedIds: DATA_HELPERS.arrayAdd(id)(selectedIds),
        };
      });
    }
  };

  batchDelete = items => () => {
    const { id } = this.props;

    if (items.length) {
      return this.props.resaga.dispatchTo(NODE_API, BATCH_DELETE_CHILDREN, {
        payload: {
          items,
          keyPath: `${id}.children`,
        },
        onSuccess: this.batchDeleteDone,
        onError: this.batchDeleteDone,
      });
    }

    return DO_NOTHING;
  };

  confirmDelete = (onConfirm, count = 1) => {
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDeletePhoto(
      {
        onConfirm,
        count,
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  handleBatchDelete = () => {
    const { selectedIds } = this.state;

    this.confirmDelete(this.batchDelete(selectedIds), selectedIds.length);
  };

  handleDelete = id => () => {
    this.confirmDelete(this.batchDelete([id]));
  };

  batchDeleteDone = () => {
    const {
      showingIds,
      selectedIds,
      confirmDeleteDialogId,
      photoPreviewDialogId,
    } = this.state;

    this.setState({
      clickMode: PREVIEW,
      showingIds: difference(showingIds, selectedIds),
      selectedIds: [],
    });
    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);
    PORTAL_HELPERS.closePortal(photoPreviewDialogId, this.props);
  };

  openPreview = previewId => () => {
    const { id, editable, isPublic } = this.props;
    const { sortBy, clickMode } = this.state;

    if (editable && clickMode === SELECT) {
      return null;
    }

    const photoPreviewDialogId = PORTAL_HELPERS.openPhotoPreview(
      {
        id,
        previewId,
        sortBy,
        isPublic,
      },
      this.props,
    );

    return this.setState({ photoPreviewDialogId });
  };

  changeSortBy = sortBy => () => this.setState({ sortBy });

  changeGroupBy = groupBy => () => this.setState({ groupBy });

  changeLayout = layout => () => this.setState({ layout });

  canCreatePhoto = () =>
    ability.can('create', ACTIVITY) || ability.can('create', PHOTO);

  renderPhotoDetail = id => {
    const { editable } = this.props;
    const { clickMode } = this.state;

    return (
      <Description
        id={id}
        advancedMode={false}
        editable={clickMode !== SELECT && editable}
      />
    );
  };

  renderDescription = ({ content }) => <GridItem>{content}</GridItem>;

  renderPhotoComponent = id => ({ canUpdate, content }) => {
    const { editable } = this.props;
    const { clickMode, layout } = this.state;

    if (editable && !canUpdate) {
      this.setState(({ showingIds }) => ({
        showingIds: DATA_HELPERS.arrayRemove(id)(showingIds),
      }));
      return null;
    }

    const grid = LOGIC_HELPERS.ifElse(
      layout === GRID_VIEW,
      { xs: 12, sm: 6, md: 4, lg: 3 },
      {},
    );

    this.setState(({ showingIds }) => ({
      showingIds: DATA_HELPERS.arrayAdd(id)(showingIds),
    }));

    return (
      <GridItem
        {...grid}
        onClick={LOGIC_HELPERS.ifElse(
          [clickMode === SELECT, canUpdate],
          this.handleClickPhoto(id),
        )}
      >
        {content}
      </GridItem>
    );
  };

  renderPhoto = id => {
    const { groupBy, clickMode, selectedIds, layout } = this.state;
    const { isPublic } = this.props;

    return (
      <Activity
        id={id}
        key={id}
        variant={PHOTO_CARD}
        layout={layout}
        selected={selectedIds.indexOf(id) !== -1}
        clickMode={clickMode}
        groupBy={groupBy}
        onClick={this.openPreview}
        onDelete={this.handleDelete}
        isPublic={isPublic}
      >
        {this.renderPhotoComponent(id)}
      </Activity>
    );
  };

  renderEmpty = () => {
    const { id } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer direction="row" alignItems="center">
            {this.renderTitle()}
          </GridContainer>
        </GridItem>
        <GridItem>
          <InitialSection id={id} />
        </GridItem>
      </GridContainer>
    );
  };

  renderSortButton = ({ openMenu }) => {
    const { sortBy } = this.state;
    const { classes } = this.props;

    return (
      <Button color="inline" size="xs" onClick={openMenu}>
        <GridContainer
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={0}
          wrap="nowrap"
          className={classes.noWrap}
        >
          <Hidden smDown>
            <GridItem>Sort by:&nbsp;</GridItem>
          </Hidden>
          <GridItem>
            {LOGIC_HELPERS.switchCase(sortBy, {
              [LEAST_RECENTLY_UPLOADED]: 'Oldest',
              [MOST_LIKED]: 'Most Liked',
              [DEFAULT]: 'Newest',
            })}
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderSortMenu = ({ closeMenu }) => {
    const { isPublic } = this.props;
    const { sortBy } = this.state;

    return (
      <GridContainer direction="column">
        <GridItem>
          <MenuItem
            onClick={this.changeSortBy(RECENTLY_UPLOADED)}
            selected={sortBy === RECENTLY_UPLOADED}
            closeMenu={closeMenu}
          >
            See newest first
          </MenuItem>
          <MenuItem
            onClick={this.changeSortBy(LEAST_RECENTLY_UPLOADED)}
            selected={sortBy === LEAST_RECENTLY_UPLOADED}
            closeMenu={closeMenu}
          >
            See oldest first
          </MenuItem>
          {!isPublic && (
            <MenuItem
              onClick={this.changeSortBy(MOST_LIKED)}
              selected={sortBy === MOST_LIKED}
              closeMenu={closeMenu}
            >
              See most liked first
            </MenuItem>
          )}
        </GridItem>
      </GridContainer>
    );
  };

  renderGroupButton = ({ openMenu }) => {
    const { groupBy } = this.state;
    const { classes } = this.props;

    return (
      <Button color="inline" size="xs" onClick={openMenu}>
        <GridContainer
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={0}
          wrap="nowrap"
          className={classes.noWrap}
        >
          {groupBy === NONE ? (
            <GridItem>Group by</GridItem>
          ) : (
            <Hidden smDown>
              <GridItem>Group by:&nbsp;</GridItem>
            </Hidden>
          )}

          {groupBy !== NONE && (
            <GridItem>
              {LOGIC_HELPERS.ifElse(groupBy === CREATED_AT, 'Date', 'Author')}
            </GridItem>
          )}
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderGroupMenu = ({ closeMenu }) => {
    const { groupBy } = this.state;

    return (
      <GridContainer direction="column">
        <GridItem>
          <MenuItem
            onClick={this.changeGroupBy(CREATED_BY)}
            selected={groupBy === CREATED_BY}
            closeMenu={closeMenu}
          >
            Author
          </MenuItem>
          <MenuItem
            onClick={this.changeGroupBy(CREATED_AT)}
            selected={groupBy === CREATED_AT}
            closeMenu={closeMenu}
          >
            Uploaded Date
          </MenuItem>
          {groupBy !== NONE && (
            <MenuItem onClick={this.changeGroupBy(NONE)} closeMenu={closeMenu}>
              Ungrouped
            </MenuItem>
          )}
        </GridItem>
      </GridContainer>
    );
  };

  renderLayoutButton = ({ openMenu }) => {
    const { layout } = this.state;

    return (
      <Button color="inline" size="xs" onClick={openMenu}>
        <GridContainer alignItems="center" spacing={0}>
          <Hidden smDown>
            <GridItem>Layout:&nbsp;</GridItem>
          </Hidden>
          <GridItem>
            <Icon
              size="normal"
              icon={LOGIC_HELPERS.ifElse(
                layout === LIST_VIEW,
                'lnr-menu2',
                'lnr-icons2',
              )}
              paddingLeft
            />
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderLayoutMenu = ({ closeMenu }) => {
    const { layout } = this.state;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            icon="lnr-icons2"
            onClick={this.changeLayout(GRID_VIEW)}
            selected={layout === GRID_VIEW}
            closeMenu={closeMenu}
          >
            Grid view
          </MenuItem>
          <MenuItem
            icon="lnr-menu2"
            onClick={this.changeLayout(LIST_VIEW)}
            selected={layout === LIST_VIEW}
            closeMenu={closeMenu}
          >
            List view
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderGroupHeader = (id, index, count) => {
    const { classes } = this.props;
    const { groupBy } = this.state;

    if (groupBy === NONE) return null;

    let groupHeader;

    if (groupBy === CREATED_BY) {
      groupHeader = (
        <GridContainer alignItems="center">
          <GridItem>
            <PersonPhoto id={id} {...this.photoProps} />
          </GridItem>
          <GridItem>
            <KnownAs id={id} variant={VARIANTS.STRING_ONLY} />
          </GridItem>
          <GridItem>({count})</GridItem>
        </GridContainer>
      );
    } else {
      groupHeader = (
        <GridContainer alignItems="center">
          <GridItem>{MOMENT_HELPERS.renderCalendar(id)}</GridItem>
          <GridItem>({count})</GridItem>
        </GridContainer>
      );
    }

    return (
      <div
        className={classnames(
          classes.heading,
          LOGIC_HELPERS.ifElse(index === 0, classes.headingFirst),
        )}
      >
        {groupHeader}
      </div>
    );
  };

  canExecuteTab = () =>
    this.props.editable && ability.can('execute', TAB_GALLERY);

  getPages = () => {
    const { children } = this.props;
    const { itemsPerPage } = this.state;
    if (!children || !children.length) return 0;
    return Math.ceil(children.length / itemsPerPage);
  };

  onChangePage = (_, page) => {
    this.setState({ page: page - 1 });
    this.scrollToTop();
  };

  renderTitle = () => {
    const { id, classes } = this.props;

    return (
      <GridContainer
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
        className={classes.noWrap}
        spacing={0}
      >
        <GridItem>
          <JText dark bold md>
            <NodeProp
              id={id}
              valueKey={CONTENT}
              isCustomData={false}
              showEmpty
              required
              editable={this.canExecuteTab()}
            />
          </JText>
        </GridItem>
      </GridContainer>
    );
  };

  canShowTabAccess = () => {
    const { editable } = this.props;
    return editable && ability.can('execute', TAB_GALLERY);
  };

  renderMenus = () => {
    const { isPublic, id, classes } = this.props;
    const { sortBy, groupBy, layout } = this.state;
    return (
      <>
        <Hidden smUp>
          <GridContainer
            alignItems="center"
            direction="row"
            justify="flex-start"
            spacing={0}
            wrap="nowrap"
            className={classes.noWrap}
          >
            <GridItem>{this.renderTitle()}</GridItem>
            {this.canShowTabAccess() && (
              <GridItem>
                <TabAccess
                  id={id}
                  editable={ability.can('execute', TAB_GALLERY)}
                  component={GridItem}
                />
              </GridItem>
            )}
            <GridItem>
              <GridContainer
                direction="row"
                alignItems="center"
                wrap="nowrap"
                className={classes.noWrap}
                spacing={0}
              >
                <Hidden xsDown>
                  <GridItem>
                    <Popper
                      renderButton={this.renderLayoutButton}
                      value={layout}
                    >
                      {this.renderLayoutMenu}
                    </Popper>
                  </GridItem>
                </Hidden>

                <GridItem>
                  <Popper renderButton={this.renderSortButton} value={sortBy}>
                    {this.renderSortMenu}
                  </Popper>
                </GridItem>

                {!isPublic && (
                  <GridItem>
                    <Popper
                      renderButton={this.renderGroupButton}
                      value={groupBy}
                      noPadding
                      menuHeader="Group by"
                    >
                      {this.renderGroupMenu}
                    </Popper>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>
            {this.canCreatePhoto() && (
              <GridItem>
                <UploadPhotos full />
              </GridItem>
            )}
          </GridContainer>
        </Hidden>
        <Hidden xsDown>
          <GridContainer
            direction="row"
            alignItems="center"
            justify="space-between"
            spacing={0}
          >
            <GridItem>
              <GridContainer
                direction="row"
                alignItems="center"
                justify="flex-start"
                spacing={0}
                wrap="nowrap"
                className={classes.noWrap}
              >
                <GridItem>{this.renderTitle()}</GridItem>
                {this.canShowTabAccess() && (
                  <GridItem>
                    <TabAccess
                      id={id}
                      editable={ability.can('execute', TAB_GALLERY)}
                      component={GridItem}
                    />
                  </GridItem>
                )}
                <Hidden xsDown>
                  <GridItem>
                    <Popper
                      renderButton={this.renderLayoutButton}
                      value={layout}
                    >
                      {this.renderLayoutMenu}
                    </Popper>
                  </GridItem>
                </Hidden>

                <GridItem>
                  <Popper renderButton={this.renderSortButton} value={sortBy}>
                    {this.renderSortMenu}
                  </Popper>
                </GridItem>

                {!isPublic && (
                  <GridItem>
                    <Popper
                      renderButton={this.renderGroupButton}
                      value={groupBy}
                      noPadding
                      menuHeader="Group by"
                    >
                      {this.renderGroupMenu}
                    </Popper>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer noWrap alignItems="center">
                <GridItem>{this.pagination()}</GridItem>
                <GridItem>
                  {this.canCreatePhoto() && (
                    <GridItem>
                      <GridContainer justify="flex-end" spacing={0}>
                        <GridItem>
                          <UploadPhotos full />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  )}
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Hidden>
      </>
    );
  };

  renderHeader = () => (
    <GridContainer direction="column">
      <GridItem>{this.renderMenus()}</GridItem>
    </GridContainer>
  );

  renderGroup = (id, index, photoIds) => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column" key={id}>
        <GridItem>
          {this.renderGroupHeader(id, index, photoIds.length)}
        </GridItem>
        <GridItem className={classes.maxWidth100}>
          {this.renderPhotos(photoIds)}
        </GridItem>
      </GridContainer>
    );
  };

  renderGroups = ({ groupIds, groupData }) =>
    groupIds.map((groupdId, index) =>
      this.renderGroup(groupdId, index, groupData[groupdId]),
    );

  renderSortLikes = ({ sortedChildren }) =>
    sortedChildren.map(this.renderPhoto);

  renderPhotos = (children = this.children()) => {
    const { sortBy, layout, page, itemsPerPage } = this.state;

    if (!children.length) return null;

    const key = `${page}_${itemsPerPage}`;

    if (sortBy === MOST_LIKED) {
      return (
        <GridContainer key={key}>
          <SortByLikes ids={children}>{this.renderSortLikes}</SortByLikes>
        </GridContainer>
      );
    }

    if (layout === LIST_VIEW) {
      return (
        <GridContainer key={key} direction="column" spacing={4}>
          {children.map(this.renderPhoto)}
        </GridContainer>
      );
    }

    return (
      <GridContainer key={key}>{children.map(this.renderPhoto)}</GridContainer>
    );
  };

  renderContent = () => {
    const { groupBy, sortBy, layout } = this.state;

    if (groupBy === NONE) {
      return this.renderPhotos();
    }

    return (
      <GroupBy
        ids={this.children()}
        groupBy={groupBy}
        value={`${sortBy}.${layout}`}
      >
        {this.renderGroups}
      </GroupBy>
    );
  };

  children = () => {
    const { children } = this.props;
    const { sortBy } = this.state;

    // no point sorting 0 or 1 element
    if (children.length < 2) return children;

    let sortedChildren;

    // assumption: backend returns children order by created at ASC
    // so just need to reverse the array to do sort by created time
    if (sortBy === LEAST_RECENTLY_UPLOADED) {
      sortedChildren = children;
    } else {
      sortedChildren = children.slice().reverse();
    }

    return this.paginate(sortedChildren);
  };

  renderSelectDeselect = () => {
    const { clickMode, selectedIds, showingIds } = this.state;

    if (clickMode !== SELECT) return null;

    if (difference(showingIds, selectedIds).length === 0) {
      return (
        <GridItem>
          <Button color="normal" size="xs" onClick={this.deselectAll}>
            Deselect All
          </Button>
        </GridItem>
      );
    }

    return (
      <GridItem>
        <Button color="normal" size="xs" onClick={this.selectAll}>
          Select All
        </Button>
      </GridItem>
    );
  };

  renderSelect = () => {
    const { editable, classes, batchDeleting } = this.props;
    const { clickMode, selectedIds, showingIds } = this.state;

    if (!editable) return null;
    if (!showingIds.length) return null;

    const selected = selectedIds.length > 0;

    const selectedText = LOGIC_HELPERS.ifElse(
      selected,
      `${selectedIds.length} selected`,
      'Click to Select',
    );

    return (
      <GridItem>
        <GridContainer
          alignItems="center"
          justify="space-between"
          className={classnames(
            LOGIC_HELPERS.ifElse(clickMode === SELECT, classes.selectDiv),
          )}
        >
          <GridItem className={classes.sameWidth}>
            <GridContainer alignItems="center">
              <GridItem>
                <Button color="normal" size="xs" onClick={this.toggleMode}>
                  {LOGIC_HELPERS.ifElse(
                    clickMode === PREVIEW,
                    'Select',
                    'Cancel',
                  )}
                </Button>
              </GridItem>
              {this.renderSelectDeselect()}
            </GridContainer>
          </GridItem>
          {clickMode === SELECT && (
            <Hidden smDown>
              <GridItem className={classes.header}>{selectedText}</GridItem>
            </Hidden>
          )}
          <GridItem className={classes.sameWidth}>
            {clickMode === SELECT && (
              <GridContainer alignItems="center" justify="flex-end">
                <GridItem>
                  <Button
                    size="xs"
                    color="alert"
                    disabled={!selected}
                    onClick={this.handleBatchDelete}
                    loading={batchDeleting}
                  >
                    <GridContainer alignItems="center">
                      <GridItem>Delete</GridItem>
                      {!batchDeleting && (
                        <GridItem>
                          <Badge color={COLOR_CONSTANTS.TRANSLUCENT}>
                            <strong>{selectedIds.length}</strong>
                          </Badge>
                        </GridItem>
                      )}
                    </GridContainer>
                  </Button>
                </GridItem>
              </GridContainer>
            )}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  scrollToTop = () => {
    scroller.scrollTo('scrollToTop', scrollOptions);
  };

  renderPageItem = item => {
    const { classes } = this.props;
    return (
      <PaginationItem
        {...item}
        classes={{ root: classes.pageRoot, selected: classes.pageSelected }}
      />
    );
  };

  pagination = () => {
    const { children, classes } = this.props;
    const { page, itemsPerPage } = this.state;

    if (!children.length) return this.renderEmpty();

    // const diff = difference(children, showingIds).length;
    const showingAll = itemsPerPage > children.length;

    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        wrap="nowrap"
        noWrap
        className={classes.noWrap}
      >
        <GridItem>
          <GridContainer
            alignItems="center"
            spacing={1}
            wrap="nowrap"
            noWrap
            className={classes.noWrap}
          >
            <GridItem>
              <Select
                value={itemsPerPage}
                onChange={({ target: { value } }) =>
                  this.setState({ itemsPerPage: value, page: 0 })
                }
                options={[
                  {
                    children: '12',
                    value: 12,
                  },
                  {
                    children: '24',
                    value: 24,
                  },
                  {
                    children: '48',
                    value: 48,
                  },
                ]}
                InputProps={{
                  disableUnderline: true,
                  classes: { input: classes.selectInput },
                }}
                className={classes.wrapperClass}
              />
            </GridItem>
            <GridItem>per page</GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          {page * itemsPerPage + 1} {THE_LONG_DASH}{' '}
          {Math.min((page + 1) * itemsPerPage, children.length)} of{' '}
          {children.length}
        </GridItem>
        {!showingAll && (
          <GridItem>
            <Pagination
              count={this.getPages()}
              variant="outlined"
              shape="rounded"
              page={page + 1}
              onChange={this.onChangePage}
              defaultPage={1}
              /* classes={{
                ul: classes.pageRoot,
              }} */
              renderItem={this.renderPageItem}
              // size="large"
            />
          </GridItem>
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, children, editable } = this.props;
    const { showingIds, layout } = this.state;

    if (!children.length) return this.renderEmpty();

    const diff = difference(children, showingIds).length;
    // const showingAll = itemsPerPage > children.length;

    return (
      <GridContainer
        direction="column"
        className={classnames(layout === LIST_VIEW && classes.containerList)}
        spacing={2}
      >
        <GridItem>
          <GridContainer direction="column">
            <GridItem>{this.renderMenus()}</GridItem>
            <Hidden smUp>
              <GridItem>{this.pagination()}</GridItem>
            </Hidden>
            {this.renderSelect()}
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>{this.renderContent()}</GridItem>
            {editable && diff > 0 && (
              <GridItem className={classes.notes}>
                {LOGIC_HELPERS.ifElse(
                  diff < children.length,
                  `${diff} of ${children.length}`,
                  'All',
                )}{' '}
                {LOGIC_HELPERS.ifElse(diff > 1, 'photos are', 'photo is')}{' '}
                hidden (only showing photos that you can edit)
              </GridItem>
            )}
          </GridContainer>
        </GridItem>
        <GridItem>{this.pagination()}</GridItem>
      </GridContainer>
    );
  };
}

Tab.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number, // tab id
  templateId: PropTypes.number,
  children: PropTypes.array,
  isPublic: PropTypes.bool,
  hashkey: PropTypes.string,

  // resaga props
  previewId: PropTypes.number,
  batchDeleting: PropTypes.bool,
  editable: PropTypes.bool,
};

Tab.defaultProps = {
  children: [],
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'Tab' }),
  resaga(CONFIG),
  withSMDown,
)(Tab);
