import { FollowingType, IFollowing } from "./types";

export const title = {
	[FollowingType.people]: 'Люди',
	[FollowingType.organization]: 'Огранизации',
}


//mock 

export const followings: IFollowing[] = [
    {
        image: 'https://i.pinimg.com/736x/e7/02/93/e7029376bec801c262b2992afde3b198.jpg',
        name: 'Сатору Годжо',
        id: 1,
        type: 'people',

    },
    {
        image: 'https://pm1.aminoapps.com/6771/99236e4f95cc4d58de95deeddbc005a43e62cb70v2_00.jpg',
        name: 'Саске Учиха',
        id: 2,
        type: 'people',
    },
    {
        image: 'https://sun9-18.userapi.com/impg/Ty0viyUFYr1AK0Wkms4yep5MR5PFolSsg8S_aA/YbevFNq-VHk.jpg?size=300x300&quality=96&sign=e3dcac2fd81cc5feefcbd8dca15cec22&type=album',
        name: 'Леви Аккерман',
        id: 3,
        type: 'organization'
    },
    {
        image: 'https://pm1.aminoapps.com/8270/115257038d3a5432b250468e1591f7865f37d80er1-736-736v2_00.jpg',
        name: 'Тенген Узуй',
        id: 4,
        type: 'organization'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8iYirZ5XJW4Ut7vwiFyMt7sF1BrUKeO6DQ&s',
        name: 'Обанай Игуро',
        id: 5,
        type: 'people'
    },
    {
        image: 'https://img.wattpad.com/a6d7599fdf99b12192dfd747ccbe41a4d6e96a11/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6d306b556d6547384e507a655a673d3d2d313038363934363134372e313638613431316233363338376563333733303334373038333737382e6a7067?s=fit&w=720&h=720',
        name: 'Сугуру Гето',
        id: 6,
        type: 'people'
    },
    {
        image: 'https://i.pinimg.com/736x/e7/02/93/e7029376bec801c262b2992afde3b198.jpg',
        name: 'Сатору Годжо',
        id: 7,
        type: 'people',

    },
    {
        image: 'https://pm1.aminoapps.com/6771/99236e4f95cc4d58de95deeddbc005a43e62cb70v2_00.jpg',
        name: 'Саске Учиха',
        id: 8,
        type: 'people',
    },
    {
        image: 'https://i.pinimg.com/736x/e7/02/93/e7029376bec801c262b2992afde3b198.jpg',
        name: 'Сатору Годжо',
        id: 9,
        type: 'people',

    },
    {
        image: 'https://pm1.aminoapps.com/6771/99236e4f95cc4d58de95deeddbc005a43e62cb70v2_00.jpg',
        name: 'Саске Учиха',
        id: 10,
        type: 'people',
    },
]