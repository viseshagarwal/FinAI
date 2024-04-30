/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Feedback from "layouts/feedback";
import Accounts from "layouts/accounts";
import Budget from "layouts/budget";
import Debts from "layouts/debts";
import Transactions1 from "layouts/transactions";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import { GoGoal } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import MoneySharpIcon from "@mui/icons-material/MoneySharp";
import Goals from "layouts/goals";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "Transactions",
    route: "/Transactions",
    icon: <ReceiptSharpIcon size="12px" />,
    component: <Transactions1 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Accounts",
    key: "Accounts",
    route: "/Accounts",
    icon: <AccountBalanceSharpIcon size="12px" />,
    component: <Accounts />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Budget",
    key: "Budget",
    route: "/Budget",
    icon: <MoneySharpIcon size="12px" />,
    component: <Budget />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Goals",
    key: "Goals",
    route: "/Goals",
    icon: <GoGoal />,
    component: <Goals />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Debts",
    key: "Debts",
    route: "/Debts",
    icon: <GrMoney />,
    component: <Debts />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "Feedback",
    route: "/Feedback",
    icon: <FeedbackIcon size="12px" />,
    component: <Feedback />,
    noCollapse: true,
  },
  { type: "title", title: "Account", key: "account-pages" },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
