import { ProfileFollowing } from "@/entities/profile/model/types";
import { FollowingType } from "./types";

export const title = {
	[FollowingType.people]: 'Люди',
	[FollowingType.organization]: 'Огранизации',
}


//mock 

export const mockFollowings: ProfileFollowing[] = [
    {
        image_url: 'image/',
        username: 'Сатору Годжо',
        user: 1,
        status: 'ACCEPTED',
        follower: 10
    },
    {
        image_url: 'https://pm1.aminoapps.com/6771/99236e4f95cc4d58de95deeddbc005a43e62cb70v2_00.jpg',
        username: 'Саске Учиха',
        user: 2,
        status: 'ACCEPTED',
        follower: 10
    },
    {
        image_url: 'https://sun9-18.userapi.com/impg/Ty0viyUFYr1AK0Wkms4yep5MR5PFolSsg8S_aA/YbevFNq-VHk.jpg?size=300x300&quality=96&sign=e3dcac2fd81cc5feefcbd8dca15cec22&type=album',
        username: 'Леви Аккерман',
        user: 3,
        status: 'ACCEPTED',
        follower: 10
    },
    {
        image_url: 'https://pm1.aminoapps.com/8270/115257038d3a5432b250468e1591f7865f37d80er1-736-736v2_00.jpg',
        username: 'Тенген Узуй',
        user: 4,
        status: 'ACCEPTED',
        follower: 10
    },
    {
        image_url: 'https://n1s2.hsmedia.ru/f9/d8/72/f9d872c2f2f022ffe88b50b69b5ad31d/600x600_1_4b286d4073df51c9d4667aae8cc00b2f@1080x1080_0xac120004_3507355061680265005.jpeg',
        username: 'Леон',
        user: 5,
        status: 'ACCEPTED',
        follower: 10
    },
    {
        image_url: 'https://n1s1.hsmedia.ru/e8/ab/ee/e8abeec6dd6016773d35afc49714ee96/600x600_1_6ffdae9bda1713936b82e920705d0693@720x720_0xac120003_4640371981653646610.png',
        username: 'Солдер бой',
        user: 6,
        status: 'ACCEPTED',
        follower: 10
    },
    {
        image_url: 'https://fbimages.teinon.net/fanfic-covers/m_zJrZcPuRoWgzD5mXejYHJMopP0v1sJ9V.jpg',
        username: 'Астарион',
        user: 7,
        status: 'ACCEPTED',
        follower: 10

    },
    {
        image_url: 'https://www.soyuz.ru/public/uploads/files/2/7623937/2023051921222764a17e33e2.jpg',
        username: 'Хоум Лендер',
        user: 8,
        status: 'ACCEPTED',
        follower: 10
    },
    {
        image_url: 'https://i.pinimg.com/736x/f5/56/13/f55613e268b2f5737910775aff0e65cb.jpg',
        username: 'Бутчер',
        user: 9,
        status: 'ACCEPTED',
        follower: 10

    },
    {
        image_url: 'https://pm1.aminoapps.com/6771/99236e4f95cc4d58de95deeddbc005a43e62cb70v2_00.jpg',
        username: 'Саске Учиха',
        user: 10,
        status: 'ACCEPTED',
        follower: 10
    },
]
