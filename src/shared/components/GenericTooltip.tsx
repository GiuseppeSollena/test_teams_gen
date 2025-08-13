import { Tooltip, TooltipProps, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  tooltipContent: {
    backgroundColor: tokens.colorBrandBackgroundHover,
    color: tokens.colorNeutralForeground2,
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    width: "380px",
    padding: "10px",
    textAlign: "center",
  },
});

interface GenericTooltipProps extends Omit<TooltipProps, "relationship"> {
  content: string;
  containerClassName?: string;
  relationship?: TooltipProps["relationship"];
}

const GenericTooltip: React.FC<GenericTooltipProps> = ({
  content,
  containerClassName,
  children,
  positioning = "below",
  relationship = "label",
  ...props
}) => {
  const styles = useStyles();

  return (
    <Tooltip
      content={
        <div className={mergeClasses(styles.tooltipContent, containerClassName)}>
          {content}
        </div>
      }
      positioning={positioning}
      relationship={relationship}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default GenericTooltip;

