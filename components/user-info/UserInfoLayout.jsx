import classes from "./UserInfoLayout.module.css";

function UserInfoLayout(props) {
  return<div className="mt-[140px]"> <main className={classes.Main}>{props.children}</main></div>;
}

export default UserInfoLayout;
