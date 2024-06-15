import BottomBar from "@/components/layout/bottombar/BottomBar";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Main from "@/components/layout/main/Main";
import Button from "react-bootstrap/Button";
import Contact from "@/app/base/Contact/Contact";
import { useAuthContext } from "@/app/auth/context";

export default function Dashboard() {
  // const { PrivateView, logoutUser } = useAuthContext();
  return (
    <>
      <Header />
      <Main>
        <Contact />
      </Main>
      <Footer />
      <BottomBar />
    </>
  );
}
