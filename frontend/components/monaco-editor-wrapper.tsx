"use client"

import { useEffect, useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { useTheme } from "next-themes"

interface MonacoEditorWrapperProps {
  value: string
  language: string
  onChange: (value: string) => void
}

export function MonacoEditorWrapper({ value, language, onChange }: MonacoEditorWrapperProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { theme } = useTheme()

  // Initialize Monaco editor
  useEffect(() => {
    if (editorRef.current && !editor) {
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
  }, [editorRef, editor, onChange])

  // Update editor value when prop changes
  useEffect(() => {
    if (editor) {
      const currentValue = editor.getValue()
      if (value !== currentValue) {
        editor.setValue(value)
      }
    }
  }, [editor, value])

  // Update editor language when prop changes
  useEffect(() => {
    if (editor) {
      const model = editor.getModel()
      if (model) {
        monaco.editor.setModelLanguage(model, language)
      }
    }
  }, [editor, language])

  // Update editor theme when app theme changes
  useEffect(() => {
    if (editor) {
      editor.updateOptions({
        theme: theme === "dark" ? "vs-dark" : "vs",
      })
    }
  }, [editor, theme])

  // Simulate multiple cursors for collaborative editing demo
  useEffect(() => {
    if (editor) {
      // Add decorations to simulate other users' cursors
      const decorations = editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(6, 10, 6, 10),
            options: {
              className: "other-user-cursor",
              hoverMessage: { value: "Alice" },
              glyphMarginClassName: "other-user-cursor-glyph",
              glyphMarginHoverMessage: { value: "Alice" },
              stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          },
        ],
      )

      // Add CSS for cursor styling
      const style = document.createElement("style")
      style.innerHTML = `
        .other-user-cursor {
          background-color: rgba(255, 0, 0, 0.3);
          width: 2px !important;
          margin-left: -1px;
        }
        .other-user-cursor-glyph {
          background-color: red;
          width: 4px !important;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [editor])

  return <div ref={editorRef} className="h-full w-full" />
}
