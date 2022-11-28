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

describe("Data Storage Page", () => {
  let browser, page, context;
  let testSuiteName = "Data Storage Page";
  ReadExcel.xlsxFile("");
  var Url = localStorage.getItem("Url");
  var UserName = localStorage.getItem("UserName");
  var Password = localStorage.getItem("Password");
  before(async function () {
    browser = await Chrome.launch({
      headless: false,
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
    await page.waitForLoadState("networkidle");
  });

  after(async function () {
    Logger.info("Logout");
    let screenShotLabelName = "Logout";
    const poManager = new POManager(page);
    const NavBar = poManager.GetNavigationBar();
    await ReuseFunctions.MouseOver(
      NavBar.Admin,
      "Admin",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.ClickOn(
      NavBar.SignOut,
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

  it("Data Storage -  VQA-1581,1582", async function () {
    Logger.info(
      "****** Verifying the Page Sections by navigating to Data Page ******"
    );
    let screenShotLabelName = "Data Storage -  VQA-1581,1582";
    const poManager = new POManager(page);
    const DataStoragePage = poManager.GetDataStoragePage();
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
      navBar.DataStorage,
      "Data Storage Link",
      page,
      screenShotLabelName
    );

    // Asserting the section Elastic Search

    await ReuseFunctions.AssertElementPresent(
      DataStoragePage.ElasticSearch,
      "Elastic Search",
      page,
      screenShotLabelName
    );

    // Asserting Data Storage Sub Sections Active and Archived Indices.
    await ReuseFunctions.AssertElementPresent(
      DataStoragePage.ActiveIndicesBtn,
      "Active Indices",
      page,
      screenShotLabelName
    );
    await ReuseFunctions.AssertElementPresent(
      DataStoragePage.ArchivedIndicesBtn,
      "Archived Indices",
      page,
      screenShotLabelName
    );
  });

  it("Data Storage -  VQA-1590", async function () {
    Logger.info("****** KPI Validation ******");
    let screenShotLabelName = "Data Storage -  VQA-1590";

    // Active Indices KPI Validation

    await helper.ActiveIndices_KPI_Validation(page, screenShotLabelName);
  });
});
