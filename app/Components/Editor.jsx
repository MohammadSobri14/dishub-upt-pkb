"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useRef, useEffect, useState } from "react";

// Ikon custom sesuai toolbar Word style
const icons = {
  bold: <b className="text-lg select-none">B</b>,
  italic: <i className="text-lg select-none">I</i>,
  underline: <u className="text-lg select-none">U</u>,
  strike: <span className="text-lg select-none line-through">T</span>,
  link: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 015.656 5.656l-3.182 3.182a4 4 0 01-5.656-5.656l1.415-1.415zM8.464 15.536a4 4 0 00-5.656-5.656L.464 13.061a4 4 0 005.656 5.656l2.344-2.344z" />
    </svg>
  ),
  unlink: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17l-5-5m0 0l-5-5m5 5l5-5m-5 5l-5 5" />
    </svg>
  ),
  heading: <span className="text-lg font-semibold select-none">Tt</span>,
  quote: <span className="text-lg select-none">“ ”</span>,
  alignLeft: <span className="text-lg select-none">⬅️</span>,
  alignCenter: <span className="text-lg select-none">⬆️</span>,
  alignRight: <span className="text-lg select-none">➡️</span>,
  alignJustify: <span className="text-lg select-none">🡺</span>,
  image: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18v14H3z" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
    </svg>
  ),
  highlight: (
    <span className="text-lg select-none bg-yellow-300 px-1 rounded">H</span>
  ),
  color: (
    <span className="text-lg select-none" style={{ color: "#e53e3e" }}>A</span>
  ),
};

const fontFamilies = [
  { label: "Default", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
];

export default function EditorWordStyle({ onChange, content }) {
  const fileInputRef = useRef(null);
  const [color, setColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: true }),
      Image,
      Placeholder.configure({ placeholder: "Tulis isi artikel di sini..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Strike,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      Color,
      Highlight,
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

  // Update content editor jika prop content berubah (misal saat edit)
  useEffect(() => {
    if (editor && typeof content === "string" && content !== editor.getHTML()) {
      editor.commands.setContent(content || "", false);
    }
    // eslint-disable-next-line
  }, [content, editor]);

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
      <div className="flex flex-wrap gap-1 mb-2 text-sm border-b border-gray-400 items-center">
        {/* Font Family */}
        <select
          className="border rounded px-1 py-0.5 text-xs mr-2"
          value={editor.getAttributes("textStyle").fontFamily || ""}
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
        >
          {fontFamilies.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Font Color */}
        <label className="flex items-center gap-1 mr-2">
          {icons.color}
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              editor.chain().focus().setColor(e.target.value).run();
            }}
            className="w-6 h-6 p-0 border-0 bg-transparent"
            title="Font Color"
          />
        </label>

        {/* Highlight */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={btnClass(editor.isActive("highlight"))}
          title="Highlight"
        >
          {icons.highlight}
        </button>

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold (Ctrl+B)"
        >
          {icons.bold}
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic (Ctrl+I)"
        >
          {icons.italic}
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive("underline"))}
          title="Underline (Ctrl+U)"
        >
          {icons.underline}
        </button>

        {/* Strikethrough */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive("strike"))}
          title="Strikethrough"
        >
          {icons.strike}
        </button>

        {/* Heading */}
        <select
          className="border rounded px-1 py-0.5 text-xs mr-2"
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
              ? "h2"
              : editor.isActive("heading", { level: 3 })
              ? "h3"
              : "p"
          }
          onChange={(e) => {
            const val = e.target.value;
            if (val === "p") editor.chain().focus().setParagraph().run();
            else if (val === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run();
            else if (val === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
            else if (val === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <option value="p">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
          title="Quote"
        >
          {icons.quote}
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const prevUrl = editor.getAttributes("link").href || "";
            const url = window.prompt("Masukkan URL link:", prevUrl);
            if (url !== null) {
              if (url === "") {
                editor.chain().focus().unsetLink().run();
              } else {
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
              }
            }
          }}
          className={btnClass(editor.isActive("link"))}
          title="Insert/Edit Link"
        >
          {icons.link}
        </button>
        {/* Unlink */}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={btnClass(false)}
          title="Remove Link"
        >
          {icons.unlink}
        </button>

        {/* Align Left */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btnClass(editor.isActive({ textAlign: "left" }))}
          title="Align Left"
        >
          {icons.alignLeft}
        </button>

        {/* Align Center */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btnClass(editor.isActive({ textAlign: "center" }))}
          title="Align Center"
        >
          {icons.alignCenter}
        </button>

        {/* Align Right */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btnClass(editor.isActive({ textAlign: "right" }))}
          title="Align Right"
        >
          {icons.alignRight}
        </button>

        {/* Align Justify */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={btnClass(editor.isActive({ textAlign: "justify" }))}
          title="Align Justify"
        >
          {icons.alignJustify}
        </button>

        {/* Upload Image */}
        {/* <button
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
        /> */}
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
}