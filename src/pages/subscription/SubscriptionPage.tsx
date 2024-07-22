import { Input } from "@/shared";
import { PageTitle } from "@/widgets/PageTitle";
import { ChangeEvent, ReactElement, useState } from "react";
import Svg from "@/shared/ui/Svg";
import FollowingList from "@/widgets/FollowingList/ui/FollowingList";

function SubscriptionPage(): ReactElement {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <PageTitle title="Подписки"/>
      <Input
        type="text"
        head={<Svg className="w-6 h-6" id="search-icon-def" />}
        onChange={handleInputChange}
        placeholder="Ищите людей и организации"
        value={inputValue}
        size="md"
        className="w-[375px] max-h-11 text-[16px] mt-5"
        extraInputClass="pl-3"
        />
        <FollowingList />
      </>
    );
}

export default SubscriptionPage;
