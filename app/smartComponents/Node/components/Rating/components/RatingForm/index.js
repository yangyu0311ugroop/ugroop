import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import RatingButton from 'smartComponents/Node/components/Rating/components/RatingButton';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export const LIKELIHOOD_LEVELS = [
  {
    value: 0,
    text: 'Rare',
    title: (
      <>
        <i>Potential</i>, exceptional time
      </>
    ),
  },
  {
    value: 1,
    text: 'Unlikely',
    title: (
      <>
        <i>Potential</i>, some time
      </>
    ),
  },
  {
    value: 2,
    text: 'Possible',
    title: (
      <>
        <i>Possible</i>, occasionally
      </>
    ),
  },
  {
    value: 3,
    text: 'Very likely',
    title: (
      <>
        <i>Probable</i>, most circumstances
      </>
    ),
  },
  {
    value: 4,
    text: 'Almost certain',
    title: (
      <>
        <i>Expected</i>, most circumstances
      </>
    ),
  },
];

export const IMPACT_LEVELS = [
  {
    value: 0,
    text: 'Insignificant',
    title: 'Minimal impact',
  },
  {
    value: 1,
    text: 'Minor',
    title: 'Short-term impact',
  },
  {
    value: 2,
    text: 'Moderate',
    title: 'Significant impact',
  },
  {
    value: 3,
    text: 'Major',
    title: 'Major short-term impact',
  },
  {
    value: 4,
    text: 'Catastrophic',
    title: 'Major long-term impact',
  },
];

export const RATING_LEVELS = [
  {
    value: 0,
    text: 'LOW',
    title: 'Risk Rating: Low',
  },
  {
    value: 2,
    text: 'MEDIUM',
    title: 'Risk Rating: Medium',
  },
  {
    value: 3,
    text: 'HIGH',
    title: 'Risk Rating: High',
  },
  {
    value: 4,
    text: 'EXTREME',
    title: 'Risk Rating: Extreme',
  },
];

export class RatingForm extends PureComponent {
  state = {};

  handleSetValue = value => () => {
    const { onChange, setValue } = this.props;

    LOGIC_HELPERS.ifFunction(setValue, [value]);
    LOGIC_HELPERS.ifFunction(onChange, [value]);

    // trigger re-render
    // eslint-disable-next-line react/no-unused-state
    this.setState({ value });
  };

  renderLevel = level => {
    const { getValue, value: propValue } = this.props;

    const formValue = LOGIC_HELPERS.ifFunction(getValue, [], propValue) || 0;

    return (
      <GridItem key={level.value}>
        <RatingButton
          {...level}
          active={formValue === level.value}
          onClick={this.handleSetValue(level.value)}
        />
      </GridItem>
    );
  };

  render = () => {
    const { levels } = this.props;

    return (
      <GridContainer alignItems="center">
        {levels.map(this.renderLevel)}
      </GridContainer>
    );
  };
}

RatingForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func,
  setValue: PropTypes.func,

  // parent props
  onChange: PropTypes.func,
  levels: PropTypes.array,

  // used by hoc
  name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  value: PropTypes.any, // eslint-disable-line react/no-unused-prop-types

  // resaga props
};

RatingForm.defaultProps = {
  value: 0,
  levels: [],
};

export default compose(
  withStyles(styles, { name: 'RatingForm' }),
  // resaga(CONFIG),
  withFormsy,
)(RatingForm);
