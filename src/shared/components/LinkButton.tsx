import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { FC, AnchorHTMLAttributes } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalM,
    },
    text: {
        color: tokens.colorBrandForeground1,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        },
    },
});

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
    icon?: React.ReactNode; // Icona opzionale
}

const LinkButton: FC<LinkButtonProps> = ({ text, icon, className, ...rest }) => {
    const styles = useStyles();

    return (
        <a {...rest} className={mergeClasses(styles.root, className ?? "")}>
            <span className={styles.text}>{text}</span>
            {icon}
        </a>
    );
};

export default LinkButton;
