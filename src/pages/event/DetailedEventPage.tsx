import {useGetEventQuery} from '@/entities/event/api/eventApi';
import React, {ReactElement} from 'react';
import {skipToken} from '@reduxjs/toolkit/query/react'

import {useParams} from 'react-router-dom';
import {getDateAndTime} from "@/entities/event/lib/getDateAndTime.ts";

type RouteParams = {
    eventId: string;
};

export function EventPage(): ReactElement {
    const {eventId} = useParams<RouteParams>();
    const {data: event, isLoading, isError, error} = useGetEventQuery(Number(eventId) ?? skipToken);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

            return (
                <div>
                    <div>An error has occurred:</div>
                    <div>{errMsg}</div>
                </div>
            )
        } else {
            // you can access all properties of `SerializedError` here
            return <div>{error.message}</div>
        }
    }
    // const {search} = useAppSelector(state => state.searchFilter);
    // const {data: events = {results: []}} = useGetEventsQuery({search: search});
    //
    // isError && console.log(`Ошибка при получении ивентов - ${JSON.stringify(error)}`);

    if (event) {
        const { eventDate, eventTime } = getDateAndTime(event.start_date);

        return (
            <main className="bg-white w-full flex flex-col items-center p-10 pb-24">
                <section className="flex w-[1215px] h-[460px] bg-custom-gray rounded-[10px] border border-transparent">
                    <div className="flex flex-col justify-center gap-y-5 bg-gray-100 p-8 w-[525px] rounded-l-2xl">
                        <h2 className="text-lg font-normal leading-normal text-indigo-700">{event.category?.name}</h2>
                        <h1 className="font-bold leading-[50px] text-[45px] text-neutral-800">{event.name}</h1>
                        <div
                            className="flex gap-x-16 gap-y-5 pr-20 pt-1 text-[28px] font-semibold text-neutral-800">
                            <p className="flex items-center gap-x-2.5">{eventDate}</p>
                            <p className="flex items-center justify-end gap-x-2.5">{eventTime}</p>
                        </div>
                        <address
                            className="gap-x-2.5 pr-16 pt-2.5 text-lg font-normal leading-normal text-neutral-800">
                            {event.address}
                        </address>
                        <div className="flex gap-x-48 gap-y-5 pt-11 self-stretch">
                            <button
                                className="bg-indigo-500 rounded-xl px-8 pt-3 pb-2.5 text-lg font-bold text-stone-50">
                                Присоединиться
                            </button>
                            <div className="text-text-black font-medium text-[32px]">
                                ∞
                            </div>
                            <div className="w-8 h-8 bg-user-profile-group bg-center bg-no-repeat cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="h-full w-[690px]">
                        <img src={`https://storage.googleapis.com/meetups-dev/media/${event.image_url}`}
                             alt="Event Image" className="object-cover object-center w-full h-full rounded-r-2xl"/>
                    </div>
                </section>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-3 pr-64 pt-5 self-stretch">
                    {event.tags.map(tag => (
                        <div key={tag.id}
                             className="rounded-xl border border-indigo-500 px-5 py-1.5 text-lg font-normal text-indigo-500">
                            {tag.name}
                        </div>
                    ))}
                </div>
                <div className="pr-4 pt-6 self-stretch text-xl font-normal leading-normal text-neutral-800">
                    {event.description}
                </div>
            </main>
        )
    }

    return <div>Event not found</div>;
}

