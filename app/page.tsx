import type { Metadata } from "next";
import LoginButton from "./components/LoginButton";
import LogOutButton from "./components/LogOutButton";
import Profile from "./components/Profile";

export default function IndexPage() {
  return <div>
    <LoginButton/>
    <LogOutButton/>
    <Profile/>
    </div>;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
