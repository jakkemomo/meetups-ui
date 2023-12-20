// import { useRef } from "react";
// import { useButton } from "@react-aria/button";
// import { useFocusRing } from "@react-aria/focus";
// import { mergeProps } from "@react-aria/utils";
// import styled from "styled-components";
// //"ring-2 ring-offset-2 ring-purple-600" : ""
// const Button = (props) => {
//     const ref = useRef(null);
//     const { buttonProps } = useButton(props, ref);
//     const { focusProps, isFocusVisible } = useFocusRing();
//     return (
//         <button
//             {...mergeProps(buttonProps, focusProps)}
//             ref={ref}
//             className={`p-2 ${props.isDisabled ? "text-gray-400" : ""} ${!props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
//                 } outline-none ${isFocusVisible ? "" : ""
//                 }`}
//         >
//             {props.children}
//         </button>
//     );
// }

// export default Button