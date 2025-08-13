import {
    Field,
    FieldProps,
    comboboxClassNames,
    fieldClassNames,
    makeStyles,
    mergeClasses,
    radioGroupClassNames,
    shorthands,
    tokens,
} from "@fluentui/react-components";
import { datePickerClassNames } from "@fluentui/react-datepicker-compat";
import React, { FC, ReactElement, ReactNode, useMemo } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "2px",
        gap: "8px",
        // Forza il label e il required * sulla stessa riga
        [`& .${fieldClassNames.label}`]: {
            display: "flex",
            whiteSpace: "nowrap",
            fontSize: "16px",
            color: tokens.colorNeutralForeground4,
            fontWeight: 600,
            "& > span": {
                paddingLeft: 0,
            },
        },
        "& [id$='__hint']": {
            marginTop: "8px",
            fontSize: "15px",
            color: tokens.colorPaletteSteelForeground2,
        },
    },
    required: {
        [`& span, & .${fieldClassNames.label}`]: {
            color: tokens.colorNeutralForeground4,
        },
    },
    control: {
        padding: "16px",
        border: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
        borderRadius: "12px",
        fontWeight: 600,
        fontSize: "20px",
        color: tokens.colorNeutralForeground1,
        outline: "none !important",
        lineHeight: "normal",
        transition:
            "border 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, outline-color 0.2s ease",
        "&::placeholder": {
            color: tokens.colorNeutralForegroundInvertedDisabled,
        },
        "&:invalid::-webkit-datetime-edit": {
            color: tokens.colorNeutralForegroundInvertedDisabled,
        },
        "&:disabled": {
            cursor: "not-allowed",
            color: tokens.colorNeutralForegroundInvertedDisabled,
            backgroundColor: tokens.colorNeutralBackgroundDisabled,
            ...shorthands.borderColor(
                `${tokens.colorNeutralStrokeDisabled}!important`
            ),
        },
        [`&.${radioGroupClassNames.root}`]: {
            border: "none",
            paddingInline: "0px",
            paddingBottom: "0px",
            paddingTop: "8px",
            [`& label`]: {
                fontSize: "16px",
                color: `${tokens.colorNeutralForeground4} !important`,
            },
            "&::after": {
                display: "none",
            },
            [`& div::after`]: {
                color: tokens.colorBrandForeground2,
            },
            [`& input:disabled ~ div::after`]: {
                color: tokens.colorNeutralStrokeDisabled,
            },
        },
        [`&.${comboboxClassNames.root}`]: {
            paddingRight: "16px",
            [`& .${comboboxClassNames.input}`]: {
                cursor: "pointer",
                color: tokens.colorNeutralForeground1,
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "normal",
                "&::placeholder": {
                    color: tokens.colorNeutralForegroundInvertedDisabled,
                },
            },
            "&:focus-within": {
                outline: "none",
                border: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
                color: tokens.colorNeutralForeground1,
            },
            "&:hover": {
                border: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
            },
            "&:active": {
                border: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
            },
            "&::after": {
                display: "none",
            },
            "&:has(input:disabled), &:has(textarea:disabled), &:has(button:disabled)":
                {
                    backgroundColor: tokens.colorNeutralBackgroundDisabled,
                    ...shorthands.borderColor(
                        `${tokens.colorNeutralStrokeDisabled}!important`
                    ),
                },
            "& input:disabled, & textarea:disabled, & button:disabled": {
                cursor: "not-allowed",
                color: tokens.colorNeutralForegroundInvertedDisabled,
            },
        },
        [`&.${datePickerClassNames.root}`]: {
            paddingLeft: "0px",
            paddingTop: "14px",
            "& input": {
                height: "24px",
                lineHeight: "normal",
                "&::placeholder": {
                    color: tokens.colorNeutralForegroundInvertedDisabled,
                },
            },
            "&:focus-within": {
                outline: "none",
                border: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
                color: tokens.colorNeutralForeground1,
            },
            "&:hover": {
                border: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
            },
            "&:active": {
                border: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
            },
            "&::after": {
                display: "none",
            },
            [`& input:disabled ~ div::after`]: {
                color: tokens.colorNeutralStrokeDisabled,
            },
        },
    },
    error: {
        border: `2px solid ${tokens.colorPaletteRedBorderActive}`,
        "&:hover": {
            border: `2px solid ${tokens.colorPaletteRedBorderActive} !important`,
        },
        "&:focus-within": {
            border: `2px solid ${tokens.colorPaletteRedBorderActive} !important`,
        },
        "&:active": {
            border: `2px solid ${tokens.colorPaletteRedBorderActive} !important`,
        },
        "&:focus-visible": {
            border: `2px solid ${tokens.colorPaletteRedBorderActive} !important`,
        },
    },
    rootError: {
        [`& .${fieldClassNames.hint}`]: {
            color: tokens.colorPaletteRedForeground2,
        },
    },
});

type CustomFieldProps = Omit<FieldProps, "children"> & {
    children: ReactNode;
    disabled?: boolean;
    error?: boolean;
};

const CustomField: FC<CustomFieldProps> = ({
    label,
    children,
    error = false,
    ...props
}) => {
    const styles = useStyles();

    const processedChildren = useMemo(() => {
        return React.Children.map(children, (child) => {
            if (
                React.isValidElement(child) &&
                child.type !== "p" &&
                child.type !== "span"
            ) {
                const childToClone = child as ReactElement<
                    {
                        className?: string;
                    } & React.HTMLAttributes<HTMLElement>
                >;

                return React.cloneElement(childToClone, {
                    id: "clone",
                    className: mergeClasses(
                        styles.control,
                        childToClone.props.className,
                        error && styles.error
                    ),
                });
            }
            return child;
        });
    }, [children, error, styles.control, styles.error]);

    return (
        <Field
            {...props}
            className={mergeClasses(
                styles.root,
                props.className,
                props.required && styles.required,
                error && styles.rootError
            )}
            size="large"
            label={label}
        >
            {processedChildren}
        </Field>
    );
};

export default CustomField;
