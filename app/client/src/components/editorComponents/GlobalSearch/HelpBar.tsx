import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getTypographyByKey } from "constants/DefaultTheme";
import Text, { TextType } from "components/ads/Text";
import {
  setGlobalSearchQuery,
  toggleShowGlobalSearchModal,
} from "actions/globalSearchActions";
import { HELPBAR_PLACEHOLDER } from "constants/messages";
import AnalyticsUtil from "utils/AnalyticsUtil";
import { isMac } from "utils/helpers";

const StyledHelpBar = styled.div`
  padding: 0 ${(props) => props.theme.spaces[4]}px;
  margin: ${(props) => props.theme.spaces[2]}px;
  .placeholder-text {
    ${(props) => getTypographyByKey(props, "p2")}
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.globalSearch.helpBarText};
  background: ${(props) => props.theme.colors.globalSearch.helpBarBackground};
  height: 28px;
  flex: 1;
  max-width: 350px;
  border: 1.5px solid transparent;
  &:hover {
    border: 1.5px solid ${(props) => props.theme.colors.tertiary.light};
  }
`;

const modText = () => (isMac() ? <span>&#8984;</span> : "ctrl");
const comboText = <>{modText()} + K</>;

type Props = {
  toggleShowModal: () => void;
};

const HelpBar = ({ toggleShowModal }: Props) => {
  return (
    <StyledHelpBar
      onClick={toggleShowModal}
      className="t--global-search-modal-trigger"
      data-cy="global-search-modal-trigger"
    >
      <Text type={TextType.P2}>{HELPBAR_PLACEHOLDER()}</Text>
      <Text type={TextType.P3} italic>
        {comboText}
      </Text>
    </StyledHelpBar>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  toggleShowModal: () => {
    AnalyticsUtil.logEvent("OPEN_OMNIBAR", { source: "NAVBAR_CLICK" });
    // set global search query to empty when
    // opening directly from nav bar
    dispatch(setGlobalSearchQuery(""));
    dispatch(toggleShowGlobalSearchModal());
  },
});

export default connect(null, mapDispatchToProps)(HelpBar);
