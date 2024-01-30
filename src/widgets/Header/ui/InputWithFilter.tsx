import { Input } from "@/shared";

export function InputWithFilter() {
  return (
    <div className="flex items-center ml-[225px]">
      <Input HTMLType="text" iconType="loupe" extraClass="w-[375px] h-[60px] rounded-[40px] bg-light-gray py-[18px] px-8"/>
      <div className="bg-filter-icon w-7 h-6 bg-cover bg-no-repeat bg-center ml-[30px]"></div>
    </div>
  );
}