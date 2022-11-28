class NavigationBar {
  constructor(page) {
    this.VuSmartMaps = page.locator("[aria-label='vuSmartMaps']");
    this.VusmartMapslink = page.locator(
      "//div[contains(text(),'vuSmartMaps')]"
    );
    this.VusmartMapslink1 = page.locator("//a[@class='css-l8t40p']");
    this.About = page.locator(
      "//img[@alt='vuSmartMaps logo']//following::div[contains(text(),'About')]"
    );
    this.About1 = page.locator(
      "//div[@class='css-15s2m2k']//div[contains(text(),'About')]"
    );
    this.Preferences = page.locator(
      "//div[@class='css-15s2m2k']//div[contains(text(),'Preferences')]"
    );
    this.DataStorage = page.locator(
      "//div[@class='css-15s2m2k']//div[contains(text(),'Data Storage')]"
    );
    this.EmailPrefEdit = page.locator(
      "//h2[normalize-space()='Email Preferences']/../..//button[@title='Edit']"
    );
    this.Admin = page.locator("//img[@alt='vunetadmin logo']");
    this.SignOut = page.locator("//div[contains(text(),'Sign out')]");
  }
}
module.exports = { NavigationBar };
