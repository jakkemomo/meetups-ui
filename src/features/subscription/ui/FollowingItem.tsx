import { ProfileFollowing } from "@/entities/profile/model/types";
import { config } from "@/shared/config";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";


function FollowingItem(props: {following : ProfileFollowing}): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <div className="flex items-center" onClick={() => navigate(`/profile/${props.following.user}`)}>
        <img src={`${config.BASE_IMAGE_URL}${props.following.image_url}`} alt={props.following.username} className="w-20 h-20 rounded-full mr-4 object-cover" />
        <span className="text-lg">{props.following.username}</span>
      </div>
      <button className="ml-auto text-main-purple pointer" onClick={() => console.log('Написать', props.following.user)}>Написать</button>
    </div>
  )
}

export default FollowingItem;

