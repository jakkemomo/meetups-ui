import { ReactElement, useEffect } from "react";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { EditProfileForm } from "@/features/editProfile/ui/EditProfileForm";
import Svg from "@/shared/ui/Svg";
import { FormProvider, useForm } from "react-hook-form";
import {
  EditProfileValidationSchema,
  editProfileFormSchema,
} from "@/features/editProfile/model/editProfileFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileInfo } from "@/features/editProfile/ui/EditProfileInfo";
import { defaultProfileFormValues } from "@/features/editProfile/model/constants";
import { removeProfileExtraFields } from "@/features/editProfile/model/removeProfileExtraFields";
import { useGetCategoriesQuery } from "@/features/searchFilter/api/categoriesApi";
import { EditOptions } from "@/features/editProfile/ui/EditOptions";
import { PageTitle } from "@/widgets/PageTitle";
import { useLogServerError } from "@/shared/lib/hooks";

function EditProfile(): ReactElement {
  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isSuccess: isProfileDataSuccess,
  } = useMyDetailsQuery();

  const {
    data: categories = { results: [] },
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
    isSuccess: isCategoriesSuccess
  } = useGetCategoriesQuery();

  useLogServerError(isCategoriesError, 'категорий', categoriesError);

  const isFormLoading = isProfileDataLoading || isCategoriesLoading;
  const isFormDataSuccess = isProfileDataSuccess && isCategoriesSuccess;

  const methods = useForm<EditProfileValidationSchema>({
    resolver: zodResolver(editProfileFormSchema),
    mode: "onBlur",
    defaultValues: defaultProfileFormValues,
  });

  useEffect(() => {
    if (isProfileDataSuccess) {
      const editFormValues = removeProfileExtraFields(profileData);
      methods.reset(editFormValues);
    } else {
      methods.reset(defaultProfileFormValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileDataSuccess]);

  return (
    <>
      <PageTitle title={"Редактирование профиля"} />
      <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-wrap">
        <div className="basis-4/6 flex flex-wrap">
          <FormProvider {...methods}>
            <EditProfileForm
              handleSubmit={methods.handleSubmit}
              isLoading={isFormLoading}
              isDataSuccess={isFormDataSuccess}
              userId={String(profileData?.id) ?? "0"}
            >
              <EditProfileInfo profileData={profileData} />
              <EditOptions
                categories={categories.results}
                isSuccess={isProfileDataSuccess}
              />
            </EditProfileForm>
          </FormProvider>
        </div>
        <div className="basis-2/6 mt-[67px] pl-[149px]">
          <Svg
            id="profile-pencil"
            width="215"
            height="215"
            viewBox="0 0 215 215"
            fill="none"
          />
        </div>
      </section>
    </>
  );
}

export default EditProfile;
