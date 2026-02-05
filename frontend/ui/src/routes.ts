import { createBrowserRouter } from "react-router";
import { RoleSelection } from "./components/RoleSelection";
import { Signup } from "./components/Signup";
import { TrainerLogin } from "./components/trainer/TrainerLogin";
import { TrainerDashboard } from "./components/trainer/TrainerDashboard";
import { TrainerMonitoring } from "./components/trainer/TrainerMonitoring";
import { TrainerAlerts } from "./components/trainer/TrainerAlerts";
import { TrainerSessions } from "./components/trainer/TrainerSessions";
import { TrainerReports } from "./components/trainer/TrainerReports";
import { TrainerProfile } from "./components/trainer/TrainerProfile";
import { TraineeLogin } from "./components/trainee/TraineeLogin";
import { TraineeHome } from "./components/trainee/TraineeHome";
import { TraineeLocation } from "./components/trainee/TraineeLocation";
import { TraineeEmergency } from "./components/trainee/TraineeEmergency";
import { TraineeProfile } from "./components/trainee/TraineeProfile";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RoleSelection,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/trainer/login",
    Component: TrainerLogin,
  },
  {
    path: "/trainer/dashboard",
    Component: TrainerDashboard,
  },
  {
    path: "/trainer/monitoring",
    Component: TrainerMonitoring,
  },
  {
    path: "/trainer/alerts",
    Component: TrainerAlerts,
  },
  {
    path: "/trainer/sessions",
    Component: TrainerSessions,
  },
  {
    path: "/trainer/reports",
    Component: TrainerReports,
  },
  {
    path: "/trainer/profile",
    Component: TrainerProfile,
  },
  {
    path: "/trainee/login",
    Component: TraineeLogin,
  },
  {
    path: "/trainee/home",
    Component: TraineeHome,
  },
  {
    path: "/trainee/location",
    Component: TraineeLocation,
  },
  {
    path: "/trainee/emergency",
    Component: TraineeEmergency,
  },
  {
    path: "/trainee/profile",
    Component: TraineeProfile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
