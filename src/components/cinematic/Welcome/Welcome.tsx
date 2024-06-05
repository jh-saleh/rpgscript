import { useSystem } from "@/components/hooks/System.hook";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BlueScreen } from "../BlueLoading/BlueLoading";
import { AccountLayout, AccountWrapperLayout, CompanyWrapperLayout, LogoLayout, ScreensWrapperLayout, TextLayout, WelcomeLayout } from "./style";


export const Welcome = () => {
    const [loadingDesktop, setLoadingDesktop] = useState<boolean>(false);
    const { setLoggedIn } = useSystem();
    const welcomeText = useMemo(() => loadingDesktop ? "welcome" : "To begin, click your user name", [loadingDesktop]);

    useEffect(() => {
        if (loadingDesktop) {
            setTimeout(() => {
                setLoggedIn(() => true);
            }, 1030);
        }
    }, [loadingDesktop]);

    return <BlueScreen>
        <WelcomeLayout>
            <div>
                {!loadingDesktop &&
                    <LogoLayout>
                        <CompanyWrapperLayout>
                            <div>
                                Nanosoft
                            </div>
                            <Image src={"./nanosoft.svg"} alt="Nanosoft image" width={110} height={100} />
                        </CompanyWrapperLayout>
                        <ScreensWrapperLayout>
                            <div>
                                Screens
                            </div>
                            <div>
                                xp
                            </div>
                        </ScreensWrapperLayout>
                    </LogoLayout>}
                <TextLayout $loadingDesktop={loadingDesktop}>
                    {welcomeText}
                </TextLayout>
                <AccountWrapperLayout onClick={() => setLoadingDesktop(true)}>
                    <AccountLayout $loadingDesktop={loadingDesktop}>
                        <img src="./aircraft.png" alt="account logo" />
                        <div>
                            <div>Admin</div>
                            {loadingDesktop && <div>Loading your personal settings...</div>}
                        </div>
                    </AccountLayout>
                </AccountWrapperLayout>
            </div>
        </WelcomeLayout>
    </BlueScreen>;
}