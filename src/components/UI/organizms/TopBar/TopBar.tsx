// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { IUser } from "../../../../interfaces/IUser";
import { IconLogo } from "../../atoms/Icons";
import { LinkButton, LinkStyled } from "../../atoms/Links";
import AccountBar from "../SideBar/AccountBar";
import "./topbar.scss";

const TopBar = ({
  isOpen,
  setIsOpen,
  loading,
  user,
}: {
  isOpen: string;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  user: IUser;
}) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");

  const searchBooks = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `http://localhost:5173/search/${value}`;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     !isOpen && window.location.reload();
  //   }, 1000);
  // }, [isOpen]);

  return (
    <header className="top-bar">
      <div className="container">
        <div className="top-bar__inner">
          <div className="top-bar__logo">
            <LinkStyled to="/">
              <IconLogo />
            </LinkStyled>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => searchBooks(e)}>
              <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {/* <button type="submit">Search</button> */}
            </form>
          </div>
          <ul className="top-bar__link">
            <li>
              <LinkButton
                className={isOpen === "Home" ? "active" : ""}
                onClick={(e) => setIsOpen(e.currentTarget.innerText)}
                to="/"
              >
                Home
              </LinkButton>
            </li>
            <li>
              <LinkButton
                className={isOpen === "Categories" ? "active" : ""}
                onClick={(e) => setIsOpen(e.currentTarget.innerText)}
                to="/categories"
              >
                Categories
              </LinkButton>
            </li>
            <li>
              <LinkButton
                className={isOpen === "About" ? "active" : ""}
                onClick={(e) => setIsOpen(e.currentTarget.innerText)}
                to="/about"
              >
                About
              </LinkButton>
            </li>
            <li>
              <LinkButton
                className={isOpen === "Contacts" ? "active" : ""}
                onClick={(e) => setIsOpen(e.currentTarget.innerText)}
                to="/contacts"
              >
                Contacts
              </LinkButton>
            </li>
            <li>
              {loading ? (
                "loading..."
              ) : user.email ? (
                <div className="account">
                  <p onClick={() => setActive(!active)}>{user.email}</p>
                  <AccountBar user={user} active={active} setActive={setActive} />
                </div>
              ) : (
                <LinkButton
                  className={"sign-in" + (isOpen === "Sign in" ? " active" : "")}
                  onClick={(e) => setIsOpen(e.currentTarget.innerText)}
                  to="/sign-in"
                >
                  Sign in
                </LinkButton>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
