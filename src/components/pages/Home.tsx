import book2 from "../../assets/b2.jpg";
import book12 from "../../assets/b12.jpg";
import book9 from "../../assets/b9.jpg";
// import RecomendSlider from "../UI/organizms/Sliders/RecomendSlider";
import { RecomendSlider } from "../UI/organizms/Sliders";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getBooks } from "../../store/slices/bookSlice";
import { useEffect } from "react";
// import { useEffect, useState } from "react";

const Home = () => {
  const storeBooks = useAppSelector((state) => state.books);

  const dispatch = useAppDispatch();

  // console.log(storeBooks);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  // useEffect(() => {
  //   console.log(storeBooks.error);

  // }, [storeBooks])

  return (
    <div className="home">
      <div className="container">
        <div className="home__inner">
          <div className="home__welcome">
            <div className="welcome__left">
              <h1>Welcome!</h1>
              <p>
                Please browse through our collection of books
                <br /> and find the perfect one for you!
              </p>
            </div>
            <div className="welcome__right">
              <img src={book2} alt="" />
              <img src={book12} alt="" />
              <img src={book9} alt="" />
            </div>
          </div>
          {/* Recomended */}
          {storeBooks.loading ? (
            "loading..."
          ) : storeBooks.error ? (
            storeBooks.error
          ) : (
            <RecomendSlider cards={storeBooks.books} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
