import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeightPage } from "./WeightPage";
import { AddPetPage } from "./AddPetPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { SignupPage } from "./SignupPage";
import { TreatmentPage } from "./TreatmentPage";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/:userid" element={<HomePage />} />
          <Route path="/:userid/addpet" element={<AddPetPage />} />
          <Route path="/:userid/profile" element={<ProfilePage />} />
          <Route path="/:userid/weight" element={<WeightPage />} />
          <Route path="/:userid/treatment" element={<TreatmentPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
