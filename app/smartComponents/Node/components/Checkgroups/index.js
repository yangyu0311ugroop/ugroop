import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node/index';
import { H3, H5 } from 'viewComponents/Typography';
import { CHECKLISTS, FOLDER, CHECKLIST } from 'utils/modelConstants';
import JText from 'components/JText';
import {
  OPTION,
  ORGANISATION_TOURS,
  MY_TOURS_NODE_CONTENT_2,
  CHECK_INPUT,
} from 'appConstants';
import AddCheckGroup from 'containers/ChecklistsRoute/components/MyChecklists/components/AddCheckGroup';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'viewComponents/Icon';
import { VARIANTS } from 'variantsConstants';
import { Can } from 'apis/components/Ability/components/Can';
import MenuItem from 'components/Popper/components/MenuItem';
import Sticky from 'react-stickynode';
import classnames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';
import Checklists from '../Checklists';

export class Checkgroups extends PureComponent {
  state = {
    showAll: true,
    isSticky: null,
  };

  componentWillMount = () => {
    this.ignore = [FOLDER];
  };

  stickyChange = status => {
    this.setState({
      isSticky: status.status === Sticky.STATUS_FIXED,
    });
  };

  handleChange = newValue => () => {
    this.setState({ showAll: newValue });
  };

  renderHeaderOption = () => {
    const { showAll } = this.state;
    const { classes, parentChecklists } = this.props;

    if (parentChecklists.length < 2) return null;

    return (
      <Sticky
        id="checklistOptionGroup"
        top={60}
        bottomBoundary="#LayoutContent"
        enabled
        innerZ={99}
        enableTransforms={false}
        onStateChange={this.stickyChange}
      >
        <GridContainer
          alignItems="center"
          spacing={0}
          className={classnames(
            classes.headerOption,
            this.state.isSticky && classes.stickyBackground,
          )}
        >
          {this.state.isSticky && (
            <GridItem className={classes.hideTopOfSticky} />
          )}
          <GridItem wrap="nowrap">
            <MenuItem
              selected={showAll}
              icon="lnr-files"
              iconClassName={classes.menuIcon}
              onClick={this.handleChange(true)}
            >
              <span className={classes.noTextWrap}>Show All</span>
            </MenuItem>
          </GridItem>
          <GridItem wrap="nowrap">
            <MenuItem
              selected={!showAll}
              icon="lnr-file-check"
              iconClassName={classes.menuIcon}
              onClick={this.handleChange(false)}
            >
              <span className={classes.noTextWrap}>Single View</span>
            </MenuItem>
          </GridItem>
        </GridContainer>
      </Sticky>
    );
  };

  // render checklists inside a checkgroup
  renderBody = ({ variant, id, index, content = [] }) => {
    const {
      classes,
      nodeContent,
      onChange,
      showIconAsContent,
      iconToggle,
    } = this.props;
    return (
      <Checklists
        className={classes.checklists}
        variant={variant}
        index={index}
        content={content}
        parentNodeId={id}
        showChecklists
        showCheckitems={false}
        editing
        onChange={onChange}
        renderBlankSlate={
          nodeContent === ORGANISATION_TOURS ||
          nodeContent === MY_TOURS_NODE_CONTENT_2
        }
        showIconAsContent={showIconAsContent}
        iconToggle={iconToggle}
      />
    );
  };

  renderBlankslate = () => {
    const { classes, parentNodeId, variant } = this.props;
    if ([OPTION, VARIANTS.LIST_ONLY].includes(variant)) return '';
    if (CHECK_INPUT === variant) {
      return (
        <div className>
          <GridContainer direction="column" alignItems="center" spacing={1}>
            <GridItem className={classes.iconContainer}>
              <GridItem>
                <Icon icon="ug-post-it-blank-1" size="xl" color="gray" />
              </GridItem>
            </GridItem>
          </GridContainer>
          <JText lg italic gray className={classes.noChecklist}>
            There are no Checklist to copy yet
          </JText>
        </div>
      );
    }

    return (
      <div className={classes.blankslate}>
        <GridContainer direction="column" alignItems="center" spacing={1}>
          <GridItem className={classes.iconContainer}>
            <GridItem>
              <Icon icon="ug-post-it-blank-1" size="xl" color="gray" />
            </GridItem>
          </GridItem>
        </GridContainer>

        <H3 className={classes.heading}>There are no Checklist Groups here</H3>
        <Can do="create" on={{ type: CHECKLIST }}>
          <React.Fragment>
            <H5 className={classes.subheading}>Add a new Checklist Group</H5>
            <AddCheckGroup
              parentNodeId={parentNodeId}
              className={classes.add}
            />
          </React.Fragment>
        </Can>
      </div>
    );
  };

  // render checkgroups
  renderContent = () => {
    const {
      variant,
      parentChecklists,
      parentNodeId,
      onChange,
      showIconAsContent,
      selectedId,
      showOption,
    } = this.props;

    const { showAll } = this.state;

    if (!parentChecklists.length) {
      return this.renderBlankslate();
    }
    const currentSelected = LOGIC_HELPERS.ifElse(
      parentChecklists.includes(selectedId),
      selectedId,
      !showAll ? parentChecklists[0] : null,
    );
    const filteredIds =
      showAll || !currentSelected
        ? parentChecklists
        : parentChecklists.filter(id => id === currentSelected);

    const content = filteredIds.map((id, index) => (
      <Node
        key={id}
        variant={variant}
        id={id}
        parentNodeId={parentNodeId}
        index={index}
        renderBody={this.renderBody}
        ignore={this.ignore}
        childKey={CHECKLISTS}
        onChange={onChange}
        showIconAsContent={showIconAsContent}
      />
    ));

    return (
      <React.Fragment>
        {showOption && this.renderHeaderOption()}
        {content}
      </React.Fragment>
    );
  };

  render = () => this.renderContent();
}

Checkgroups.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  nodeContent: PropTypes.string,
  parentNodeId: PropTypes.number,
  parentChecklists: PropTypes.array,
  onChange: PropTypes.func,
  showIconAsContent: PropTypes.bool,
  iconToggle: PropTypes.func,
  selectedId: PropTypes.number,
  showOption: PropTypes.bool,

  // resaga props
};

Checkgroups.defaultProps = {
  variant: '',
  parentNodeId: 0,
  parentChecklists: [],
};

export default compose(
  withStyles(styles, { name: 'Checkgroups' }),
  resaga(CONFIG),
)(Checkgroups);
