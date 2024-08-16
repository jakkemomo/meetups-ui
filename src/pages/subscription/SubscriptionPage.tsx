import { PageTitle } from "@/widgets/PageTitle";
import { ReactElement } from "react";
import FollowingList from "@/widgets/FollowingList/ui/FollowingList";
import { SearchUsersInput } from "@/features/searchUsers/ui/SearchUsersInput";

function SubscriptionPage(): ReactElement {

  return (
    <>
      <PageTitle title="Подписки"/>
      <SearchUsersInput />
      <FollowingList />
      </>
    );
}

export default SubscriptionPage;
