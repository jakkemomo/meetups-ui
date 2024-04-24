import { ReactElement } from "react";
// import { ProfileInfo } from "@/widgets/Profile/ProfileInfo";
// import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { useParams } from "react-router-dom";
import { useProfileDetailsQuery } from "@/entities/profile/api/profileApi";

function RemoteProfileView(): ReactElement {
  const { userId = '0' } = useParams();

  //   console.log(useParams<{ userId?: string}>());
  console.log(userId);

  const { data: profileData } = useProfileDetailsQuery({userId:userId})
    console.log(profileData);

  return (
    <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-wrap min-h-[1000px]">
      {/* <RemoteProfileInfo data={data} /> */}

      <p>remote view</p>
      {/* <ProfileInfo />
    <div className="flex-auto basis-7/12 min-h-[1000px]">
      <p>02</p>
    </div> */}

      {/* <ProfileEvents /> */}
    </section>
  );
}

export default RemoteProfileView;
