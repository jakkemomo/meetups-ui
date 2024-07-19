import { IFollowing } from "@/features/subscription/model/types";
import { ReactElement } from "react";


function FollowingItem(props: {following : IFollowing}): ReactElement {
    return (
        <div className="flex items-center my-4">
            <img src={props.following.image} alt={props.following.name} className="w-20 h-20 rounded-full mr-4" />
            <span className="text-lg">{props.following.name}</span>
            <button className="ml-auto text-[#5E5CCE]">Написать</button>
        </div>
    )
}

export default FollowingItem;