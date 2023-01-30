import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import GridContainer from 'components/GridContainer';
import { Can } from 'apis/components/Ability/components/Can';
import { ORG_USER } from 'utils/modelConstants';
import { isNumber } from 'utils/numberAdditions';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Checkbox from 'ugcomponents/Inputs/CheckboxField';
import Form from 'ugcomponents/Form';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import styles from './styles';
import SearchField from '../SearchField';
import { withSMDown } from '../../../../../../../../../../components/material-ui/hocs/withMediaQuery';
import Hr from '../../../../../../../../../../components/Hr';

export class Header extends PureComponent {
  state = {
    searchText: '',
  };

  onSearchTextChange = ev => {
    this.setState({
      searchText: ev.target.value,
    });
  };

  onPressEnter = () => {
    // eslint-disable-next-line
    alert('Under construction');
  };

  onClickInviteUser = () => {
    // eslint-disable-next-line
    alert('Under construction');
  };

  renderShowInactive = () => (
    <Checkbox
      noMargin
      name="showInactive"
      label="Show Inactive"
      value={this.props.showInactive}
      onChange={this.props.handleChange}
      disabled={this.props.isMemberFetching}
    />
  );

  renderSearchField = () => (
    <SearchField
      value={this.state.searchText}
      onChange={this.onSearchTextChange}
      onPressEnter={this.onPressEnter}
    />
  );

  renderHeaderInput = () => {
    const { classes } = this.props;
    return (
      <GridContainer spacing={0} className={classes.inputRoot}>
        <GridItem>
          <Box pb={2}>{this.renderSearchField()}</Box>
        </GridItem>
        <GridItem>
          <Can do="create" on={ORG_USER}>
            {this.renderShowInactive()}
          </Can>
        </GridItem>
      </GridContainer>
    );
  };

  renderInvite = () => {
    const {
      seatsLeft,
      isDisabled,
      isMemberFetching,
      smDown,
      classes,
    } = this.props;
    const hidden = LOGIC_HELPERS.ifElse(
      [!isNumber(seatsLeft), seatsLeft === 0],
      true,
      false,
      true,
    );

    if (hidden || isDisabled) {
      return null;
    }
    /*    return (
      <JText
        italic
        nowrap
        link
        underline
        onClick={this.props.openInviteUser}
        type="submit"
        disabled={isMemberFetching}
      >
        Invite someone to join your organisation
      </JText>
    ); */

    return (
      <Button
        color="primary"
        type="submit"
        size="small"
        disabled={isMemberFetching}
        onClick={this.props.openInviteUser}
        className={LOGIC_HELPERS.ifElse(smDown, classes.mobileBtn)}
      >
        {'Invite someone to join your organisation'}
      </Button>
    );
  };

  renderInviteBtn = () => {
    const {
      roleMemberPendingIds,
      isMemberFetching,
      smDown,
      classes,
    } = this.props;
    return (
      <Can do="create" on={ORG_USER}>
        <GridContainer
          alignItems={LOGIC_HELPERS.ifElse(smDown, 'flex-start', 'center')}
          noWrap
          direction={LOGIC_HELPERS.ifElse(smDown, 'column')}
        >
          <GridItem>{this.renderInvite()}</GridItem>
          <GridItem className={LOGIC_HELPERS.ifElse(smDown, classes.mobileBtn)}>
            {/* <JText
              italic
              nowrap
              link
              underline
              disabled={isMemberFetching}
              onClick={this.props.openPendingInvite}
              type="submit"
            >
              {`${roleMemberPendingIds.length} Pending Invitation`}
            </JText> */}
            <Button
              variant="outline"
              type="submit"
              size="small"
              disabled={isMemberFetching}
              onClick={this.props.openPendingInvite}
              className={classNames(
                LOGIC_HELPERS.ifElse(smDown, classes.mobileBtn),
                classes.background,
              )}
            >
              {`${roleMemberPendingIds.length} Pending Invitation`}{' '}
            </Button>
          </GridItem>
          <GridItem>
            <GridContainer noWrap className={classes.noWrap}>
              {this.props.renderSeatsLeft()}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Can>
    );
  };

  render = () => {
    const { classes } = this.props;
    return (
      <Form>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer spacing={0} className={classes.container}>
              <GridItem md={12}>{this.renderInviteBtn()}</GridItem>
            </GridContainer>
          </GridItem>
          <Can do="create" on={ORG_USER}>
            <GridItem>
              <Hr half />
            </GridItem>
          </Can>
          <GridItem md={12}>{this.renderHeaderInput()}</GridItem>
        </GridContainer>
      </Form>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  // Parent
  roleMemberPendingIds: PropTypes.array,
  openPendingInvite: PropTypes.func,
  openInviteUser: PropTypes.func,
  handleChange: PropTypes.func,
  isMemberFetching: PropTypes.bool,
  isDisabled: PropTypes.bool,
  renderSeatsLeft: PropTypes.func,
  seatsLeft: PropTypes.number,
  // resaga
  showInactive: PropTypes.bool,
};

Header.defaultProps = {
  roleMemberPendingIds: [],
  showInactive: false,
  isMemberFetching: false,
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  withSMDown,
)(Header);
