import Header from "../../components/Header";
import { AdminHeaderContent } from "../../store/data";

const AdminHome = () => {
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
