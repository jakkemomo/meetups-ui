import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useProfileDetailsQuery } from "@/entities/profile/api/profileApi";
import { Preloader } from "@/shared/ui/Preloader";
import ProfileInfo from "@/widgets/Profile/ProfileInfo/ui/ProfileInfo";
import { Button } from "@/shared/ui/Buttons/Button";

function RemoteProfileView(): ReactElement {
  const { userId = "0" } = useParams();
  const { data: profileData, isLoading: isProfileDataLoading } =
    useProfileDetailsQuery({ userId: userId });

  return (
    <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-wrap min-h-[1000px]">
      {isProfileDataLoading ? (
        <div className="m-auto">
          <Preloader />
        </div>
      ) : (
        <ProfileInfo
          profileData={profileData}
          report={
            <Button
              size="sm"
              importance="none"
              extraClass="text-but-primary text-red-700 pl-[0] hoverscreen:hover:opacity-70 !bg-white"
            >
              Пожаловаться
            </Button>
          }
        >
          <div className="flex flex-row">
            <Button size="md" importance="primary">
              Подписаться
            </Button>
            <Button size="md" importance="secondary" extraClass="ml-[20px]">
              Написать
            </Button>
          </div>
        </ProfileInfo>
      )}
    </section>
  );
}

export default RemoteProfileView;
