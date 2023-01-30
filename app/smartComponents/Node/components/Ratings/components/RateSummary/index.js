import Box from '@material-ui/core/Box';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { RateAverage } from 'smartComponents/Node/logics';
import { RatingField } from 'viewComponents/Inputs';
import P, { Span } from 'viewComponents/Typography';
import { CONFIG } from './config';
import styles from './styles';

export class RateSummary extends PureComponent {
  render = () => {
    const { id, ratings } = this.props;

    return (
      <GridContainer wrap="nowrap" alignItems="center">
        <RateAverage id={id}>
          {avg => (
            <>
              <GridItem>
                <Span subtitle dense>
                  {parseFloat(avg).toPrecision(2)}
                </Span>
              </GridItem>
              <GridItem>
                <Box display="flex">
                  <RatingField
                    precision={0.1}
                    size="large"
                    key={avg}
                    value={avg}
                    readOnly
                  />
                </Box>
              </GridItem>
            </>
          )}
        </RateAverage>
        <GridItem>
          <P subtitle dense>
            ({ratings.length})
          </P>
        </GridItem>
      </GridContainer>
    );
  };
}

RateSummary.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  ratings: PropTypes.array,

  // resaga props
};

RateSummary.defaultProps = {
  ratings: [],
};

export default compose(
  withStyles(styles, { name: 'RateSummary' }),
  resaga(CONFIG),
)(RateSummary);
