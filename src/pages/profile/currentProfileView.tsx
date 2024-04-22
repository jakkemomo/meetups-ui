import {ReactElement} from "react";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";



 function CurrentProfileView(): ReactElement {
  const { data: profileData } = useMyDetailsQuery();

  return (
    <section className="w-full max-w-[1005px] mx-auto pb-[98px] flex flex-col min-h-[1000px] border-2 border-sky-500">
     <p>{profileData && profileData.id}</p>
     <p>{profileData && profileData.username}</p>
     <p>{profileData && profileData.firstName}</p>
     <p>{profileData && profileData.lastName}</p>
     <p>{profileData && profileData.image}</p>

     <p>{profileData && profileData.isEmailVerified}</p>
     <p>{profileData && profileData.city}</p>
     <p>{profileData && profileData.is_private}</p>
     <p>{profileData && profileData.bio}</p>
     <p>{profileData && profileData.age}</p>
     <p>{profileData && profileData.date_of_birth}</p>


    {/* 
    <ProfileInfo />
    <ProfileEvents />
    
    */}


    </section>
  )
}

export default CurrentProfileView;