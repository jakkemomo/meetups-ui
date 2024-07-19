export enum FollowingType {
	people = 'people',
	organization = 'organization',
}

export interface IFollowing {
    image_url: string,
    username: string,
    id: number,
    type: `${FollowingType}`,
}