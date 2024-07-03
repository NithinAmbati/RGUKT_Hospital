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
    title: "Login",
    link: "/login",
  },
  {
    title: "SignUp",
    link: "/signup",
  },
  {
    title: "Medical History",
    link: "/medical-history",
  },
];

const DoctorsHeaderContent = [{ title: "Home", link: "/doctor" }];

const StudentHeaderContent = [
  { title: "Home", link: "/student" },
  { title: "Medical History", link: "/student/medical-history" },
];

const PharmacistsHeaderContent = [
  { title: "Home", link: "/pharmacist" },
  { title: "Medication List", link: "/pharmacist/medication-list" },
  { title: "Add Medicine", link: "/pharmacist/add-medicine" },
];

export {
  DoctorsHeaderContent,
  StudentHeaderContent,
  PharmacistsHeaderContent,
  MainPageHeaderContent,
};
