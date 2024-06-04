import { IReview } from "../../../interfaces/IReview";

export interface IReviews {
  reviews: IReview[];
  loading: boolean;
  error: string | null;
}
