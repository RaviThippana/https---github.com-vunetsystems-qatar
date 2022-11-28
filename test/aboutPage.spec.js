const { before, afterEach } = require("mocha");
const { chromium } = require("playwright");
const { POManager } = require("../pageObjects/POManager");
const { ReusableFunctions } = require("../Utilities/ReusableFunctions");
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
const AboutPageTestData = JSON.parse(
  JSON.stringify(require("../TestData/AboutPageTestData.json"))
);
// Copying build_information.json file to automation project folder
fs.copyFileSync(
  "D:/BuildInformation/build_information.json",
  "./build_information/build_information.json"
);
const buildInformation = JSON.parse(
  JSON.stringify(require("../build_information/build_information.json"))
);

let Chrome = chromium;
const ReuseFunctions = new ReusableFunctions();

async function displayLogFileinReport() {
  var filename = localStorage.getItem("LoggerFileName");

  const logText = await fs.content(
    "./Logger/AutomationLogs_" + filename + ".log"
  );
  return logText;
}

describe("About Page", () => {
  let browser, page, context;
  let testSuiteName = "About Page";
  ReadExcel.xlsxFile("");
  var Url = localStorage.getItem("Url");
  var UserName = localStorage.getItem("UserName");
  var Password = localStorage.getItem("Password");
  before(async function () {
    browser = await Chrome.launch({
      headless: false,
      channel: "chrome",
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

    // console.log("Visible Statment" + expect(title).to.be.visible);
    // Login
    Logger.info("Login");
    let screenShotLabelName = "Login";
    const poManager = new POManager(page);
    const loginpage = poManager.GetLoginPage();

    await loginpage.LoginViaVuSmartMaps(
      UserName,
      Password,
      page,
      screenShotLabelName
    );
    /*
    await loginpage.Login(
      LoginTestData.userName,
      LoginTestData.password,
      page,
      screenShotLabelName
    );*/
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
    ReuseFunctions.renameVideoFile(this.currentTest.title);
    /*console.log("statg " + this.cur);
    if (this.currentTest.state == "failed") {
      const video = "./Automation_Reports/videos/" + testSuiteName + ".webm";
      console.log(video);
      addContext(this, video);
    }*/
  });
  // Adding ScreenShots and Videos on Every Test Failure
  afterEach(async function () {
    if (this.currentTest.state == "failed") {
      const screenshot = "./screenshots/" + this.currentTest.title + ".png";
      addContext(this, screenshot);
      console.log(screenshot);
      /*  const video =
        "./Automation_Reports/videos/" + this.currentTest.title + ".webm";
      console.log("Video Path" + video);
      
      addContext(this, video);*/
    }
  });

  it("01. VQA - 218_221", async function () {
    let versionfromJson = buildInformation.platform_info.version;
    let cairofromJson = buildInformation.platform_info.component_version.cairo;
    let viennafromJson =
      buildInformation.platform_info.component_version.vienna;
    Logger.info("01. Verifying About Page - VQA - 218/219 & 221");
    let screenShotLabelName = "1. VQA - 218_221";
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();
    const navBar = poManager.GetNavigationBar();

    await page.waitForLoadState("networkidle");

    await ReuseFunctions.MouseOver(
      aboutPage.VuSmartMaps,
      "VuSmartMaps",
      page,
      screenShotLabelName
    );

    // Work around to reach the about page..
    await ReuseFunctions.ClickOn(
      aboutPage.VusmartMapslink,
      "VusmartMaps Link",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.ClickOn(
      aboutPage.VusmartMapslink1,
      "VusmartMaps Link1",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      navBar.About1,
      "About1 Link",
      page,
      screenShotLabelName
    );
    /*
    await ReuseFunctions.ClickOn(
      aboutPage.About,
      "About Link",
      page,
      screenShotLabelName
    ); */
    await page.waitForLoadState("networkidle");

    let softrele = await ReuseFunctions.GetText(
      aboutPage.SoftwareRelease,
      "SoftwareRelease Text",
      page,
      screenShotLabelName
    );

    softrele = softrele.trim();
    await ReuseFunctions.CompareText(
      softrele,
      AboutPageTestData.SoftwareRelease,
      page,
      screenShotLabelName
    );
    let compinfo = await ReuseFunctions.GetText(
      aboutPage.CompanyInfo,
      "CompanyInformation Text",
      page,
      screenShotLabelName
    );

    compinfo = compinfo.trim();

    await ReuseFunctions.CompareText(
      compinfo,
      AboutPageTestData.CompanyInfo,
      page,
      screenShotLabelName
    );
    let verNo = await ReuseFunctions.GetText(
      aboutPage.VersionNo,
      "Version Number Text",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      verNo,
      versionfromJson,
      page,
      screenShotLabelName
    );
    let versionText = await ReuseFunctions.GetText(
      aboutPage.Version,
      "Version Text",
      page,
      screenShotLabelName
    );

    versionText = versionText.trim();
    await ReuseFunctions.CompareText(
      versionText,
      AboutPageTestData.Version,
      page,
      screenShotLabelName
    );
    /*
    let vieNo = await aboutPage.ViennaNo.textContent();
    await ReuseFunctions.CompareText(
      vieNo,
      viennafromJson,
      page,
      screenShotLabelName
    );

   
    let viennaText = await aboutPage.Vienna.textContent();
    viennaText = viennaText.trim();
    await ReuseFunctions.CompareText(
      viennaText,
      AboutPageTestData.Vienna,
      page,
      screenShotLabelName
    );
    let cairNo = await aboutPage.CairoNo.textContent();
    await ReuseFunctions.CompareText(
      cairNo,
      cairofromJson,
      page,
      screenShotLabelName
    );
    let cairoText = await aboutPage.Cairo.textContent();
    cairoText = cairoText.trim();
    await ReuseFunctions.CompareText(
      cairoText,
      AboutPageTestData.Cairo,
      page,
      screenShotLabelName
    );
*/

    let CompanyNameText = await ReuseFunctions.GetText(
      aboutPage.CompanyName,
      "Company Name Text",
      page,
      screenShotLabelName
    );

    CompanyNameText = CompanyNameText.trim();
    await ReuseFunctions.CompareText(
      CompanyNameText,
      AboutPageTestData.CompanyName,
      page,
      screenShotLabelName
    );
    let EmailIdText = await ReuseFunctions.GetText(
      aboutPage.Email,
      "Email ID Text",
      page,
      screenShotLabelName
    );

    EmailIdText = EmailIdText.trim();

    await ReuseFunctions.CompareText(
      EmailIdText,
      AboutPageTestData.Email,
      page,
      screenShotLabelName
    );
    let PhoneText = await ReuseFunctions.GetText(
      aboutPage.PhoneNumber,
      "Phone NO Text",
      page,
      screenShotLabelName
    );

    PhoneText = PhoneText.trim();

    await ReuseFunctions.CompareText(
      PhoneText,
      AboutPageTestData.PhoneNumber,
      page,
      screenShotLabelName
    );
  });

  it("02. VQA-222 & 223", async function () {
    Logger.info(
      "02. Verifying the Cross icon (x) button in Edit pop-up screen"
    );
    let screenShotLabelName = "02. VQA-222 & 223";
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();
    await ReuseFunctions.ClickOn(
      aboutPage.EditButton,
      "Edit Button",
      page,
      screenShotLabelName
    );
    // Verifying Save Button is Enabled or Not
    await ReuseFunctions.CheckElement_isEnabled(
      aboutPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.AssertElementPresent(
      aboutPage.CloseLink,
      "Close Link",
      page,
      screenShotLabelName
    );
  });

  it("03. VQA-224 & 234,235", async function () {
    Logger.info("03. Validating Tool Tips in Edit Pop Screen - VQA-224 & 234");
    let screenShotLabelName = "03. VQA-224 & 234,235";
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();

    await ReuseFunctions.MouseOver(
      aboutPage.CompanyNameToolTip,
      "CompanyToolTip",
      page,
      screenShotLabelName
    );

    let ActualCompanyToolTip = await ReuseFunctions.GetText(
      aboutPage.CompanyNameToolTipText,
      "Company Tool Tip Text",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      ActualCompanyToolTip,
      AboutPageTestData.CompanyToolTip,
      page,
      screenShotLabelName
    );
    await ReuseFunctions.MouseOver(
      aboutPage.EmailIDToolTip,
      "EmailIDToolTip",
      page,
      screenShotLabelName
    );
    let ActualEmailIDToolTip = await ReuseFunctions.GetText(
      aboutPage.EmailIDToolTipText,
      "Email ID Tip Text",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      ActualEmailIDToolTip,
      AboutPageTestData.EmailToolTip,
      page,
      screenShotLabelName
    );

    await ReuseFunctions.MouseOver(
      aboutPage.PhoneToolTip,
      "PhoneNoToolTip",
      page,
      screenShotLabelName
    );
    let ActualPhoneToolTip = await ReuseFunctions.GetText(
      aboutPage.PhoneToolTipText,
      "Phone Tool Tip Text",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      ActualPhoneToolTip,
      AboutPageTestData.PhoneNOToolTip,
      page,
      screenShotLabelName
    );
  });

  it("04. VQA-225_230", async function () {
    Logger.info(
      "04. Verifying the Character limit of Company, Email & PhoneNo Field - VQA-225_230"
    );
    let screenShotLabelName = "04. VQA-225_230";
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();

    const LessThan3Charc = ReuseFunctions.GetRandomCharacs(3);

    await ReuseFunctions.TypeIn(
      aboutPage.CompanyNameTextField,
      LessThan3Charc,
      "Entering 3 Characters in Company Name TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      aboutPage.Alert,
      "for entering 3 characters in the Company Name Textfield",
      page,
      screenShotLabelName
    );

    let TextAlertMessage = await ReuseFunctions.GetText(
      aboutPage.Alert,
      "Text Alert Message",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      TextAlertMessage,
      AboutPageTestData.ActualTextAlertMessage,
      page,
      screenShotLabelName
    );
    // Providing name with more than 100 Characters
    const MoreThan100Characs = ReuseFunctions.GetRandomCharacs(101);
    await ReuseFunctions.TypeIn(
      aboutPage.CompanyNameTextField,
      MoreThan100Characs,
      "Entering More Than 100 Characters in Company Name TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      aboutPage.Alert,
      "for entering more than 100 characters in the Company Name Textfield",
      page,
      screenShotLabelName
    );

    // Providing name 100 Characters
    const Entering100Characs = ReuseFunctions.GetRandomCharacs(100);
    await ReuseFunctions.TypeIn(
      aboutPage.CompanyNameTextField,
      Entering100Characs,
      "Entering 100 Characters in Company Name TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      aboutPage.Alert,
      "for entering 100 characters in the Company Name Textfield",
      page,
      screenShotLabelName
    );

    // VQA-229 Verifying the Email field....
    await ReuseFunctions.TypeIn(
      aboutPage.EmailTextField,
      LessThan3Charc,
      "Entering Less Than 3 Characters in EmailID TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      aboutPage.Alert,
      "for entering 3 characters in the EmailID Textfield",
      page,
      screenShotLabelName
    );
    let EmailAlertMessage = await ReuseFunctions.GetText(
      aboutPage.Alert,
      "Email Alert Message",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      EmailAlertMessage,
      AboutPageTestData.ActualEmailAlertMessage,
      page,
      screenShotLabelName
    );

    await ReuseFunctions.TypeIn(
      aboutPage.EmailTextField,
      "test@abc.com",
      "Entering Valid in the EmailID TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      aboutPage.Alert,
      "for entering Valid Email in the EmailID Textfield",
      page,
      screenShotLabelName
    );

    // Verifying the Phone Number Field

    await ReuseFunctions.TypeIn(
      aboutPage.PhoneNoTextField,
      ReuseFunctions.GetRandomNumbers(8),
      "Entering InValid PhoneNumber in the Phone TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      aboutPage.Alert,
      "for entering invalid PhoneNumber in the Phone Textfield",
      page,
      screenShotLabelName
    );
    let PhoneAlertMessage = await ReuseFunctions.GetText(
      aboutPage.Alert,
      "Phone Alert Message",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PhoneAlertMessage,
      AboutPageTestData.ActualPhoneAlertMessage,
      page,
      screenShotLabelName
    );
  });

  it("05. VQA-231", async function () {
    Logger.info(
      "05. Verifying the mandatory fields without providing values to it in Edit pop-up screen - VQA-231"
    );
    let screenShotLabelName = "05. VQA-231";
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();
    await ReuseFunctions.TypeIn(
      aboutPage.CompanyNameTextField,
      "",
      "Providing null characters in the Company Name TextField",
      page,
      screenShotLabelName
    );

    //Verifying the mandatory fields without providing values for Company Text Field
    ReuseFunctions.checkAlertPresent(
      aboutPage.CompanyNameAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    let TextAlertMessage = await ReuseFunctions.GetText(
      aboutPage.CompanyNameAlert,
      "CompanyName Alert Message",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      TextAlertMessage,
      AboutPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );
    //Verifying the mandatory fields without providing values for EmailID Text Field
    await ReuseFunctions.TypeIn(
      aboutPage.EmailTextField,
      "",
      "Providing null characters in the EmailID TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      aboutPage.EmailidAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    let EmailAlertMessage = await ReuseFunctions.GetText(
      aboutPage.EmailidAlert,
      "EmailID Alert Message",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      EmailAlertMessage,
      AboutPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );

    //Verifying the mandatory fields without providing values for PhoneNo Text Field
    await ReuseFunctions.TypeIn(
      aboutPage.PhoneNoTextField,
      "",
      "Providing null characters in the Phone TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      aboutPage.PhoneNoAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    let PhoneAlertMessage = await ReuseFunctions.GetText(
      aboutPage.PhoneNoAlert,
      "PhoneNo Alert Message",
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      PhoneAlertMessage,
      AboutPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );
  });

  it("06. VQA-232", async function () {
    Logger.info(
      "06. Verifying the company information section after editing the details-VQA-232"
    );
    let screenShotLabelName = "06. VQA-232";
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();

    await ReuseFunctions.TypeIn(
      aboutPage.CompanyNameTextField,
      AboutPageTestData.EditCompanyName,
      "Entering Valid CompanyName in CompanyName TextField",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      aboutPage.EmailTextField,
      AboutPageTestData.EditEmailID,
      "Entering Valid EmailId in EmailID TextField",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.TypeIn(
      aboutPage.PhoneNoTextField,
      AboutPageTestData.EditPhoneNumber,
      "Entering Valid PhoneNumber in PhoneNumber TextField",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      aboutPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );
    ReuseFunctions.sleep(1500);

    const failedalert = await aboutPage.RequestFailedAlert.count();

    if (failedalert > 0) {
      Logger.warn("Request Failed Status");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw new Error(
        "Request Failed Status Error Displayed after Save Button is Clicked"
      );
    } else {
      const ActualCompanyInfo = await ReuseFunctions.GetText(
        aboutPage.ActualCompanyInfo,
        "Actual Company Information text",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.CompareText(
        ActualCompanyInfo,
        AboutPageTestData.EditCompanyName,
        page,
        screenShotLabelName
      );
      let ActualEmailIDInfo = await ReuseFunctions.GetText(
        aboutPage.ActualEmailID,
        "Actual EmailID",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.CompareText(
        ActualEmailIDInfo,
        AboutPageTestData.EditEmailID,
        page,
        screenShotLabelName
      );
      let ActualPhoneNo = await ReuseFunctions.GetText(
        aboutPage.ActualPhoneNumber,
        "Actual PhoneNumber",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.CompareText(
        ActualPhoneNo,
        AboutPageTestData.EditPhoneNumber,
        screenShotLabelName
      );
    }
  });
});
