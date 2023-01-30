import { ICON, DEFAULT, ICON_BUTTON } from 'appConstants';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Checklists from 'smartComponents/Node/components/Checklists';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import ChecklistButton from './components/ChecklistButton';
import { CONFIG } from './config';

export class ChecklistIcon extends PureComponent {
  showChecklists = () => {
    const { showChecklists, defaultShowChecklists } = this.props;

    if (typeof showChecklists === 'undefined') {
      return defaultShowChecklists;
    }

    return showChecklists;
  };

  toggleChecklists = () =>
    this.props.resaga.setValue({
      showChecklists: !this.showChecklists(),
    });

  checkListButton = () => {
    const {
      id,
      showChecklists,
      checklists,
      iconClass,
      small,
      onClick,
      showAddButton,
      xsIcon,
    } = this.props;

    return (
      <GridContainer>
        {((showAddButton && checklists.length) || !showAddButton) && (
          <GridItem>
            <ChecklistButton
              id={id}
              checklists={checklists}
              iconClass={iconClass}
              small={small}
              showChecklists={showChecklists}
              onClick={LOGIC_HELPERS.ifElse(
                typeof onClick === 'function',
                onClick,
                this.toggleChecklists,
              )}
              xsIcon={xsIcon}
            />
          </GridItem>
        )}

        {showAddButton &&
          this.renderComponent(Checklists, {
            ...this.props,
            variant: 'ADD_CHECKLIST',
            iconToggle: this.toggleChecklists,
          })}
      </GridContainer>
    );
  };

  renderIconButton = () =>
    this.renderComponent(Checklists, {
      ...this.props,
      variant: ICON_BUTTON,
      iconToggle: this.toggleChecklists,
    });

  renderComponent = (Component, props = {}) => {
    const prop = omit(props, [
      'resaga',
      'checklistsClass',
      'iconClass',
      'checklists',
    ]);
    return <Component className={props.checklistsClass} {...prop} />;
  };

  renderContent = () => {
    const showChecklists = this.showChecklists();

    return (
      <div>
        {this.checkListButton()}
        {showChecklists &&
          this.renderComponent(Checklists, {
            ...this.props,
            showChecklists,
            iconToggle: this.toggleChecklists,
          })}
      </div>
    );
  };

  renderDefault = () => {
    const { checklists, showEmpty } = this.props;
    if (!checklists.length && !showEmpty) return null;
    return <div>{this.renderContent()}</div>;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [ICON]: this.checkListButton,
      [ICON_BUTTON]: this.renderIconButton,
      [DEFAULT]: this.renderDefault,
    });
  };
}
ChecklistIcon.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // Parent
  id: PropTypes.number,
  variant: PropTypes.string,
  iconClass: PropTypes.string,
  checklistsClass: PropTypes.string,
  showEmpty: PropTypes.bool,
  onClick: PropTypes.func,
  editing: PropTypes.bool,
  defaultShowChecklists: PropTypes.bool,
  showAddButton: PropTypes.bool,

  // resaga
  checklists: PropTypes.array,
  showChecklists: PropTypes.bool,
  xsIcon: PropTypes.bool,

  // custom
  small: PropTypes.bool,
};

ChecklistIcon.defaultProps = {
  iconClass: '',
  checklistsClass: '',
  checklists: [],
  showAddButton: false,
};

export default compose(resaga(CONFIG))(ChecklistIcon);
