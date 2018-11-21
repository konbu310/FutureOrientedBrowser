import React from "react";
import ReactDOM from "react-dom";
import styled from "react-emotion";
import { inject, observer } from "mobx-react";

import { isURL } from "../utils/index";

const ModalBackGround = styled("div")`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
`;

const ModalContent = styled("div")`
  width: 70vw;
  height: 5vh;
  margin-top: 2.5vh;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
`;

@inject("browser")
@observer
class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleKeyDown = e => {
    const { browser } = this.props;
    const {
      changeURL,
      clearSearchValue,
      toggleSearchModal,
      searchValue,
    } = browser;

    if (e.keyCode === 13) {
      isURL(searchValue)
        ? changeURL(searchValue)
        : changeURL(`https://www.google.com/search?q=${searchValue}`);
      clearSearchValue();
      toggleSearchModal();
    } else if (e.keyCode === 27) {
      clearSearchValue();
      toggleSearchModal();
    }
  };

  render() {
    const { browser } = this.props;
    const { searchValue, handleSearchValue } = browser;

    return ReactDOM.createPortal(
      <ModalBackGround>
        <ModalContent>
          <input
            style={{ width: "100%", height: "100%" }}
            type="text"
            onKeyDown={this.handleKeyDown}
            ref={this.inputRef}
            value={searchValue}
            onChange={e => handleSearchValue(e.target.value)}
          />
        </ModalContent>
      </ModalBackGround>,
      document.getElementById("root")
    );
  }
}

export default SearchModal;
