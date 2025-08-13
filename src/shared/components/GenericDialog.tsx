import {
    Dialog,
    DialogActions,
    DialogActionsProps,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTitleProps,
    makeStyles,
    mergeClasses,
    tokens,
} from "@fluentui/react-components";
import useModalContext from "core/hooks/useModalContext";
import React, { ReactNode } from "react";
import { CloseDialogIcon } from "shared/assets/icons/CloseDialogIcon";

const useStyles = makeStyles({
    dialog: {
        padding: `24px`,
        width: "100%",
        maxWidth: "750px",
    },
    dialogTitle: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 0",
        fontSize: "24px",
        fontWeight: 700,
        color: tokens.colorBrandForeground2,
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
    },
    dialogSurface: {
        position: "absolute",
        width: "90%",
    },
    dialogBody: {
        columnGap: 0,
        rowGap: tokens.spacingVerticalXL,
        "& button": {
            fontSize: tokens.fontSizeBase400,
        },
    },
    closeIconWrapper: {
        display: "flex",
        alignItems: "flex-start",
        height: "100%",
    },
    closeIcon: {
        cursor: "pointer",
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    linkButton: {
        textDecoration: "underline",
        color: tokens.colorBrandBackground,
        cursor: "pointer",
        background: "none",
        border: "none",
        "&:hover": {
            textDecoration: "none",
            color: `${tokens.colorBrandBackground}!important`,
            background: "transparent!important",
        },
    },
});

interface GenericDialogProps {
    title?: ReactNode;
    children: React.ReactNode;
    dialogProps?: Partial<React.ComponentProps<typeof Dialog>>;
    dialogTitleProps?: DialogTitleProps;
    dialogActionsProps?: DialogActionsProps;
    className?: string;
    buttonsClassName?: string;
    dialogContentClassName?: string;
    titleClassName?: string;
    dialogBodyClassName?: string;
    buttons?: React.ReactNode[];
    mountNode?: HTMLElement;
    showCloseIcon?: boolean;
    customHeader?: React.ReactNode;
}

const GenericDialog: React.FC<GenericDialogProps> = ({
    title,
    children,
    dialogProps,
    dialogTitleProps,
    dialogActionsProps,
    dialogContentClassName,
    className,
    buttonsClassName,
    titleClassName,
    dialogBodyClassName,
    buttons,
    mountNode,
    showCloseIcon = true,
    customHeader,
}) => {
    const styles = useStyles();
    const { isOpen, closeModal } = useModalContext();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(_, data) => data.open && closeModal()}
            modalType="modal"
            {...dialogProps}
        >
            <DialogSurface
                className={mergeClasses(
                    styles.dialog,
                    className,
                    mountNode && styles.dialogSurface
                )}
                mountNode={mountNode}
            >
                <DialogBody
                    className={mergeClasses(
                        styles.dialogBody,
                        dialogBodyClassName
                    )}
                >
                    {/* Header */}
                    <DialogTitle
                        className={mergeClasses(
                            styles.dialogTitle,
                            titleClassName
                        )}
                        as="div"
                        {...dialogTitleProps}
                    >
                        {customHeader ? (
                            customHeader
                        ) : (
                            <>
                                {title}
                                <div className={styles.closeIconWrapper}>
                                    {showCloseIcon && (
                                        <CloseDialogIcon
                                            className={styles.closeIcon}
                                            onClick={closeModal}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </DialogTitle>

                    {/* Body */}
                    <DialogContent
                        className={mergeClasses(
                            styles.dialogContent,
                            dialogContentClassName
                        )}
                    >
                        {children}
                    </DialogContent>

                    {/* Footer */}
                    <DialogActions
                        fluid
                        className={mergeClasses(
                            styles.buttonContainer,
                            buttonsClassName
                        )}
                        {...dialogActionsProps}
                    >
                        {buttons}
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

export default GenericDialog;
