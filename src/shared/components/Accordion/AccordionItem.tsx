import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { ChevronDownFilled } from "@fluentui/react-icons";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";

const useAccordionItemStyles = makeStyles({
    itemContainer: {
        padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
        borderRadius: tokens.borderRadiusLarge,
    },
    clickableElement: {
        cursor: "pointer",
    },
    itemButton: {
        display: "flex",
        justifyContent: "space-between",
        gap: "24px",
        alignItems: "center",
        background: "inherit",
        border: "none",
        width: "100%",
        padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
    },
    itemContent: {
        paddingTop: tokens.spacingVerticalS,
        fontSize: "0.875rem",
        cursor: "auto",
    },
    itemTitle: {
        fontWeight: 600,
        fontSize: "0.875rem",
        color: tokens.colorNeutralForeground4,
        textAlign: "left",
    },
    itemIcon: {
        flexShrink: 0,
        transition: "transform 0.2s ease-in-out",
        fontSize: tokens.fontSizeBase600,
        fontWeight: "bold",
        color: tokens.colorBrandBackground,
    },
    itemIconRotated: {
        transform: "rotate(180deg)",
    },
    itemContentWrapper: {
        overflow: "hidden",
    },
    content: {
        display: "grid",
    },
    childrenContainer: {}
});

interface BaseAccordionItemProps {
    index?: number;
    accordionKey?: string;
    isOpen?: boolean;
    styles?: Partial<ReturnType<typeof useAccordionItemStyles>>;
    iconType?: "default" | "triangle";
    IconComponent?: React.ComponentType<{
        className?: string;
        onClick?: () => void;
    }>;
    onToggle?: (index: number) => void;
    children: ReactNode;
    openMode?: "container" | "iconButton";
    blockOnClick?: boolean;
    rotateIcon?: boolean;
    iconPosition?: "left" | "right";
}

interface AccordionItemWithTitle extends BaseAccordionItemProps {
    title: ReactNode;
    titleComponent?: never;
    customButton?: never;
}

interface AccordionItemWithTitleComponent extends BaseAccordionItemProps {
    title?: never;
    titleComponent: ReactNode | ((isOpen: boolean) => ReactNode);
    customButton?: never;
}

interface AccordionItemWithCustomButton extends BaseAccordionItemProps {
    title?: never;
    titleComponent?: never;
    customButton: (icon: ReactNode) => ReactNode;
}

export type AccordionItemProps =
    | AccordionItemWithTitle
    | AccordionItemWithTitleComponent
    | AccordionItemWithCustomButton;

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    function AccordionItemComponent (props, ref) {
        const {
            title,
            index,
            isOpen = false,
            titleComponent,
            IconComponent = ChevronDownFilled,
            onToggle,
            children,
            styles = {},
            openMode = "container",
            blockOnClick = false,
            customButton,
            rotateIcon = true,
            iconPosition = "right",
        } = props;

        const classes = useAccordionItemStyles();

        const parentVariants: Variants = {
            open: {
                gridTemplateRows: "1fr",
                transition: { duration: 0.3, ease: "easeInOut" },
            },
            closed: {
                gridTemplateRows: "0fr",
                transition: { duration: 0.3, ease: "easeInOut" },
            },
        };

        const childVariants = {
            hidden: { opacity: 0, height: 0 },
            visible: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
        };

        const handleClick = useCallback(
            (e?: React.MouseEvent<HTMLDivElement>) => {
                e?.preventDefault();
                e?.stopPropagation();
                if (blockOnClick) return;
                if (onToggle && index !== undefined) onToggle(index);
            },
            [index, onToggle]
        );

        const renderTitle = useMemo(() => {
            if (typeof titleComponent === "function") {
                return titleComponent(isOpen);
            }
            return (
                titleComponent ?? (
                    <span
                        className={mergeClasses(
                            classes.itemTitle,
                            styles.itemTitle
                        )}
                    >
                        {title}
                    </span>
                )
            );
        }, [isOpen, titleComponent, title, classes, styles]);

        const renderIconComponent = useCallback(() => {
            return (
                <IconComponent
                    className={mergeClasses(
                        classes.itemIcon,
                        openMode === "iconButton" && classes.clickableElement,
                        rotateIcon && isOpen && classes.itemIconRotated,
                        rotateIcon && isOpen && styles.itemIconRotated,
                    )}
                    onClick={() => handleClick()}
                />
            );
        }, [IconComponent, classes, openMode, isOpen, rotateIcon]);

        return (
            <div
                ref={ref}
                data-testid="accordion-item-button"
                className={mergeClasses(
                    classes.itemContainer,
                    openMode === "container" && classes.clickableElement,
                    styles.itemContainer
                )}
                onClick={openMode === "container" ? handleClick : undefined}
            >
                <div
                    
                    className={mergeClasses(
                        classes.itemButton,
                        styles.itemButton
                    )}
                >
                    {customButton ? (
                        customButton(renderIconComponent())
                    ) : (
                        <>
                            {iconPosition === "left" && renderIconComponent()}
                            {renderTitle}
                            {iconPosition === "right" && renderIconComponent()}
                        </>
                    )}
                </div>

                <AnimatePresence initial={false}>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className={styles.content}
                        animate={isOpen ? "open" : "closed"}
                        variants={parentVariants}
                    >
                        <div
                            className={mergeClasses(
                                classes.itemContentWrapper,
                                styles.itemContentWrapper
                            )}
                        >
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        className={styles.childrenContainer}
                                        key="itemContent"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={childVariants}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        {children}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }
);

export default AccordionItem;
