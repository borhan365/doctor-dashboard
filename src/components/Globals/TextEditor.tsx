"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Sparkles,
  Strikethrough,
  Table as TableIcon,
  Underline as UnderlineIcon,
  YoutubeIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ImproveContentSidebar from "./ImproveContentSidebar";

interface TextEditorProps {
  label?: string;
  value: string;
  onChange: (content: string) => void;
  height?: string;
}

const FloatingMenuBar = ({
  editor,
  onOpenAIPopup,
}: {
  editor: any;
  onOpenAIPopup: () => void;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const updateMenuPosition = useCallback(() => {
    if (!editor || !editor.state || !editor.state.selection) {
      setIsVisible(false);
      return;
    }

    const { state } = editor;
    const { selection } = state;
    const { empty, anchor } = selection;

    const isAtStart = anchor === 1;
    const isNewLine =
      !empty &&
      anchor.parent &&
      anchor.parent.type.name === "paragraph" &&
      anchor.parent.textContent === "";

    // Check for slash at the current cursor position
    const isSlashCommand =
      editor.state.doc.textBetween(
        Math.max(0, selection.from - 1),
        selection.from,
      ) === "/";

    if (isAtStart || isNewLine || isSlashCommand || !empty) {
      const domNode = editor.view.domAtPos(anchor);
      if (!domNode || !domNode.node) {
        setIsVisible(false);
        return;
      }
      const node = domNode.node;
      const element =
        node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
      if (element) {
        const rect = element.getBoundingClientRect();
        const editorRect = editor.view.dom.getBoundingClientRect();
        setPosition({
          top: rect.top - editorRect.top + 24,
          left: rect.left - editorRect.left,
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } else {
      setIsVisible(false);
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      updateMenuPosition();
    };

    editor.on("selectionUpdate", handleUpdate);
    editor.on("update", handleUpdate);

    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("update", handleUpdate);
    };
  }, [editor, updateMenuPosition]);

  if (!editor || !isVisible) {
    return null;
  }

  const buttons = [
    {
      icon: <Bold size={16} />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <Italic size={16} />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <UnderlineIcon size={16} />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      tooltip: "Underline",
    },
    {
      icon: <Strikethrough size={16} />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      tooltip: "Strike-through",
    },
    {
      icon: <Quote size={16} />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      tooltip: "Blockquote",
    },
    {
      icon: <Pilcrow size={16} />,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
      tooltip: "Paragraph",
    },
    {
      icon: <List size={16} />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered size={16} />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      icon: <ImageIcon size={16} />,
      action: () => {
        const url = window.prompt("Enter the URL of the image:");
        if (url) editor.chain().focus().setImage({ src: url }).run();
      },
      tooltip: "Insert Image",
    },
    {
      icon: <TableIcon size={16} />,
      action: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      tooltip: "Insert Table",
    },
    {
      icon: <YoutubeIcon size={16} />,
      action: () => {
        const url = window.prompt("Enter the URL of the YouTube video:");
        if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
      },
      tooltip: "Insert YouTube Video",
    },
    {
      icon: <LinkIcon size={16} />,
      action: () => {
        const url = window.prompt("Enter the URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
      isActive: editor.isActive("link"),
      tooltip: "Insert Link",
    },
    {
      icon: <Heading1 size={16} />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
    {
      icon: <Heading2 size={16} />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      tooltip: "Heading 2",
    },
    {
      icon: <Heading3 size={16} />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      tooltip: "Heading 3",
    },
    {
      icon: <Heading4 size={16} />,
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive("heading", { level: 4 }),
      tooltip: "Heading 4",
    },
  ];

  return (
    <div
      className="absolute z-50"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="flex items-center space-x-1 rounded-md bg-white p-1 shadow-lg">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => {
              // Remove the slash if it exists
              if (
                editor.state.doc.textBetween(
                  Math.max(0, editor.state.selection.from - 1),
                  editor.state.selection.from,
                ) === "/"
              ) {
                editor.commands.deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                });
              }
              button.action();
            }}
            className={`rounded p-1.5 text-slate-600 transition-colors duration-200 hover:bg-slate-100 ${
              button.isActive ? "bg-slate-200" : ""
            }`}
            title={button.tooltip}
          >
            {button.icon}
          </button>
        ))}
        <button
          onClick={onOpenAIPopup}
          className="mr-2 flex items-center rounded-md border border-white bg-green-700 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          <Sparkles size={16} />
          <span className="ml-2">Improve</span>
        </button>
      </div>
    </div>
  );
};

const TextEditor: React.FC<TextEditorProps> = ({
  label,
  value,
  onChange,
  height,
}) => {
  const [isAIPopupOpen, setAIPopupOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const handleAISubmit = (generatedContent: string) => {
    if (editor && onChange) {
      editor.commands.setContent(generatedContent);
      onChange(generatedContent);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Youtube,
      Link,
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange && editor) {
        onChange(editor.getHTML());
      }
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const selectedContent = editor.state.doc.textBetween(from, to, " ");
      setSelectedText(selectedContent);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const openAIPopup = () => {
    if (editor) {
      const { from, to } = editor.state.selection;
      const selectedContent = editor.state.doc.textBetween(from, to, " ");
      setSelectedText(selectedContent);
    }
    setAIPopupOpen(true);
  };

  return (
    <div className="">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-stroke bg-transparent p-3 text-black shadow-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white ${height ? height + " overflow-y-auto" : "min-h-[200px]"}`}
      >
        <EditorContent
          editor={editor}
          placeholder="Write something..."
          className={`prose tiptap-custom-editor min-h-[200px]`}
        />
        {editor && (
          <FloatingMenuBar editor={editor} onOpenAIPopup={openAIPopup} />
        )}
      </div>
      <ImproveContentSidebar
        isOpen={isAIPopupOpen}
        onClose={() => setAIPopupOpen(false)}
        onSubmit={handleAISubmit}
        selectedText={selectedText}
        existingContent={value}
      />
    </div>
  );
};

export default TextEditor;
