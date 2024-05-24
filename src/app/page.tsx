"use client"

import { WindowsContextProvider } from "@/components/hooks/Windows.hook";
import { Startup } from "@/components/startup/Startup";

export default function Home() {
  return (
    <WindowsContextProvider initialData={[
      {
        id: "rpgscript",
        size: {
          height: 250,
          width: 600
        },
        label: "RPG Script",
        path: "./rpgscript.png"
      }
    ]}>
      <Startup />
    </WindowsContextProvider>
  );
}
