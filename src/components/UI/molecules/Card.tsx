import { Card } from "../atoms/Panels";
import { ICard } from "../../../interfaces/ICard";
import { Link } from "react-router-dom";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addLike, deleteLike } from "../../../store/slices/likedSlice";

const CategoriesCard = ({
  card,
  liked,
  userId,
}: {
  card: ICard;
  liked: boolean;
  userId: number;
}) => {
  // const [like, setLike] = useState(liked);
  const dispatch = useAppDispatch();

  const handleLiked = () => {
    // setLike(!like);
    !liked
      ? dispatch(addLike({ productId: card.id, userId }))
      : dispatch(deleteLike({ productId: card.id, userId }));
  };

  return (
    <Card key={card.id} className="card">
      <div className="card__img">
        <Link to={`/card/${card.id}`}>
          <img src={"http://localhost:5173/src/assets/Books/" + card.img} alt="" />
        </Link>
      </div>
      <div className="card__panel">
        <Link to={`/card/${card.id}`}>
          <h3 className="card__name">{card.name}</h3>
        </Link>
        {/* <p className="card__description">{card.description}</p> */}

        <div className="card__purchase">
          <span className="rating__value">{card.price}</span>
        </div>
      </div>
      <ThumbUpAltRoundedIcon
        className={liked ? "card__like active" : "card__like"}
        onClick={() => handleLiked()}
      />
    </Card>
  );
};

export { CategoriesCard };
