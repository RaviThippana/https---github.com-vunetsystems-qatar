const PrefPageTestData = JSON.parse(
  JSON.stringify(require("../TestData/PreferencePageTestData.json"))
);

class PreferencePage {
  constructor(page) {
    this.TotalComponents = page.locator("//div[@class='css-oqv5iu']");
    this.PrefPageHeader = page.locator("//span[@class='css-15qlqko']");
    this.UserName = page.locator("//input[@name='username']");
    this.Email = page.locator("//input[@name='email']");
    this.Password = page.locator("//input[@name='password']");
    this.SMTPHost = page.locator("//input[@name='smtpHost']");
    this.SMTPPort = page.locator("//input[@name='smtpPort']");
    this.EmailPrefEdit = page.locator(
      "//h2[normalize-space()='Email Preferences']/../..//button[@title='Edit']"
    );
    this.ITSMlPrefEdit = page.locator(
      "//h2[normalize-space()='ITSM Preferences']/../..//button[@title='Edit']"
    );
    this.SystemPrefEdit = page.locator(
      "//h2[normalize-space()='System Preferences']/../..//button[@title='Edit']"
    );
    this.AnalyticsPrefEdit = page.locator(
      "//h2[normalize-space()='Analytics Reports Preferences']/../..//button[@title='Edit']"
    );
    this.EditCloseBtn = page.locator("//button[@aria-label='Close dialogue']");
    this.SecurityProtocol = page.locator(
      "//div[@class='css-od2w4j-input-wrapper css-1age63q']"
    );
    this.SecurityProtocol1 = page.locator("//span[@aria-live='polite']");
    // css-1kfautg-grafana-select-value-container
    this.SaveButton = page.locator("//button[@type='submit']");
    this.UserNameAlert = page.locator(
      "//div[contains(text(),'Username')]/..//div[@role='alert']"
    );
    this.EmailAlert = page.locator(
      "//div[contains(text(),'Email')]/..//div[@role='alert']"
    );
    this.PasswordAlert = page.locator(
      "//div[contains(text(),'Password')]/..//div[@role='alert']"
    );
    this.SMTPHostAlert = page.locator(
      "//div[contains(text(),'SMTP Host')]/..//div[@role='alert']"
    );
    this.SMTPPortAlert = page.locator(
      "//div[contains(text(),'SMTP Port')]/..//div[@role='alert']"
    );
    this.SaveEmailPrefEdit = page.locator("//button[@type='submit']");
    this.SaveButton = page.locator("//button[@type='submit']");
    this.CloseEdit = page.locator("[aria-label='Close dialogue']");
    this.UserNameText = page.locator("//div[contains(text(),'Username')]");
    this.EmailText = page.locator("//div[contains(text(),'Email')]");
    this.PasswordText = page.locator("//div[contains(text(),'Password')]");
    this.SMTPHostText = page.locator("//div[contains(text(),'SMTP Host')]");
    this.SMTPPortText = page.locator("//div[contains(text(),'SMTP Port')]");
    this.SecurityProtocolText = page.locator(
      "//div[contains(text(),'Security Protocol')]"
    );
    this.ActualUserNameValue = page.locator(
      "//span[normalize-space()='Username']//following::span[contains(text(),'" +
        PrefPageTestData.UserNameData +
        "')]"
    );

    this.ActualEmailValue = page.locator(
      "//span[normalize-space()='Email']//following::span[1]"
    );

    this.ActualSmtpHostValue = page.locator(
      "//span[normalize-space()='SMTP Host']//following::span[1]"
    );

    this.ActualSmtpPortValue = page.locator(
      "//span[normalize-space()='SMTP Port']//following::span[1]"
    );
    this.UsernameToolTip = page.locator(
      "//div[normalize-space()='Username']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.EmailToolTip = page.locator(
      "//div[normalize-space()='Email']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.PasswordToolTip = page.locator(
      "//div[normalize-space()='Password']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.SMTPHostToolTip = page.locator(
      "//div[normalize-space()='SMTP Host']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );
    this.SMTPPortToolTip = page.locator(
      "//div[normalize-space()='SMTP Port']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );
    this.SecurityProtocolToolTip = page.locator(
      "//div[normalize-space()='Security Protocol']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.UsernameToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'User name')]"
    );
    this.EmailToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'Email')]"
    );
    this.PasswordToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'Password')]"
    );
    this.SMTPHostToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'SMTP Server')]"
    );
    this.SMTPPortToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'SMTP Server')]"
    );
    this.SecurityProtocolToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'Security protocol')]"
    );
    // ITSM Preferences

    this.ITSMType = page.locator(
      "//div[@class='css-od2w4j-input-wrapper css-1age63q']//div[@class='css-k6ld91']"
    );

    this.ITSMType1 = page.locator(
      "//div[@class='css-od2w4j-input-wrapper css-1age63q']"
    );

    this.ServerUrlAlert = page.locator("//div[contains(text(),'Server Url')]");
    this.InstanceNameText = page.locator(
      "//div[contains(text(),'Instance Name')]"
    );
    this.ITSMUserNameText = page.locator("//div[contains(text(),'Username')]");
    this.ITSMPasswordText = page.locator("//div[contains(text(),'Password')]");
    this.ITSMWebServiceText = page.locator(
      "//div[contains(text(),'Webservice Name')]"
    );
    this.ITSMQueueText = page.locator("//div[contains(text(),'Queue')]");
    this.ITSMCustomerUserText = page.locator(
      "//div[contains(text(),'Customer User')]"
    );
    this.ITSMAPIKeyText = page.locator("//div[contains(text(),'API Key')]");
    this.ITSMMatchingTagsText = page.locator(
      "//div[contains(text(),'Matching Tags')]"
    );
    this.ITSMFirstNameText = page.locator(
      "//div[contains(text(),'Firstname')]"
    );
    this.ITSMLastNameText = page.locator("//div[contains(text(),'Lastname')]");
    this.ITSMTickCreationText = page.locator(
      "//div[contains(text(),'Additional fields used during ticket creation')]"
    );
    this.ITSMTickUpdationText = page.locator(
      "//div[contains(text(),'Additional fields used during ticket updation')]"
    );

    // ITSM Preference Service Now
    this.ITSMServerURL = page.locator("//input[@name='ServerUrl']");
    this.ITSMInstanceName = page.locator("//input[@name='InstanceName']");
    this.ITSMUsername = page.locator("//input[@name='Username']");
    this.ITSMPassword = page.locator("//input[@name='password']");
    // ITSM Preference OTRS
    this.ITSMWebserviceName = page.locator("//input[@name='WebserviceName']");
    this.ITSMQueue = page.locator("//input[@name='Queue']");
    this.ITSMCustomerUser = page.locator("//input[@name='CustomerUser']");
    // ITSM Preference Manage Engine
    this.ITSMAPIKey = page.locator("//input[@name='APIKey']");
    this.ITSMMatchingTags = page.locator("//input[@name='MatchingTags']");
    // ITSM Preference Remedy
    this.ITSMFirstname = page.locator("//input[@name='Firstname']");
    this.ITSMLastname = page.locator("//input[@name='Lastname']");
    this.ITSMTicket_create_fields = page.locator(
      "//input[@name='Ticket_create_fields']"
    );
    this.ITSMWorklog_update_fields = page.locator(
      "//input[@name='Worklog_update_fields']"
    );

    // ITSM Text Alerts
    this.ITSMServerUrlAlert = page.locator(
      "//div[contains(text(),'Server Url')]/..//div[@role='alert']"
    );
    this.ITSMInstanceNameAlert = page.locator(
      "//div[contains(text(),'Instance Name')]/..//div[@role='alert']"
    );
    this.ITSMUserNameAlert = page.locator(
      "//div[contains(text(),'Username')]/..//div[@role='alert']"
    );
    this.ITSMPasswordAlert = page.locator(
      "//div[contains(text(),'Password')]/..//div[@role='alert']"
    );
    this.ITSMWebServiceAlert = page.locator(
      "//div[contains(text(),'Webservice Name')]/..//div[@role='alert']"
    );
    this.ITSMQueueAlert = page.locator(
      "//div[contains(text(),'Queue')]/..//div[@role='alert']"
    );
    this.ITSMCustomerUserAlert = page.locator(
      "//div[contains(text(),'Customer User')]/..//div[@role='alert']"
    );
    this.ITSMAPIKeyAlert = page.locator(
      "//div[contains(text(),'API Key')]/..//div[@role='alert']"
    );
    this.ITSMMatchingTagsAlert = page.locator(
      "//div[contains(text(),'Matching Tags')]/..//div[@role='alert']"
    );
    this.ITSMFirstNameAlert = page.locator(
      "//div[contains(text(),'Firstname')]/..//div[@role='alert']"
    );
    this.ITSMLastNameAlert = page.locator(
      "//div[contains(text(),'Lastname')]/..//div[@role='alert']"
    );
    this.ITSMTickCreationAlert = page.locator(
      "//div[contains(text(),'Additional fields used during ticket creation')]/..//div[@role='alert']"
    );
    this.ITSMTickUpdationAlert = page.locator(
      "//div[contains(text(),'Additional fields used during ticket updation')]/..//div[@role='alert']"
    );

    this.Exp_ITSM_Type_OTRS = page.locator(
      "//span[normalize-space()='Type']//following::span[contains(text(),'OTRS')]"
    );
    this.Exp_ITSM_Type_Manage_Engine = page.locator(
      "//span[normalize-space()='Type']//following::span[contains(text(),'Manage Engine')]"
    );
    this.Exp_ITSM_Type_Remedy = page.locator(
      "//span[normalize-space()='Type']//following::span[contains(text(),'Remedy')]"
    );
    this.Exp_ITSM_Type_ServiceNow = page.locator(
      "//span[normalize-space()='Type']//following::span[contains(text(),'Service Now')]"
    );

    this.Exp_ITSM_ServerUrl = page.locator(
      "//span[normalize-space()='Server Url']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMServerUrlData +
        "')]"
    );

    this.Exp_ITSM_InstanceName = page.locator(
      "//span[normalize-space()='Instance Name']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMInstanceNameData +
        "')]"
    );

    this.Exp_ITSM_WebServiceName = page.locator(
      "//span[normalize-space()='Webservice Name']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMWebserviceData +
        "')]"
    );

    this.Exp_ITSM_UserName = page.locator(
      "//span[normalize-space()='Username']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMUserNameData +
        "')]"
    );
    this.Exp_ITSM_Queue = page.locator(
      "//span[normalize-space()='Queue']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMQueueData +
        "')]"
    );
    this.Exp_ITSM_CustomerUser = page.locator(
      "//span[normalize-space()='Customer User']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMCustomerUserData +
        "')]"
    );

    this.Exp_ITSM_ApiKey = page.locator(
      "//span[normalize-space()='API Key']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMApiKeyData +
        "')]"
    );

    this.Exp_ITSM_Matchingtag = page.locator(
      "//span[normalize-space()='Matching Tags']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMMatchingTagData +
        "')]"
    );

    this.Exp_ITSM_FirstName = page.locator(
      "//span[normalize-space()='Firstname']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMFirstnameData +
        "')]"
    );
    this.Exp_ITSM_LastName = page.locator(
      "//span[normalize-space()='Lastname']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMLastnameData +
        "')]"
    );

    this.Exp_ITSM_TicketCreation = page.locator(
      "//span[normalize-space()='Additional fields used during ticket creation']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMTicketCreationData +
        "')]"
    );
    this.Exp_ITSM_TicketUpdation = page.locator(
      "//span[normalize-space()='Additional fields used during ticket updation']//following::span[contains(text(),'" +
        PrefPageTestData.ITSMTicketUpdation +
        "')]"
    );

    // System Preferences
    this.SourceIPToolTip = page.locator(
      "//div[normalize-space()='Source IP Address']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.TrapCredentialsToolTip = page.locator(
      "//div[normalize-space()='Trap Credentials']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );
    this.SNMPTrapToolTip = page.locator(
      "//div[normalize-space()='SNMP trap discovery time interval']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.SourceIPAddText = page.locator(
      "//div[contains(text(),'Source IP Address')]"
    );
    this.ArchivalPathText = page.locator(
      "//div[contains(text(),'Archival Path')]"
    );
    this.TrapCredentialsText = page.locator(
      "//div[contains(text(),'Trap Credentials')]"
    );
    this.SNMPTrapText = page.locator(
      "//div[contains(text(),'SNMP trap discovery time interval')]"
    );
    this.SourceIpAddress = page.locator("//input[@name='source_ip_address']");
    this.SouceIpAddrAlert = page.locator(
      "//div[contains(text(),'Source IP Address')]/..//div[@role='alert']"
    );
    this.ArchivalPath = page.locator("//input[@name='archival_path']");
    this.TrapCredentials = page.locator("//input[@name='trap_credentials']");
    this.TrapCredentialsAlert = page.locator(
      "//div[contains(text(),'Trap Credentials')]/..//div[@role='alert']"
    );
    this.SNMPTrap = page.locator("//input[@name='trap_time_interval']");
    this.SNMPTrapAlert = page.locator(
      "//div[contains(text(),'SNMP trap discovery time interval')]/..//div[@role='alert']"
    );
    this.ActualSourceIpAddressValue = page.locator(
      "//span[normalize-space()='Source IP Address']//following::span[1]"
    );

    this.ActualArchivalPathValue = page.locator(
      "//span[normalize-space()='Archival Path']//following::span[1]"
    );

    this.ActualTrapCredentialsValue = page.locator(
      "//span[normalize-space()='Trap Credentials']//following::span[1]"
    );

    this.ActualSNMPTrapValue = page.locator(
      "//span[normalize-space()='SNMP trap discovery time interval']//following::span[1]"
    );
    // Analytics Reports Preferences
    this.DateFormat = page.locator("//input[@name='date_format']");
    this.DateFormatAlert = page.locator(
      "//div[contains(text(),'Date Format')]/..//div[@role='alert']"
    );
    this.DateFormatToolTip = page.locator(
      "//div[normalize-space()='Date Format']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.ActualDateFormatValue = page.locator(
      "//span[normalize-space()='Date Format']//following::span[1]"
    );
    this.ActualDateFormatValueCount = page.$$(
      "//span[normalize-space()='Date Format']//following::span[1]"
    );
    this.RequestFailedAlert = page.$$(
      "//div[@data-testid='data-testid Alert error']"
    );
  }
}
module.exports = { PreferencePage };
