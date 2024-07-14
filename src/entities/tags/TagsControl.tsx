import { LabeledInput } from "@/shared";
import { ChangeEvent, ReactElement, useState } from "react";
import { ISelectInputOptions } from "@/shared/model/types";
import { useCreateTagMutation } from "./api/tagsApi";
import Svg from "@/shared/ui/Svg";

interface ITagsControlProps {
  tags: ISelectInputOptions[];
  onChange: (tagId: number, toRemove: boolean) => void;
  value: number[];
}

export function TagsControl({ tags, onChange, value }: ITagsControlProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [createdTags, setCreatedTags] = useState<ISelectInputOptions[]>([]);
  const [ createTag ] = useCreateTagMutation();

  const tips = tags.filter((tag) => tag.name.toLowerCase().includes(inputValue.toLowerCase()) && !value.some((el) => el === tag.id)).slice(0, 3);

  const isCreateEventButtonShow =
  !tips.some((el) => el.name.toLowerCase() === inputValue.toLowerCase())
  && ![...tags, ...createdTags].some((el) => el.name.toLowerCase() === inputValue.toLowerCase())
  && inputValue.length > 3;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleTagSelect = (tagId: number) => {
    onChange(tagId, false);

    setInputValue('');
  }

  const handleTagDelete = (tagId: number) => {
    onChange(tagId, true);
  }

  const handleCreateTag = () => {
    createTag(inputValue)
      .unwrap()
      .then((res) => {
        setInputValue('');
        onChange(res.id, false);
        setCreatedTags((state) => ([...state, res]));
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="mt-[18px] relative">
      <LabeledInput
        type='text'
        head={<Svg className="w-6 h-6" id="search-icon-gray" />}
        placeholder='Ищите теги'
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
        size="lg"
        className="w-[480px] text-[18px] mt-[7px]"
        extraInputClass="pl-3"
        labelText="Тэги (необязательно)"
        extraLabelClass="text-[20px]"
      />
      <p className='text-text-light-gray mt-2'>Тезисно опишите свое мероприятие</p>
      {
        inputValue === '' || (tips.length === 0 && !isCreateEventButtonShow) ? (
          <></>
        ) : (
          <div className="absolute top-[90px] w-full bg-custom-gray rounded-[10px] pl-[22px] py-[13px] pr-1.5 max-w-[480px] z-10">
            <ul className="w-full max-h-[170px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]">
              {
                tips.map((tag, index) => (
                  <li onClick={() => handleTagSelect(tag.id)} key={index} className="flex mt-2 first-of-type:mt-0 cursor-pointer">
                    <div className="text-[18px] w-[22px] text-center">
                      <p>{tag.id}</p>
                    </div>
                    <p className="text-[18px] font-semibold ml-3.5">{tag.name}</p>
                  </li>
                ))
              }
              {
                isCreateEventButtonShow && (
                  <li onClick={handleCreateTag} className="flex mt-2 first-of-type:mt-0 cursor-pointer">
                    <div className="text-[18px] w-[22px] text-center">
                      <p>0</p>
                    </div>
                    <p className="text-[18px] font-semibold ml-3.5">{`Создать "${inputValue}"`}</p>
                  </li>
                )
              }
            </ul>
          </div>
        )
      }
      {
        value.length === 0 ? (
          <></>
        ) : (
          <ul className="flex flex-wrap max-w-[796px] ml-[-20px]">
            {
              value.map((tag, index) => (
                <li key={index} className="flex items-center h-[34px] border-1 border-but-primary border-solid rounded-[12px] pl-[22px] pr-3.5 ml-5 mt-3">
                  <p className="text-[18px] text-but-primary">{[...tags, ...createdTags].find((el) => el.id === tag)?.name}</p>
                  <div onClick={() => handleTagDelete(tag)} className="w-6 h-6 bg-close-cross-purple bg-center bg-no-repeat ml-1.5 cursor-pointer"></div>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}
