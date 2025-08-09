"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";

import { useRef } from "react";

// Ikon custom sesuai toolbar Word style
const icons = {
  bold: <b className="text-lg select-none">B</b>,
  italic: <i className="text-lg select-none">I</i>,
  underline: <u className="text-lg select-none">U</u>,
  strike: <span className="text-lg select-none line-through">T</span>,
  link: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 015.656 5.656l-3.182 3.182a4 4 0 01-5.656-5.656l1.415-1.415zM8.464 15.536a4 4 0 00-5.656-5.656L.464 13.061a4 4 0 005.656 5.656l2.344-2.344z"
      />
    </svg>
  ),
  heading: <span className="text-lg font-semibold select-none">Tt</span>,
  quote: <span className="text-lg select-none">“ ”</span>,
  alignLeft: <span className="text-lg select-none">⬅️</span>,
  alignCenter: <span className="text-lg select-none">⬆️</span>,
  alignRight: <span className="text-lg select-none">➡️</span>,
  alignJustify: <span className="text-lg select-none">🡺</span>,
  image: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18v14H3z" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
    </svg>
  ),
};

export default function EditorWordStyle({ onChange, content }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: true }),
      Image,
      Placeholder.configure({ placeholder: "Tulis isi artikel di sini..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Strike,
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none outline-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onUploadImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  if (!editor) return <p>Loading editor...</p>;

  // Class untuk tombol toolbar mirip Word style
  const btnClass = (active) =>
    `cursor-pointer px-2 py-1 rounded-sm select-none ${
      active ? "bg-blue-600 text-white" : "hover:bg-gray-200"
    }`;

  return (
    <div className="border border-gray-300 rounded p-2 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex gap-1 mb-2 text-sm border-b border-gray-400">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold (Ctrl+B)"
        >
          {icons.bold}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic (Ctrl+I)"
        >
          {icons.italic}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive("underline"))}
          title="Underline (Ctrl+U)"
        >
          {icons.underline}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive("strike"))}
          title="Strikethrough"
        >
          {icons.strike}
        </button>

        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Masukkan URL link:");
            if (url)
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
          }}
          className={btnClass(editor.isActive("link"))}
          title="Insert Link"
        >
          {icons.link}
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={btnClass(editor.isActive("heading", { level: 1 }))}
          title="Heading 1"
        >
          {icons.heading}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
          title="Quote"
        >
          {icons.quote}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btnClass(editor.isActive({ textAlign: "left" }))}
          title="Align Left"
        >
          {icons.alignLeft}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btnClass(editor.isActive({ textAlign: "center" }))}
          title="Align Center"
        >
          {icons.alignCenter}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btnClass(editor.isActive({ textAlign: "right" }))}
          title="Align Right"
        >
          {icons.alignRight}
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={btnClass(editor.isActive({ textAlign: "justify" }))}
          title="Align Justify"
        >
          {icons.alignJustify}
        </button>

        <button
          type="button"
          onClick={triggerFileInput}
          className={btnClass(false)}
          title="Upload Image"
        >
          {icons.image}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onUploadImage}
          className="hidden"
        />
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
}
