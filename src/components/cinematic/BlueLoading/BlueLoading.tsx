import { ReactNode } from "react";
import { BodyLayout, BottomLineDecorationLayout, TopLineDecorationLayout, WelcomeContentLayout, WelcomeWrapperLayout } from "./style";

interface BlueScreenProps {
    children: ReactNode;
}

export const BlueScreen = ({ children }: BlueScreenProps) => {

    return (<WelcomeWrapperLayout>
        <div />
        <WelcomeContentLayout>
            <TopLineDecorationLayout>
                <div />
                <div />
            </TopLineDecorationLayout>
            <BodyLayout>
                {children}
            </BodyLayout>
            <BottomLineDecorationLayout>
                <div />
                <div />
            </BottomLineDecorationLayout>
        </WelcomeContentLayout>
        <div />
    </WelcomeWrapperLayout>);
}