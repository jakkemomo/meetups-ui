import { FollowingType, IFollowing } from "./types";

export const title = {
	[FollowingType.people]: 'Люди',
	[FollowingType.organization]: 'Огранизации',
}


//mock 

export const followings: IFollowing[] = [
    {
        image_url: 'https://i.pinimg.com/736x/e7/02/93/e7029376bec801c262b2992afde3b198.jpg',
        username: 'Сатору Годжо',
        id: 1,
        type: 'people',

    },
    {
        image_url: 'https://pm1.aminoapps.com/6771/99236e4f95cc4d58de95deeddbc005a43e62cb70v2_00.jpg',
        username: 'Саске Учиха',
        id: 2,
        type: 'people',
    },
    {
        image_url: 'https://sun9-18.userapi.com/impg/Ty0viyUFYr1AK0Wkms4yep5MR5PFolSsg8S_aA/YbevFNq-VHk.jpg?size=300x300&quality=96&sign=e3dcac2fd81cc5feefcbd8dca15cec22&type=album',
        username: 'Леви Аккерман',
        id: 3,
        type: 'organization'
    },
    {
        image_url: 'https://pm1.aminoapps.com/8270/115257038d3a5432b250468e1591f7865f37d80er1-736-736v2_00.jpg',
        username: 'Тенген Узуй',
        id: 4,
        type: 'organization'
    },
    {
        image_url: 'https://n1s2.hsmedia.ru/f9/d8/72/f9d872c2f2f022ffe88b50b69b5ad31d/600x600_1_4b286d4073df51c9d4667aae8cc00b2f@1080x1080_0xac120004_3507355061680265005.jpeg',
        username: 'Леон',
        id: 5,
        type: 'people'
    },
    {
        image_url: 'https://n1s1.hsmedia.ru/e8/ab/ee/e8abeec6dd6016773d35afc49714ee96/600x600_1_6ffdae9bda1713936b82e920705d0693@720x720_0xac120003_4640371981653646610.png',
        username: 'Солдер бой',
        id: 6,
        type: 'people'
    },
    {
        image_url: 'https://fbimages.teinon.net/fanfic-covers/m_zJrZcPuRoWgzD5mXejYHJMopP0v1sJ9V.jpg',
        username: 'Астарион',
        id: 7,
        type: 'people',

    },
    {
        image_url: 'https://www.soyuz.ru/public/uploads/files/2/7623937/2023051921222764a17e33e2.jpg',
        username: 'Хоум Лендер',
        id: 8,
        type: 'people',
    },
    {
        image_url: 'https://i.pinimg.com/736x/f5/56/13/f55613e268b2f5737910775aff0e65cb.jpg',
        username: 'Бутчер',
        id: 9,
        type: 'people',

    },
    {
        image_url: 'https://pm1.aminoapps.com/6771/99236e4f95cc4d58de95deeddbc005a43e62cb70v2_00.jpg',
        username: 'Саске Учиха',
        id: 10,
        type: 'people',
    },
]