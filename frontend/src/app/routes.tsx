import { createBrowserRouter } from "react-router";
import { Registration } from "./pages/Registration";
import { OnboardingBrands } from "./pages/OnboardingBrands";
import { OnboardingSocial } from "./pages/OnboardingSocial";
import { OnboardingInterests } from "./pages/OnboardingInterests";
import { MainLayout } from "./components/MainLayout";
import { LivePage } from "./pages/LivePage";
import { WeeklyPage } from "./pages/WeeklyPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CommunityPage } from "./pages/CommunityPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Registration,
  },
  {
    path: "/onboarding/brands",
    Component: OnboardingBrands,
  },
  {
    path: "/onboarding/social",
    Component: OnboardingSocial,
  },
  {
    path: "/onboarding/interests",
    Component: OnboardingInterests,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: LivePage },
      { path: "weekly", Component: WeeklyPage },
      { path: "profile", Component: ProfilePage },
      { path: "community", Component: CommunityPage },
    ],
  },
]);
