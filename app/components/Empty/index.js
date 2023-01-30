import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Empty extends PureComponent {
  renderTitle = () => {
    const { title, action } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem xs>
            <JText bold black>
              {title}
            </JText>
          </GridItem>

          {LOGIC_HELPERS.ifElse(
            action,
            <GridItem>{LOGIC_HELPERS.ifFunction(action, [], action)}</GridItem>,
          )}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes, card, description, button, cardClassName } = this.props;

    // inspiration from antd Empty
    // https://github.com/ant-design/ant-design/blob/master/components/empty/simple.tsx

    return (
      <GridItem>
        <GridContainer card direction="column" cardClassName={cardClassName}>
          {this.renderTitle()}
          <GridItem>
            <GridContainer
              card={card}
              direction="column"
              spacing={2}
              alignItems="center"
              className={classes.root}
            >
              <GridItem>
                <GridContainer
                  direction="column"
                  spacing={1}
                  alignItems="center"
                >
                  <GridItem>
                    <svg
                      className={classes.empty}
                      width="64"
                      height="41"
                      viewBox="0 0 64 41"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        transform="translate(0 1)"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <ellipse
                          className={classes.emptyEllipse}
                          cx="32"
                          cy="33"
                          rx="32"
                          ry="7"
                        />
                        <g className={classes.emptyG} fillRule="nonzero">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            className={classes.emptyPath}
                          />
                        </g>
                      </g>
                    </svg>
                  </GridItem>
                  <GridItem>
                    <JText placeholder>{description}</JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
              {LOGIC_HELPERS.ifElse(
                button,
                <GridItem>
                  {LOGIC_HELPERS.ifFunction(button, [], button)}
                </GridItem>,
              )}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

Empty.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  title: PropTypes.node,
  description: PropTypes.node,
  action: PropTypes.node,
  button: PropTypes.node,
  card: PropTypes.bool,
  cardClassName: PropTypes.any,

  // resaga props
};

Empty.defaultProps = {
  description: 'No Data',
};

export default compose(
  withStyles(styles, { name: 'Empty' }),
  resaga(CONFIG),
)(Empty);
