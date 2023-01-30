import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import RatingButton from 'smartComponents/Node/components/Rating/components/RatingButton';
import { RATING_LEVELS } from 'smartComponents/Node/components/Rating/components/RatingForm';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class RiskRating extends PureComponent {
  // hard code
  rating = () => {
    const { impact, likelihood } = this.props;

    if (impact === 0) return 0;

    if (impact === 1) {
      if (likelihood < 2) return 0;
      return 1;
    }

    if (impact === 2) {
      if (likelihood < 1) return 0;
      if (likelihood < 3) return 1;
      return 2;
    }

    if (impact === 3) {
      if (likelihood < 2) return 1;
      if (likelihood < 3) return 2;
      return 3;
    }

    if (impact === 4) {
      if (likelihood < 1) return 1;
      if (likelihood < 2) return 2;
      return 3;
    }

    return 3;
  };

  renderHelp = () => (
    <GridItem>
      <a
        href="https://gateway-prod.ugroop.com/api/FileContainers/com.ugroop.personContainer/download/c6b38cf2-b175-4ef7-9bde-2cdb0dae8a94.jpeg"
        target="_blank"
      >
        <Icon icon="lnr-question-circle" size="xsmall" paddingLeft />
      </a>
    </GridItem>
  );

  render = () => {
    const { help } = this.props;

    if (help) return this.renderHelp();

    return <RatingButton {...RATING_LEVELS[this.rating()]} active />;
  };
}

RiskRating.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  help: PropTypes.bool,

  // resaga props
  impact: PropTypes.number,
  likelihood: PropTypes.number,
};

RiskRating.defaultProps = {
  impact: 0,
  likelihood: 0,
};

export default compose(
  withStyles(styles, { name: 'RiskRating' }),
  resaga(CONFIG),
)(RiskRating);
