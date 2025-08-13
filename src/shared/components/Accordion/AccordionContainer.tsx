import { mergeClasses } from "@fluentui/react-components";
import {
    Children,
    cloneElement,
    forwardRef,
    Fragment,
    isValidElement,
    ReactNode,
    useCallback,
    useMemo,
    useState,
} from "react";
import { useAccordionContainerStyles } from "shared/hooks/UseAccordionStyles";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

interface AccordionContainerProps {
    styles?: Partial<ReturnType<typeof useAccordionContainerStyles>>;
    children: ReactNode;
    atLeastOneOpen?: boolean;
    defaultIndex?: number;
    exclusive?: boolean;
    startAllOpen?: boolean;
}

const AccordionContainer = forwardRef<HTMLDivElement, AccordionContainerProps>(
    (
        {
            styles = {},
            children,
            atLeastOneOpen = false,
            defaultIndex = NaN,
            exclusive = false,
            startAllOpen,
        },
        ref
    ) => {
        const classes = useAccordionContainerStyles();

        // Estrai in modo memoizzato tutti gli AccordionItem
        const accordionItems = useMemo(() => {
            const extractItems = (childNodes: ReactNode): ReactNode[] => {
                return Children.toArray(childNodes).flatMap((child) => {
                    if (isValidElement(child)) {
                        if (
                            typeof child.type === "string" ||
                            child.type === Fragment
                        ) {
                            return extractItems(child.props.children);
                        }
                    }
                    return child;
                });
            };
            return extractItems(children);
        }, [children]);

        // Inizializza lo stato direttamente in base a startAllOpen e defaultIndex
        const [openIndexes, setOpenIndexes] = useState<boolean[]>(() => {
            const numberOfItems = accordionItems.length;
            if (numberOfItems === 0) return [];
            if (startAllOpen) {
                return Array(numberOfItems).fill(true);
            } else if (
                !Number.isNaN(defaultIndex) &&
                defaultIndex >= 0 &&
                defaultIndex < numberOfItems
            ) {
                return Array.from(
                    { length: numberOfItems },
                    (_, index) => index === defaultIndex
                );
            }
            return Array(numberOfItems).fill(false);
        });

        // Callback per gestire il toggle degli accordion item
        const handleToggle = useCallback(
            (index: number) => {
                setOpenIndexes((prevState) => {
                    const newState = [...prevState];
                    if (exclusive) {
                        newState[index] = !prevState[index];
                        if (
                            atLeastOneOpen &&
                            !newState.some((isOpen) => isOpen)
                        ) {
                            newState[index] = true;
                        } else {
                            newState.forEach((_, i) => {
                                if (i !== index) newState[i] = false;
                            });
                        }
                    } else {
                        newState[index] = !prevState[index];
                    }
                    return newState;
                });
            },
            [exclusive, atLeastOneOpen]
        );

        // Renderizza gli item con le props aggiornate
        const renderedItems = useMemo(() => {
            return accordionItems.map((child, index) => {
                if (
                    isValidElement<AccordionItemProps>(child) &&
                    child.type === AccordionItem
                ) {
                    return cloneElement(child, {
                        index,
                        isOpen:
                            typeof child.props.isOpen === "boolean"
                                ? child.props.isOpen
                                : openIndexes[index],
                        onToggle: (index) => {
                            child.props.onToggle?.(index);
                            handleToggle(index);
                        },
                    });
                }
                return child;
            });
        }, [accordionItems, openIndexes, handleToggle]);

        return (
            <div
                ref={ref}
                className={mergeClasses(
                    classes.containerRoot,
                    styles?.containerRoot
                )}
            >
                {renderedItems}
            </div>
        );
    }
);

export default AccordionContainer;
