import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';

import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Popper from 'components/Popper';
import JText from 'components/JText';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JButton from 'viewComponents/Button/variants/JButton';
import Content from 'smartComponents/Node/parts/Content';
import { VARIANTS } from 'variantsConstants';

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
} from 'components/material-ui';
import Icon from 'ugcomponents/Icon';
import { DAY, TAB_OTHER } from 'utils/modelConstants';
import MenuItem from 'components/Popper/components/MenuItem';

// eslint-disable-next-line no-unused-vars
const styles = ({ colors }) => ({
  noPadding: {
    padding: 0,
  },
  container: {
    // margin: 16,
    padding: 8,
  },
  popper: {
    zIndex: 1000,
    minWidth: 300,
  },
  grow: {
    flex: 1,
  },
  expansionPanelSummaryContent: {
    margin: '8px 0',
    paddingRight: 8,
  },
  expansionPanelSummaryExpanded: {
    // Jay: not sure how to override these without important
    margin: 'unset !important',
    paddingRight: 8,
    minHeight: 'unset !important',
  },
  expansionPanelSummaryExpandIcon: {
    minWidth: 16,
    width: 'unset',
    right: 0,
  },
});

const useStyles = makeStyles(styles);

function DayfieldSelect(props) {
  const {
    selectedValue,
    templateId,
    onClickMenu,
    ids,
    currentValue,
    customTabIds,
    type,
    simple,
  } = props;

  const classes = useStyles();

  const [state, setState] = useState({
    dateExpanded: type === DAY,
    tabExpanded: type === TAB_OTHER,
  });

  const panelSummaryClasses = {
    content: classes.expansionPanelSummaryContent,
    expanded: classes.expansionPanelSummaryExpanded,
    expandIcon: classes.expansionPanelSummaryExpandIcon,
  };
  const toggle = () =>
    setState({
      dateExpanded: !state.dateExpanded,
      tabExpanded: !state.tabExpanded,
    });

  const renderSelectedValue = (dayDate, index) =>
    dayDate && dayDate.length
      ? LOGIC_HELPERS.ifElse(dayDate === 'No day', `Day ${index + 1}`, dayDate)
      : `Day ${index + 1}`;

  const renderDayDate = ({ openMenu, index }) => dayDate => (
    <GridContainer direction="column" spacing={0}>
      <GridItem onClick={openMenu} data-testid="daySelectMC">
        <FilledTextField
          fullWidth
          autoComplete="off"
          readonly
          value={renderSelectedValue(dayDate, index)}
          label="Day"
          placeholder="Enter day"
        />
      </GridItem>
    </GridContainer>
  );

  const renderTabValue = ({ openMenu }) => value => (
    <GridContainer direction="column" spacing={0} data-testid="tabSelectMC">
      <GridItem onClick={openMenu}>
        <FilledTextField
          fullWidth
          autoComplete="off"
          readonly
          value={value}
          label="Tab"
          placeholder="Enter Tab"
        />
      </GridItem>
    </GridContainer>
  );

  const renderDay = (id, index, openMenu) => (
    <DayDate id={id} templateId={templateId} dayIds={[props.ids]} showDayIndex>
      {renderDayDate({ openMenu, index })}
    </DayDate>
  );

  const renderTab = (id, openMenu) => (
    <Content id={id} variant={VARIANTS.RENDER_PROP} showDayIndex>
      {renderTabValue({ openMenu })}
    </Content>
  );

  const renderButtonField = ({ openMenu }) => {
    if (ids.includes(selectedValue))
      return renderDay(selectedValue, ids.indexOf(selectedValue), openMenu);
    return renderTab(selectedValue, openMenu);
  };

  const onclickMenu = ({ value, closeMenu }) => () => {
    onClickMenu(value);
    return closeMenu();
  };
  const expansion = (children, title, expanded, onChange) => (
    <ExpansionPanel
      // className={classes.expansionPanel}
      expanded={expanded}
      onChange={onChange}
      data-testid="day-expand"
    >
      <ExpansionPanelSummary
        expandIcon={<Icon size="small" icon="chevron-down" />}
        classes={panelSummaryClasses}
      >
        <JText bolder>{title}</JText>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );

  // eslint-disable-next-line react/prop-types
  const renderMenuField = ({ closeMenu }) => {
    const dayMenuField = (
      <GridContainer direction="column" spacing={0}>
        {/* eslint-disable-next-line react/prop-types */}
        {ids.map(id => (
          <GridItem key={id}>
            <JButton
              noBorderRadius
              block
              bg={LOGIC_HELPERS.ifElse(selectedValue === id, 'gray')}
              textAlign="left"
              onClick={onclickMenu({ value: id, closeMenu })}
            >
              <JText sm>
                {/* eslint-disable-next-line react/prop-types */}
                <DayDate id={id} templateId={templateId} showDayIndex />{' '}
                {/* eslint-disable-next-line react/prop-types */}
                {LOGIC_HELPERS.ifElse(currentValue === id, '(current)')}
              </JText>
            </JButton>
          </GridItem>
        ))}
      </GridContainer>
    );
    const tabMenuField = (
      <GridContainer direction="column" spacing={0}>
        {customTabIds.map(id => (
          <GridItem key={`day-${id}`}>
            <JButton
              noBorderRadius
              block
              bg={LOGIC_HELPERS.ifElse(selectedValue === id, 'gray')}
              textAlign="left"
              onClick={onclickMenu({ value: id, closeMenu })}
            >
              <JText sm>
                <Content id={id} variant={VARIANTS.VALUE_ONLY} />
                {/* eslint-disable-next-line react/prop-types */}
                {LOGIC_HELPERS.ifElse(currentValue === id, '(current)')}
              </JText>
            </JButton>
          </GridItem>
        ))}
      </GridContainer>
    );

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          {expansion(dayMenuField, 'Days', state.dateExpanded, toggle)}
        </GridItem>
        <GridItem>
          {!!customTabIds.length &&
            expansion(tabMenuField, 'Tabs', state.tabExpanded, toggle)}
        </GridItem>
      </GridContainer>
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderSimpleField = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      {ids.map((id, index) => {
        const label = `${DAY} ${index + 1}`;
        return (
          <GridItem key={id}>
            <MenuItem
              key={`day-${id}`}
              onClick={onclickMenu({ value: id, closeMenu })}
            >
              {label}
            </MenuItem>
          </GridItem>
        );
      })}
      {customTabIds.map((id, index) => {
        const label = `Tab ${index + 1}`;
        return (
          <GridItem key={id}>
            <MenuItem
              key={`tab-${id}`}
              onClick={onclickMenu({ value: id, closeMenu })}
            >
              {label}
            </MenuItem>
          </GridItem>
        );
      })}
    </GridContainer>
  );

  return (
    <Popper
      placement="bottom"
      renderButton={renderButtonField}
      fullWidth
      noPadding
      disableFullScreen
    >
      {LOGIC_HELPERS.ifElse(simple, renderSimpleField, renderMenuField)}
    </Popper>
  );
}

DayfieldSelect.propTypes = {
  selectedValue: PropTypes.number,
  currentValue: PropTypes.number,
  templateId: PropTypes.number,
  onClickMenu: PropTypes.func,
  ids: PropTypes.array,
  customTabIds: PropTypes.array,
  type: PropTypes.string,
  simple: PropTypes.bool,
};

DayfieldSelect.defaultProps = {
  ids: [],
  type: DAY,
};

export default React.memo(DayfieldSelect);
