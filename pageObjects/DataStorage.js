class DataStorage {
  constructor(page) {
    this.ElasticSearch = page.locator(
      "//h2[normalize-space()='Elasticsearch']"
    );
    this.ActiveIndicesBtn = page.locator(
      "//label[normalize-space()='Active Indices']"
    );
    this.ArchivedIndicesBtn = page.locator(
      "//label[normalize-space()='Archived Indices']"
    );
    this.ElasticSearchTableRowCount = page.locator("//div[@class='table']/div");
    this.DisplayedOpenCount = page.locator("//div[@class='css-tdoyvt']");
    this.DisplayedCloseCount = page.locator("//div[@class='css-1qsf5ac']");
  }
}
module.exports = { DataStorage };
