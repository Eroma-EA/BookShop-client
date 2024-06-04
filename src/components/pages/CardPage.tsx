import { useEffect, useState } from "react";
import { ICard } from "../../interfaces/ICard";
import { useParams } from "react-router-dom";
// import { IComment } from "../../interfaces/IComment";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getBook } from "../../store/slices/bookSlice";
import { getReviews } from "../../store/slices/reviewSlice";
import { IReviews } from "../../store/slices/interfaces/reviews";
import { IReview } from "../../interfaces/IReview";

const CardPage = () => {
  const loading = useAppSelector((state) => state.books.loading);
  const card = useAppSelector<ICard>((state) => state.books.book);
  const reviews = useAppSelector<IReviews>((state) => state.reviews);
  // const user = useAppSelector((state) => state.user.user);
  // const [review, setReview] = useState<IReview>();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(getBook(+id));
    id && dispatch(getReviews(+id));
  }, []);

  useEffect(() => {
    console.log();
  }, [reviews]);

  // useEffect(() => {
  //   card &&
  // }, [card]);

  // const comments = useAppSelector<IComment[]>((state) => state.books.comments);

  return loading ? (
    "loading..."
  ) : (
    <div className="card-page">
      <div className="container">
        <div className="card-page__inner">
          <div className="card-page__img">
            <img src={"http://localhost:3000/api/public/products/" + card.img} alt="" />
          </div>
          <div className="card-page__panel">
            <h3 className="card-page__panel-name">{card.name}</h3>
            <p className="card-page__panel-description">{card.description}</p>
            <p className="card-page__panel-price">{card.price}</p>
            <div className="card-page__panel-purchase">
              {/* <span className="rating__panel-value">Rating: {card}</span> */}
              {/* <span className="rating__panel-value">{card.price}</span> */}
            </div>
          </div>
        </div>
        <div className="card-page__comments">
          {/* <h2>leave review</h2> */}
          {/* <form onSubmit={() => {}}>
            <input
              type="text"
              value={review?.content}
              onChange={(e) =>
                setReview({ content: e.target.value, userId: user.id!, productId: card.id })
              }
            /> */}
          {/* </form> */}
          <h3 className="card-page__comments-title">Comments</h3>
          {reviews.loading
            ? "loading..."
            : reviews.error
            ? "no comments"
            : reviews.reviews.map((review: IReview) => (
                <div className="card-page__comments-item" key={review.id}>
                  <h3>{review.user}</h3>
                  <p className="card-page__comments-item-text">{review.content}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CardPage;
