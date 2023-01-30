import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import withResaga from 'resaga';
import { scroller } from 'react-scroll';
import Scrollspy from 'react-scrollspy';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import Icon from 'ugcomponents/Icon';
import { scrollOptions } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import JButton from 'viewComponents/Button/variants/JButton';
import styles from './styles';

export class FloatingDayNavigation extends PureComponent {
  state = {
    items: [],
  };

  componentDidMount = () => {
    this.updateItems();
  };

  componentDidUpdate = prevProps => {
    const { dayIds } = this.props;

    if (dayIds !== prevProps.dayIds) {
      this.updateItems();
    }
  };

  updateItems = () => {
    const { dayIds } = this.props;

    if (!dayIds.length) return null;

    return this.setState({
      items: dayIds.map(id => `day${id}`),
    });
  };

  handleStateChange = status => {
    if (typeof status === 'object') {
      this.setState({ sticky: status.status === Sticky.STATUS_FIXED });
    }
  };

  scrollToDay = id => () => {
    this.props.resaga.setValue({ selectedId: id });
    if (this.props.layout === 'day') {
      return scroller.scrollTo('scrollToTop');
    }
    return scroller.scrollTo(`scroller-node-${id}`, scrollOptions);
  };

  renderMenu = ({ closeMenu, dayIds, activeId }) => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column" onClick={closeMenu}>
        <GridItem>
          <GridContainer direction="column" alignItems="center">
            <GridItem>
              <JText bold dark>
                Go to..
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>

        <Hr half />

        <GridItem>
          <GridContainer
            direction="column"
            spacing={0}
            className={classes.menu}
          >
            {dayIds.map(id => (
              <GridItem key={id}>
                <JButton
                  onClick={this.scrollToDay(id)}
                  bg={LOGIC_HELPERS.ifElse(id === activeId, 'gray')}
                  block
                >
                  <DayDate id={id} showDayIndex />
                </JButton>
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderButton = ({ openMenu, activeId }) => {
    const { classes } = this.props;

    return (
      <JButton className={classes.raisedButton} onClick={openMenu}>
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>
            <JText dark>
              <DayDate id={activeId} showDayIndex />
            </JText>
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" />
          </GridItem>
        </GridContainer>
      </JButton>
    );
  };

  handleScroll = item => {
    if (!item) return null;

    const nodeId = Number.parseInt(item.id.replace('day', ''), 10);

    if (nodeId) {
      this.setState({ activeId: nodeId });
    }

    return true;
  };

  render = () => {
    const { classes, dayIds } = this.props;
    const { items, sticky, activeId } = this.state;

    if (!items.length) return null;

    return (
      <>
        <Scrollspy items={items} onUpdate={this.handleScroll} offset={-94} />
        <Sticky
          innerZ={1000}
          top={106}
          bottomBoundary="#LayoutContent"
          onStateChange={this.handleStateChange}
        >
          {sticky && activeId ? (
            <div className={classes.sticky}>
              <GridContainer direction="column" alignItems="center">
                <GridItem>
                  <Popper
                    noPadding
                    className={classes.popper}
                    renderButton={this.renderButton}
                    activeId={activeId}
                    dayIds={dayIds}
                  >
                    {this.renderMenu}
                  </Popper>
                </GridItem>
              </GridContainer>
            </div>
          ) : (
            <div />
          )}
        </Sticky>
      </>
    );
  };
}

// <li>
//   <HashLink to="#day26376">day26376</HashLink>
// </li>
// <li>
//   <HashLink to="#day26380">day26380</HashLink>
// </li>
// <li>
//   <HashLink to="#day26382">day26382</HashLink>
// </li>

FloatingDayNavigation.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  dayIds: PropTypes.array,

  // resaga props
  layout: PropTypes.string,
};

FloatingDayNavigation.defaultProps = {
  dayIds: [],
};

export default compose(
  withStyles(styles, { name: 'FloatingDayNavigation' }),
  withDayIds,
  withResaga({
    value: {
      layout: RESAGA_HELPERS.mapToId(
        NODE_STORE_SELECTORS.calculatedLayout,
        'templateId',
      ),
    },
    setValue: {
      selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    },
  }),
)(FloatingDayNavigation);
