const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const sendEmail = require("./utils/sendEmail");

puppeteer.use(StealthPlugin());

/**
 * runMonitor()
 * See readme.md for specs
 *
 * @param {obj} monitor Monitor object
 * @param {string} monitor.key
 * @param {string} monitor.description
 * @param {string} monitor.schedule
 * @param {string } monitor.url
 * @param {function} monitor.preStep
 * @param {string} monitor.element
 * @param {function} monitor.validate
 *
 * @return {Promise<boolean>} result of monitor.validate
 */
const runMonitor = async (monitor) => {
  const now = new Date().toString();

  console.log(
    `Running monitor ${monitor.description} at ${new Date().toString()}`
  );

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--single-process", "--no-zygote", "--no-sandbox"],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 600, height: 800 });

  await page.goto(monitor.url, { waitUntil: "networkidle2" });

  if (monitor.preStep) {
    await monitor.preStep(page);
  }

  await page.waitForSelector(monitor.element);

  const element = await page.$(monitor.element);

  const content = await page.evaluate((el) => el.textContent, element);

  const isValid = await monitor.validate(content);

  await browser.close();

  if (isValid) {
    console.log(
      `Monitor ${monitor.description} yields VALID with content ${content} at ${now}`
    );
    // prepare email data
    const subject = `[${monitor.key}] Valid Result`;
    const body = `Monitor ${monitor.description} yields VALID with content ${content} at ${now}`;
    // send email
    sendEmail(subject, body);
    return true;
  }

  console.log(
    `Monitor ${monitor.description} yields NOT VALID with content ${content} at ${now}`
  );

  return false;
};

module.exports = runMonitor;
