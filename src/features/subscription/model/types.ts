export enum FollowingType {
	people = 'people',
	organization = 'organization',
}

export interface IFollowing {
    image_url: string,
    username: string,
    id: number
}

export interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  }
  