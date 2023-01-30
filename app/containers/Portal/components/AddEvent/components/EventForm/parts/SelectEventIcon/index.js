import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import iconUtils from 'smartComponents/Event/components/Event/parts/Event/Icon/utils';
import { Data } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import EventIcon from 'viewComponents/Event/components/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class SelectEventIcon extends PureComponent {
  state = {
    iconOverride: this.props.iconOverride,
  };

  renderButton = ({ openMenu, iconOverride, type, subtype }) => {
    const { classes } = this.props;

    const options = iconUtils.iconOptions(type, subtype);

    return (
      <GridContainer direction="column" alignItems="center" spacing={0}>
        <GridItem>
          <JButton
            padding="lg"
            title="Change icon"
            className={classes.eventIcon}
            onClick={openMenu}
          >
            <EventIcon
              type={type}
              subtype={subtype}
              iconOverride={iconOverride}
              size="medium"
            />
          </JButton>
        </GridItem>
        {LOGIC_HELPERS.ifElse(
          options.length > 1,
          <GridItem>
            <JText gray xs onClick={openMenu}>
              Click for more icons
            </JText>
          </GridItem>,
        )}
      </GridContainer>
    );
  };

  selectMenu = ({ closeMenu, value }) => e => {
    this.setState({
      iconOverride: value,
    });
    LOGIC_HELPERS.ifFunction(closeMenu, [e]);
  };

  renderMenu = ({ closeMenu, type, subtype, iconOverride }) => {
    const { classes } = this.props;

    const options = iconUtils.iconOptions(type, subtype);

    return (
      <GridContainer direction="column" onClick={closeMenu}>
        <GridItem>
          <GridContainer direction="column" alignItems="center">
            <GridItem>
              <JText bold dark>
                Change icon
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer alignItems="center" spacing={0}>
            {options.map(option => {
              const { value } = option;

              const active = iconOverride === value;

              return (
                <GridItem key={value}>
                  <JButton
                    onClick={this.selectMenu({ closeMenu, value })}
                    className={classnames(
                      classes.iconButtonSm,
                      LOGIC_HELPERS.ifElse(active, classes.iconButtonSmActive),
                    )}
                  >
                    <EventIcon
                      type={type}
                      subtype={subtype}
                      iconOverride={value}
                      size="medium"
                    />
                  </JButton>
                </GridItem>
              );
            })}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes, type, subtype } = this.props;
    const { iconOverride } = this.state;

    return (
      <>
        <Popper
          className={classes.popper}
          renderButton={this.renderButton}
          iconOverride={iconOverride}
          type={type}
          subtype={subtype}
        >
          {this.renderMenu}
        </Popper>

        <Data
          currentValue={iconOverride}
          name={EVENT_STORE_HELPERS.pathToEventInputName(
            EVENT_PATHS.iconOverride,
          )}
        />
      </>
    );
  };
}

SelectEventIcon.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  type: PropTypes.string,
  subtype: PropTypes.string,
  iconOverride: PropTypes.string,

  // resaga props
};

SelectEventIcon.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'SelectEventIcon' }),
  resaga(CONFIG),
)(SelectEventIcon);
