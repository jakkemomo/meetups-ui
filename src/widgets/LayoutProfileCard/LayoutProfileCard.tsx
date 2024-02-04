import {useProfileDetailsQuery} from '@/entities/profile'
import {LogoutButton} from '@/features/authentication/logout'
import {ProfileId} from "@/entities/profile/model/types.ts";
import {Button} from "@/shared";

interface LayoutProfileCardProps {
    access: string;
}

export function LayoutProfileCard({access}: LayoutProfileCardProps) {
    let decodedToken = atob(access.split('.')[1])
    let tokenData = JSON.parse(decodedToken)
    var userId: ProfileId = tokenData.user_id
    const {data: profileData} = useProfileDetailsQuery(
        userId,
        {skip: !userId}
    )
    return (
        <Button HTMLType='button' type='secondary' extraClass='text-base mt-2.5'>{profileData?.username}</Button>
    )
}
