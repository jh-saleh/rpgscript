import { useWindows } from "@/components/hooks/Windows.hook";
import { AppIconLayout, AppSectionLayout, BottomIconLayout, BottomSectionLayout, ProgrammsSectionLayout, Separator, ShorcutSectionLayout, ShortcutIconLayout, TopSection, UserIconLayout, UserNameLayout, WrapperLayout } from "./style";

interface StartUpMenuProps {
    open: boolean;
    closeMenu: () => void;
}

export const StartUpMenu = ({ open, closeMenu }: StartUpMenuProps) => {
    const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
    const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "";
    const { clickWindow, openWindow } = useWindows();

    return (<>
        {open && <WrapperLayout>
            <TopSection>
                <UserIconLayout src={"./aircraft.png"} alt="User icon" />
                <UserNameLayout>
                    Admin
                </UserNameLayout>
            </TopSection>
            <ProgrammsSectionLayout>
                <div>
                    <AppSectionLayout>
                        <AppIconLayout onClick={() => { clickWindow("rpgscript"); openWindow("rpgscript"); closeMenu(); }}>
                            <img src="./rpgscript.png" alt="rpgscript logo" />
                            <div>
                                RPG Script
                            </div>
                        </AppIconLayout>
                        <AppIconLayout>
                            <img src="./rpgscriptspecs.png" alt="rpgscripts spec logo" />
                            <div>
                                RPG Script Specs
                            </div>
                        </AppIconLayout>
                        <Separator />
                        <AppIconLayout href={PORTFOLIO_URL} target="_blank">
                            <img src="./portfolio.png" alt="portfolio link" />
                            <div>
                                Portfolio
                            </div>
                        </AppIconLayout>
                        <AppIconLayout href={LINKEDIN_URL} target="_blank">
                            <img src="./linkedin.png" alt="linkedin link" />
                            <div>
                                LinkedIn
                            </div>
                        </AppIconLayout>
                        <AppIconLayout>
                            <img src="./mediaplayer.png" alt="media player link" />
                            <div>
                                Screens Media Player
                            </div>
                        </AppIconLayout>
                        <AppIconLayout>
                            <img src="./paint.png" alt="paint link" />
                            <div>
                                Paint
                            </div>
                        </AppIconLayout>
                    </AppSectionLayout>
                    <ShorcutSectionLayout>
                        <ShortcutIconLayout>
                            <img src="./documents.png" alt="my documents logo" />
                            <div>
                                My Documents
                            </div>
                        </ShortcutIconLayout>
                        <ShortcutIconLayout>
                            <img src="./pictures.png" alt="my pictures logo" />
                            <div>
                                My Pictures
                            </div>
                        </ShortcutIconLayout>
                        <ShortcutIconLayout>
                            <img src="./music.png" alt="my music logo" />
                            <div>
                                My Music
                            </div>
                        </ShortcutIconLayout>
                        <ShortcutIconLayout>
                            <img src="./computer.png" alt="my computer logo" />
                            <div>
                                My Computer
                            </div>
                        </ShortcutIconLayout>
                        <Separator />
                        <ShortcutIconLayout>
                            <img src="./panels.png" alt="my control panel logo" />
                            <div>
                                Control Panel
                            </div>
                        </ShortcutIconLayout>
                        <ShortcutIconLayout>
                            <img src="./programAccess.png" alt="program access and defaults" />
                            <div>
                                Set Program Access and Defaults
                            </div>
                        </ShortcutIconLayout>
                        <ShortcutIconLayout>
                            <img src="./printers.png" alt="printers logo" />
                            <div>
                                Printers and Faxes
                            </div>
                        </ShortcutIconLayout>
                        <Separator />
                        <ShortcutIconLayout>
                            <img src="./support.png" alt="support logo" />
                            <div>
                                Help and Support
                            </div>
                        </ShortcutIconLayout>
                        <ShortcutIconLayout>
                            <img src="./search.png" alt="search logo" />
                            <div>
                                Search
                            </div>
                        </ShortcutIconLayout>
                        <ShortcutIconLayout>
                            <img src="./run.png" alt="run logo" />
                            <div>
                                Run...
                            </div>
                        </ShortcutIconLayout>
                    </ShorcutSectionLayout>
                </div>
            </ProgrammsSectionLayout>
            <BottomSectionLayout>
                <BottomIconLayout>
                    <img src="./turnoff.png" alt="Turn off computer" />
                    <div>
                        Turn off computer
                    </div>
                </BottomIconLayout>
                <BottomIconLayout>
                    <img src="./logoff.png" alt="Log off button" />
                    <div>
                        Log Off
                    </div>
                </BottomIconLayout>
            </BottomSectionLayout>
        </WrapperLayout >}
    </>);
}