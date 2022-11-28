const { before, afterEach } = require("mocha");
const { chromium } = require("playwright");
const { POManager } = require("../pageObjects/POManager");
const { ReusableFunctions } = require("../Utilities/ReusableFunctions");
const { Helper } = require("../Utilities/Helper");
const ReadExcel = require("../Utilities/ReadExcel");
const expect = require("chai").expect;

const { Logger } = require("../Utilities/Logger");
const fs = require("@supercharge/fs");
const addContext = require("mochawesome/addContext");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const LoginTestData = JSON.parse(
  JSON.stringify(require("../TestData/LoginPageTestData.json"))
);
const PrefPageTestData = JSON.parse(
  JSON.stringify(require("../TestData/PreferencePageTestData.json"))
);
let Chrome = chromium;
const ReuseFunctions = new ReusableFunctions();
const helper = new Helper();
async function displayLogFileinReport() {
  var filename = localStorage.getItem("LoggerFileName");
  const logText = await fs.content(
    "./Logger/AutomationLogs_" + filename + ".log"
  );
  return logText;
}

describe("Preference Page", () => {
  let browser, page, context;
  let testSuiteName = "Preference Page";
  ReadExcel.xlsxFile("");
  var Url = localStorage.getItem("Url");
  var UserName = localStorage.getItem("UserName");
  var Password = localStorage.getItem("Password");
  before(async function () {
    browser = await Chrome.launch({
      headless: false,
      // channel: "chrome",
    });

    context = await browser.newContext({
      args: ["--start-maximized"],
      ignoreHTTPSErrors: true,
      recordVideo: {
        FileName: "ravi",
        dir: "./tempVideos/",
        size: {
          width: 150,
          height: 100,
        },
      },
    });
    //context.clearCookies();
    page = await context.newPage();
    await page.goto(Url, {
      networkIdleTimeout: 5000,
      waitUntil: "networkidle",
      timeout: 800000,
    });
    await page.waitForLoadState("networkidle");
    //  Asserting Title of the Page
    const title = await page.title();
    expect(title).to.equal("Grafana");
    // Login
    Logger.info("Login");
    let screenShotLabelName = "Login";
    const poManager = new POManager(page);
    //const prefPage = poManager.GetPreferencePage();
    const loginpage = poManager.GetLoginPage();
    await loginpage.LoginViaVuSmartMaps(
      UserName,
      Password,
      page,
      screenShotLabelName
    );
    await page.waitForLoadState("networkidle");
  });

  after(async function () {
    Logger.info("Logout");
    let screenShotLabelName = "Logout";
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();
    await ReuseFunctions.MouseOver(
      aboutPage.Admin,
      "Admin",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      aboutPage.SignOut,
      "SignOut Link",
      page,
      screenShotLabelName
    );
    const logFile = await displayLogFileinReport();
    addContext(this, logFile);
    await browser.close();
    ReuseFunctions.renameVideoFile(testSuiteName);

    if (this.currentTest.state == "failed") {
      const video = "./Automation_Reports/videos/" + testSuiteName + ".webm";
      addContext(this, video);
    }
  });
  // Adding ScreenShots and Videos on Every Test Failure
  afterEach(async function () {
    if (this.currentTest.state == "failed") {
      const screenshot = "./screenshots/" + this.currentTest.title + ".png";
      addContext(this, screenshot);
    }
  });

  it("Preference Page - VQA-600,601,602,607,608 & 1564", async function () {
    Logger.info(
      "****** Verifying the Page by navigating to Preference Page ******"
    );
    let screenShotLabelName =
      "Preference Page - VQA-600,601,602,607,608 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    const navBar = poManager.GetNavigationBar();
    await ReuseFunctions.ClickOn(
      navBar.VuSmartMaps,
      "VuSmartMaps",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      navBar.VusmartMapslink1,
      "VusmartMaps Link",
      page,
      screenShotLabelName
    );

    await page.waitForLoadState("networkidle");
    await ReuseFunctions.ClickOn(
      navBar.Preferences,
      "Preferences Link",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.AssertElementPresent(
      prefPage.PrefPageHeader,
      "Preference Page Header",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CheckElementPresent(
      prefPage.EmailPrefEdit,
      "Email Preference Edit Button",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.SystemPrefEdit,
      "System Preference Edit Button",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.ITSMlPrefEdit,
      "ITSM Preference Edit Button",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.AnalyticsPrefEdit,
      "Analytics Report Preference Edit Button",
      page,
      screenShotLabelName
    );

    // VQA-608 No Extra Component
    const PrefPageComponents = await prefPage.TotalComponents.count();
    console.log("Count " + PrefPageComponents);
    try {
      if (PrefPageComponents === 4) {
        Logger.info("Preference Page Has no Extra Components Displayed");
      } else {
        throw new Error();
      }
    } catch (error) {
      Logger.warn("Preference Page has more than 4 Components");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw new Error("Preference Page has more than 4 Components");
    }
  });

  it("Email Preferences - VQA - 605,625 & 1564", async function () {
    Logger.info(
      "****** Verify Save and Cross buttons on the edit screen of Email Preferences section. ******"
    );
    let screenShotLabelName = "Email Preferences - VQA - 605,625 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    await ReuseFunctions.ClickOn(
      prefPage.EmailPrefEdit,
      "Email Preference Edit Button",
      page,
      screenShotLabelName
    );

    // Verifying Save Button is Enabled or Not
    await ReuseFunctions.CheckElement_isEnabled(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );
    //Verifying Close Button is Present
    await ReuseFunctions.AssertElementPresent(
      prefPage.EditCloseBtn,
      "Edit Close Link",
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA-606", async function () {
    Logger.info(
      "****** Verifying Tool Tips of Email Preferences section. ******"
    );
    let screenShotLabelName = "Email Preferences - VQA-606";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    // Validating by checking tool tip present for all the fields in Email Preferences
    await ReuseFunctions.CheckElementPresent(
      prefPage.UsernameToolTip,
      "UserName Tool Tip",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.EmailToolTip,
      "Email Tool Tip",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.PasswordToolTip,
      "Password Tool Tip",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.SMTPHostToolTip,
      "SMTP Host Tool Tip",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.SMTPPortToolTip,
      "SMTP Port Tool Tip",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.SecurityProtocolToolTip,
      "Security Protocol Tool Tip",
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA - 603,610 & 1564", async function () {
    Logger.info(
      "****** Verify the outcome of clicking on the Edit button of Email Preferences section. ******"
    );
    let screenShotLabelName = "Email Preferences - VQA - 603,610 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // Verifying the Labels and Contents in Email Preference Sections.
    const actualUsernameText = await prefPage.UserNameText.textContent();
    await ReuseFunctions.CheckElement_isTitleCase(
      actualUsernameText,
      actualUsernameText,
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      actualUsernameText,
      PrefPageTestData.UserNameText,
      page,
      screenShotLabelName
    );

    const actualEmailText = await prefPage.EmailText.textContent();
    await ReuseFunctions.CheckElement_isTitleCase(
      actualEmailText,
      actualEmailText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      actualEmailText,
      PrefPageTestData.EmailText,
      page,
      screenShotLabelName
    );

    const actualPasswordText = await prefPage.PasswordText.textContent();
    await ReuseFunctions.CheckElement_isTitleCase(
      actualPasswordText,
      actualPasswordText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      actualPasswordText,
      PrefPageTestData.PasswordText,
      page,
      screenShotLabelName
    );
    const actualSMTPHostText = await prefPage.SMTPHostText.textContent();
    await ReuseFunctions.CheckElement_isTitleCase(
      actualSMTPHostText,
      actualSMTPHostText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      actualSMTPHostText,
      PrefPageTestData.SmtpHostText,
      page,
      screenShotLabelName
    );
    const actualSMTPPortText = await prefPage.SMTPPortText.textContent();
    await ReuseFunctions.CheckElement_isTitleCase(
      actualSMTPPortText,
      actualSMTPPortText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      actualSMTPPortText,
      PrefPageTestData.SmtpPortText,
      page,
      screenShotLabelName
    );

    const actualSecurityProText =
      await prefPage.SecurityProtocolText.textContent();
    await ReuseFunctions.CheckElement_isTitleCase(
      actualSecurityProText,
      actualSecurityProText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      actualSecurityProText,
      PrefPageTestData.SecurityProtocolText,
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA-612,617,619,621,624,628 & 1564", async function () {
    Logger.info("****** Verify leaving the fields blank and saving it ******");
    let screenShotLabelName =
      "Email Preferences - VQA-612,617,619,621,624,628 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // VQA - 628 Verify leaving the fields blank and saving it
    await helper.preferencePage_EmailPref_mandatoryFields(
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA-612,613", async function () {
    Logger.info("****** Verify the username field with invalid entry ******");
    let screenShotLabelName = "Email Preferences - VQA-612,613";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    const LessThan2Charc = ReuseFunctions.GetRandomCharacs(2);
    const moreTHan62char = ReuseFunctions.GetRandomCharacs(65);
    const firstWord = ReuseFunctions.GetRandomCharacs(5);
    const secondWord = ReuseFunctions.GetRandomCharacs(5);
    const twoWords = firstWord + " " + secondWord;

    // Verifying User Name text field by entering 2 characters thus validation error alert occurs
    await helper.textLimitValidation(LessThan2Charc, page, screenShotLabelName);

    // Verifying User Name text field by entering more than 64 characters thus validation error alert occurs
    await helper.textLimitValidation(moreTHan62char, page, screenShotLabelName);

    // Verifying UserName text field by entering two words with space thus validation error alert occurs
    await helper.textLimitValidation(twoWords, page, screenShotLabelName);

    // Validating Special Characters in the Username Text Field
    await helper.preferencePage_EmailPref_SpecialCharacters(
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA-614", async function () {
    Logger.info(
      "****** Verify the username field with invalid entry by entering other than allowed special characters ******"
    );
    let screenShotLabelName = "Email Preferences - VQA-614";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // Validation UserName Textfield by entering invalid SpcialCharacter in between two words
    await helper.preferencePage_EmailPref_SpecialCharacters(
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA-616", async function () {
    Logger.info(
      "****** Verify the field by entering an invalid email id ******"
    );
    let screenShotLabelName = "Email Preferences - VQA-616";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // Entering Invalid Email ID in the Email Text Field

    await ReuseFunctions.TypeIn(
      prefPage.Email,
      "abc@vunetsystems",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.EmailAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const EmailAlertMessage = await prefPage.EmailAlert.textContent();

    await ReuseFunctions.CompareText(
      EmailAlertMessage,
      PrefPageTestData.InvalidEmailAlert,
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA-713,714 & 1564", async function () {
    Logger.info(
      "****** Verifying SMTP Port after Entering Invalid Value and Characters ******"
    );
    let screenShotLabelName = "Email Preferences - VQA-713,714 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // Entering Invalid value in the SMTP Port Field
    await helper.DataValidation_SMTPPort("65536", page, screenShotLabelName);

    // Entering Invalid value in the SMTP Port Field
    await helper.DataValidation_SMTPPort("abcd", page, screenShotLabelName);
  });

  it("Email Preferences - VQA-706", async function () {
    Logger.info(
      "****** Verifying the Cross icon (x) button by providing any value in Email Preference sections ******"
    );
    let screenShotLabelName = "Email Preferences - VQA-706";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.TypeIn(
      prefPage.UserName,
      PrefPageTestData.UserNameData1,
      "Entering Valid Data in UserName Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.Email,
      PrefPageTestData.EmailData1,
      "Entering Valid Data in Email ID Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.Password,
      PrefPageTestData.PasswordData1,
      "Entering Valid Data in Password Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.SMTPHost,
      PrefPageTestData.SMTPHostData1,
      "Entering valid data in SMTPHost Data Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.SMTPPort,
      PrefPageTestData.SMTPPortData1,
      "Entering valid data in SMTPPortData  Text Field",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.EditCloseBtn,
      "Close Button",
      page,
      screenShotLabelName
    );

    const actualUsername = await prefPage.ActualUserNameValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualUsername,
      PrefPageTestData.UserNameData1,
      page,
      screenShotLabelName
    );
    const actualEmail = await prefPage.ActualEmailValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualEmail,
      PrefPageTestData.EmailData1,
      page,
      screenShotLabelName
    );
    const actualSmtpHost = await prefPage.ActualSmtpHostValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualSmtpHost,
      PrefPageTestData.SMTPHostData1,
      page,
      screenShotLabelName
    );
    const actualSmtpPort = await prefPage.ActualSmtpPortValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualSmtpPort,
      PrefPageTestData.SMTPPortData1,
      page,
      screenShotLabelName
    );
  });

  it("Email Preferences - VQA-611,615,618,620,623 & 1564", async function () {
    Logger.info(
      "****** Verifying saving the email preferences with valid values ******"
    );
    let screenShotLabelName =
      "Email Preferences - VQA-611,615,618,620,623 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    await ReuseFunctions.ClickOn(
      prefPage.EmailPrefEdit,
      "Email Preference Edit Button",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.UserName,
      PrefPageTestData.UserNameData,
      "Entering Valid Data in UserName Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.Email,
      PrefPageTestData.EmailData,
      "Entering Valid Data in Email ID Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.Password,
      PrefPageTestData.PasswordData,
      "Entering Valid Data in Password Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.SMTPHost,
      PrefPageTestData.SMTPHostData,
      "Entering valid data in SMTPHost Data Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.SMTPPort,
      PrefPageTestData.SMTPPortData,
      "Entering valid data in SMTPPortData  Text Field",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );

    const actualUsername = await prefPage.ActualUserNameValue.textContent();

    await ReuseFunctions.CompareText(
      actualUsername,
      PrefPageTestData.UserNameData,
      page,
      screenShotLabelName
    );
    const actualEmail = await prefPage.ActualEmailValue.textContent();

    await ReuseFunctions.CompareText(
      actualEmail,
      PrefPageTestData.EmailData,
      page,
      screenShotLabelName
    );
    const actualSmtpHost = await prefPage.ActualSmtpHostValue.textContent();

    await ReuseFunctions.CompareText(
      actualSmtpHost,
      PrefPageTestData.SMTPHostData,
      page,
      screenShotLabelName
    );
    const actualSmtpPort = await prefPage.ActualSmtpPortValue.textContent();

    await ReuseFunctions.CompareText(
      actualSmtpPort,
      PrefPageTestData.SMTPPortData,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.sleep(2000);
  });

  it("ITSM Preferences - VQA-645,652,657 & 1564", async function () {
    Logger.info(
      "****** Verify the available fields when selecting Type as Service Now ******"
    );
    let screenShotLabelName = "ITSM Preferences - VQA-645,652,657 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    let type = ["Service Now", "OTRS", "Manage Engine", "Remedy"];
    await ReuseFunctions.ClickOn(
      prefPage.ITSMlPrefEdit,
      "ITSM Preferences Edit Button",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.ITSMType,
      "ITSM Type Text Field",
      page,
      screenShotLabelName
    );
    // Verifying Save Button is Enabled or Not
    await ReuseFunctions.CheckElement_isEnabled(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );
    //Verifying Close Button is Present
    await ReuseFunctions.AssertElementPresent(
      prefPage.EditCloseBtn,
      "Edit Close Link",
      page,
      screenShotLabelName
    );

    await helper.Verifying_AvailableFields_ITSM_Type(
      type,
      page,
      screenShotLabelName
    );
  });

  it("ITSM Preference - VQA-648,651,655 & 1564", async function () {
    Logger.info(
      "****** Leave all the fields blank when Type selected as Service Now/OTRS/Manage Engine/Remedy. ******"
    );
    let screenShotLabelName = "ITSM Preference - VQA-648,651,655 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // Looping each type and validating the black fields
    let type = ["Service Now", "OTRS", "Manage Engine", "Remedy"];
    for (let i = 0; i <= type.length - 1; i++) {
      await helper.preferencePage_ITSMPref_MandatoryFields(
        type[i],
        page,
        screenShotLabelName
      );
      await ReuseFunctions.ClickOn(
        prefPage.ITSMType,
        "ITSM Type Text Field",
        page,
        screenShotLabelName
      );
    }
    await page.keyboard.press("Tab");
    await ReuseFunctions.ClickOn(
      prefPage.EditCloseBtn,
      "Edit Close Link",
      page,
      screenShotLabelName
    );
  });

  it("ITSM Preference - VQA-649", async function () {
    Logger.info(
      "****** Enter valid details in all the fields when Type selected as OTRS. ******"
    );
    let screenShotLabelName = "ITSM Preference - VQA-649";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.ClickOn(
      prefPage.ITSMlPrefEdit,
      "ITSM Preferences Edit Button",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      prefPage.ITSMType,
      "ITSM Type Text Field",
      page,
      screenShotLabelName
    );
    await page.keyboard.type("OTRS");
    await page.keyboard.press("Enter");

    await ReuseFunctions.TypeIn(
      prefPage.ITSMServerURL,
      PrefPageTestData.ITSMServerUrlData,
      "Server Url",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMWebserviceName,
      PrefPageTestData.ITSMWebserviceData,
      "Web Service",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMUsername,
      PrefPageTestData.ITSMUserNameData,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMPassword,
      PrefPageTestData.ITSMPasswordData,
      "Password",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMQueue,
      PrefPageTestData.ITSMQueueData,
      "Queue",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMCustomerUser,
      PrefPageTestData.ITSMCustomerUserData,
      "Customer User",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );

    const ActualTypeOtrs = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_Type_OTRS,
      "OTRS",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      "OTRS",
      ActualTypeOtrs,
      page,
      screenShotLabelName
    );

    const ActualServerUrl = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_ServerUrl,
      "Server URL",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMServerUrlData,
      ActualServerUrl,
      page,
      screenShotLabelName
    );

    const ActualWebserviceName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_WebServiceName,
      "WebService Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMWebserviceData,
      ActualWebserviceName,
      page,
      screenShotLabelName
    );

    const ActualITSMUserName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_UserName,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMUserNameData,
      ActualITSMUserName,
      page,
      screenShotLabelName
    );

    const ActualITSMQueue = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_Queue,
      "Queue",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMQueueData,
      ActualITSMQueue,
      page,
      screenShotLabelName
    );
    const ActualITSMCustUser = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_CustomerUser,
      "Customer User",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMCustomerUserData,
      ActualITSMCustUser,
      page,
      screenShotLabelName
    );
  });

  it("ITSM Preference - VQA-653", async function () {
    Logger.info(
      "****** Enter valid details in all the fields when Type selected as Manage Engine. ******"
    );
    let screenShotLabelName = "ITSM Preference - VQA-653";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.ClickOn(
      prefPage.ITSMlPrefEdit,
      "ITSM Preferences Edit Button",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      prefPage.ITSMType,
      "ITSM Type Text Field",
      page,
      screenShotLabelName
    );
    await page.keyboard.type("Manage Engine");
    await page.keyboard.press("Enter");

    await ReuseFunctions.TypeIn(
      prefPage.ITSMServerURL,
      PrefPageTestData.ITSMServerUrlData,
      "Server Url",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMUsername,
      PrefPageTestData.ITSMUserNameData,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMPassword,
      PrefPageTestData.ITSMPasswordData,
      "Password",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMAPIKey,
      PrefPageTestData.ITSMApiKeyData,
      "API Key",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMMatchingTags,
      PrefPageTestData.ITSMMatchingTagData,
      "Matching Tags",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );

    const ActualTypeManage_Eng = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_Type_Manage_Engine,
      "Manage Engine",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      "Manage Engine",
      ActualTypeManage_Eng,
      page,
      screenShotLabelName
    );

    const ActualServerUrl = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_ServerUrl,
      "Server URL",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMServerUrlData,
      ActualServerUrl,
      page,
      screenShotLabelName
    );

    const ActualITSMUserName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_UserName,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMUserNameData,
      ActualITSMUserName,
      page,
      screenShotLabelName
    );

    const ActualITSMApi = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_ApiKey,
      "Api Key",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMApiKeyData,
      ActualITSMApi,
      page,
      screenShotLabelName
    );

    const ActualITSMMatchingTag = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_Matchingtag,
      "Matching tags",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMMatchingTagData,
      ActualITSMMatchingTag,
      page,
      screenShotLabelName
    );
  });

  it("ITSM Preference - VQA-658,660,661,662,663,664 & 1564", async function () {
    Logger.info(
      "****** Enter valid details in all the fields when Type selected as Remedy. ******"
    );
    let screenShotLabelName =
      "ITSM Preference - VQA-658,660,661,662,663,664 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.ClickOn(
      prefPage.ITSMlPrefEdit,
      "ITSM Preferences Edit Button",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      prefPage.ITSMType,
      "ITSM Type Text Field",
      page,
      screenShotLabelName
    );
    await page.keyboard.type("Remedy");
    await page.keyboard.press("Enter");

    await ReuseFunctions.TypeIn(
      prefPage.ITSMServerURL,
      PrefPageTestData.ITSMServerUrlData,
      "Server Url",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMUsername,
      PrefPageTestData.ITSMUserNameData,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMPassword,
      PrefPageTestData.ITSMPasswordData,
      "Password",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMFirstname,
      PrefPageTestData.ITSMFirstnameData,
      "FirstName",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMLastname,
      PrefPageTestData.ITSMLastnameData,
      "LastName",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMTicket_create_fields,
      PrefPageTestData.ITSMTicketCreationData,
      "Ticket Creation",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMWorklog_update_fields,
      PrefPageTestData.ITSMTicketUpdation,
      "Ticket Updation",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );

    const ActualType_Remedy = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_Type_Remedy,
      "Remedy",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      "Remedy",
      ActualType_Remedy,
      page,
      screenShotLabelName
    );

    const ActualServerUrl = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_ServerUrl,
      "Server URL",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMServerUrlData,
      ActualServerUrl,
      page,
      screenShotLabelName
    );

    const ActualITSMUserName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_UserName,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMUserNameData,
      ActualITSMUserName,
      page,
      screenShotLabelName
    );
    const ActualITSMFirstName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_FirstName,
      "First Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMFirstnameData,
      ActualITSMFirstName,
      page,
      screenShotLabelName
    );

    const ActualITSMLastName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_LastName,
      "Lasr Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMLastnameData,
      ActualITSMLastName,
      page,
      screenShotLabelName
    );

    const ActualITSMTickCreation = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_TicketCreation,
      "Ticket Creation",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMTicketCreationData,
      ActualITSMTickCreation,
      page,
      screenShotLabelName
    );

    const ActualITSMTickeUpdation = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_TicketUpdation,
      "Ticket Updation",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMTicketUpdation,
      ActualITSMTickeUpdation,
      page,
      screenShotLabelName
    );
  });

  it("ITSM Preference - VQA-646", async function () {
    Logger.info(
      "****** Enter valid details in all the fields when Type selected as Service Now. ******"
    );
    let screenShotLabelName = "ITSM Preference - VQA-646";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.ClickOn(
      prefPage.ITSMlPrefEdit,
      "ITSM Preferences Edit Button",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      prefPage.ITSMType,
      "ITSM Type Text Field",
      page,
      screenShotLabelName
    );
    await page.keyboard.type("Service Now");
    await page.keyboard.press("Enter");

    await ReuseFunctions.TypeIn(
      prefPage.ITSMServerURL,
      PrefPageTestData.ITSMServerUrlData,
      "Server Url",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.ITSMInstanceName,
      PrefPageTestData.ITSMInstanceNameData,
      "Instance Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMUsername,
      PrefPageTestData.ITSMUserNameData,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.ITSMPassword,
      PrefPageTestData.ITSMPasswordData,
      "Password",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );

    const ActualTypeServNow = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_Type_ServiceNow,
      "Service Now",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      "Service Now",
      ActualTypeServNow,
      page,
      screenShotLabelName
    );

    const ActualServerUrl = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_ServerUrl,
      "Server URL",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMServerUrlData,
      ActualServerUrl,
      page,
      screenShotLabelName
    );

    const ActualInstanceName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_InstanceName,
      "Instance Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMInstanceNameData,
      ActualInstanceName,
      page,
      screenShotLabelName
    );

    const ActualITSMUserName = await ReuseFunctions.GetText(
      prefPage.Exp_ITSM_UserName,
      "User Name",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PrefPageTestData.ITSMUserNameData,
      ActualITSMUserName,
      page,
      screenShotLabelName
    );
  });

  it("System Preferences - VQA - 605", async function () {
    Logger.info(
      "****** Verify Save and Cross buttons on the edit screen of System Preferences section. ******"
    );
    let screenShotLabelName = "System Preferences - VQA - 605";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    await ReuseFunctions.ClickOn(
      prefPage.SystemPrefEdit,
      "System Preferences Edit Button",
      page,
      screenShotLabelName
    );

    // Verifying Save Button is Enabled or Not
    await ReuseFunctions.CheckElement_isEnabled(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );
    //Verifying Close Button is Present
    await ReuseFunctions.CheckElementPresent(
      prefPage.EditCloseBtn,
      "Edit Close Link",
      page,
      screenShotLabelName
    );
  });

  it("System Preferences - VQA - 606", async function () {
    Logger.info(
      "****** Verifying the ToolTip of the System Preferences section ******"
    );
    let screenShotLabelName = "System Preferences - VQA - 606";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    /*await ReuseFunctions.CheckElementPresent(
      prefPage.SourceIPToolTip,
      "Soucre Ip Address Tool Tip",
      page,
      screenShotLabelName
    );*/
    await ReuseFunctions.CheckElementPresent(
      prefPage.TrapCredentialsToolTip,
      "TrapCredentials Tool Tip",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CheckElementPresent(
      prefPage.SNMPTrapToolTip,
      "SNMP trap discovery time interval Tool Tip",
      page,
      screenShotLabelName
    );
  });

  it("System Preferences - VQA-698,699", async function () {
    Logger.info("****** Verify the System Preferences section ******");
    let screenShotLabelName = "System Preferences - VQA-698,699";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    /* const ActualSourceIpAddText = await prefPage.SourceIPAddText.textContent();

    await ReuseFunctions.CheckElement_isTitleCase(
      ActualSourceIpAddText,
      ActualSourceIpAddText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      ActualSourceIpAddText,
      PrefPageTestData.SourceIPAddrText,
      page,
      screenShotLabelName
    );*/

    let ActualArchivalPathText = await prefPage.ArchivalPathText.textContent();
    ActualArchivalPathText = ActualArchivalPathText.slice(0, 13);
    await ReuseFunctions.CheckElement_isTitleCase(
      ActualArchivalPathText,
      ActualArchivalPathText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      ActualArchivalPathText,
      PrefPageTestData.ArchivalPathText,
      page,
      screenShotLabelName
    );
    let ActualTrapCredentialsText =
      await prefPage.TrapCredentialsText.textContent();
    ActualTrapCredentialsText = ActualTrapCredentialsText.slice(0, 16);
    await ReuseFunctions.CheckElement_isTitleCase(
      ActualTrapCredentialsText,
      ActualTrapCredentialsText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      ActualTrapCredentialsText,
      PrefPageTestData.TrapCredentialText,
      page,
      screenShotLabelName
    );

    let ActualSNMPTrapText = await prefPage.SNMPTrapText.textContent();
    ActualSNMPTrapText = ActualSNMPTrapText.slice(0, 33);
    await ReuseFunctions.CheckElement_isTitleCase(
      ActualSNMPTrapText,
      ActualSNMPTrapText,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.CompareText(
      ActualSNMPTrapText,
      PrefPageTestData.SNMPTrapText,
      page,
      screenShotLabelName
    );
  });

  /* it("System Preferences - VQA-701", async function () {
    Logger.info(
      "****** Verifying the Source IP Address Field by providing invalid values in System Preference section ******"
    );
    let screenShotLabelName = "System Preferences - VQA-701";
    await helper.preferencePage_SystemPref_SpecialCharacters(
      page,
      screenShotLabelName
    );
  });*/

  it("System Preferences - VQA-704", async function () {
    Logger.info(
      "****** Verifying the SNMP Trap Field by providing invalid values in System Preference section ******"
    );
    let screenShotLabelName = "System Preferences - VQA-704";
    await helper.textLimitValidation_SNMP("abcs", page, screenShotLabelName);
  });
  /*
  it("System Preferences - VQA-708", async function () {
    Logger.info(
      "****** Verifying the SNMP Trap Field by providing invalid values in System Preference section ******"
    );
    let screenShotLabelName = "System Preferences - VQA-708";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // Verifying Mandatory Field for Source IP Address Text Field

     await ReuseFunctions.TypeIn(
      prefPage.SourceIpAddress,
      "",
      "Providing null characters in the SourceIPAddress TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.SouceIpAddrAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const SouceIPAlertMessage = await prefPage.SouceIpAddrAlert.textContent();
    await ReuseFunctions.CompareText(
      SouceIPAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );
    // Verifying Mandatory Field for Trap Credentials Text Field
    await ReuseFunctions.TypeIn(
      prefPage.TrapCredentials,
      "",
      "Providing null characters in the Trap Credentials TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.TrapCredentialsAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const TrapCredAlertMessage =
      await prefPage.TrapCredentialsAlert.textContent();
    await ReuseFunctions.CompareText(
      TrapCredAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );
    // Verifying Mandatory Field for SNMPTrap  Text Field
    await ReuseFunctions.TypeIn(
      prefPage.SNMPTrap,
      "",
      "Providing null characters in the SNMPTrap TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.SNMPTrapAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const SNMPTrapAlertMessage = await prefPage.SNMPTrapAlert.textContent();
    await ReuseFunctions.CompareText(
      SNMPTrapAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );
  });
*/
  it("System Preferences - VQA - 706", async function () {
    Logger.info(
      "****** Verifying the Cross icon (x) button by providing any value in System Preference section ******"
    );
    let screenShotLabelName = "System Preferences - VQA - 706";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    /*await ReuseFunctions.TypeIn(
      prefPage.SourceIpAddress,
      PrefPageTestData.SourceIPAddrData1,
      "Entering Valid Data in SourceIpAddress Text Field",
      page,
      screenShotLabelName
    );*/
    await ReuseFunctions.TypeIn(
      prefPage.ArchivalPath,
      PrefPageTestData.ArchivalPathData1,
      "Entering Valid Data in ArchivalPath Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.TrapCredentials,
      PrefPageTestData.TrapCredData1,
      "Entering Valid Data in TrapCredentials Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.SNMPTrap,
      PrefPageTestData.SNMPTrapData1,
      "Entering Valid Data in SNMP trap discovery time intervals Text Field",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.EditCloseBtn,
      "Close Button",
      page,
      screenShotLabelName
    );

    /*const actualSourceIpAddress =
      await prefPage.ActualSourceIpAddressValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualSourceIpAddress,
      PrefPageTestData.SourceIPAddrData1,
      page,
      screenShotLabelName
    );*/
    const actualArchivalPath =
      await prefPage.ActualArchivalPathValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualArchivalPath,
      PrefPageTestData.ArchivalPathData1,
      page,
      screenShotLabelName
    );
    const actualTrapCred =
      await prefPage.ActualTrapCredentialsValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualTrapCred,
      PrefPageTestData.TrapCredData1,
      page,
      screenShotLabelName
    );
    const actualSmtpPort = await prefPage.ActualSNMPTrapValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      actualSmtpPort,
      PrefPageTestData.SNMPTrapData1,
      page,
      screenShotLabelName
    );
  });

  it("System Preferences - VQA - 700,702,703,705 & 1564", async function () {
    Logger.info(
      "****** Verifying the Submit button by providing Valid value in System Preference section ******"
    );
    let screenShotLabelName =
      "System Preferences - VQA - 700,702,703,705 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.ClickOn(
      prefPage.SystemPrefEdit,
      "System Preference Edit Button",
      page,
      screenShotLabelName
    );
    /* await ReuseFunctions.TypeIn(
      prefPage.SourceIpAddress,
      PrefPageTestData.SourceIPAddrData,
      "Entering Valid Data in SourceIpAddress Text Field",
      page,
      screenShotLabelName
    );*/
    await ReuseFunctions.TypeIn(
      prefPage.ArchivalPath,
      PrefPageTestData.ArchivalPathData,
      "Entering Valid Data in ArchivalPath Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.TrapCredentials,
      PrefPageTestData.TrapCredData,
      "Entering Valid Data in TrapCredentials Text Field",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      prefPage.SNMPTrap,
      PrefPageTestData.SNMPTrapData,
      "Entering Valid Data in SNMP trap discovery time intervals Text Field",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );
    /*
    const actualSourceIpAddress =
      await prefPage.ActualSourceIpAddressValue.textContent();

    await ReuseFunctions.CompareText(
      actualSourceIpAddress,
      PrefPageTestData.SourceIPAddrData,
      page,
      screenShotLabelName
    );*/
    const actualArchivalPath =
      await prefPage.ActualArchivalPathValue.textContent();

    await ReuseFunctions.CompareText(
      actualArchivalPath,
      PrefPageTestData.ArchivalPathData,
      page,
      screenShotLabelName
    );
    const actualTrapCred =
      await prefPage.ActualTrapCredentialsValue.textContent();

    await ReuseFunctions.CompareText(
      actualTrapCred,
      PrefPageTestData.TrapCredData,
      page,
      screenShotLabelName
    );
    const actualSmtpPort = await prefPage.ActualSNMPTrapValue.textContent();

    await ReuseFunctions.CompareText(
      actualSmtpPort,
      PrefPageTestData.SNMPTrapData,
      page,
      screenShotLabelName
    );

    await ReuseFunctions.sleep(2000);
  });
  it("Analytics Reports Preferences - 605", async function () {
    Logger.info(
      "****** Verify Save and Cross buttons on the edit screen of Analytics Reports Preferences section. ******"
    );
    let screenShotLabelName = "Analytics Reports Preferences - 605";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    await ReuseFunctions.ClickOn(
      prefPage.AnalyticsPrefEdit,
      "Analytics Reports Preferences Edit Button",
      page,
      screenShotLabelName
    );

    // Verifying Save Button is Enabled or Not
    await ReuseFunctions.CheckElement_isEnabled(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );
    //Verifying Close Button is Present
    await ReuseFunctions.CheckElementPresent(
      prefPage.EditCloseBtn,
      "Edit Close Link",
      page,
      screenShotLabelName
    );
  });
  it("Analytics Reports Preferences - 606,712 & 1564", async function () {
    Logger.info(
      "****** Verify the validation message after leaving the Date Format field blank ******"
    );
    let screenShotLabelName = "Analytics Reports Preferences - 606,712 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    // Verifying Mandatory Field for Source IP Address Text Field

    // Verifying Tool Tip for Date Format field
    await ReuseFunctions.CheckElementPresent(
      prefPage.DateFormatToolTip,
      "Date Format Tool Tip",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      prefPage.DateFormat,
      "",
      "Providing null characters in the DateFormat TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.DateFormatAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const DateFormatAlertMessage = await prefPage.DateFormatAlert.textContent();
    await ReuseFunctions.CompareText(
      DateFormatAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );
  });

  it("Analytics Reports Preferences - 706", async function () {
    Logger.info(
      "****** Verifying the Cross icon (x) button by providing any value in Analytical Reports Preference section ******"
    );
    let screenShotLabelName = "Analytics Reports Preferences - 706";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.TypeIn(
      prefPage.DateFormat,
      PrefPageTestData.DateFormatData1,
      "Providing Valid Data in the DateFormat TextField",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.EditCloseBtn,
      "Close Button",
      page,
      screenShotLabelName
    );
    const dateformatvalue = await prefPage.ActualDateFormatValue.textContent();

    await ReuseFunctions.TextNotToBeEqual(
      dateformatvalue,
      PrefPageTestData.DateFormatData1,
      page,
      screenShotLabelName
    );
  });

  it("Analytics Reports Preferences - 710,711 & 1564", async function () {
    Logger.info(
      "****** Verify entering invalid Date format in Tabular Reports Preference and saving it. ******"
    );
    let screenShotLabelName = "Analytics Reports Preferences - 710,711 & 1564";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();
    const InvalidDateFormats = PrefPageTestData.InvalidDateFormats;
    await ReuseFunctions.ClickOn(
      prefPage.AnalyticsPrefEdit,
      "Edit Button",
      page,
      screenShotLabelName
    );
    for (let i = 1; i <= InvalidDateFormats.length - 1; i++) {
      await ReuseFunctions.TypeIn(
        prefPage.DateFormat,
        InvalidDateFormats[i],
        "Providing InValid Data " +
          InvalidDateFormats[i] +
          " in the DateFormat TextField",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.AssertAlertPresent(
        prefPage.DateFormatAlert,
        "for " + InvalidDateFormats[i] + "  Invalid Date Format and",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.CheckElement_isDisabled(
        prefPage.SaveButton,
        "Save Button is Disabled for Entering Invalid Date " +
          InvalidDateFormats[i] +
          " Format and",
        page,
        screenShotLabelName
      );
    }
  });

  it("Analytics Reports Preferences - 709", async function () {
    Logger.info(
      "****** Verify entering valid Date format in Tabular Reports Preference and saving it. ******"
    );
    let screenShotLabelName = "Analytics Reports Preferences - 709";
    const poManager = new POManager(page);
    const prefPage = poManager.GetPreferencePage();

    await ReuseFunctions.TypeIn(
      prefPage.DateFormat,
      PrefPageTestData.DateFormatData,
      "Providing Valid Data in the DateFormat TextField",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );

    /*const obj = await prefPage.ActualDateFormatValueCount;
    console.log(obj);*/
    const dateformatvalue = await prefPage.ActualDateFormatValue.textContent();

    await ReuseFunctions.CompareText(
      dateformatvalue,
      PrefPageTestData.DateFormatData,
      page,
      screenShotLabelName
    );
  });
});
