import { MARKDOWN_TOKEN_MAP } from './constants'

export default function lexer(markdown) {
    let current = 0
    let text = ''
    let tokens = []

    const move = (steps = 1) => current += steps
    const createToken = (type, value) => tokens.push({ type, value })
    const fillText = char => text += char
    const pushText = () => {
        text.length && createToken('text', text)
        text = ''
    }
    const getHeaderValue = (char, value) => {
        while (char === '#') {
            value = (value || '') + char
            char = markdown[++current]
        }
        return value
    }

    while (current < markdown.length) {
        let char = markdown[current]

        if (MARKDOWN_TOKEN_MAP[char]) {
            let { type, value } = MARKDOWN_TOKEN_MAP[char]

            const isHeader = type === 'header'
            const isMatch = value && value.split('')
                    .every((char, index) => char === markdown[current + index])

            if (isMatch) move(value.length)
            if (isHeader) value = getHeaderValue(char, value)

            if (isHeader || isMatch) {
                pushText()
                createToken(type, value)
                continue
            }
        }

        fillText(char)
        move()
    }

    pushText()
    return tokens
}