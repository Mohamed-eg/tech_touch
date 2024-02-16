import UserInfoNav from "../../../../components/user-info/UserInfoNav";
import AddressForm from "../../../../components/user-info/addressFrom";
import UserInfoLayout from "../../../../components/user-info/UserInfoLayout";
import MainHeader from "../../../../components/main-header";
import FooterComp from "../../../../components/footer";

const page = () => {
  return (
    <>
    <MainHeader />
    <UserInfoLayout className="mt-[200px]">
      <UserInfoNav />
      <AddressForm />
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