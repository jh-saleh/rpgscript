"use client"

import { WindowsContextProvider } from "@/components/hooks/Windows.hook";
import { Startup } from "@/components/startup/Startup";

export default function Home() {
  return (
    <WindowsContextProvider initialData={[
      {
        id: "rpgscript",
        position: {
          left: 0,
          top: 0
        },
        size: {
          height: 250,
          width: 600
        },
        label: "RPG Script",
        path: "./rpgscript.png"
      },
      {
        id: "rpgscriptspecs",
        position: {
          left: 20,
          top: 20
        },
        size: {
          height: 250,
          width: 600
        },
        label: "RPG Script Specifications",
        path: "./rpgscriptspecs.png"
      }
    ]}>
      <Startup />
    </WindowsContextProvider>
  );
}
