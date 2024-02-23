import classes from "./UserInfoLayout.module.css";

function UserInfoLayout(props) {
  return<div className="mt-[140px]">
           <main className={classes.Main}>
            <div className="w-full flex flex-row max-md:flex-col">
            {props.children}
            </div>
            </main>
     </div>;
}

export default UserInfoLayout;
