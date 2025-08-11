// components/ui/calendar.jsx
'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function Calendar(props) {
    return <DatePicker {...props} />;
}