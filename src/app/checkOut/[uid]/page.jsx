import UserInfoNav from "../../../../components/user-info/UserInfoNav";
import UserInfoCheck from "../../../../components/user-info/UserInfoCheck";
import UserInfoLayout from "../../../../components/user-info/UserInfoLayout";
import MainHeader from "../../../../components/main-header";
import FooterComp from "../../../../components/footer";

const page = () => {
  return (
    <>
    <MainHeader />
    <UserInfoLayout className="mt-[200px]">
      <UserInfoNav />
      <UserInfoCheck />
    </UserInfoLayout>
    <FooterComp
        frameDivPosition="unset"
        frameDivBottom="unset"
        frameDivLeft="unset"
        iconsCurvedLocationObjectFit="unset"
      />
    </>
  );
};

export default page;
