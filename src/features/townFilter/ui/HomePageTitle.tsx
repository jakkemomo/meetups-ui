import { Selector } from "@/shared/ui/Selector";
import { ReactElement } from "react";

export function HomePageTitle(): ReactElement {
  return (
    <div className="flex mt-14">
      <h1 className="text-[45px] text-text-black font-bold leading-normal">Куда сходить в&nbsp;</h1>
      <Selector options={[{value: 'Minsk', name: 'Минске'}]}/>
    </div>
  );
}
