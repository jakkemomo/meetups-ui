
import { ReactElement } from "react";
import { IEventTag } from "@/entities/event/model/types";

interface ITagRow {
  tags: IEventTag[];
}

export function TagRow({tags}: ITagRow): ReactElement {
  return (
    <section className="flex flex-wrap justify-start gap-3 pt-5 self-stretch max-w-[1000px]">
      {tags.map(tag => (
        <div key={tag.id}
          className="rounded-xl border border-main-violet-600 px-[22px] py-[5px] text-lg font-normal text-main-violet-600 cursor-pointer duration-150 hoverscreen:hover:opacity-70">
          {tag.name}
        </div>
      ))}
    </section>
  )
}
