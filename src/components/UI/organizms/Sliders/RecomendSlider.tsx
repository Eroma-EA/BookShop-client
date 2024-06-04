import { useState } from "react";
import { ICard } from "../../../../interfaces/ICard";
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded";

const RecomendSlider = ({ cards }: { cards: ICard[] }) => {
  const [cardsMove, setCardsMove] = useState<ICard[]>([...cards.filter((c) => c.id < 15)]);

  const [move, setMove] = useState<number>(-200);
  const [isMove, setIsMove] = useState<boolean>(false);
  const [arrow, setArrow] = useState<string>("");

  const handleClick = (card: ICard, direction: string) => {
    setIsMove(true);
    setArrow(direction);
    if (direction === "prev") {
      setMove(move + 200);
    }
    if (direction === "next") {
      setMove(move - 200);
    }

    setTimeout(() => {
      setIsMove(false);
      setMove(-200);
      const newCardsMove = [...cardsMove.filter((c) => c.id !== card.id)];

      if (direction === "prev") setCardsMove([card, ...newCardsMove]);
      if (direction === "next") setCardsMove([...newCardsMove, card]);
    }, 300);

    // setCurrentCard(cardsMove[0]);
  };
  return (
    <div className="recomended__slider">
      <div className="recomended__left">
        <img
          src={
            "http://localhost:3000/api/public/products/" +
            cardsMove[isMove && arrow === "next" ? 1 : isMove ? cardsMove.length - 1 : 0].img
          }
          alt=""
        />
        {/* <button className="recomended__btn">More...</button> */}
      </div>
      <div className="recomended__right">
        <div className="recomended__info">
          <h1>
            {cardsMove[isMove && arrow === "next" ? 1 : isMove ? cardsMove.length - 1 : 0].name}
          </h1>
          <p>
            {
              cardsMove[isMove && arrow === "next" ? 1 : isMove ? cardsMove.length - 1 : 0]
                .description
            }
          </p>
        </div>
        <div className="recomended__books">
          <div className="slider">
            <div
              className="slider__books"
              style={{
                transform: `translateX(${move}px)`,
                transition: isMove ? "all 0.3s ease" : "0s",
              }}
            >
              {cardsMove.map((card) => (
                <img
                  key={card.id}
                  src={"http://localhost:3000/api/public/products/" + card.img}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ArrowDropDownCircleRoundedIcon
        className="arrow__left"
        onClick={() => handleClick(cardsMove[cardsMove.length - 1], "prev")}
      />

      <ArrowDropDownCircleRoundedIcon
        className="arrow__right"
        onClick={() => handleClick(cardsMove[0], "next")}
      />
    </div>
  );
};

export default RecomendSlider;
