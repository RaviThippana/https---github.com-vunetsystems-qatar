const { before, afterEach } = require("mocha");

let moment = require("moment");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
let fileName = getDate();
let LogFileName = fileName;
localStorage.setItem("LoggerFileName", LogFileName);
const { ReusableFunctions } = require(".//Utilities/ReusableFunctions");
const { copySync } = require("fs-extra");
const ReuseFunctions = new ReusableFunctions();
// Removing existing screenshot files from screenshot folder
ReuseFunctions.removeFilesFromFolder("./Automation_Reports/screenshots");
// Removing existing video files from video and tempvideos folder
ReuseFunctions.removeFilesFromFolder("./tempVideos");
ReuseFunctions.removeFilesFromFolder("./Automation_Reports/videos");
function getDate() {
  let dateText;
  const date1 = new Date();
  dateText = moment(date1).format("DD_MM_YY(HH_mm_ss)");
  return dateText;
}
const ReportCustomFolderName = "Automation_TestReport_" + LogFileName;
module.exports = {
  reporter: "node_modules/mochawesome",
  "reporter-option": [
    "reportDir=Automation_Reports",
    "reportFilename=" + ReportCustomFolderName + "",
    "overwrite=false",
    "reportTitle=Automation Test Report",
    "json=false",
    "screenshotOnRunFailure= true",
    "screenshotsFolder=./Automation_Reports/screenshots",
    "enableCode=true",
    "charts=true",
    "showHooks=always",
    "video=true",
  ],
};
