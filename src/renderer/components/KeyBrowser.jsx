import React from "react";
import { inject, observer } from "mobx-react";
import styled from "react-emotion";
import SearchModal from "./SearchModal";
const ipc = window.require("electron").ipcRenderer;

const Container = styled("div")`
  width: 100vw;
  height: 100vh;
`;

@inject("browser")
@observer
class KeyBrowser extends React.Component {
  componentDidMount() {
    ipc.on("search", () => {
      this.handleKeyDown();
    });
  }

  handleKeyDown = () => {
    this.props.browser.toggleSearchModal();
    this.props.browser.clearSearchValue();
  };

  render() {
    const { browser } = this.props;
    const { currentURL, isSearch } = browser;

    return (
      <Container>
        <input style={{ display: "none" }} />
        <webview src={currentURL} style={{ width: "100vw", height: "100vh" }} />
        {isSearch && <SearchModal />}
      </Container>
    );
  }
}

export default KeyBrowser;
