import {ReactElement} from "react";
import { ProfileInfo } from "@/widgets/Profile/ProfileInfo";
// import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";



 function CurrentProfileView(): ReactElement {
  // const { data: profileData } = useMyDetailsQuery();

  return (
    <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-wrap min-h-[1000px]">
    <ProfileInfo />
    <div className="flex-auto basis-7/12 min-h-[1000px]">
      {/* <p>02</p> */}
    </div>
    
    {/* <ProfileEvents /> */}
    
   


    </section>
  )
}

export default CurrentProfileView;