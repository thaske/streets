import { JSDOM } from "jsdom";

const maintenanceSelector = "#content > main > div.row.DetailsPage > article:nth-child(4) > section:nth-child(2) > div > div:nth-child(5) > div";
const cdataSelector = "head > script[type='application/ld+json']";

const parse = (data) => {
  const dom = new JSDOM(data);
  const { document } = dom.window;
  
  const cdata = JSON.parse(document.querySelectorAll(cdataSelector)[1].innerHTML.split("\n")[2])[0];
  const maintenance = document.querySelector(maintenanceSelector).textContent.split("\n")[1].trim();
  
  return { 
    ...cdata.about,
    ...cdata.mainEntity,
    maintenance 
  };
}

export default parse;