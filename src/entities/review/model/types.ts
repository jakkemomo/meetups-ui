
export interface IReviewer {
  id: number;
  username: string;
  image_url: string;
}

export interface IReview {
  id: number;
  rating: number;
  created_by: IReviewer;
  created_at: string;
  review: string;
}
