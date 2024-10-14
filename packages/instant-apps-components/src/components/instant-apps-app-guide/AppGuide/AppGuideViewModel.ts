import { AppGuidePage } from "./interfaces/interfaces";

class AppGuideViewModel {
  pages: AppGuidePage[] = [];
  headerText: string = '';
  
  constructor() {
    this.pages = [];
  }

  setPages(pages: AppGuidePage[]) : void {
    this.pages = pages;
    this.setDefaultHeaderText();
  }

  setDefaultHeaderText() : void {
    this.headerText = !!this.pages.length ? this.pages[0].title : '';
  }
}

export default AppGuideViewModel;
