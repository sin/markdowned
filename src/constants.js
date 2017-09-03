export const MARKDOWN = { type: 'markdown' }
export const EOL = { type: 'eol', value: '\n' }
export const TEXT = { type: 'text' }

export const PAREN = { type: 'paren' }
export const LEFT_PAREN = { type: 'paren', value: '(' }
export const RIGHT_PAREN = { type: 'paren', value: ')' }

export const BRACE = { type: 'brace' }
export const LEFT_BRACE = { type: 'brace', value: '[' }
export const RIGHT_BRACE = { type: 'brace', value: ']' }

export const HEADER = { type: 'header' }
export const BOLD = { type: 'bold', value: '**' }
export const ITALIC = { type: 'italic', value: '_' }

export const TOKEN_AST_MAP = {
    markdown: 'Markdown',
    eol: 'EOL',
    text: 'TextNode',
    paren: 'TextNode',
    brace: 'TextNode',
    header: 'HeaderTag',
    bold: 'BoldTag',
    italic: 'ItalicTag',
    link: 'LinkTag'
}

export const TERMINATORS = {
    markdown: [],
    header: EOL,
    bold: BOLD,
    italic: ITALIC,
    brace: BRACE
}

export const MARKDOWN_TOKEN_MAP = {
    '\n': EOL,
    '(': LEFT_PAREN,
    ')': RIGHT_PAREN,
    '[': LEFT_BRACE,
    ']': RIGHT_BRACE,
    '#': HEADER,
    '*': BOLD,
    '_': ITALIC
}