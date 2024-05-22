import { BottomLineDecorationLayout, TopLineDecorationLayout, WelcomeContentLayout, WelcomeWrapperLayout } from "./style";

export const Welcome = () => {

    return (<WelcomeWrapperLayout>
        <div />
        <WelcomeContentLayout>
            <TopLineDecorationLayout>
                <div />
                <div />
            </TopLineDecorationLayout>
            <div>
                welcome
            </div>
            <BottomLineDecorationLayout>
                <div />
                <div />
            </BottomLineDecorationLayout>
        </WelcomeContentLayout>
        <div />
    </WelcomeWrapperLayout>);
}