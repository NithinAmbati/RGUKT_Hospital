import Header from "../../components/Header";
import ProfileComponent from "../../components/ProfileComponent";
import { DoctorsHeaderContent } from "../../store/data";

const DoctorProfilePage = () => {
  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <ProfileComponent user="doctor" />
    </>
  );
};

export default DoctorProfilePage;
