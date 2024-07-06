import { ISelectorOptions } from "@/shared/types";
import {Selector} from "@/shared/ui/Selector";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import {ReactElement, useEffect, useState} from "react";

export function HomePageTitle(): ReactElement {
  const [options, setOptions] = useState<ISelectorOptions[]>([]);

  const ids = [
    'ChIJybDUc_xKtUYRTM9XV8zWRD0',
    'ChIJTZVPGXOXc0MRR_EBknigHSM',
    'ChIJ02oeW9PP20YR2XC13VO4YQs'
  ];

  const geocoding = useMapsLibrary('geocoding');

  useEffect(() => {
    if (!geocoding) return;

    const geocoder = new geocoding.Geocoder();

    const geocodeId = async (placeId: string) => {
      const res = await geocoder.geocode({ placeId });

      const cityName = res.results[0].address_components.find((el) => el.types.some((el) => el === 'locality'))?.long_name ?? '';

      return { name: cityName, value: cityName };
    }

    const promisesToData = async () => {
      const promises = ids.map((el) => {
        return geocodeId(el);
      });

      const data = await Promise.all(promises);

      return data;
    }

    promisesToData()
      .then((res) => {
        setOptions(res);
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocoding]);

  return (
    <div className="flex mt-14">
      <h1 className="text-[45px] text-text-black font-semibold leading-normal">Куда сходить в&nbsp;</h1>
      <Selector options={options}/>
    </div>
  );
}
