import {
    makeStyles,
    mergeClasses,
    Radio,
    RadioGroup,
    RadioGroupProps,
} from "@fluentui/react-components";
import { CommonOption } from "shared/models/SharedModels";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

const useStyles = makeStyles({
    radioGroup: {
        border: "none",
        padding: "0px",
        "&:hover, &:focus-within, &:active, &:focus": {
            border: "none",
        },
    },
});

interface ControlledRadioGroupProps<TFieldValues extends FieldValues>
    extends Omit<RadioGroupProps, "name" | "value" | "defaultValue"> {
    name: Path<TFieldValues>;
    options?: CommonOption[];
    control: Control<TFieldValues, any, TFieldValues>;
}

const ControlledRadioGroup = <TFieldValues extends FieldValues>({
    className,
    options = [],
    name,
    control,
    ...props
}: ControlledRadioGroupProps<TFieldValues>) => {
    const styles = useStyles();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <RadioGroup
                    {...props}
                    {...field}
                    className={mergeClasses(styles.radioGroup, className)}
                    layout="horizontal-stacked"
                    onChange={(_, data) => {
                        field.onChange(data.value);
                    }}
                >
                    {options.map((option) => (
                        <Radio
                            labelPosition="after"
                            key={option.value}
                            value={option.value}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            )}
        />
    );
};

export default ControlledRadioGroup;
