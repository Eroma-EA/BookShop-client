import { IUser } from "../../../../interfaces/IUser";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { logout } from "../../../../store/slices/userSlice";
import "./account-bar.scss";

const AccountBar = ({
  user,
  active,
  setActive,
}: {
  user: IUser;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout());
    setActive(false);
  };

  return (
    <div className={"account-bar" + (active ? " active" : "")}>
      <h3>{user.email}</h3>
      <ul>
        <li>Settings</li>
        <li>Basket</li>
        <li>Favorite</li>
        <li onClick={handleClick}>Logout</li>
      </ul>
    </div>
  );
};

export default AccountBar;
