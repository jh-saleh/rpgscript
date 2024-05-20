"use client"
import { Editor } from "@/components/editor/Editor";
import { EditorContextProvider } from "@/components/hooks/Editor.hook";

export default function Home() {
  return (
    <EditorContextProvider>
      <Editor />
    </EditorContextProvider>
  );
}
