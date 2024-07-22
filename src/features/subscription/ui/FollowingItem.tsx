import { ProfileFollowing } from "@/entities/profile/model/types";
import { ReactElement } from "react";


function FollowingItem(props: {following : ProfileFollowing}): ReactElement {

  return (
    <div className="flex items-center">
      <img src={`https://storage.googleapis.com/meetups-dev/media/${props.following.image_url}`} alt={props.following.username} className="w-20 h-20 rounded-full mr-4 object-cover" />
      <span className="text-lg">{props.following.username}</span>
      <button className="ml-auto text-[#5E5CCE] pointer" onClick={() => console.log('Написать', props.following.user)}>Написать</button>
    </div>
  )
}

export default FollowingItem;

