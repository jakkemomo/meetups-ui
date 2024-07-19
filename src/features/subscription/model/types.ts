export enum FollowingType {
	people = 'people',
	organization = 'organization',
}

export interface IFollowing {
    image: string,
    name: string,
    id: number,
    type: `${FollowingType}`,
}