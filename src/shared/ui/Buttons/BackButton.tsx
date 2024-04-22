import { Button } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function BackButton(): ReactElement {
  const navigate = useNavigate();

  return (
      <Button
        onClick={() => navigate(-1)}
        extraClass="text-but-primary text-[18px] font-semibold hoverscreen:hover:opacity-70 !bg-white"
      >
        <Svg className="w-6 h-6 mr-2" id="chevron-left-purple" />
        Назад
      </Button>
  )
}
