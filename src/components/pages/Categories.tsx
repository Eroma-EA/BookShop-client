// import React from "react";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ICard } from "../../interfaces/ICard";
import { getBooks, getBooksByCategory, searchBooks } from "../../store/slices/bookSlice";
import { Cards } from "../UI/organizms/Cards/Cards";
import { getCategories } from "../../store/slices/categrySlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getLikes } from "../../store/slices/likedSlice";

const Categories = () => {
  const loading = useAppSelector((state) => state.books.loading);
  const books = useAppSelector<ICard[]>((state) => state.books.books);
  const user = useAppSelector((state) => state.user);
  const likes = useAppSelector((state) => state.likedSlice.likes);
  const categories = useAppSelector((state) => state.categrySlice);
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const { search } = useParams();

  const [active, setActive] = useState<string>("All");
  useEffect(() => {
    if (search) {
      console.log(search);
      setActive("All");
      dispatch(searchBooks(search));
    } else {
      !category ? dispatch(getBooks()) : dispatch(getBooksByCategory(category!));
    }
  }, [category]);

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
    // dispatch(getLikes(user.user.id || 0));
  }, []);

  useEffect(() => {
    user.user.id && dispatch(getLikes(user.user.id));
  }, [user.loading]);

  return (
    <>
      <div className="categories">
        <div className="container">
          <div className="categories__inner">
            <ul>
              {categories.loading
                ? "loading..."
                : categories.error
                ? categories.error
                : categories.categories.map((category, i) => (
                    <li key={i}>
                      <Link
                        to={category !== "All" ? `/categories/${category}` : "/categories"}
                        className={active === category ? "active" : ""}
                        onClick={() => setActive(category)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
            </ul>
            {loading ? "loading..." : <Cards cards={books} likes={likes} userId={user.user.id!} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
