// import { useDateFormatter } from "@react-aria/i18n";
// import  Button  from "./Button";
// import { VisuallyHidden } from "@react-aria/visually-hidden";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

// export function CalendarHeader({
//   state,
//   calendarProps,
//   prevButtonProps,
//   nextButtonProps
// }) {
//   let monthDateFormatter = useDateFormatter({
//     month: "long",
//     year: "numeric",
//     timeZone: state.timeZone
//   });

//   return (
//     <div className="flex items-center py-4">
//       {/* Add a screen reader only description of the entire visible range rather than
//        * a separate heading above each month grid. This is placed first in the DOM order
//        * so that it is the first thing a touch screen reader user encounters.
//        * In addition, VoiceOver on iOS does not announce the aria-label of the grid
//        * elements, so the aria-label of the Calendar is included here as well. */}
//       <VisuallyHidden>
//         <h2>{calendarProps["aria-label"]}</h2>
//       </VisuallyHidden>
//       <Button {...prevButtonProps}>
//         <ChevronLeftIcon className="h-6 w-6" />
//       </Button>
//       <h2
//         // We have a visually hidden heading describing the entire visible range,
//         // and the calendar itself describes the individual month
//         // so we don't need to repeat that here for screen reader users.
//         aria-hidden
//         className="flex-1 align-center font-bold text-xl text-center"
//       >
//         {monthDateFormatter.format(
//           state.visibleRange.start.toDate(state.timeZone)
//         )}
//       </h2>
//       {/* <h2
//         aria-hidden
//         className="flex-1 align-center font-bold text-xl text-center"
//       >
//         {monthDateFormatter.format(
//           state.visibleRange.start.add({ months: 1 }).toDate(state.timeZone)
//         )}
//       </h2> */}
//       <Button {...nextButtonProps}>
//         <ChevronRightIcon className="h-6 w-6" />
//       </Button>
//     </div>
//   );
// }
