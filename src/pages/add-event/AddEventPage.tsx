import {ReactElement} from "react";
import AddEventForm from "@/entities/event/ui/AddEventForm";

function AddEventPage(): ReactElement {

  return (
    <main className="w-full">
      <h1 className="text-[45px] text-text-black font-bold leading-normal mt-14">Cоздайте мероприятие</h1>
      <AddEventForm />
    </main>
  );
}

export default AddEventPage;
