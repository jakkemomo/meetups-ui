import { ProfileFollowing } from "@/entities/profile/model/types";
import { Button } from "@/shared";
import { config } from "@/shared/config";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";


function FollowingItem(props: {following : ProfileFollowing}): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <div className="flex items-center cursor-pointer" onClick={() => navigate(`/profile/${props.following.user}`)}>
        <img src={`${config.BASE_IMAGE_URL}${props.following.image_url}`} alt={props.following.username} className="w-20 h-20 rounded-full mr-4 object-cover" />
        <span className="text-lg">{props.following.username}</span>
      </div>
      <Button
        extraClass="ml-auto text-main-violet-600 !text-[16px]"
      >
        Написать
      </Button>
    </div>
  )
}

export default FollowingItem;

