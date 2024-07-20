export const useMultipleGeocode = () => {
  const geocodeId = async (placeId: string, geocoder: google.maps.Geocoder) => {
    const res = await geocoder.geocode({ placeId });

    const cityName = res.results[0].address_components.find((el) => el.types.some((el) => el === 'locality'))?.long_name ?? '';

    return { name: cityName, id: placeId };
  }

  const multipleGeocode = async (
    placeIdArr: { place_id: string }[],
    geocoder: google.maps.Geocoder
  ) => {
    const promises = placeIdArr.map((el) => {
      return geocodeId(el.place_id, geocoder);
    });

    const data = await Promise.all(promises);

    return data;
  }

  return { multipleGeocode };
}
