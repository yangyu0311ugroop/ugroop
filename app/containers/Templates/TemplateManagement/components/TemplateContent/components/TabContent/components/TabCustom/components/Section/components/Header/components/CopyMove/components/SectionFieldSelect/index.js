import React from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';

import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Popper from 'components/Popper';
import JText from 'components/JText';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JButton from 'viewComponents/Button/variants/JButton';
import Content from 'smartComponents/Node/parts/Content';
import { VARIANTS } from 'variantsConstants';

function SectionFieldSelect(props) {
  const { selectedValue, onClickMenu, ids, id: currentSection } = props;

  // eslint-disable-next-line react/prop-types
  const renderButtonField = ({ openMenu, index }) => content => {
    const value = renderValue(selectedValue, index)(content);
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem onClick={openMenu} data-testid="sectionSelectMC">
          <FilledTextField
            fullWidth
            autoComplete="off"
            readonly
            value={value}
            label="Position"
            placeholder="Enter position"
          />
        </GridItem>
      </GridContainer>
    );
  };

  const onclickMenu = ({ value, closeMenu }) => () => {
    onClickMenu(value);
    return closeMenu();
  };

  const renderValue = (id, index) => value =>
    `${index} - ${LOGIC_HELPERS.ifElse(
      !value,
      'Untitled',
      value,
    )} ${LOGIC_HELPERS.ifElse(currentSection === id, '(current)', '')} `;

  // eslint-disable-next-line react/prop-types
  const renderMenuField = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      {/* eslint-disable-next-line react/prop-types */}
      {ids.map((id, index) => (
        <GridItem key={id}>
          <JButton
            noBorderRadius
            block
            bg={LOGIC_HELPERS.ifElse(selectedValue === id, 'gray')}
            textAlign="left"
            onClick={onclickMenu({ value: id, closeMenu })}
          >
            <JText sm ellipsis>
              {id === -1 ? (
                renderValue(id, index + 1)(
                  LOGIC_HELPERS.ifElse(ids.length > 1, 'Last', 'First'),
                )
              ) : (
                <Content id={id} variant={VARIANTS.RENDER_PROP}>
                  {renderValue(id, index + 1)}
                </Content>
              )}
            </JText>
          </JButton>
        </GridItem>
      ))}
    </GridContainer>
  );

  // eslint-disable-next-line react/prop-types
  const renderButton = ({ openMenu }) => {
    const index = LOGIC_HELPERS.ifElse(
      ids.indexOf(selectedValue) !== -1,
      ids.indexOf(selectedValue) + 1,
      LOGIC_HELPERS.ifElse(ids.length === 0, 1, ids.length),
    );
    if (selectedValue === -1) {
      return renderButtonField({ openMenu, index })(
        LOGIC_HELPERS.ifElse(ids.length > 1, 'Last', 'First'),
      );
    }
    return (
      <Content id={selectedValue} variant={VARIANTS.RENDER_PROP}>
        {renderButtonField({ openMenu, index })}
      </Content>
    );
  };

  return (
    <Popper
      placement="bottom"
      renderButton={renderButton}
      fullWidth
      noPadding
      disableFullScreen
      selectedValue={selectedValue}
    >
      {renderMenuField}
    </Popper>
  );
}

SectionFieldSelect.propTypes = {
  id: PropTypes.number,
  selectedValue: PropTypes.number,
  onClickMenu: PropTypes.func,
  ids: PropTypes.array,
};

SectionFieldSelect.defaultProps = {
  ids: [],
};

export default React.memo(SectionFieldSelect);
