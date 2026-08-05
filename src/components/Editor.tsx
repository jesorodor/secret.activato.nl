import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { createContext, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Context for passing onChange to the editor
const EditorOnChangeContext = createContext<((content: string) => void) | undefined>(undefined);

// Activato policy: the read-only copy toolbar (copy as text / HTML / base64)
// is removed when viewing a secret. Renders nothing.
const ReadOnlyMenuBar: FC = () => {
    return null;
};

const MenuBar: FC = () => {
    return null;
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure(),
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        validate: (href) => /^https?:\/\//.test(href),
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    CharacterCount,
];

interface EditorProps {
    value?: string;
    onChange?: (content: string) => void;
    editable?: boolean;
    onEditorReady?: (editor: { setContent: (content: string) => void }) => void;
}

export default function Editor({
    value = '',
    onChange,
    editable = true,
    onEditorReady,
    ...props
}: EditorProps) {
    const [characterCount, setCharacterCount] = useState(0);
    const { t } = useTranslation();
    return (
        <EditorOnChangeContext.Provider value={onChange}>
            <div className="space-y-3 sm:space-y-4 relative">
                <EditorProvider
                    slotBefore={editable ? <MenuBar /> : <ReadOnlyMenuBar />}
                    extensions={extensions}
                    editable={editable}
                    content={value}
                    onUpdate={({ editor }) => {
                        if (onChange) {
                            if (editor.isEmpty) {
                                onChange('');
                            } else {
                                onChange(editor.getHTML());
                            }
                        }
                        setCharacterCount(editor.storage.characterCount.characters());
                    }}
                    onCreate={({ editor }) => {
                        setCharacterCount(editor.storage.characterCount.characters());
                        if (onEditorReady) {
                            onEditorReady({
                                setContent: (content: string) => {
                                    editor.commands.setContent(content);
                                    if (onChange) {
                                        onChange(content);
                                    }
                                },
                            });
                        }
                    }}
                    editorProps={{
                        attributes: {
                            class: 'w-full min-h-[12rem] sm:min-h-[16rem] p-4 sm:p-6 bg-gray-100 dark:bg-dark-700/50 border border-gray-300 dark:border-dark-500/50 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300 text-sm sm:text-base prose prose-sm max-w-none prose-headings:mt-6 prose-headings:first:mt-0 prose-headings:text-gray-900 dark:prose-headings:text-slate-100 prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-xl prose-h2:font-bold prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-3 prose-p:my-3 prose-p:leading-relaxed prose-p:text-gray-800 dark:prose-p:text-slate-200 prose-strong:text-gray-900 dark:prose-strong:text-slate-200 prose-strong:font-bold prose-em:text-gray-800 dark:prose-em:text-slate-200 prose-ul:pl-5 prose-ul:my-3 prose-ol:pl-5 prose-ol:my-3 prose-li:my-1 prose-li:leading-normal prose-li:text-gray-800 dark:prose-li:text-slate-200 prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:underline prose-a:font-medium hover:prose-a:text-teal-500 dark:hover:prose-a:text-teal-300 prose-code:bg-gray-200 dark:prose-code:bg-dark-800 prose-code:text-gray-800 dark:prose-code:text-slate-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-pre:bg-gray-200 dark:prose-pre:bg-dark-900 prose-pre:text-gray-900 dark:prose-pre:text-white prose-pre:p-4 prose-pre:my-4 prose-pre:overflow-auto prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-sm prose-pre:code:font-mono prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-dark-500 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:my-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-300 prose-hr:my-6 prose-hr:border-gray-300 dark:prose-hr:border-dark-600',
                        },
                    }}
                    {...props}
                >
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs text-gray-500 dark:text-slate-400 bg-white dark:bg-dark-800/80 px-2 py-1">
                        {characterCount} {t('editor.character_count')}
                    </div>
                </EditorProvider>
            </div>
        </EditorOnChangeContext.Provider>
    );
}
