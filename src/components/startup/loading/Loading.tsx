import Image from "next/image";
import { CompanyWrapperLayout, LoadingBarLayout, LoadingBarWrapperLayout, LoadingBlocs, ScreensWrapperLayout, WindowsStartupCopyrightLayout, WindowsStartupLayout, WindowsStartupWrapperLayout } from "./style";

export const Loading = () => {

    return (<WindowsStartupWrapperLayout>
        <WindowsStartupLayout>
            <div>
                <CompanyWrapperLayout>
                    <div>
                        Nanosoft
                    </div>
                    <Image src={"./milosoft.svg"} alt="Milosoft image" width={210} height={200} />
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
        </WindowsStartupLayout>
        <WindowsStartupCopyrightLayout>
            <div>
                Made by Jean-Hanna SALEH
            </div>
            <div>
                Nanosoft
            </div>
        </WindowsStartupCopyrightLayout>
    </WindowsStartupWrapperLayout>)
}