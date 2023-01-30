import Switch from '@material-ui/core/Switch';
import { THE_BIG_DOT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import first from 'lodash/first';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import startInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import { Data } from 'ugcomponents/Inputs';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';

import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { node, dayIds } = props;

  const startDay =
    EVENT_VIEW_HELPERS.tempStartDay(node) ||
    EVENT_VIEW_HELPERS.parentNodeId(node);

  if (!startDay) return first(dayIds);

  return Number.parseInt(startDay, 10);
};

export class StartDate extends PureComponent {
  state = {
    selectedValues: [defaultValue(this.props)],
    batchCreate: false,
  };

  renderDayDateValue = dayDate =>
    dayDate && dayDate.length ? dayDate.join(` ${THE_BIG_DOT} `) : 'No day';

  renderDayDate = ({ openMenu, open, selectedValues }) => dayDate => {
    const { label, placeholder } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem onClick={LOGIC_HELPERS.ifElse(!open, openMenu)}>
          <FilledTextField
            fullWidth
            autoComplete="off"
            readonly
            onFocus={openMenu}
            value={this.renderDayDateValue(dayDate)}
            label={`${label}${LOGIC_HELPERS.ifElse(
              selectedValues.length > 1,
              's',
              '',
            )}`}
            placeholder={placeholder}
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderButton = ({ openMenu, open, selectedValues }) => (
    <DayDate id={selectedValues} showDayIndex={selectedValues.length < 2}>
      {this.renderDayDate({ openMenu, open, selectedValues })}
    </DayDate>
  );

  toggleBatchCreate = selectedValues => event => {
    const checked = event.target.checked;

    this.setState({
      batchCreate: checked,
    });

    if (!checked) {
      this.setState({
        selectedValues: LOGIC_HELPERS.ifElse(
          selectedValues.length,
          [first(selectedValues)],
          [],
        ),
      });
    }
  };

  handleClickNoDay = ({ batchCreate, closeMenu }) => e => {
    this.setState({
      selectedValues: [],
    });

    if (!batchCreate) {
      LOGIC_HELPERS.ifFunction(closeMenu, [e]);
    }
  };

  handleClickDay = ({ closeMenu, selectedValues, batchCreate, dayId }) => e => {
    const { dayIds } = this.props;

    if (!batchCreate) {
      this.setState({
        selectedValues: [dayId],
      });
      return LOGIC_HELPERS.ifFunction(closeMenu, [e]);
    }

    // sort selected days chronologically
    const newSelectedValues =
      selectedValues.indexOf(dayId) === -1
        ? sortBy(selectedValues.concat(dayId), dId => dayIds.indexOf(dId))
        : ARRAY_HELPERS.remove(selectedValues, dayId);

    return this.setState({
      selectedValues: newSelectedValues,
    });
  };

  renderCheckStatus = ({ batchCreate, active }) => {
    if (batchCreate) {
      return <input type="checkbox" checked={active} />;
    }

    return (
      <input type="radio" name="startDates" value="email" checked={active} />
    );
  };

  renderDayMenu = ({ closeMenu, selectedValues, batchCreate }) => dayId => {
    const active = selectedValues.indexOf(dayId) !== -1;

    return (
      <GridItem key={dayId}>
        <JButton
          noBorderRadius
          block
          bg={LOGIC_HELPERS.ifElse(active, 'gray')}
          textAlign="left"
          onClick={this.handleClickDay({
            closeMenu,
            selectedValues,
            batchCreate,
            dayId,
          })}
        >
          <GridContainer alignItems="center">
            <GridItem>
              {this.renderCheckStatus({ batchCreate, active })}
            </GridItem>
            <GridItem>
              <JText bold={active}>
                <DayDate id={dayId} showDayIndex />
              </JText>
            </GridItem>
          </GridContainer>
        </JButton>
      </GridItem>
    );
  };

  renderMenu = ({ closeMenu, selectedValues, batchCreate }) => {
    const { node, classes, dayIds, smDown } = this.props;

    const noDayActive = !selectedValues || !selectedValues.length;
    const creating = !node.id;

    return (
      <div
        className={classnames(LOGIC_HELPERS.ifElse(!smDown, classes.popper))}
      >
        <GridContainer direction="column" spacing={0}>
          {LOGIC_HELPERS.ifElse(
            creating,
            <>
              <GridItem>
                <GridContainer alignItems="center" className={classes.padding}>
                  <GridItem xs>
                    <JText uppercase bold gray sm>
                      multiple days
                    </JText>
                  </GridItem>
                  <Switch
                    color="primary"
                    checked={batchCreate}
                    onChange={this.toggleBatchCreate(selectedValues)}
                  />
                </GridContainer>
              </GridItem>

              <Hr half />
            </>,
          )}
          <GridItem>
            <JButton
              noBorderRadius
              block
              bg={LOGIC_HELPERS.ifElse(noDayActive, 'gray')}
              textAlign="left"
              onClick={this.handleClickNoDay({
                closeMenu,
                batchCreate,
              })}
            >
              <GridContainer alignItems="center">
                {!batchCreate && (
                  <GridItem>
                    <input
                      type="radio"
                      name="startDates"
                      value="email"
                      checked={noDayActive}
                    />
                  </GridItem>
                )}
                <GridItem xs>
                  <JText bold={noDayActive}>No day</JText>
                </GridItem>
              </GridContainer>
            </JButton>
          </GridItem>

          {dayIds.map(
            this.renderDayMenu({ closeMenu, selectedValues, batchCreate }),
          )}
        </GridContainer>
      </div>
    );
  };

  renderData = () => {
    const { tabId } = this.props;
    const { selectedValues, batchCreate } = this.state;

    if (batchCreate && selectedValues.length > 1) {
      return (
        <>
          <Data
            currentValue
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.batchCreate,
            )}
          />
          <Data
            currentValue={selectedValues}
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.tempDayRange,
            )}
          />
        </>
      );
    }

    return (
      <Data
        currentValue={`${first(selectedValues) || tabId}`}
        {...startInputs.tempDay}
      />
    );
  };

  render = () => {
    const { selectedValues, batchCreate } = this.state;

    return (
      <>
        {this.renderData()}

        <Popper
          placement="bottom"
          renderButton={this.renderButton}
          selectedValues={selectedValues}
          batchCreate={batchCreate}
          fullWidth
          noPadding
        >
          {this.renderMenu}
        </Popper>
      </>
    );
  };
}

StartDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  dayIds: PropTypes.array,
  smDown: PropTypes.bool,

  // parent props
  node: PropTypes.object,
  tabId: PropTypes.number,
  label: PropTypes.string,
  placeholder: PropTypes.string,

  // resaga props
};

StartDate.defaultProps = {
  node: {},
  dayIds: [],
  label: 'Start date',
  placeholder: 'Enter start date',
};

export default compose(
  withStyles(styles, { name: 'StartDate' }),
  withDayIds,
  withSMDown,
  resaga(CONFIG),
)(StartDate);
