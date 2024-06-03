import Image from "next/image";
import { CompanyWrapperLayout, LoadingBarLayout, LoadingBarWrapperLayout, LoadingBlocs, ScreensWrapperLayout, StartupCopyrightLayout, StartupLayout, StartupWrapperLayout } from "./style";

export const Loading = () => {

    return (<StartupWrapperLayout>
        <StartupLayout>
            <div>
                <CompanyWrapperLayout>
                    <div>
                        Nanosoft
                    </div>
                    <Image src={"./nanosoft.svg"} alt="Nanosoft image" width={210} height={200} />
                </CompanyWrapperLayout>
                <ScreensWrapperLayout>
                    <div>
                        Screens
                    </div>
                    <div>
                        xp
                    </div>
                </ScreensWrapperLayout>
                <LoadingBarWrapperLayout>
                    <div>
                        <LoadingBarLayout />
                        <LoadingBlocs $delay={0} />
                        <LoadingBlocs $delay={220} />
                        <LoadingBlocs $delay={440} />
                    </div>
                </LoadingBarWrapperLayout>
            </div>
        </StartupLayout>
        <StartupCopyrightLayout>
            <div>
                Made by Jean-Hanna SALEH
            </div>
            <div>
                Nanosoft
            </div>
        </StartupCopyrightLayout>
    </StartupWrapperLayout>)
}