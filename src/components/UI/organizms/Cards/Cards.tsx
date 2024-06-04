import { ICard } from "../../../../interfaces/ICard";
import { ILiked } from "../../../../interfaces/ILiked";
import { CategoriesCard } from "../../molecules/Card";
// import { Card } from "../../atoms/Panels";
import "./cards.scss";
export const Cards = ({
  cards,
  likes,
  userId,
}: {
  cards: ICard[];
  likes: ILiked[];
  userId: number;
}) => (
  <div className="categories__cards">
    {cards.map((card) => (
      <CategoriesCard
        key={card.id}
        card={card}
        liked={likes.find((like) => like.productId === card.id) ? true : false}
        userId={userId}
      />
    ))}
  </div>
);
