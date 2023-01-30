import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useParticipantSortState } from '../../../../../../../../../../../../../hooks/useParticipantSortState';
import Popper from '../../../../../../../../../../../../../components/Popper';
import GridItem from '../../../../../../../../../../../../../components/GridItem';
import Button from '../../../../../../../../../../../../../viewComponents/Button';
import { VARIANTS } from '../../../../../../../../../../../../../variantsConstants';
import Icon from '../../../../../../../../../../../../../ugcomponents/Icon';
import GridContainer from '../../../../../../../../../../../../../components/GridContainer';
import MenuItem from '../../../../../../../../../../../../../components/Popper/components/MenuItem';
import JText from '../../../../../../../../../../../../../components/JText';
const useStyles = makeStyles({
  root: {
    height: 35,
  },
});

function ParticipantSortButton(props) {
  const { changeSort, disableFullScreen, showSortLabel } = props;
  const classes = useStyles();
  const menuIcon = (text, selected) => {
    if (selected) {
      return (
        <GridContainer direction="row" noWrap>
          <GridItem xs={2}>
            <Icon paddingRight icon="lnr-check" size="small" />
          </GridItem>
          <GridItem xs={10}>
            <JText paddingRight>{text}</JText>
          </GridItem>
        </GridContainer>
      );
    }
    return (
      <GridContainer>
        <GridItem xs={2}>
          <Icon paddingRight icon="" size="small" />
        </GridItem>
        <GridItem xs={10}>
          <JText paddingRight>{text}</JText>
        </GridItem>
      </GridContainer>
    );
  };
  const menuClick = (index, closeMenu) => () => {
    setSortState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.sortIndex = index;
    });
    changeSort(sortState.options[index]);
    if (closeMenu) {
      closeMenu();
    }
  };

  const { setSortState, sortState } = useParticipantSortState();
  // eslint-disable-next-line react/prop-types,no-unused-vars
  const sortMenu = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      {sortState.label.map((o, i) => (
        <GridItem key={o} data-testid="sortMenuItem">
          <MenuItem
            onClick={menuClick(i, closeMenu)}
            selected={i === sortState.sortIndex}
          >
            {menuIcon(o, i === sortState.sortIndex)}
          </MenuItem>
        </GridItem>
      ))}
    </GridContainer>
  );

  const showLabel = () => {
    if (showSortLabel) {
      return (
        <GridItem>
          <Chip
            label={sortState.label[sortState.sortIndex]}
            variant="outlined"
            color="primary"
            classes={{
              root: classes.root,
            }}
          />
        </GridItem>
      );
    }
    return null;
  };

  // eslint-disable-next-line react/prop-types
  const sortOptionsButton = ({ openMenu }) => (
    <GridContainer direction="row" noWrap>
      <GridItem>
        <Button
          dense
          noMargin
          variant={VARIANTS.OUTLINE}
          size="extraSmall"
          color="base"
          onClick={openMenu}
          data-testid="sortButton"
        >
          <Icon icon="lnr-arrow-wave" size="small" />
        </Button>
      </GridItem>
      {showLabel()}
    </GridContainer>
  );
  return (
    <Popper
      renderButton={sortOptionsButton}
      halfPadding
      disableFullScreen={disableFullScreen}
    >
      {sortMenu}
    </Popper>
  );
}

ParticipantSortButton.propTypes = {
  changeSort: PropTypes.func,
  disableFullScreen: PropTypes.bool,
  showSortLabel: PropTypes.bool,
};

ParticipantSortButton.defaultProps = {
  disableFullScreen: false,
  showSortLabel: false,
};
export default ParticipantSortButton;
