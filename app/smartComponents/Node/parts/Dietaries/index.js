import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import GridItem from 'components/GridItem';
import PersonDietaries from 'smartComponents/Person/parts/Dietaries';
import NewIcon from 'viewComponents/Icon';
import { CONFIG_1, CONFIG_2 } from './config';

export class Dietaries extends React.PureComponent {
  state = {
    showDietaries: true,
  };

  handleShowDietaries = () =>
    this.setState(prevState => ({
      showDietaries: !prevState.showDietaries,
    }));

  getValue = () => {
    const { nodeValues, userValues } = this.props;
    return [...userValues, ...nodeValues];
  };

  getKeyPath = () => {
    const { id } = this.props;
    return NODE_STORE_SELECTORS.node({ id });
  };

  getProps = () => {
    const { personId, readOnly } = this.props;
    return {
      id: personId,
      value: this.getValue(),
      readOnly,
    };
  };

  renderEditable = () => {
    const { readOnly } = this.props;
    return (
      <GridItem>
        <PersonDietaries readOnly={readOnly} {...this.getProps()} />
      </GridItem>
    );
  };

  renderLogic = () => (
    <PersonDietaries
      variant={VARIANTS.LOGIC}
      keyPath={this.getKeyPath()}
      {...this.getProps()}
    />
  );

  renderDefault = variant => () => (
    <PersonDietaries variant={variant} {...this.getProps()} />
  );

  renderRow = () => {
    const { showDietaries } = this.state;

    const count = (
      <PersonDietaries variant={VARIANTS.COUNT} {...this.getProps()} />
    );

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer onClick={this.handleShowDietaries}>
            <GridItem>
              <JText bold spacing2 sm uppercase gray>
                Dietary Requirements ({count})
              </JText>
            </GridItem>
            <GridItem>
              <NewIcon
                icon={LOGIC_HELPERS.ifElse(
                  showDietaries,
                  'chevron-down',
                  'chevron-up',
                )}
                size="extraSmall"
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        {LOGIC_HELPERS.ifElse(
          showDietaries,
          <GridItem>
            <PersonDietaries variant={VARIANTS.ROW} {...this.getProps()} />
          </GridItem>,
          null,
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.LOGIC]: this.renderLogic,
      [VARIANTS.ROW]: this.renderRow,
      [DEFAULT]: this.renderDefault(variant),
    });
  };
}

Dietaries.propTypes = {
  // parent
  id: PropTypes.number,
  personId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  nodeValues: PropTypes.array,
  userValues: PropTypes.array,
};

Dietaries.defaultProps = {
  id: null,
  personId: null,
  variant: null,
  readOnly: false,

  nodeValues: [],
  userValues: [],
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(Dietaries);
