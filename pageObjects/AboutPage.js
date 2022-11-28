class AboutPage {
  constructor(page) {
    this.VuSmartMaps = page.locator("[aria-label='vuSmartMaps']");
    this.VusmartMapslink = page.locator(
      "//div[contains(text(),'vuSmartMaps')]"
    );
    this.VusmartMapslink1 = page.locator("//a[@class='css-l8t40p']");
    this.About1 = page.locator("//h2[normalize-space()='About']");

    this.About = page.locator("//div[contains(text(),'About')]");

    //this.Admin = page.locator("//a[@aria-label='admin']");
    this.Admin = page.locator("//img[@alt='vunetadmin logo']");
    this.SignOut = page.locator("//div[contains(text(),'Sign out')]");
    this.EditButton = page.locator("[aria-label='Edit']");
    this.SoftwareRelease = page.locator(
      "(//h2[normalize-space()='Software Release'])"
    );
    this.CompanyInfo = page.locator(
      "(//h2[normalize-space()='Company Information'])"
    );
    this.Version = page.locator("(//span[normalize-space()='Version'])");
    this.Vienna = page.locator("(//span[normalize-space()='Vienna'])");
    this.Cairo = page.locator("(//span[normalize-space()='Cairo'])");
    this.VersionNo = page.locator(
      "//span[normalize-space()='Version']//following::span[1]"
    );
    this.ViennaNo = page.locator(
      "//span[normalize-space()='Vienna']//following::span[1]"
    );
    this.CairoNo = page.locator(
      "//span[normalize-space()='Cairo']//following::span[1]"
    );
    this.CompanyName = page.locator(
      "(//span[normalize-space()='Company Name'])"
    );
    this.Email = page.locator("(//span[normalize-space()='Email'])");
    this.PhoneNumber = page.locator(
      "(//span[normalize-space()='Phone Number'])"
    );
    this.CompanyNameToolTip = page.locator(
      "//div[normalize-space()='Company Name']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );
    this.EmailIDToolTip = page.locator(
      "//div[normalize-space()='Email']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.PhoneToolTip = page.locator(
      "//div[normalize-space()='Phone Number']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.CompanyNameToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'company')]"
    );
    this.EmailIDToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'Email')]"
    );
    this.PhoneToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'phone')]"
    );
    this.CompanyNameTextField = page.locator(
      "//input[@name='enterprise_name']"
    );
    this.EmailTextField = page.locator("//input[@name='email']");
    this.PhoneNoTextField = page.locator("//input[@name='phone_no']");
    this.SaveButton = page.locator("//button[@type='submit']");
    this.CloseLink = page.locator("//button[@aria-label='Close dialogue']");

    this.ActualCompanyInfo = page.locator(
      "//span[normalize-space()='Company Name']//following::span[1]"
    );
    this.ActualEmailID = page.locator(
      "//span[normalize-space()='Email']//following::span[1]"
    );
    this.ActualPhoneNumber = page.locator(
      "//span[normalize-space()='Phone Number']//following::span[1]"
    );
    //this.ActualCompanyInfo = page.locator("(//div[@class='td css-0'])[8]");
    //this.ActualEmailID = page.locator("(//div[@class='td css-0'])[10]");
    // this.ActualPhoneNumber = page.locator("(//div[@class='td css-0'])[12]");
    this.Alert = page.locator("//div[@role='alert']");
    this.CompanyNameAlert = page.locator("(//div[@role='alert'])[1]");
    this.EmailidAlert = page.locator("(//div[@role='alert'])[2]");
    this.PhoneNoAlert = page.locator("(//div[@role='alert'])[3]");
    //this.Alert = page.locator("//div[@role='ravi']");
    this.RequestFailedAlert = page.locator(
      "//div[@data-testid='data-testid Alert error']"
    );
  }
}
module.exports = { AboutPage };
