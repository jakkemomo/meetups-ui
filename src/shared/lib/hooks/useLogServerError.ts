import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const useLogServerError = (isError: boolean, relatedTo: string, error: FetchBaseQueryError | SerializedError | undefined) => {
  if (isError) {
    return console.log(
      `Ошибка при получении ${relatedTo} - ${JSON.stringify(error)}`
    );
  }
}
