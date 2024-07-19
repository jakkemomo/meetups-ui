import { IFollowing } from "@/features/subscription/model/types";
import { ReactElement } from "react";


function FollowingItem(props: {following : IFollowing}): ReactElement {
    return (
        <div className="flex items-center my-4">
            <img src={props.following.image_url} alt={props.following.username} className="w-20 h-20 rounded-full mr-4 object-cover" />
            <span className="text-lg ">{props.following.username}</span>
            <button className="ml-auto text-[#5E5CCE]" onClick={() => console.log('Написать', props.following.id)}>Написать</button>
        </div>
    )
}

export default FollowingItem;