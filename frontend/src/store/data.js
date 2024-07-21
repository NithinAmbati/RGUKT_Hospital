const MainPageHeaderContent = [
  {
    title: "Login",
    link: "/login",
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
  { title: "Home", link: "/nurse" },
  { title: "Patient Details", link: "/nurse/patient-details" },
  { title: "Profile", link: "/nurse/profile" },
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
