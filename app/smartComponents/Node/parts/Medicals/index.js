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
import PersonMedicals from 'smartComponents/Person/parts/Medicals';
import NewIcon from 'viewComponents/Icon';
import { CONFIG_1, CONFIG_2 } from './config';

export class Medicals extends React.PureComponent {
  state = {
    showMedicals: true,
  };

  handleShowMedicals = () =>
    this.setState(prevState => ({ showMedicals: !prevState.showMedicals }));

  getValue = () => {
    const { nodeValues, userValues } = this.props;
    return [...userValues, ...nodeValues];
  };

  getKeyPath = () => {
    const { id } = this.props;
    return NODE_STORE_SELECTORS.node({ id });
  };

  getProps = () => {
    const { personId, calculatedSeverity, readOnly } = this.props;
    return {
      id: personId,
      value: this.getValue(),
      calculatedSeverity,
      readOnly,
    };
  };

  renderEditable = () => {
    const { readOnly } = this.props;
    return (
      <GridItem>
        <PersonMedicals readOnly={readOnly} {...this.getProps()} />
      </GridItem>
    );
  };

  renderLogic = () => (
    <PersonMedicals
      variant={VARIANTS.LOGIC}
      keyPath={this.getKeyPath()}
      {...this.getProps()}
    />
  );

  renderDefault = variant => () => (
    <PersonMedicals variant={variant} {...this.getProps()} />
  );

  renderRow = () => {
    const { showMedicals } = this.state;
    const count = (
      <PersonMedicals variant={VARIANTS.COUNT} {...this.getProps()} />
    );

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer alignItems="center" onClick={this.handleShowMedicals}>
            <GridItem>
              <JText bold spacing2 sm uppercase gray>
                Medical Requirements ({count})
              </JText>
            </GridItem>
            <GridItem>
              <NewIcon
                icon={LOGIC_HELPERS.ifElse(
                  showMedicals,
                  'chevron-down',
                  'chevron-up',
                )}
                size="extraSmall"
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        {LOGIC_HELPERS.ifElse(
          showMedicals,
          <GridItem>
            <PersonMedicals variant={VARIANTS.ROW} {...this.getProps()} />
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

Medicals.propTypes = {
  // parent
  id: PropTypes.number,
  personId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  calculatedSeverity: PropTypes.string,
  nodeValues: PropTypes.array,
  userValues: PropTypes.array,
};

Medicals.defaultProps = {
  id: null,
  personId: null,
  variant: null,
  readOnly: false,

  calculatedSeverity: null,
  nodeValues: [],
  userValues: [],
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(Medicals);
