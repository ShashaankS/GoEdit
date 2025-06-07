"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface MonacoEditorProps {
  value: string
  language: string
  onChange: (value: string) => void
  filename: string
}

export function MonacoEditor({ value, language, onChange, filename }: MonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<any>(null)
  const [monaco, setMonaco] = useState<any>(null)
  const { theme } = useTheme()

  useEffect(() => {
    let isMounted = true

    const initMonaco = async () => {
      if (typeof window !== "undefined") {
        const monacoEditor = await import("monaco-editor")

        // Configure Monaco Editor
        monacoEditor.languages.typescript.typescriptDefaults.setEagerModelSync(true)

        if (isMounted) {
          setMonaco(monacoEditor)
        }
      }
    }

    initMonaco()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (monaco && editorRef.current && !editor) {
      const newEditor = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: theme === "dark" ? "vs-dark" : "vs",
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: "on",
        lineNumbers: "on",
        renderWhitespace: "selection",
        contextmenu: true,
        folding: true,
        links: true,
        colorDecorators: true,
        smoothScrolling: true,
      })

      // Set up change event handler
      newEditor.onDidChangeModelContent(() => {
        onChange(newEditor.getValue())
      })

      setEditor(newEditor)

      return () => {
        newEditor.dispose()
      }
    }
  }, [monaco, editor, onChange])

  // Update editor value when prop changes
  useEffect(() => {
    if (editor && value !== editor.getValue()) {
      const position = editor.getPosition()
      editor.setValue(value)
      if (position) {
        editor.setPosition(position)
      }
    }
  }, [editor, value])

  // Update editor language when prop changes
  useEffect(() => {
    if (editor && monaco) {
      const model = editor.getModel()
      if (model) {
        monaco.editor.setModelLanguage(model, language)
      }
    }
  }, [editor, monaco, language])

  // Update editor theme when app theme changes
  useEffect(() => {
    if (editor && monaco) {
      monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs")
    }
  }, [editor, monaco, theme])

  // Simulate collaborative cursors
  useEffect(() => {
    if (editor && monaco) {
      // Add decorations to simulate other users' cursors
      const decorations = editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(6, 10, 6, 10),
            options: {
              className: "other-user-cursor",
              hoverMessage: { value: "Alice is editing here" },
              stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          },
        ],
      )

      return () => {
        editor.deltaDecorations(decorations, [])
      }
    }
  }, [editor, monaco])

  return (
    <div className="h-full w-full">
      <div className="border-b bg-muted/50 px-4 py-2">
        <span className="text-sm font-medium">{filename}</span>
      </div>
      <div ref={editorRef} className="h-[calc(100%-40px)] w-full" />
    </div>
  )
}
