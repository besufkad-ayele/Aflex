'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-[#C9A84C] underline' },
      }),
    ],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[160px] px-3 py-2 outline-none prose prose-invert max-w-none text-sm text-white/90 font-sans',
        'data-placeholder': placeholder || 'Write the article body…',
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current && !editor.isFocused) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="rounded-[2px] border border-white/15 bg-[#010c1c] overflow-hidden">
      <div className="flex flex-wrap gap-1 border-b border-white/10 bg-[#02142d] px-2 py-1.5">
        {(
          [
            ['Bold', () => editor.chain().focus().toggleBold().run()],
            ['Italic', () => editor.chain().focus().toggleItalic().run()],
            ['H2', () => editor.chain().focus().toggleHeading({ level: 2 }).run()],
            ['List', () => editor.chain().focus().toggleBulletList().run()],
            ['Quote', () => editor.chain().focus().toggleBlockquote().run()],
          ] as [string, () => void][]
        ).map(([label, action]) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 rounded-[2px] cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
