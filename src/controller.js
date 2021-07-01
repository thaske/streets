import page from "~/page";
import parse from "~/parse";
import transform from '~/transform';

const index = async (req, res) => {
  try {
    const { a, url } = req.query;

    if(!url) return res.sendStatus(400);
    const showAmenities = Boolean(a);

    const html = await page(url);
    const data = transform(parse(html), showAmenities);

    return res.status(200).json(data);
  } catch (err) {
    console.error(err.stack);
    return res.sendStatus(400);
  }
};

export default {
  index
};