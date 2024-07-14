import { ReactElement } from 'react';
import Svg from './Svg';

interface ISliderEmptyElem {
  text: string;
}

export function SliderEmptyElem({ text }: ISliderEmptyElem): ReactElement {
  return (
    <>
      <p className="text-[20px] font-medium mt-5">{text}</p>
      <Svg
        id="slider-empty-folder"
        className="w-[125px] h-[125px] mt-1.5"
      />
    </>
  );
}
