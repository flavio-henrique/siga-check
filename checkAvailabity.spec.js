// Generated by Selenium IDE
const assert = require('assert')
const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox'); // Add this line for Firefox

describe('checkAvailabity', function() {
  this.timeout(30000)
  let driver
  beforeEach(async function() {
    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().addArguments('--headless')) // Enable headless mode for Firefox
      .build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('checkAvailabity', async function() {
    await driver.get("https://siga.marcacaodeatendimento.pt/Marcacao/Entidades")
    await driver.manage().window().setRect({ width: 1728, height: 994 })
    await driver.findElement(By.id("176")).click()
    await driver.findElement(By.id("IdCategoria")).click()
    {
      const dropdown = await driver.findElement(By.id("IdCategoria"))
      await dropdown.findElement(By.xpath("//option[. = 'Citizen']")).click()
    }
    await driver.findElement(By.id("IdSubcategoria")).click()
    {
      const dropdown = await driver.findElement(By.id("IdSubcategoria"))
      await waitForElement(By.xpath("//option[. = 'Residence permit']"));
      await dropdown.findElement(By.xpath("//option[. = 'Residence permit']")).click()
    }
    await driver.findElement(By.linkText("Next→")).click()

    await waitForElement(By.id('IdDistrito'));
    const districtOptions = (await getDropdownOptions("IdDistrito")).filter(item => item !== 'Select a District');
    console.log('districtOptions: ', districtOptions)
    for(const districtOption of districtOptions) {
      await driver.sleep(300)
      // Select district from the dropdown
      await driver.findElement(By.id("IdDistrito")).click()
      const dropdown = await driver.findElement(By.id("IdDistrito"))
      await dropdown.findElement(By.xpath(`//option[. = '${districtOption}']`)).click()

      // Wait for the 'IdLocalidade' dropdown to be present
      await waitForElement(By.id("IdLocalidade"))

      // Get and filter location options
      const locationOptions = (await getDropdownOptions("IdLocalidade")).filter(item => item !== 'Select a Locality');
      console.log('locationOptions: ', locationOptions)

      // Select location from the dropdown
      await driver.findElement(By.id("IdLocalidade")).click()
      await waitForElement(By.xpath(`//option[. = '${locationOptions[0]}']`))
      await dropdown.findElement(By.xpath(`//option[. = '${locationOptions[0]}']`)).click()

      // Click on next button and perform assertions
      await driver.findElement(By.css(".set-date-button > span")).click()
      await waitForElement(By.css(".col-md-12 > h5"))
      assert(await driver.findElement(By.css(".col-md-12 > h5")).getText() == "There are no appointment shedules available for the selected criteria.")
      await waitForElement(By.linkText("←Previous"));

       // Go back to the previous page
      await driver.findElement(By.linkText("←Previous")).click()
      console.log('passou: ', districtOption, locationOptions);
    }
   })

  // Helper function to get dropdown options
  async function getDropdownOptions(id) {
    await driver.sleep(300)
    const dropdown = await driver.findElement(By.id(id));
    const optionElements = await dropdown.findElements(By.tagName("option"));
    const options = await Promise.all(optionElements.map(async (option) => await option.getText()));
    return options;
  }

  // Helper function to wait for an element to be present
  async function waitForElement(by) {
    const element = await driver.wait(until.elementLocated(by), 10 * 3000);
    return element;
  }
})
