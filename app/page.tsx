import type { Metadata } from "next";
import LoginButton from "./components/LoginButton";

export default function IndexPage() {
  return <div><LoginButton/></div>;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
