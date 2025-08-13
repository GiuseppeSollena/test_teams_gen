import { DatePicker, DatePickerProps } from "@fluentui/react-datepicker-compat";
import { useEffect, useMemo, useState } from "react";
import {
    Control,
    Controller,
    FieldValues,
    Path,
    UseFormTrigger,
    useWatch,
} from "react-hook-form";
import { CalendarIcon } from "shared/assets/icons/CalendarIcon";
import { IT_DATE_PICKER_STRINGS } from "shared/configs/SharedConfigs";
import { DateLimit } from "shared/models/SharedModels";

interface ControlledDatePickerProps<TFieldValues extends FieldValues>
    extends Omit<DatePickerProps, "value" | "maxDate" | "minDate"> {
    maxDate?: DateLimit<TFieldValues> | undefined;
    minDate?: DateLimit<TFieldValues> | undefined;
    name: Path<TFieldValues>;
    control: Control<TFieldValues, any, TFieldValues>;
    trigger: UseFormTrigger<TFieldValues>;
}

const ControlledDatePicker = <TFieldValues extends FieldValues>({
    maxDate,
    minDate,
    name,
    control,
    trigger,
    ...props
}: ControlledDatePickerProps<TFieldValues>) => {
    const [displayDate, setDisplayDate] = useState<Date | null>(() => {
        const initialValue = control._formValues[name];
        return initialValue ? new Date(initialValue) : null;
    });

    const fieldValue = useWatch({ control, name });

    const watchedMinFieldValue = useWatch({
        control,
        name: minDate?.type === "field" ? (minDate.value as Path<TFieldValues>) : ("" as Path<TFieldValues>),
        disabled: minDate?.type !== "field",
    });

    const watchedMaxFieldValue = useWatch({
        control,
        name: maxDate?.type === "field" ? (maxDate.value as Path<TFieldValues>) : ("" as Path<TFieldValues>),
        disabled: maxDate?.type !== "field",
    });

    const minDateLimit = useMemo(() => {
        if (!minDate) return undefined;
        if (minDate.type === "date") {
            return minDate.value as Date;
        }
        if (minDate.type === "field" && watchedMinFieldValue) {
            return new Date(watchedMinFieldValue);
        }
        return undefined;
    }, [minDate, watchedMinFieldValue]);

    const maxDateLimit = useMemo(() => {
        if (!maxDate) return undefined;
        if (maxDate.type === "date") {
            return maxDate.value as Date;
        }
        if (maxDate.type === "field" && watchedMaxFieldValue) {
            return new Date(watchedMaxFieldValue);
        }
        return undefined;
    }, [maxDate, watchedMaxFieldValue]);


    const onFormatDate = (date?: Date): string => {
        if (!date) return "";
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (!fieldValue) {
            if (displayDate !== null) {
                setDisplayDate(null);
            }
        } else {
            const newDate = new Date(fieldValue);
            if (displayDate?.getTime() !== newDate.getTime()) {
                setDisplayDate(newDate);
            }
        }
    }, [fieldValue, displayDate]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, ref } }) => (
                <DatePicker
                    {...props}
                    ref={ref}
                    minDate={minDateLimit}
                    maxDate={maxDateLimit}
                    strings={IT_DATE_PICKER_STRINGS}
                    formatDate={onFormatDate}
                    value={displayDate}
                    contentAfter={<CalendarIcon />}
                    onSelectDate={(date) => {
                        setDisplayDate(date || null);
                        onChange(date ? date.toISOString() : null);
                        trigger(name);
                    }}
                />
            )}
        />
    );
};

export default ControlledDatePicker;