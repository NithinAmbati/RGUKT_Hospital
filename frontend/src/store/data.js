const MainPageHeaderContent = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Staff",
    link: "/staff",
  },
  {
    title: "Medical History",
    link: "/medical-history",
  },
  {
    title: "Login",
    link: "/login",
  },
  {
    title: "SignUp",
    link: "/signup",
  },
];

const DoctorsHeaderContent = [
  { title: "Home", link: "/doctor" },
  { title: "Profile", link: "/doctor/profile" },
  { title: "Logout", link: "/logout" },
];

const PharmacistsHeaderContent = [
  { title: "Home", link: "/pharmacist" },
  { title: "Add Medicine", link: "/pharmacist/add-medicines" },
  { title: "Profile", link: "/pharmacist/profile" },
  { title: "Logout", link: "/logout" },
];

const NursingHeaderContent = [
  { title: "Home", link: "/nursing" },
  { title: "Patient Details", link: "/nursing/patient-details" },
  { title: "Profile", link: "/nursing/profile" },
  { title: "Logout", link: "/logout" },
];

const AdminHeaderContent = [{ title: "Logout", link: "/logout" }];

export {
  DoctorsHeaderContent,
  PharmacistsHeaderContent,
  MainPageHeaderContent,
  AdminHeaderContent,
  NursingHeaderContent,
};
