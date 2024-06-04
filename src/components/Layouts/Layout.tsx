import { useEffect, useState } from "react";
import TopBar from "../UI/organizms/TopBar/TopBar";
import { IUser } from "../../interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { tokenIsValid } from "../../store/slices/userSlice";

const Layout = ({ children }: React.PropsWithChildren) => {
  const loading = useAppSelector((state) => state.user.loading);
  const getUser = useAppSelector<IUser>((state) => state.user.user);
  const [user, setUser] = useState<IUser>(getUser);
  const dispatch = useAppDispatch();

  
  // console.log(user);

  const [isOpen, setIsOpen] = useState(
    window.location.pathname
      .slice(1)
      .split("")
      .map((a, i) => (i === 0 ? a.toUpperCase() : a))
      .join("") || "Home"
  );

  useEffect(() => {
    dispatch(tokenIsValid());
  }, []);

  useEffect(() => {
    setUser(getUser);
  }, [getUser]);

  return (
    <>
      <TopBar isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} user={user} />
      {children}
    </>
  );
};

export default Layout;
