import { GET_RECENT_ACTIVITY, USER_API } from 'apis/constants';
import { COMPRESSED } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import Node from 'smartComponents/Node';
import NewTour from 'smartComponents/Node/components/NewTour';
import withRecent from 'smartComponents/Node/hoc/withRecent';
import withStars from 'smartComponents/Node/hoc/withStars';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export class QuickAccessTours extends PureComponent {
  componentDidMount = () => {
    this.fetchRecentTours();
  };

  fetchRecentTours = () =>
    this.props.resaga.dispatchTo(USER_API, GET_RECENT_ACTIVITY, {});

  renderTour = (closeMenu, recent) => id => (
    <Node
      recent={recent}
      id={id}
      key={id}
      variant={COMPRESSED}
      closeMenu={closeMenu}
      showOrganisation
    />
  );

  handleSeeAll = closeMenu => e => {
    const { openDrawer } = this.props;

    LOGIC_HELPERS.ifFunction(closeMenu, [e]);
    LOGIC_HELPERS.ifFunction(openDrawer);
  };

  renderMenu = ({ closeMenu, stars, recent }) => {
    const { classes, smDown } = this.props;

    return (
      <GridContainer
        direction="column"
        spacing={0}
        className={classnames(
          LOGIC_HELPERS.ifElse(smDown, classes.popperXs, classes.popper),
        )}
      >
        <GridItem>
          <GridContainer direction="column" spacing={2}>
            {!stars.length && !recent.length && (
              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <JText dark nowrap={false}>
                      Nothing to see yet.
                    </JText>
                  </GridItem>
                  <GridItem>
                    <JText gray nowrap={false}>
                      Tours that you starred or recently viewed will appear
                      here.
                    </JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
            )}

            {stars.length > 0 && (
              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <GridContainer alignItems="center" wrap="nowrap">
                      <GridItem>
                        <Icon color="star" size="normal" bold icon="lnr-star" />
                      </GridItem>
                      <GridItem>
                        <JText gray>STARRED</JText>
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  {stars.map(this.renderTour(closeMenu))}
                </GridContainer>
              </GridItem>
            )}

            {recent.length > 0 && (
              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <GridContainer alignItems="center" wrap="nowrap">
                      <GridItem>
                        <Icon
                          color="success"
                          size="normal"
                          bold
                          icon="lnr-eye"
                        />
                      </GridItem>
                      <GridItem>
                        <JText gray>RECENTLY VIEWED</JText>
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  {recent.map(this.renderTour(closeMenu, true))}
                </GridContainer>
              </GridItem>
            )}

            <Hr quarter />

            <GridItem>
              <GridContainer alignItems="center" justify="space-between">
                <GridItem>
                  <NewTour onClick={closeMenu} />
                </GridItem>
                <GridItem>
                  <JButton
                    onClick={this.handleSeeAll(closeMenu)}
                    noBorderRadius
                  >
                    <JText blue>See all</JText>
                  </JButton>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderButton = ({ openMenu }) => {
    const { classes, smDown } = this.props;
    return (
      <JButton onClick={openMenu} className={smDown && classes.smBtn}>
        <GridContainer alignItems="center" noWrap spacing={0}>
          <GridItem>
            <Icon icon="lnr-menu" bold size="normal" paddingRight />
          </GridItem>
          <GridItem>
            <JText>Recent</JText>
          </GridItem>
        </GridContainer>
      </JButton>
    );
  };

  render = () => {
    const { stars, recent, smDown } = this.props;

    return (
      <Popper
        renderButton={this.renderButton}
        halfPadding
        placement="bottom-start"
        stars={stars}
        recent={recent}
        smDown={smDown}
      >
        {this.renderMenu}
      </Popper>
    );
  };
}

QuickAccessTours.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  stars: PropTypes.array,
  recent: PropTypes.array,
  smDown: PropTypes.bool,

  // parent props
  openDrawer: PropTypes.func,

  // resaga props
};

QuickAccessTours.defaultProps = {
  recent: [],
  stars: [],
};

export default compose(
  withStyles(styles, { name: 'QuickAccessTours' }),
  withStars,
  withRecent,
  withSMDown,
  resaga(CONFIG),
)(QuickAccessTours);
