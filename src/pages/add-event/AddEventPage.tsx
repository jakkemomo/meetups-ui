import { AddEventForm } from "@/features/event/addEvent";
import { AddEventPageTitle } from "@/widgets/AddEventPageTitle";
import {ReactElement} from "react";

function AddEventPage(): ReactElement {
  return (
    <main className="w-full max-w-[1005px] mx-auto pb-[98px]">
      <AddEventPageTitle />
      <AddEventForm />
    </main>
  );
}

export default AddEventPage;
