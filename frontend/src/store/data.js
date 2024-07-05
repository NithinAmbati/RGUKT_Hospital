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
  { title: "Logout", link: "/logout" },
];

const StudentHeaderContent = [
  { title: "Home", link: "/student" },
  { title: "Medical History", link: "/student/medical-history" },
  { title: "Logout", link: "/logout" },
];

const PharmacistsHeaderContent = [
  { title: "Home", link: "/pharmacist" },
  { title: "Medication List", link: "/pharmacist/medication-list" },
  { title: "Add Medicine", link: "/pharmacist/add-medicines" },
  { title: "Logout", link: "/logout" },
];

export {
  DoctorsHeaderContent,
  StudentHeaderContent,
  PharmacistsHeaderContent,
  MainPageHeaderContent,
};
