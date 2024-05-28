import { BarLayout, ModalSelectionLayout, ModalSelectionsLayout, SelectionLayout } from "./style";

export interface MenuSelection {
    label?: string;
    onClick: () => void;
}
export type Menu = Record<string, (MenuSelection[] | MenuSelection)>;


interface BarProps {
    menu: Menu;
}

export const Bar = ({ menu }: BarProps) => {
    return <BarLayout>
        {Object.keys(menu).map((selection, index) => {
            if (Array.isArray(menu[selection])) {
                return <>
                    <SelectionLayout key={`menu_option_dropdown_${selection}_${index}`}>
                        {selection}
                        <ModalSelectionsLayout>
                            {(menu[selection] as MenuSelection[]).map((subSelection, index) => {
                                return <ModalSelectionLayout key={`menu_option_for_${selection}_${index}`} onClick={subSelection.onClick}>
                                    {subSelection.label}
                                </ModalSelectionLayout>;
                            })}
                        </ModalSelectionsLayout>
                    </SelectionLayout>
                </>;
            }

            if (typeof menu[selection] === "object") {
                const option = (menu[selection] as MenuSelection);
                return <SelectionLayout key={`menu_option_${selection}_${index}`} onClick={option.onClick}>
                    {selection}
                </SelectionLayout>
            }
        })}
    </BarLayout>
}