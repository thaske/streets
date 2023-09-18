import axios from 'axios';
import { JSDOM } from 'jsdom';
import headers from './headers.json';

const MAINTENANCE_SELECTOR = 'div.Vitals-detailsInfo';
const C_DATA_SELECTOR = "head > script[type='application/ld+json']";

const parse = (data) => {
  const dom = new JSDOM(data);

  const { document } = dom.window;

  const cdata = JSON.parse(
    document.querySelectorAll(C_DATA_SELECTOR)[1].innerHTML.split('\n')[2]
  )[0];

  const maintenance = document
    .querySelectorAll(MAINTENANCE_SELECTOR)[4]
    .children[1]?.textContent.split('\n')[1]
    .trim();

  const neighborhood = document
    .querySelector("head > meta[name='title']")
    ?.content?.split(' in ')?.[1];

  return {
    ...cdata.about,
    ...cdata.mainEntity,
    neighborhood,
    maintenance,
  };
};

const fetchPage = async (url) =>
  axios
    .get(url, { headers })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const transform = (data, showAmenities = false) => {
  const {
    name,
    maintenance,
    amenityFeature,
    neighborhood,
    offers: { price: unformattedPrice, availability },
  } = data;

  const price = formatter.format(unformattedPrice);

  const available = availability === 'inStock' ? 'Available' : 'In Contract';

  const amenities = showAmenities
    ? amenityFeature.map((obj) => obj.name)
    : undefined;

  return {
    name,
    price,
    maintenance,
    // available,
    neighborhood,
    amenities,
  };
};

const index = async (req, res) => {
  try {
    const { a, url } = req.query;

    if (!url) return res.sendStatus(400);

    const showAmenities = Boolean(a);

    const html = await fetchPage(url);

    const data = transform(parse(html), showAmenities);

    return res.status(200).json(data);
  } catch (err) {
    console.error(err.stack);

    return res.sendStatus(400);
  }
};

export default {
  index,
};
