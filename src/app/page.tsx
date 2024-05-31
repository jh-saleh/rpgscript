"use client"

import { FocusAppsContextProvider } from "@/components/hooks/FocusApps.hook";
import { FocusWindowsContextProvider } from "@/components/hooks/FocusWindows.hook";
import { WindowsContextProvider } from "@/components/hooks/Windows.hook";
import { Startup } from "@/components/startup/Startup";

export default function Home() {
  return (
    <FocusAppsContextProvider ids={["rpgscript", "rpgscriptspecs", "portfolio", "linkedin", "background", "navbar"]}>
      <FocusWindowsContextProvider ids={["rpgscript", "rpgscriptspecs", "background", "navbar", "startupmenu"]}>
        <WindowsContextProvider initialData={[
          {
            id: "rpgscript",
            position: {
              left: 20,
              top: 20
            },
            size: {
              height: 400,
              width: 800
            },
            label: "RPG Script",
            path: "./rpgscript.png"
          },
          {
            id: "rpgscriptspecs",
            position: {
              left: 60,
              top: 60
            },
            size: {
              height: 400,
              width: 800
            },
            label: "RPG Script Specifications",
            path: "./rpgscriptspecs.png"
          }
        ]}>
          <Startup />
        </WindowsContextProvider>
      </FocusWindowsContextProvider>
    </FocusAppsContextProvider>
  );
}
