import React from 'react';
import { styled, Actions, Button, FlexBox } from '@twilio/flex-ui';

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

const ClearDefaultsButton = styled(Button)`
  ${(p) => p.theme.FilterList.ResetButton}
  width: 100%;
`;

class ClearFiltersButtons extends React.PureComponent {
  handleClearSelectionClick() {
    Actions.invokeAction('ApplyTeamsViewFilters', { filters: [] });
  }

  handleClearDefaultsClick() {
    Actions.invokeAction('ApplyTeamsViewFilters', { filters: [], clearDefaults: true });
  }

  render() {
    return (
      <Container noGrow className="Twilio-FilterListButtons-Container">
        <ClearDefaultsButton
          className="Twilio-FilterListButtons-ResetButton"
          roundCorners={false}
          onClick={this.handleClearDefaultsClick}
          disabled={false}
          variant="destructive_secondary"
        >
          Clear Defaults
        </ClearDefaultsButton>
        <ClearSelectionButton
          className="Twilio-FilterListButtons-ResetButton"
          roundCorners={false}
          onClick={this.handleClearSelectionClick}
          disabled={false}
          variant="secondary"
        >
          Clear Selection
        </ClearSelectionButton>
      </Container>
    )
  }
}

export default ClearFiltersButtons;
