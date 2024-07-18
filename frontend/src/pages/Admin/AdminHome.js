import Header from "../../components/Header";
import { AdminHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AdminHome = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header headerContent={AdminHeaderContent} />
      <main>
        <h1>Admin Home Page</h1>
      </main>
    </>
  );
};

export default AdminHome;
