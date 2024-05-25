import { BarLayout, SelectionLayout } from "./style";

export interface MenuSelection {
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
                // TODO implement
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