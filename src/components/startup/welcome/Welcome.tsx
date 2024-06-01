import { BottomLineDecorationLayout, TopLineDecorationLayout, WelcomeContentLayout, WelcomeWrapperLayout } from "./style";

interface BlueScreenProps {
    label: string;
}

export const BlueScreen = ({ label }: BlueScreenProps) => {

    return (<WelcomeWrapperLayout>
        <div />
        <WelcomeContentLayout>
            <TopLineDecorationLayout>
                <div />
                <div />
            </TopLineDecorationLayout>
            <div>
                {label}
            </div>
            <BottomLineDecorationLayout>
                <div />
                <div />
            </BottomLineDecorationLayout>
        </WelcomeContentLayout>
        <div />
    </WelcomeWrapperLayout>);
}