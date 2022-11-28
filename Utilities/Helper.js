const { ReusableFunctions } = require("./ReusableFunctions");
const { POManager } = require("../pageObjects/POManager");
const expect = require("chai").expect;
const ReuseFunctions = new ReusableFunctions();
const PrefPageTestData = JSON.parse(
  JSON.stringify(require("../TestData/PreferencePageTestData.json"))
);

class Helper {
  async preferencePage_EmailPref_mandatoryFields(page, screenShotLabelName) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.TypeIn(
      prefPage.UserName,
      "",
      "Providing null characters in the UserName TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      prefPage.UserNameAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const UserNameAlertMessage = await prefPage.UserNameAlert.textContent();
    await ReuseFunctions.CompareText(
      UserNameAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );

    //Verifying the mandatory fields without providing values for Email Text Field
    await ReuseFunctions.TypeIn(
      prefPage.Email,
      "",
      "Providing null characters in the Email TextField",
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
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );

    //Verifying the mandatory fields without providing values for Password Text Field
    /*await ReuseFunctions.ClickOn(
      prefPage.SaveEmailPrefEdit,
      "Save Button",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      prefPage.PasswordAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const PasswordAlertMessage = await prefPage.PasswordAlert.textContent();
    await ReuseFunctions.CompareText(
      PasswordAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );*/

    //Verifying the mandatory fields without providing values for SMTP Host Text Field
    await ReuseFunctions.TypeIn(
      prefPage.SMTPHost,
      "",
      "Providing null characters in the Email TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      prefPage.SMTPHostAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const SMTPHostAlertMessage = await prefPage.SMTPHostAlert.textContent();
    await ReuseFunctions.CompareText(
      SMTPHostAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );

    //Verifying the mandatory fields without providing values for SMTP Port Text Field
    await ReuseFunctions.TypeIn(
      prefPage.SMTPPort,
      "",
      "Providing null characters in the Email TextField",
      page,
      screenShotLabelName
    );

    ReuseFunctions.checkAlertPresent(
      prefPage.SMTPPortAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const SMTPPortAlertMessage = await prefPage.SMTPPortAlert.textContent();
    await ReuseFunctions.CompareText(
      SMTPPortAlertMessage,
      PrefPageTestData.MandatoryAlertMessage,
      page,
      screenShotLabelName
    );
    // Validating the Save Button is disabled or not after not entering Mandatory Fields
    await ReuseFunctions.CheckElement_isDisabled(
      prefPage.SaveButton,
      "Save Button",
      page,
      screenShotLabelName
    );
  }

  async preferencePage_EmailPref_SpecialCharacters(page, screenShotLabelName) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    const specialChar = PrefPageTestData.SpecialCharacters;
    const validSpecialChar = PrefPageTestData.ValidSpecialCharacters;
    const validchar = ReuseFunctions.GetRandomCharacs(6);
    const firstWord = ReuseFunctions.GetRandomCharacs(5);
    const secondWord = ReuseFunctions.GetRandomCharacs(5);
    for (let i = 1; i <= specialChar.length - 1; i++) {
      if (screenShotLabelName == "Email Preferences - VQA-612,613") {
        await ReuseFunctions.TypeIn(
          prefPage.UserName,
          specialChar[i],
          "Providing special Character " +
            specialChar[i] +
            " in the UserName TextField",
          page,
          screenShotLabelName
        );
      } else {
        await ReuseFunctions.TypeIn(
          prefPage.UserName,
          firstWord + specialChar[i] + secondWord,
          "Providing special Character " +
            specialChar[i] +
            " in the UserName TextField",
          page,
          screenShotLabelName
        );
      }
      ReuseFunctions.checkAlertPresent(
        prefPage.UserNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      const UserNameAlertMessage = await prefPage.UserNameAlert.textContent();
      await ReuseFunctions.CompareText(
        UserNameAlertMessage,
        PrefPageTestData.UserNameValidationErrorMsg,
        page,
        screenShotLabelName
      );
    }
    for (let j = 1; j <= validSpecialChar.length - 1; j++) {
      await ReuseFunctions.TypeIn(
        prefPage.UserName,
        validSpecialChar[j] + validchar,
        "Providing special Character " +
          validSpecialChar[j] +
          " in the UserName TextField",
        page,
        screenShotLabelName
      );
      ReuseFunctions.checkAlertPresent(
        prefPage.UserNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      const UserNameAlertMessage = await prefPage.UserNameAlert.textContent();
      await ReuseFunctions.CompareText(
        UserNameAlertMessage,
        PrefPageTestData.UserNameValidationErrorMsg,
        page,
        screenShotLabelName
      );
    }
  }

  async textLimitValidation(text, page, screenShotLabelName) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.TypeIn(
      prefPage.UserName,
      text,
      "Entering " + text + " Characters in Username TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.UserNameAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const UserNameAlertMessage = await prefPage.UserNameAlert.textContent();

    await ReuseFunctions.CompareText(
      UserNameAlertMessage,
      PrefPageTestData.UserNameValidationErrorMsg,
      page,
      screenShotLabelName
    );
  }
  async preferencePage_SystemPref_SpecialCharacters(page, screenShotLabelName) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    const specialChar = PrefPageTestData.SpecialCharacters;
    const validSpecialChar = PrefPageTestData.ValidSpecialCharacters;
    const validchar = ReuseFunctions.GetRandomCharacs(6);
    const firstWord = ReuseFunctions.GetRandomCharacs(5);
    const secondWord = ReuseFunctions.GetRandomCharacs(5);
    for (let i = 1; i <= specialChar.length - 1; i++) {
      await ReuseFunctions.TypeIn(
        prefPage.SourceIpAddress,
        specialChar[i],
        "Providing special Character " +
          specialChar[i] +
          " in the UserName TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.checkAlertPresent(
        prefPage.SouceIpAddrAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      const UserNameAlertMessage =
        await prefPage.SouceIpAddrAlert.textContent();
      await ReuseFunctions.CompareText(
        UserNameAlertMessage,
        PrefPageTestData.SourceIpValidationErrorMsg,
        page,
        screenShotLabelName
      );
    }
    for (let j = 1; j <= validSpecialChar.length - 1; j++) {
      await ReuseFunctions.TypeIn(
        prefPage.SourceIpAddress,
        validSpecialChar[j] + validchar,
        "Providing special Character " +
          validSpecialChar[j] +
          " in the UserName TextField",
        page,
        screenShotLabelName
      );
      ReuseFunctions.checkAlertPresent(
        prefPage.SouceIpAddrAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      const UserNameAlertMessage =
        await prefPage.SouceIpAddrAlert.textContent();
      await ReuseFunctions.CompareText(
        UserNameAlertMessage,
        PrefPageTestData.SourceIpValidationErrorMsg,
        page,
        screenShotLabelName
      );
    }
  }

  async textLimitValidation_SNMP(text, page, screenShotLabelName) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.TypeIn(
      prefPage.SNMPTrap,
      text,
      "Entering " + text + " Characters in SNMP Trap TextField",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.SNMPTrapAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const SNMPAlertMessage = await prefPage.SNMPTrapAlert.textContent();

    await ReuseFunctions.CompareText(
      SNMPAlertMessage,
      PrefPageTestData.SNMPTrapValidationErrorMsg,
      page,
      screenShotLabelName
    );
  }
  async DataValidation_SMTPPort(text, page, screenShotLabelName) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    await ReuseFunctions.TypeIn(
      prefPage.SMTPPort,
      PrefPageTestData.SMTPPortInvalidData,
      "Entering Invalid data - " + text + " in SMTPPortData  Text Field",
      page,
      screenShotLabelName
    );
    ReuseFunctions.checkAlertPresent(
      prefPage.SMTPPortAlert,
      "for Error Message Alert Mandatory Field",
      page,
      screenShotLabelName
    );
    const SMTPPortAlerttMessage = await prefPage.SMTPPortAlert.textContent();

    await ReuseFunctions.CompareText(
      SMTPPortAlerttMessage,
      PrefPageTestData.SMTPPortValidationErrorMsg,
      page,
      screenShotLabelName
    );
  }

  async Validating_ToolTip(
    Element,
    LabelName,
    ToolTipCount,
    page,
    screenShotLabelName
  ) {
    for (let i = 1; i <= ToolTipCount - 1; i++) {
      await CheckElementPresent(Element, LabelName, page, screenShotLabelName);
    }
  }

  async Verifying_AvailableFields_ITSM_Type(type, page, screenShotLabelName) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    for (let i = 0; i <= type.length - 1; i++) {
      await page.keyboard.type(type[i]);
      await page.keyboard.press("Enter");
      const ActualserverurlText = await ReuseFunctions.GetText(
        prefPage.ServerUrlAlert,
        "Server Url",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.CompareText(
        ActualserverurlText,
        PrefPageTestData.ServerURLText,
        page,
        screenShotLabelName
      );
      const ActualItsmUserName = await ReuseFunctions.GetText(
        prefPage.ITSMUserNameText,
        "ITSM User Name",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.CompareText(
        ActualItsmUserName,
        PrefPageTestData.ITSMUserName,
        page,
        screenShotLabelName
      );

      const ActualPassword = await ReuseFunctions.GetText(
        prefPage.ITSMPasswordText,
        "ITSM Password",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.CompareText(
        ActualPassword,
        PrefPageTestData.ITSMPassword,
        page,
        screenShotLabelName
      );

      if (type[i] === "Service Now") {
        const ActualInstanceNameText = await ReuseFunctions.GetText(
          prefPage.InstanceNameText,
          "Instance Name",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualInstanceNameText,
          PrefPageTestData.InstanceName,
          page,
          screenShotLabelName
        );
      } else if (type[i] === "OTRS") {
        const ActualWebserviceText = await ReuseFunctions.GetText(
          prefPage.ITSMWebServiceText,
          "Webservice",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualWebserviceText,
          PrefPageTestData.WebserviceName,
          page,
          screenShotLabelName
        );

        const ActualQueue = await ReuseFunctions.GetText(
          prefPage.ITSMQueueText,
          "Queue",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualQueue,
          PrefPageTestData.Queue,
          page,
          screenShotLabelName
        );
        const ActualCustomerUser = await ReuseFunctions.GetText(
          prefPage.ITSMCustomerUserText,
          "Customer User",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualCustomerUser,
          PrefPageTestData.CustomerUser,
          page,
          screenShotLabelName
        );
      } else if (type[i] === "Manage Engine") {
        const ActualApiKey = await ReuseFunctions.GetText(
          prefPage.ITSMAPIKeyText,
          "API Key",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualApiKey,
          PrefPageTestData.APIKey,
          page,
          screenShotLabelName
        );
        const ActualMatchingTag = await ReuseFunctions.GetText(
          prefPage.ITSMMatchingTagsText,
          "Matching Tags",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualMatchingTag,
          PrefPageTestData.MatchingTags,
          page,
          screenShotLabelName
        );
      } else if (type[i] === "Remedy") {
        const ActualFirstName = await ReuseFunctions.GetText(
          prefPage.ITSMFirstNameText,
          "FirstName",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualFirstName,
          PrefPageTestData.FirstName,
          page,
          screenShotLabelName
        );
        const ActualLastName = await ReuseFunctions.GetText(
          prefPage.ITSMLastNameText,
          "LastName",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualLastName,
          PrefPageTestData.Lastname,
          page,
          screenShotLabelName
        );
        const ActualTicketCreation = await ReuseFunctions.GetText(
          prefPage.ITSMTickCreationText,
          "Ticket Creation",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualTicketCreation,
          PrefPageTestData.TicketCreation,
          page,
          screenShotLabelName
        );
        const ActualTicketUpdation = await ReuseFunctions.GetText(
          prefPage.ITSMTickUpdationText,
          "Ticket Updation",
          page,
          screenShotLabelName
        );

        await ReuseFunctions.CompareText(
          ActualTicketUpdation,
          PrefPageTestData.TicketUpdation,
          page,
          screenShotLabelName
        );
      }
    }
  }

  async preferencePage_ITSMPref_MandatoryFields(
    type,
    page,
    screenShotLabelName
  ) {
    let poManager = new POManager(page);
    let prefPage = poManager.GetPreferencePage();
    if (type === "Service Now") {
      await page.keyboard.type(type);
      await page.keyboard.press("Enter");
      // Mandatory Fields for Type Service Now
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMServerURL,
        "Providing null characters in the Server URL TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMServerUrlAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMInstanceName,
        "Providing null characters in the Instance Name TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMInstanceNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMUsername,
        "Providing null characters in the User Name TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMUserNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMPassword,
        "Providing null characters in the Password TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMPasswordAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
    } else if (type === "OTRS") {
      await page.keyboard.type(type);
      await page.keyboard.press("Enter");
      // Mandatory Fields for Type OTRS
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMServerURL,
        "Providing null characters in the Server URL TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMServerUrlAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.TypeandClear(
        prefPage.ITSMWebserviceName,
        "Providing null characters in the WebService Name TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMWebServiceAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMUsername,
        "Providing null characters in the User Name TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMUserNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMPassword,
        "Providing null characters in the Password TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMPasswordAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMQueue,
        "Providing null characters in the Queue TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMQueueAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.TypeandClear(
        prefPage.ITSMCustomerUser,
        "Providing null characters in the Customer User TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMCustomerUserAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
    } else if (type === "Manage Engine") {
      await page.keyboard.type(type);
      await page.keyboard.press("Enter");
      // Mandatory Fields for Type Manage Engine
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMServerURL,
        "Providing null characters in the Server URL TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMServerUrlAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMUsername,
        "Providing null characters in the User Name TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMUserNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.TypeandClear(
        prefPage.ITSMPassword,
        "Providing null characters in the Password TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMPasswordAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.TypeandClear(
        prefPage.ITSMAPIKey,
        "Providing null characters in the API KEY TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMAPIKeyAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.TypeandClear(
        prefPage.ITSMMatchingTags,
        "Providing null characters in the Matching Tags TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMMatchingTagsAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
    } else if (type === "Remedy") {
      await page.keyboard.type(type);
      await page.keyboard.press("Enter");
      // Mandatory Fields for Type Remedy
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMServerURL,
        "Providing null characters in the Server URL TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMServerUrlAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMUsername,
        "Providing null characters in the User Name TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMUserNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );

      await ReuseFunctions.TypeandClear(
        prefPage.ITSMPassword,
        "Providing null characters in the Password TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMPasswordAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMFirstname,
        "Providing null characters in the FirstName TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMFirstNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMLastname,
        "Providing null characters in the LastName TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMLastNameAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMTicket_create_fields,
        "Providing null characters in the Ticket Creation TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMTickCreationAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
      await ReuseFunctions.TypeandClear(
        prefPage.ITSMWorklog_update_fields,
        "Providing null characters in the Ticket Updation TextField",
        page,
        screenShotLabelName
      );

      ReuseFunctions.AssertAlertPresent(
        prefPage.ITSMTickUpdationAlert,
        "for Error Message Alert Mandatory Field",
        page,
        screenShotLabelName
      );
    }
  }

  async ActiveIndices_KPI_Validation(page, screenShotLabelName) {
    const poManager = new POManager(page);
    const DataStoragePage = poManager.GetDataStoragePage();
    await ReuseFunctions.sleep(2500);

    let tablerows = await DataStoragePage.ElasticSearchTableRowCount;
    let rowscount = await tablerows.count();
    var allStates = new Array();
    let eachrowstate;
    for (let i = 2; i <= rowscount; i++) {
      eachrowstate = await page
        .locator("//div[@class='table']/div[" + i + "]/div[3]")
        .textContent();
      allStates.push(eachrowstate);
    }

    let Opentext = "open";
    let Closetext = "close";
    var ExpectedOpenCount = 0;
    var ExpectedClosecount = 0;

    for (let state of allStates) {
      if (state == Opentext) {
        ExpectedOpenCount++;
      } else if (state == Closetext) {
        ExpectedClosecount++;
      }
    }
    var actualopencount = await ReuseFunctions.GetText(
      DataStoragePage.DisplayedOpenCount,
      "Acutal Open Count",
      page,
      screenShotLabelName
    );
    actualopencount = actualopencount.slice(4, 6);
    actualopencount = parseInt(actualopencount);
    var actualclosecount = await ReuseFunctions.GetText(
      DataStoragePage.DisplayedCloseCount,
      "Actual Close Count",
      page,
      screenShotLabelName
    );
    actualclosecount = actualclosecount.slice(5, 6);
    actualclosecount = parseInt(actualclosecount);
    await ReuseFunctions.CompareText(
      ExpectedOpenCount,
      actualopencount,
      page,
      screenShotLabelName
    );

    await ReuseFunctions.CompareText(
      ExpectedClosecount,
      actualclosecount,
      page,
      screenShotLabelName
    );
  }

  async ArchivedIndices_KPI_Validation(page, screenShotLabelName) {
    const poManager = new POManager(page);
    const DataStoragePage = poManager.GetDataStoragePage();
  }
}
module.exports = { Helper };
