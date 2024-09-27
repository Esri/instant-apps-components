import { AppGuidePage } from "./interfaces/interfaces";

class AppGuideViewModel {
  pages: AppGuidePage[];
  
  constructor() {
    this.pages = [];
  }

  addPage(page: AppGuidePage) : void {
    this.pages = [...this.pages, page];
  }

  removePage(page: AppGuidePage) : void {
    this.pages = this.pages.filter(p => p !== page);
  }
}

export default AppGuideViewModel;
