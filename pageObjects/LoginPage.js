const { ReusableFunctions } = require("../Utilities/ReusableFunctions");
class LoginPage {
  constructor(page) {
    this.page = page;
    this.UserName = page.locator("[aria-label='Username input field']");
    this.Password = page.locator("[type='password']");
    this.LoginButton = page.locator("[aria-label='Login button']");
    this.LoginAlert = page.locator(
      "(//*[name()='svg'][@class='css-1k9fskn'])[1]"
    );
    this.signinVusmart = page.locator(
      "//span[normalize-space()='Sign in with vuSmartMaps']"
    );
    this.vuSmartUserName = page.locator("//input[@id='Username']");
    this.vuSmartPassword = page.locator("//input[@id='Password']");
    this.vuSmartLoginBtn = page.locator("[value='login']");
  }

  async Login(UserName, Password, page, screenShotLabelName) {
    const ResuseFunctions = new ReusableFunctions();
    await ResuseFunctions.TypeIn(
      this.UserName,
      UserName,
      "in UserName field",
      page,
      screenShotLabelName
    );
    await ResuseFunctions.TypeIn(
      this.Password,
      Password,
      "in Password field",
      page,
      screenShotLabelName
    );

    await ResuseFunctions.ClickOn(this.LoginButton, "Login Button");
  }

  async LoginViaVuSmartMaps(UserName, Password, page, screenShotLabelName) {
    const ResuseFunctions = new ReusableFunctions();

    await ResuseFunctions.ClickOn(this.signinVusmart, "Sign in VuSmartMaps");

    await ResuseFunctions.TypeIn(
      this.vuSmartUserName,
      UserName,
      "in UserName field",
      page,
      screenShotLabelName
    );
    await ResuseFunctions.TypeIn(
      this.vuSmartPassword,
      Password,
      "in Password field",
      page,
      screenShotLabelName
    );

    await ResuseFunctions.ClickOn(
      this.vuSmartLoginBtn,
      "VuSmartMapsLogin Button"
    );
  }
}
module.exports = { LoginPage };
