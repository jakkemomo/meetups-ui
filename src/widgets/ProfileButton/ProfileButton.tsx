import {Button} from "@/shared";
import {useMyDetailsQuery} from "@/entities/profile/api/profileApi.ts";


export function ProfileButton() {
    let {data: profileData} = useMyDetailsQuery()
    return (
        <Button HTMLType='button' type='secondary' extraClass='text-base mt-2.5'>{profileData?.username}</Button>
    )
}
