const expect = require("chai").expect;
const { Logger } = require("../Utilities/Logger");
const fs = require("@supercharge/fs");
const path = require("path");
let moment = require("moment");
class ReusableFunctions {
  getDate() {
    let dateText;
    const date1 = new Date();
    dateText = moment(date1).format("DD_MM_YY(HH_mm_ss)");
    return dateText;
  }
  GetRandomCharacs(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  removeFilesFromFolder(directory) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }

  renameVideoFile(fileName) {
    fs.readdir("./tempVideos", (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.copyFileSync(
          "./tempVideos/" + file + "",
          "./Automation_Reports/videos/" + fileName + ".webm"
        );
      }
    });
  }

  GetRandomNumbers(length) {
    var result = "";

    var numbers = "0123456789";
    var numLen = numbers.length;
    for (var i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numLen));
    }
    return result;
  }

  async ClickOn(Element, Label, page, screenShotLabelName) {
    try {
      await Element.click();
      Logger.info(Label + " Clicked Successfully");
    } catch (error) {
      Logger.warn(Label + " Element Not Present");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }

  async checkAlertPresent(Element, Label, page, screenShotLabelName) {
    try {
      expect(Element).to.exist;
      Logger.info("Alert Present " + Label);
    } catch (error) {
      Logger.warn(" Alert is not Present " + Label);
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }

  async AssertAlertPresent(Element, Label, page, screenShotLabelName) {
    let elementcount = await Element.count();
    try {
      if (elementcount === 1) {
        Logger.info(Label + " Alert Present");
      } else if (elementcount >= 0) {
        throw new Error();
      }
    } catch (error) {
      Logger.warn(" Alert is not Present " + Label);
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw new Error("Alert is Not Present " + Label);
    }
  }

  async MouseOver(Element, Label, page, screenShotLabelName) {
    try {
      await Element.hover();
      Logger.info(Label + " Mouse Over Succeeds");
    } catch (error) {
      Logger.warn(Label + " Element Not Present");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }
  async CompareText(Expected, Actual, page, screenShotLabelName) {
    try {
      //expect(Expected).to.equal(Actual);
      expect(Expected).to.deep.equal(Actual);
      Logger.info(
        "Expected String.. [" +
          Expected +
          "] Matches with Actual String.. [" +
          Actual +
          "]"
      );
    } catch (error) {
      Logger.warn(
        "Expected String.. [" +
          Expected +
          "]  is not Matching with Actual String.. [" +
          Actual +
          "]"
      );
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }
  async TextNotToBeEqual(Expected, Actual, page, screenShotLabelName) {
    try {
      expect(Expected).to.not.deep.equal(Actual);
      Logger.info(
        "Expected String.. [" +
          Expected +
          "] does not Matches with Actual Data.. [" +
          Actual +
          "]"
      );
    } catch (error) {
      Logger.warn(
        "Expected String.. [" +
          Expected +
          "]  is Matching with Actual Data.. [" +
          Actual +
          "]"
      );
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }

  async GetText(Element, Label, page, screenShotLabelName) {
    try {
      expect(Element).to.exist;
      Logger.info(Label + " Text Element Present and Copying Text Content");
      const str = await Element.textContent();
      return str;
    } catch (error) {
      Logger.warn(Label + "Text Element Not Present");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }

  async TypeIn(Element, Data, Label, page, screenShotLabelName) {
    try {
      await Element.fill(Data);
      Logger.info(Data + " Typed Successfully.. " + Label);
    } catch (error) {
      Logger.warn(Label + " Element Not Present");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }

  async TypeandClear(Element, Label, page, screenShotLabelName) {
    try {
      await Element.fill("Test");
      await Element.fill("");
      Logger.info(
        "Typed and Cleared Text Successfully in the " + Label + " Text Field"
      );
    } catch (error) {
      Logger.warn(Label + " Text Field Not Present");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }

  async CheckElementPresent(Element, Label, page, screenShotLabelName) {
    try {
      expect(Element).to.exist;

      Logger.info(Label + " Element Present");
    } catch (error) {
      Logger.warn(Label + " Element Not Present");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw error;
    }
  }

  async AssertElementPresent(Element, Label, page, screenShotLabelName) {
    const elementcount = await Element.count();
    try {
      if (elementcount === 1) {
        Logger.info(Label + " Element Present");
      } else if (elementcount == 0) {
        throw new Error();
      }
    } catch (error) {
      Logger.warn(Label + " Element Not Present");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw new Error(Label + "Element Not Present");
    }
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async CheckElement_isDisabled(Element, Label, page, screenShotLabelName) {
    const PropType = await Element.evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("cursor");
    });

    if (PropType === "not-allowed") {
      Logger.info(Label + " Element is disabled");
    } else {
      Logger.warn(Label + " Element is not Disabled");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw new Error(Element + "Button is not Disabled");
    }
  }
  async CheckElement_isEnabled(Element, Label, page, screenShotLabelName) {
    const PropType = await Element.evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("cursor");
    });

    if (PropType === "pointer") {
      Logger.info(Label + " Element is Enabled");
    } else {
      Logger.warn(Label + " Element is not Enabled");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw new Error(Element + "Button is not Enabled");
    }
  }

  async CheckElement_isTitleCase(Element, Label, page, screenShotLabelName) {
    if (Element.match(/\b[a-z]/)) {
      Logger.warn(Label + " Label is not Title Case Format");
      await page.screenshot({
        path:
          "./Automation_Reports/screenshots/" + screenShotLabelName + ".png",
      });
      throw new Error(Element + " Invalid Title Case Format");
    } else {
      Logger.info(Label + " Label is in Title Case Format");
    }
  }
}

module.exports = { ReusableFunctions };
