import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import type { TFunction } from "i18next";
import { useCallback } from "react";
import {
    Control,
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormTrigger
} from "react-hook-form";
import { Trans } from "react-i18next";
import TextareaAutosize from "react-textarea-autosize";
import ControlledCombobox from "shared/components/fields/ControlledCombobox";
import ControlledDatePicker from "shared/components/fields/ControlledDatePicker";
import ControlledRadioGroup from "shared/components/fields/ControlledRadioGroup";
import CustomField from "shared/components/fields/CustomField";
import { FieldConfig } from "shared/models/SharedModels";

const useStyles = makeStyles({
    customField: {
        gap: 0,
    },
    textarea: {
        resize: "none",
        overflow: "hidden!important",
        minHeight: "110px",
    },
    description: {
        fontSize: "15px",
        fontWeight: 400,
        color: tokens.colorPaletteSteelForeground2,
    },
    field: {
        height: "56px",
    },
});

interface UseRenderFieldsProps<T extends FieldValues> {
    errors: FieldErrors<T>;
    register: UseFormRegister<T>;
    t: TFunction;
    isDisabled?: boolean;
    control: Control<T, any, T>;
    trigger: UseFormTrigger<T>;
}

const useRenderFields = <T extends FieldValues>({
    errors,
    isDisabled,
    t,
    control,
    register,
    trigger
}: UseRenderFieldsProps<T>) => {
    const styles = useStyles();

    const renderFieldComponent = useCallback(
        ({
            field,
            className,
        }: {
            field: FieldConfig<T>;
            className?: string;
        }) => {
            switch (field.component) {
                case "radio":
                    return (
                        <ControlledRadioGroup
                            name={field.name}
                            options={field.options ?? []}
                            className={mergeClasses(className)}
                            required={field.required}
                            disabled={isDisabled}
                            control={control}
                        />
                    );

                case "textarea":
                    return (
                        <TextareaAutosize
                            id={field.name}
                            className={mergeClasses(styles.textarea, className)}
                            maxLength={field.maxLength}
                            placeholder={t(field.placeHolder ?? "")}
                            {...register(field.name)}
                            disabled={isDisabled}
                        />
                    );

                case "select":
                    return (
                        <ControlledCombobox
                            name={field.name}
                            options={field.options ?? []}
                            className={mergeClasses(styles.field, className)}
                            disabled={isDisabled}
                            placeholder={t(field.placeHolder ?? "")}
                            control={control}
                            trigger={trigger}
                        />
                    );

                case "date":
                    return (
                        <ControlledDatePicker
                            name={field.name}
                            className={mergeClasses(styles.field, className)}
                            disabled={isDisabled}
                            placeholder={t(field.placeHolder ?? "")}
                            maxDate={field.maxDate}
                            minDate={field.minDate}
                            control={control}
                            trigger={trigger}
                        />
                    );

                default:
                    return (
                        <input
                            className={mergeClasses(styles.field, className)}
                            type={field.type || "text"}
                            maxLength={field.maxLength}
                            placeholder={t(field.placeHolder ?? "")}
                            required={field.required}
                            {...register(field.name)}
                            disabled={isDisabled}
                        />
                    );
            }
        },
        [isDisabled, register, styles, t]
    );

    const renderFieldWrapper = useCallback(
        ({
            field,
            wrapperClassname,
            fieldClassName,
        }: {
            field: FieldConfig<T>;
            wrapperClassname?: string;
            fieldClassName?: string;
        }) => {
            return (
                <CustomField
                    key={field.name}
                    className={mergeClasses(
                        styles.customField,
                        wrapperClassname
                    )}
                    data-testid={field.name}
                    label={field.label && t(field.label)}
                    hint={field.hint}
                    required={field.required}
                    error={
                        !!errors[field.name] &&
                        control.getFieldState(field.name).isDirty
                    }
                >
                    {field.description && (
                        <p className={styles.description}>
                            <Trans
                                i18nKey={field.description}
                                t={t}
                                components={{
                                    bold: <strong />,
                                }}
                            />
                        </p>
                    )}
                    {renderFieldComponent({ field, className: fieldClassName })}
                </CustomField>
            );
        },
        [t, errors, renderFieldComponent]
    );

    return {
        renderFieldWrapper,
    };
};

export default useRenderFields;
