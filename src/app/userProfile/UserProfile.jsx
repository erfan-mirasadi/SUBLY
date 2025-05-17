// import Section from "@/src/components/section/Section";
import Image from "next/image";
import Account from "./Account";
import AccountSetting from "./AccountSetting";
import Orders from "./Orders";
import Tab from "@/src/components/Tab";

const tabList = [
  { id: 1, title: "Profile", component: <Account /> },
  { id: 2, title: "Account Setting", component: <AccountSetting /> },
  { id: 3, title: "Orders", component: <Orders /> },
];

function UserProfile() {
  return (
    <section className="flex min-h-[90vh]  min-w-[20vh]  w-full h-full relative mt-18">
      <Image
        className="w-full h-full absolute bg-amber-50 top-0 left-0 object-cover opacity-10 z-0"
        src="/hero/robot.jpg"
        width={688}
        height={953}
        alt="Background"
      />
      <div className=" w-full">
        <div className="w-full h-fit flex justify-center">
          <Tab list={tabList} className="justify-center items-center" />
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
