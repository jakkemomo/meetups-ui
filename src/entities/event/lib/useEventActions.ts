import { useLeaveFromEventMutation, useLikeEventMutation, useRegisterToEventMutation, useUnlikeEventMutation } from "@/entities/event/api/eventApi";
import { useAppDispatch } from "@/shared/model";
import { isFavoriteSetted, isParticipantSetted } from "../model/eventInfoSlice";
import { useCallback } from "react";

export function useEventActions(eventId: number) {
  const dispatch = useAppDispatch();
  const [registerToEvent] = useRegisterToEventMutation();
  const [leaveFromEvent] = useLeaveFromEventMutation();
  const [likeEvent] = useLikeEventMutation();
  const [unlikeEvent] = useUnlikeEventMutation();

  // In this responses I specifically change the state of the button without waiting
  // for response from the server to prevent delay when clicking
  const handleRegisterToEvent = useCallback(async () => {
    dispatch(isParticipantSetted(true));

    try {
      await registerToEvent(eventId).unwrap();
    } catch (err) {
      dispatch(isParticipantSetted(false));
      console.log(err);
    }
  }, [dispatch, eventId, registerToEvent]);

  const handleLeaveFromEvent = useCallback(async () => {
    dispatch(isParticipantSetted(false));

    try {
      await leaveFromEvent(eventId).unwrap();
    } catch (err) {
      dispatch(isParticipantSetted(false));
      console.log(err);
    }
  }, [dispatch, eventId, leaveFromEvent]);

  const handleLikeEvent = useCallback(async () => {
    dispatch(isFavoriteSetted(true));

    try {
      await likeEvent(eventId).unwrap()
    } catch (err) {
      dispatch(isFavoriteSetted(false));
      console.log(err);
    }
  }, [dispatch, eventId, likeEvent]);

  const handleUnlikeEvent = useCallback(async () => {
    dispatch(isFavoriteSetted(false));

    try {
      await unlikeEvent(eventId).unwrap()
    } catch (err) {
      dispatch(isFavoriteSetted(true));
      console.log(err);
    }
  }, [dispatch, eventId, unlikeEvent]);

  return { handleRegisterToEvent, handleLeaveFromEvent, handleLikeEvent, handleUnlikeEvent };
}
