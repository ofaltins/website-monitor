const monitors = [
  {
    key: "sas1",
    description: "SAS OSL-MIA 20220331",
    schedule: "*/10 * * * *", // every tenth minute - see http://crontab.guru
    url: "https://www.sas.no/book/flights/?search=OW_OSL-MIA-20220331_a1c0i0y0&view=LPC&bookingFlow=points&sortBy=stop&filterBy=all&out_class=GO&out_sub_class=SAS%20GO%20BONUS&out_flight_number=SK1461,SK953",
    preStep: async (page) => {
      const cookieAcceptButtonSelector =
        "#template > div > div > section > button.privacy.accept";
      const isPresent = (await page.$(cookieAcceptButtonSelector)) || false;
      if (isPresent) {
        await page.click(
          "#template > div > div > section > button.privacy.accept"
        );
      }
    },
    element:
      "#grid-outboundF0 > td.col-md-2.col-sm-2.col-xs-2.slide-business.up-grid-prods > div > span.fareprice-bold-ubc > p",
    validate: async (content) => {
      let points = Number(content.replace(/\D+/g, ""));
      if (points < 30000) {
        return true;
      }
      return false;
    },
  },
  {
    key: "milrab1",
    description: "Milrab Fenix 7 price drop",
    schedule: "0 */1 * * *", // every hour - see http://crontab.guru
    url: "https://www.milrab.no/garmin-fenix-7-sapphire-solar/cat-p/c/p1500216070",
    element:
      "#productCardContent > table > tbody > tr > td:nth-child(2) > div.b-price-block.b-price-block_visible > div.b-prod-price > span.pricedetails",
    validate: async (content) => {
      let price = Number(content.replace(/\D+/g, ""));
      if (price < 11000) {
        return true;
      }
      return false;
    },
  },
];

module.exports = monitors;
