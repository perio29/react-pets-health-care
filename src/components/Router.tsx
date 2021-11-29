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
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:petId" element={<ProfilePage />} />
          <Route path="/weights/:petId" element={<WeightPage />} />
          <Route path="/treatments/:petId" element={<TreatmentPage />} />
          <Route path="/add-pet" element={<AddPetPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
