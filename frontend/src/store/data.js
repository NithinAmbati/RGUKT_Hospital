const MainPageHeaderContent = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "emergency",
    link: "/emergency",
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
  { title: "Patient Details", link: "/doctor/patient-details" },
  { title: "Logout", link: "/logout" },
];

const PharmacistsHeaderContent = [
  { title: "Home", link: "/pharmacist" },
  { title: "Add Medicine", link: "/pharmacist/add-medicines" },
  { title: "Logout", link: "/logout" },
];

export {
  DoctorsHeaderContent,
  PharmacistsHeaderContent,
  MainPageHeaderContent,
};
