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
    offers: {
      price: unformattedPrice, 
      availability
    } 
  } = data;
  
  const price = formatter.format(unformattedPrice);
  const available = availability === "inStock";
  const amenities = amenityFeature.map(obj => obj.name);

  return {
    name,
    price,
    maintenance,
    available,
    amenities: (showAmenities ? amenities : undefined),
  };
}

export default transform;