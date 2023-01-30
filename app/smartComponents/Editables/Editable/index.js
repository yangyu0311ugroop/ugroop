import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import EditableView, {
  EditablePlaceholder,
  EditableLabel,
} from 'viewComponents/Editable';

/**
 * Wrapper component for generic editables with label/placeholder/etc.
 */
export class Editable extends React.PureComponent {
  renderPlaceholder = () => {
    const { placeholder, readOnly, readOnlyPlaceholder } = this.props;
    return (
      <EditablePlaceholder>
        {readOnly ? readOnlyPlaceholder : placeholder}
      </EditablePlaceholder>
    );
  };

  renderValue = () => {
    const { value, renderValue, renderActions } = this.props;
    const rendered = renderValue(value);
    if (rendered) {
      const renderedActions = renderActions(value);
      return (
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>{rendered}</GridItem>
          {renderedActions && <GridItem>{renderedActions}</GridItem>}
        </GridContainer>
      );
    }
    return rendered;
  };

  renderContent = () => {
    const rendered = this.renderValue();
    return rendered || this.renderPlaceholder();
  };

  renderLabel = () => {
    const { label } = this.props;
    return <EditableLabel>{label}</EditableLabel>;
  };

  render = () => {
    const { readOnly, onClick } = this.props;
    return (
      <React.Fragment>
        {this.renderLabel()}
        <EditableView
          onClick={onClick}
          readOnly={readOnly}
          buttonRef={this.handleEditableButtonRef}
        >
          {this.renderContent()}
        </EditableView>
      </React.Fragment>
    );
  };
}

Editable.propTypes = {
  // parent
  value: PropTypes.any,
  renderValue: PropTypes.func,
  renderActions: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.any,
  readOnly: PropTypes.bool,
  readOnlyPlaceholder: PropTypes.string,
  label: PropTypes.any,
};

Editable.defaultProps = {
  value: null,
  renderValue: value => value,
  renderActions: () => {},
  onClick: () => {},
  placeholder: 'Click to specify',
  readOnly: false,
  readOnlyPlaceholder: 'None',
  label: '',
};

export default Editable;
