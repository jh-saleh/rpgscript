"use client"

import { Startup } from "@/components/cinematic/Startup";
import { FocusAppsContextProvider } from "@/components/hooks/FocusApps.hook";
import { FocusWindowsContextProvider } from "@/components/hooks/FocusWindows.hook";
import { SystemContextProvider } from "@/components/hooks/System.hook";
import { SystemModalContextProvider } from "@/components/hooks/SystemModal.hook";
import { WindowsContextProvider } from "@/components/hooks/Windows.hook";

export default function Home() {
  return (
    <SystemContextProvider>
      <SystemModalContextProvider>
        <FocusAppsContextProvider ids={["rpgscript", "rpgscriptspecs", "portfolio", "linkedin", "background", "navbar"]}>
          <FocusWindowsContextProvider ids={["rpgscript", "rpgscriptspecs", "background", "navbar", "startupmenu"]}>
            <WindowsContextProvider initialData={[
              {
                id: "rpgscript",
                position: {
                  left: 0,
                  top: 0
                },
                label: "RPG Script",
                path: "./rpgscript.png"
              },
              {
                id: "rpgscriptspecs",
                position: {
                  left: 0,
                  top: 0
                },
                label: "RPG Script Specifications",
                path: "./rpgscriptspecs.png"
              }
            ]}>
              <Startup />
            </WindowsContextProvider>
          </FocusWindowsContextProvider>
        </FocusAppsContextProvider>
      </SystemModalContextProvider>
    </SystemContextProvider>
  );
}
