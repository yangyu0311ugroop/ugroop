import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import ErrorImg from 'shareAssets/error-02.png';
import PropTypes from 'prop-types';
import { H2, H4 } from 'viewComponents/Typography';
import Img from 'components/Img';
import styles from './styles';
import m from './messages';

export class ErrorBoundary extends React.PureComponent {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    console.log({ error, info });
    // probably find a way to send the error logs somewhere than printing it in console
    this.setState({ hasError: true });
  }

  renderFallback = () => {
    const { classes } = this.props;
    const img = <Img src={ErrorImg} className={classes.img} alt="error" />;
    return (
      <GridContainer className={classes.container}>
        <GridItem className={classes.item}>{img}</GridItem>
        <GridItem className={classes.item}>
          <H2 dense className={classes.text}>
            <M {...m.somethingWentWrong} />
          </H2>
        </GridItem>
        <GridItem>
          <H4 dense className={classes.text}>
            <M {...m.maybe} />
          </H4>
        </GridItem>
        <GridItem>
          <H4 dense className={classes.text}>
            <M {...m.apologies} />
          </H4>
        </GridItem>
        <GridItem>
          <H4 dense className={classes.text}>
            <M {...m.thankYou} />
          </H4>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    if (this.state.hasError) {
      if (typeof this.props.renderFallback === 'function') {
        return this.props.renderFallback();
      }

      return this.renderFallback();
    }

    return this.props.children;
  };
}

ErrorBoundary.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  renderFallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

ErrorBoundary.defaultProps = {
  renderFallback: 'Something went wrong. :( Please try again.',
};

export default withStyles(styles, { name: 'ErrorBoundary' })(ErrorBoundary);
