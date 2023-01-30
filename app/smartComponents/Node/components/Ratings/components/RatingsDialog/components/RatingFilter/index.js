import { SORT_FILTERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import Icon from 'ugcomponents/Icon';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import P from 'viewComponents/Typography';

import { CONFIG } from './config';
import styles from './styles';

export class RatingFilter extends PureComponent {
  handleClick = value => () => {
    this.props.resaga.setValue({
      filter: value,
    });
  };

  componentWillUnmount() {
    this.props.resaga.setValue({
      filter: SORT_FILTERS.LATEST,
    });
  }

  renderFilterMenu = ({ closeMenu }) => {
    const { filter } = this.props;
    const options = [
      {
        value: SORT_FILTERS.LATEST,
        children: 'Latest',
      },
      {
        value: SORT_FILTERS.OLDEST,
        children: 'Oldest',
      },
      {
        value: SORT_FILTERS.HIGHEST,
        children: 'Highest Rating',
      },
      {
        value: SORT_FILTERS.LOWEST,
        children: 'Lowest Rating',
      },
    ];

    const menus = options.map(menu => (
      <GridItem key={menu.value}>
        <MenuItem
          button
          onClick={this.handleClick(menu.value)}
          closeMenu={closeMenu}
          selected={menu.value === filter}
        >
          {menu.children}
        </MenuItem>
      </GridItem>
    ));

    return (
      <GridContainer direction="column" spacing={0}>
        {menus}
      </GridContainer>
    );
  };

  renderFilterButton = ({ openMenu }) => {
    const { filter } = this.props;
    const mapper = {
      [SORT_FILTERS.LATEST]: 'Latest',
      [SORT_FILTERS.OLDEST]: 'Oldest',
      [SORT_FILTERS.HIGHEST]: 'Highest Rating',
      [SORT_FILTERS.LOWEST]: 'Lowest Rating',
    };

    return (
      <Button
        dense
        size="xs"
        variant={VARIANTS.INLINE}
        onClick={openMenu}
        color="inline"
      >
        <GridContainer alignItems="center">
          <GridItem>
            <P dense>Sort:</P>
          </GridItem>
          <GridItem>
            <GridContainer alignItems="center" spacing={0}>
              <GridItem>
                <P dense>{mapper[filter]}</P>
              </GridItem>
              <GridItem>
                <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  render = () => {
    const { filter } = this.props;

    return (
      <GridContainer>
        <GridItem>
          <Popper
            placement="bottom-start"
            renderButton={this.renderFilterButton}
            value={filter}
          >
            {this.renderFilterMenu}
          </Popper>
        </GridItem>
      </GridContainer>
    );
  };
}

RatingFilter.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  filter: PropTypes.string,
};

RatingFilter.defaultProps = {
  filter: SORT_FILTERS.LATEST,
};

export default compose(
  withStyles(styles, { name: 'RatingFilter' }),
  resaga(CONFIG),
)(RatingFilter);
