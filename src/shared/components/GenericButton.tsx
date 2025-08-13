import React, { forwardRef } from "react";
import { Button, buttonClassNames, ButtonProps, makeStyles, mergeClasses, shorthands } from "@fluentui/react-components";
import { tokens } from "@fluentui/react-components";
import Spinner from "./Spinner";

const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusMedium,
    padding: '4px 8px',
    gap: tokens.spacingHorizontalMNudge,
    border: `1px solid ${tokens.colorNeutralBackgroundDisabled}!important`,
    [`& .${buttonClassNames.icon}`]: {
      margin: 0,
    },
    "&:not(:disabled):hover": {
      ...shorthands.borderColor(tokens.colorBrandBackground),
    },
  },
  inverted: {
    backgroundColor: tokens.colorBrandBackgroundInverted,
    color: tokens.colorBrandForeground1,
    "&:not(:disabled):hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorBrandForeground1,
    },
  },
  default: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    "&:not(:disabled):hover": {
      backgroundColor: `${tokens.colorNeutralBackgroundDisabled}!important`,
      color: tokens.colorNeutralForeground2
    },
  },
  disabled: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForeground1,
    opacity: 0.6,
    ...shorthands.borderColor(tokens.colorPaletteSteelBorderActive),
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
});

export type GenericButtonProps = ButtonProps & {
  inverted?: boolean; // Per la modalità inverted
  text?: string; // testo del bottone
  icon?: React.ReactNode; // Icona opzionale
  isLoading?: boolean;
};

const GenericButton = forwardRef<HTMLButtonElement, GenericButtonProps>(
  ({ inverted = false, icon, text, className, disabled, isLoading = false, ...props }, ref) => {
    const classes = useStyles();

    const buttonClass = mergeClasses(
      classes.root,
      inverted ? classes.inverted : classes.default,
      disabled && classes.disabled,
      isLoading && classes.disabled,
      className
    );

    return (
      <Button
        ref={ref}
        className={buttonClass}
        icon={icon}
        disabled={disabled}
        {...props}
      >
        {isLoading ? (
          <Spinner /> 
        ) : (
          text && <span>{text}</span> 
        )}

      </Button>
    );
  }
);

GenericButton.displayName = "GenericButton"; // Impostiamo il displayName per una corretta gestione delle ref

export default GenericButton;
