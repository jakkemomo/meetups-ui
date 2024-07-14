import { AddEventForm } from "@/features/addEvent/addEventForm";
import { ReactElement, useEffect } from "react";
import { MapWidget } from "@/widgets/mapWidget";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { AddEventValidationSchema, addEventSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategoriesQuery } from "@/features/searchFilter/api/categoriesApi";
import { useFormActions } from "@/features/addEvent/addEventForm/model/useFormActions";
import { useGetTagsQuery } from "@/entities/tags/api/tagsApi";
import { useGetCurrenciesQuery } from "@/features/addEvent/priceControl/api/currencyApi";
import { ParticipantsControl, TimeControl, MediaControl, MainInfoControl } from "@/widgets/addEvent";
import { PageTitle } from "@/widgets/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventQuery } from "@/entities/event/api/eventApi";
import { removeExtraFields } from "@/features/addEvent/addEventForm/model/removeExtraFields";
import { defaultFormValues } from "@/features/addEvent/addEventForm/model/constants";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";

interface IAddEventPageProps {
  type: 'add' | 'edit';
}

function AddEventPage({ type }: IAddEventPageProps): ReactElement {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const {
    data: profile,
    isSuccess: isProfileSuccess
  } = useMyDetailsQuery();

  const {
    data: categories = {results: []},
    isError: isCategoriesError,
    error: categoriesError,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesSuccess
  } = useGetCategoriesQuery();

  const {
    data: tags = {results: []},
    isError: isTagsError,
    error: tagsError,
    isLoading: isTagsLoading,
    isSuccess: isTagsSuccess
  } = useGetTagsQuery();

  const {
    data: currencies = {results: []},
    isError: isCurrenciesError,
    error: currenciesError,
    isLoading: isCurrenciesLoading,
    isSuccess: isCurrenciesSuccess
  } = useGetCurrenciesQuery();

  const {
    data: event,
    isError: isEventError,
    isLoading: isEventLoading,
    isSuccess: isEventSuccess
  } = useGetEventQuery(Number(eventId), { skip: type !== 'edit' });

  isCurrenciesError && console.log(`Ошибка при получении валют - ${JSON.stringify(currenciesError)}`);
  isTagsError && console.log(`Ошибка при получении тегов - ${JSON.stringify(tagsError)}`);
  isCategoriesError && console.log(`Ошибка при получении тегов - ${JSON.stringify(categoriesError)}`);

  const isFormLoading = isCategoriesLoading || isTagsLoading || isCurrenciesLoading || (isEventLoading && type === 'edit');
  const isFormSuccess = isCategoriesSuccess && isTagsSuccess && isCurrenciesSuccess && (isEventSuccess || type !== 'edit');
  const isFormError = isCurrenciesError || isTagsError || isCategoriesError || (isEventError && type === 'edit');

  const methods = useForm<AddEventValidationSchema>({
    resolver: zodResolver(addEventSchema),
    mode: 'onBlur',
    defaultValues: defaultFormValues
  });

  const { onSelectAddress } = useFormActions({ setValue: methods.setValue, clearErrors: methods.clearErrors });

  useEffect(() => {
    if (type ==='edit' && isEventSuccess) {
      const editFormValues = removeExtraFields(event);

      methods.reset(editFormValues);
    } else {
      methods.reset(defaultFormValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEventSuccess, type]);

  useEffect(() => {
    if (isEventSuccess && isProfileSuccess) {
      if (profile.id !== event.created_by.id) {
        navigate('/', { replace: true });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEventSuccess, isProfileSuccess]);

  return (
    <main className={`w-full max-w-[1005px] mx-auto ${isFormLoading ? "" : "pb-[98px]"}`}>
      <PageTitle title={`${type === 'edit' ? "Редактируйте" : "Создайте"} мероприятие`} />
      <FormProvider {...methods}>
        <AddEventForm
          isLoading={isFormLoading}
          isSuccess={isFormSuccess}
          isError={isFormError}
          type={type}
        >
          <MainInfoControl categories={categories.results} />
          <TimeControl />
          <Controller
            control={methods.control}
            name="location"
            render={({ field: { onChange, value }}) => (
              <MapWidget
                setValuesFunc={onSelectAddress}
                text="Точка на карте"
                markers={value ? [{ geometry: { coordinates: [Number(value.longitude), Number(value.latitude)] } }] : []}
                position={value ? { lat: Number(value.latitude), lng: Number(value.longitude) } : { lat: 53.9, lng: 27.56667 }}
                zoom={14}
                withAddressControl={true}
                onMapClick={({ latitude, longitude }) => {
                  onChange({ latitude, longitude });
                }}
              />
            )}
          />
          <ParticipantsControl currencies={currencies.results} />
          <MediaControl tags={tags.results}/>
        </AddEventForm>
      </FormProvider>
    </main>
  );
}

export default AddEventPage;
