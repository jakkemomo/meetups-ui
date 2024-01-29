import {useProfileDetailsQuery} from '@/entities/profile'
import {LogoutButton} from '@/features/authentication/logout'
import {ProfileId} from "@/entities/profile/model/types.ts";

interface LayoutProfileCardProps {
    access: string;
    refresh: string;
}

export function LayoutProfileCard({access, refresh}: LayoutProfileCardProps) {
    let decodedToken = atob(access.split('.')[1])
    let tokenData = JSON.parse(decodedToken)
    var userId: ProfileId = tokenData.user_id
    const {data: profileData} = useProfileDetailsQuery(
        userId,
        {skip: !userId}
    )
    return (
        <div>
            <div>
                Привет, <span className="text_bold">{profileData?.username}</span>!&nbsp;
                <br/>
                {refresh && (
                    <LogoutButton refresh={refresh}/>
                )}
            </div>
        </div>
    )
}
