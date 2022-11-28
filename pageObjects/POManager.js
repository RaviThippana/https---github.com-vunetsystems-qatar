const { LoginPage } = require("./LoginPage");
const { AboutPage } = require("./AboutPage");
const { PreferencePage } = require("./PreferencePage");
const { NavigationBar } = require("./NavigationBar");
const { DataStorage } = require("./DataStorage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.aboutPage = new AboutPage(this.page);
    this.PreferencePage = new PreferencePage(this.page);
    this.NavigationBar = new NavigationBar(this.page);
    this.DataStorage = new DataStorage(this.page);
  }

  GetLoginPage() {
    return this.loginPage;
  }

  GetAboutPage() {
    return this.aboutPage;
  }

  GetPreferencePage() {
    return this.PreferencePage;
  }

  GetNavigationBar() {
    return this.NavigationBar;
  }

  GetDataStoragePage() {
    return this.DataStorage;
  }
}
module.exports = { POManager };
