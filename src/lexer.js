export default function (input) {
    let current = 0
    let currentText = ''
    let tokens = []

    const pushText = () => {
        if (currentText.length) {
            tokens.push({
                type: 'text',
                value: currentText
            })
            currentText = ''
        }
    }

    while (current < input.length) {
        let char = input[current]

        //check for header
        if (char === '#') {
            let value = ''

            while (char === '#') {
                value += char
                char = input[++current]
            }

            pushText()
            tokens.push({
                type: 'header',
                value
            })

            current++
            continue
        }

        //check for new line
        if (/\n/.test(char)) {

            pushText()
            tokens.push({
                type: 'eol',
                value: char
            })

            current++
            continue
        }

        //check for bold
        if (char === '*' && (input[current + 1] === '*')) {

            pushText()
            tokens.push({
                type: 'bold',
                value: '**'
            })

            current = current + 2
            continue
        }

        //check for italic
        if (char === '_') {

            pushText()
            tokens.push({
                type: 'italic',
                value: char
            })

            current++
            continue
        }

        //check for paren
        if (char === '(' || char === ')') {

            pushText()
            tokens.push({
                type: 'paren',
                value: char
            })

            current++
            continue
        }

        //check for brace
        if (char === '[' || char === ']') {

            pushText()
            tokens.push({
                type: 'brace',
                value: char
            })

            current++
            continue
        }

        currentText += char
        current++
    }

    pushText()
    return tokens
}