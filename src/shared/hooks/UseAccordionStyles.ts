import { makeStyles, tokens } from "@fluentui/react-components";

// 🔹 Stili per il Container dell'Accordion
export const useAccordionContainerStyles = makeStyles({
    containerRoot: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
});

// 🔹 Stili per ogni Item dell'Accordion
export const useAccordionItemStyles = makeStyles({
    itemContainer: {
        background: tokens.colorNeutralBackground3,
        padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
        cursor: "pointer",
        borderRadius: tokens.borderRadiusLarge,
    },
    itemButton: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "inherit",
        border: "none",
        width: "100%",
        cursor: "inherit",
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
        color: tokens.colorNeutralForeground2,
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
    itemGridTransition: {
        display: "grid",
        transition: "grid-template-rows 0.3s ease-in-out",
    },
    itemOpen: {
        gridTemplateRows: "1fr",
    },
    itemClosed: {
        gridTemplateRows: "0fr",
    },
});
