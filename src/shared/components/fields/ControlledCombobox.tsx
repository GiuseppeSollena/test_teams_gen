import {
    Combobox,
    ComboboxProps,
    makeStyles,
    mergeClasses,
    Option,
    OptionOnSelectData,
    SelectionEvents,
} from "@fluentui/react-components";
import { CommonOption } from "shared/models/SharedModels";
import { useEffect, useMemo, useState } from "react";
import {
    Control,
    Controller,
    FieldValues,
    Path,
    UseFormTrigger,
    useWatch
} from "react-hook-form";

const useStyles = makeStyles({
    dropdown: {
        padding: 0,
    },
});

interface ControlledComboboxProps<TFieldValues extends FieldValues>
    extends Omit<
        ComboboxProps,
        "name" | "value" | "defaultValue" | "freeform" | "selectedOptions"
    > {
    name: Path<TFieldValues>;
    options?: CommonOption[];
    control: Control<TFieldValues, any, TFieldValues>;
    trigger: UseFormTrigger<TFieldValues>;
}

const ControlledCombobox = <TFieldValues extends FieldValues>({
    className,
    options = [],
    name,
    control,
    trigger,
    ...props
}: ControlledComboboxProps<TFieldValues>) => {
    const styles = useStyles();

    const fieldValue = useWatch({
        control,
        name,
    });

    const valueToLabelMap = useMemo(
        () => new Map(options.map((opt) => [opt.value, opt.label])),
        [options]
    );

    const labelToValueMap = useMemo(
        () => new Map(options.map((opt) => [opt.label, opt.value])),
        [options]
    );

    const [displayValue, setDisplayValue] = useState<string | undefined>(() => {
        const initialFieldValue = control._formValues[name];
        return initialFieldValue ? (valueToLabelMap.get(initialFieldValue) || "") : "";
    });

    const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
        const initialFieldValue = control._formValues[name];
        return initialFieldValue ? [initialFieldValue] : [];
    });

    useEffect(() => {
        const currentDisplayLabel = valueToLabelMap.get(fieldValue);
        if (fieldValue !== undefined && fieldValue !== null) {
            if (displayValue !== currentDisplayLabel && displayValue !== fieldValue) {
                setDisplayValue(currentDisplayLabel || "");
                setSelectedOptions([fieldValue]);
            }
        } else {
            if (displayValue !== "" || selectedOptions.length > 0) {
                setDisplayValue("");
                setSelectedOptions([]);
            }
        }
    }, [fieldValue, valueToLabelMap]); 

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <Combobox
                        {...props}
                        {...field}
                        className={mergeClasses(className, styles.dropdown)}
                        value={displayValue} 
                        selectedOptions={selectedOptions} 
                        onOptionSelect={(
                            _: SelectionEvents,
                            data: OptionOnSelectData
                        ) => {
                            field.onChange(data.optionValue);
                            setDisplayValue(data.optionText);
                            setSelectedOptions(
                                data.optionValue !== undefined
                                    ? [data.optionValue]
                                    : []
                            );
                            trigger(name);
                        }}
                        onInput={(e) => {
                            const inputText = (e.target as HTMLInputElement).value;
                            setDisplayValue(inputText);

                            const matchedValue = labelToValueMap.get(inputText);
                            if (matchedValue !== undefined) {
                                field.onChange(matchedValue);
                                setSelectedOptions([matchedValue]);
                            } else {
                                field.onChange(inputText);
                                setSelectedOptions([]);
                            }
                            trigger(name); 
                        }}
                        onBlur={() => {
                            const currentInputText = displayValue;
                            const matchedValue = labelToValueMap.get(currentInputText || "");

                            if (matchedValue !== undefined) {
                                field.onChange(matchedValue);
                                setDisplayValue(valueToLabelMap.get(matchedValue)); 
                                setSelectedOptions([matchedValue]);
                            } else {
                                setSelectedOptions([]);
                            }
                            trigger(name); 
                        }}
                    >
                        {options.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Combobox>
                );
            }}
        />
    );
};

export default ControlledCombobox;