import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EditableLabel } from 'viewComponents/Editable';
import { DietaryIcon } from 'viewComponents/People';
import Tooltip from 'viewComponents/Tooltip';
import Dietary from 'smartComponents/Person/components/Dietary';
import Create from 'smartComponents/Person/components/Dietary/components/Create';
import NoDietary from 'smartComponents/Person/parts/NoDietary';
import Box from '@material-ui/core/Box';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Calculated from './components/Calculated';
import { CONFIG } from './config';
import m from './messages';
import Empty from '../../../../components/Empty';
import styles from './styles';
import EditablePlaceholder from '../../../../viewComponents/Editable/components/Placeholder';

export class Dietaries extends React.PureComponent {
  renderDietary = variant => id => (
    <GridItem key={`dietary.${id}`}>
      <Dietary id={id} variant={variant} readOnly={this.props.readOnly} />
    </GridItem>
  );

  renderCreate = () => {
    const { id, readOnly } = this.props;
    if (!readOnly) {
      return <Create id={id} />;
    }
    return null;
  };

  renderDietaries = (variant = VARIANTS.EDITABLE) => {
    const { value, personDietaries, userDietaries } = this.props;
    let data = value;
    if (!value.length)
      data = LOGIC_HELPERS.ifElse(
        personDietaries.length,
        personDietaries,
        userDietaries,
      );
    return (
      !!data.length && (
        <GridContainer direction="column" wrap="nowrap">
          {data.map(this.renderDietary(variant))}
        </GridContainer>
      )
    );
  };

  renderEditableLabel = hasDietary => (
    <GridContainer wrap="nowrap" alignItems="baseline">
      <GridItem xs>
        <GridContainer spacing={0} noWrap alignItems="baseline">
          <GridItem>
            <EditableLabel>
              <M {...m.label} />
            </EditableLabel>
          </GridItem>
          {!hasDietary && (
            <GridItem>
              <Box pl={1}>
                <NoDietary id={this.props.id} disabled={!!hasDietary} />
              </Box>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
      {!this.props.noDietary && <GridItem>{this.renderCreate()}</GridItem>}
    </GridContainer>
  );

  renderEditablePlaceholder = () => (
    <Empty
      description={
        <EditablePlaceholder>
          <M
            {...LOGIC_HELPERS.ifElse(
              this.props.noDietary,
              m.placeholderNa,
              m.placeholder,
            )}
          />
        </EditablePlaceholder>
      }
      cardClassName={this.props.classes.emptyCard}
    />
  );

  renderEditable = () => {
    const dietaries = this.renderDietaries();
    const content = dietaries ? (
      <GridItem>{dietaries}</GridItem>
    ) : (
      this.renderEditablePlaceholder()
    );
    return (
      <GridContainer
        direction="column"
        spacing={LOGIC_HELPERS.ifElse(dietaries, 3, 0)}
        wrap="nowrap"
      >
        <GridItem>{this.renderEditableLabel(dietaries)}</GridItem>
        {content}
      </GridContainer>
    );
  };

  renderIcon = () => {
    const { value, noDietary } = this.props;
    if (noDietary) return null;
    return (
      <GridItem>
        <Tooltip title={this.renderTextOnly()} isLight>
          <DietaryIcon size="extraSmall" noDietary={!value.length} />
        </Tooltip>
      </GridItem>
    );
  };

  renderTextOnly = () => {
    const { value } = this.props;
    return (
      !!value.length && (
        <GridItem>{this.renderDietaries(VARIANTS.TEXT_ONLY)}</GridItem>
      )
    );
  };

  renderLogic = () => {
    const { id, keyPath, value } = this.props;
    return <Calculated id={id} keyPath={keyPath} value={value} />;
  };

  renderRow = () => (
    <GridContainer direction="column" spacing={0} wrap="nowrap">
      <GridItem>
        {this.renderDietaries() || this.renderEditablePlaceholder()}
      </GridItem>
    </GridContainer>
  );

  renderCount = () => this.props.value.length;

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.ICON]: this.renderIcon,
      [VARIANTS.LOGIC]: this.renderLogic,
      [VARIANTS.ROW]: this.renderRow,
      [VARIANTS.COUNT]: this.renderCount,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Dietaries.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  keyPath: PropTypes.array,
  readOnly: PropTypes.bool,

  // resaga value
  value: PropTypes.array,
  personDietaries: PropTypes.array,
  userDietaries: PropTypes.array,
  noDietary: PropTypes.bool,
};

Dietaries.defaultProps = {
  id: null,
  variant: null,
  keyPath: [],

  value: [],
  personDietaries: [],
  userDietaries: [],
  readOnly: false,
};

// export default resaga(CONFIG)(Dietaries);
export default compose(
  withStyles(styles, { name: 'Dietaries' }),
  resaga(CONFIG),
)(Dietaries);
