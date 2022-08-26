import React from 'react';
import { styled, Actions, Button, FlexBox } from '@twilio/flex-ui';

import { getLocalTeamsViewFilters } from '../../helpers/manager';

const Container = styled(FlexBox)`
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.tokens.spacings.space50};
    padding-top: 0;
    margin-top: ${({ theme }) => theme.tokens.spacings.spaceNegative30};
`;

const ClearSelectionButton = styled(Button)`
  ${(p) => p.theme.FilterList.ResetButton}
  margin-left: ${({ theme }) => theme.tokens.spacings.space20};
  width: 100%;
`;

const EraseDefaultsButton = styled(Button)`
  ${(p) => p.theme.FilterList.ResetButton}
  width: 100%;
`;

class ClearFiltersButtons extends React.PureComponent {
  isClearSelectionButtonDisabled() {
    const { appliedFilters } = this.props;

    return Array.isArray(appliedFilters) && appliedFilters.length === 0;
  }

  isEraseDefaultsButtonDisabled() {
    const localTeamsViewFilters = getLocalTeamsViewFilters();
    return Array.isArray(localTeamsViewFilters?.filters) && localTeamsViewFilters.filters.length === 0;
  }

  handleClearSelectionClick() {
    Actions.invokeAction('ApplyTeamsViewFilters', { filters: [] });
  }

  handleEraseDefaultsClick() {
    Actions.invokeAction('ApplyTeamsViewFilters', { filters: [], clearDefaults: true });
  }

  render() {
    return (
      <Container noGrow className="Twilio-FilterListButtons-Container">
        <EraseDefaultsButton
          className="Twilio-FilterListButtons-ResetButton"
          roundCorners={false}
          onClick={this.handleEraseDefaultsClick}
          disabled={this.isEraseDefaultsButtonDisabled()}
          variant="destructive_secondary"
        >
          Erase Defaults
        </EraseDefaultsButton>
        <ClearSelectionButton
          className="Twilio-FilterListButtons-ResetButton"
          roundCorners={false}
          onClick={this.handleClearSelectionClick}
          disabled={this.isClearSelectionButtonDisabled()}
          variant="secondary"
        >
          Clear Selection
        </ClearSelectionButton>
      </Container>
    )
  }
}

export default ClearFiltersButtons;
