import { wrapIcon } from "@fluentui/react-icons";

const CalendarIconSvg = () => (
    <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="3.25"
            y="6"
            width="18"
            height="15"
            rx="2"
            stroke="#3E6FA3"
            strokeWidth="2"
        />
        <path
            d="M4.25 11H20.25"
            stroke="#3E6FA3"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M9.25 16H15.25"
            stroke="#3E6FA3"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M8.25 3L8.25 7"
            stroke="#3E6FA3"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M16.25 3L16.25 7"
            stroke="#3E6FA3"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const CalendarIcon = wrapIcon(CalendarIconSvg, "CalendarIcon");
