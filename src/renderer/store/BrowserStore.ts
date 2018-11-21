import { observable, computed, action } from "mobx";

class BrowserStore {
  @observable currentURL: string = "https://www.google.co.jp/";

  @observable isSearch: boolean = false;

  @observable searchValue: string = "";

  @observable tabs: string[] = ["https://www.google.co.jp"];

  @action.bound
  changeURL(url: string) {
    this.currentURL = url;
  }

  @action.bound
  toggleSearchModal() {
    this.isSearch = !this.isSearch;
  }

  @action.bound
  handleSearchValue(value: string) {
    this.searchValue = value;
  }

  @action.bound
  clearSearchValue() {
    this.searchValue = "";
  }
}

export default BrowserStore;
