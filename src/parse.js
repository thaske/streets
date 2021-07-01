import { JSDOM } from "jsdom";

const maintenanceSelector = "div.Vitals-detailsInfo";
const cdataSelector = "head > script[type='application/ld+json']";

const parse = (data) => {
  const dom = new JSDOM(data);
  const { document } = dom.window;
  
  const cdata = JSON.parse(document.querySelectorAll(cdataSelector)[1].innerHTML.split("\n")[2])[0];
  const maintenance = document.querySelectorAll(maintenanceSelector)[4].children[1]?.textContent.split("\n")[1].trim();
  
  return { 
    ...cdata.about,
    ...cdata.mainEntity,
    maintenance 
  };
}

export default parse;