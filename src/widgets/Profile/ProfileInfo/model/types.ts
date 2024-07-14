import { ProfileDetails } from "@/entities/profile/model/types";
import { ReactNode } from "react";

export interface IProfileAvatar {
    onEditProfile?: () => void;
    image?: string;
    name?: string;
  }

export interface IProfileData {
    profileData?: ProfileDetails;
    children: ReactNode;
    OnEditProfile?: () => void;
    optionButton?: ReactNode;
  }
