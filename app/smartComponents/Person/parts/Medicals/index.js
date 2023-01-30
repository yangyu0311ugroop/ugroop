import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EditableLabel } from 'viewComponents/Editable';
import { MedicalIcon } from 'viewComponents/People';
import Tooltip from 'viewComponents/Tooltip';
import Medical from 'smartComponents/Person/components/Medical';
import Create from 'smartComponents/Person/components/Medical/components/Create';
import NoMedical from 'smartComponents/Person/parts/NoMedical';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import EditablePlaceholder from 'viewComponents/Editable/components/Placeholder';
import Calculated from './components/Calculated';
import m from './messages';
import Empty from '../../../../components/Empty';

import styles from './styles';
import { CONFIG_1, CONFIG_2 } from './config';

export class Medicals extends React.PureComponent {
  renderMedical = variant => id => (
    <GridItem key={`medical.${id}`}>
      <Medical id={id} variant={variant} readOnly={this.props.readOnly} />
    </GridItem>
  );

  renderCreate = () => {
    const { id, readOnly } = this.props;
    if (!readOnly) {
      return <Create id={id} />;
    }
    return null;
  };

  renderMedicals = (variant = VARIANTS.EDITABLE) => {
    const { value, personMedicalsValue, userMedicalsValue } = this.props;
    let data = value;
    if (!value.length)
      data = LOGIC_HELPERS.ifElse(
        personMedicalsValue.length,
        personMedicalsValue,
        userMedicalsValue,
      );
    return (
      !!data.length && (
        <GridContainer direction="column" wrap="nowrap">
          {data.map(this.renderMedical(variant))}
        </GridContainer>
      )
    );
  };

  renderEditableLabel = hasMedicals => (
    <GridContainer wrap="nowrap" alignItems="baseline">
      <GridItem xs>
        <GridContainer spacing={0} noWrap alignItems="baseline">
          <GridItem>
            <EditableLabel>
              <M {...m.label} />
            </EditableLabel>
          </GridItem>
          {!hasMedicals && (
            <GridItem>
              <Box pl={1}>
                <NoMedical id={this.props.id} disabled={!!hasMedicals} />
              </Box>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
      {!this.props.noMedical && <GridItem>{this.renderCreate()}</GridItem>}
    </GridContainer>
  );

  renderEditablePlaceholder = () => (
    <Empty
      description={
        <EditablePlaceholder>
          <M
            {...LOGIC_HELPERS.ifElse(
              this.props.noMedical,
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
    const medicals = this.renderMedicals();
    const content = medicals ? (
      <GridItem>{medicals}</GridItem>
    ) : (
      this.renderEditablePlaceholder()
    );
    return (
      <GridContainer
        direction="column"
        spacing={LOGIC_HELPERS.ifElse(medicals, 3, 0)}
        wrap="nowrap"
      >
        <GridItem>{this.renderEditableLabel(medicals)}</GridItem>
        {content}
      </GridContainer>
    );
  };

  renderIcon = () => {
    const { calculatedSeverity, noMedical, value } = this.props;
    if (noMedical) return null;

    return (
      <GridItem>
        <Tooltip title={this.renderTextOnly()} isLight>
          <MedicalIcon
            size="extraSmall"
            severity={calculatedSeverity}
            noMedical={!value.length}
          />
        </Tooltip>
      </GridItem>
    );
  };

  renderTextOnly = () => {
    const { value } = this.props;
    return (
      !!value.length && (
        <GridItem>{this.renderMedicals(VARIANTS.TEXT_ONLY)}</GridItem>
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
        {this.renderMedicals() || this.renderEditablePlaceholder()}
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

Medicals.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  keyPath: PropTypes.array,
  calculatedSeverity: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  value: PropTypes.array,
  personMedicalsValue: PropTypes.array,
  userMedicalsValue: PropTypes.array,
  noMedical: PropTypes.bool,
};

Medicals.defaultProps = {
  id: null,
  variant: null,
  keyPath: [],
  readOnly: false,

  value: [],
  personMedicalsValue: [],
  userMedicalsValue: [],
};
export default compose(
  withStyles(styles, { name: 'Medicals' }),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(Medicals);
