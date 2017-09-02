export default function (tokens) {
    let ast = {
        type: 'Markdown',
        body: []
    }

    let current = 0

    function walk() {
        let token = tokens[current]

        if (token.type === 'text') {
            current++

            return {
                type: 'TextNode',
                value: token.value
            }
        }

        if (token.type === 'eol') {
            current++

            return {
                type: 'EOL',
                value: token.value
            }
        }

        if (token.type === 'paren') {
            current++

            return {
                type: 'TextNode',
                value: token.value
            }
        }

        if (token.type === 'brace' && token.value === ']') {
            current++

            return {
                type: 'TextNode',
                value: token.value
            }
        }

        if (token.type === 'header') {
            current++

            let body = []

            while (current < tokens.length && tokens[current].type !== 'eol') {
                body.push(walk())
            }

            current++

            return {
                type: 'HeaderTag',
                value: token.value,
                body
            }
        }

        if (token.type === 'italic') {
            current++

            let body = []

            while (current < tokens.length && tokens[current].type !== 'italic') {
                body.push(walk())
            }

            current++

            return {
                type: 'ItalicTag',
                value: token.value,
                body
            }
        }

        if (token.type === 'bold') {
            current++

            let body = []

            while (current < tokens.length && tokens[current].type !== 'bold') {
                body.push(walk())
            }

            current++

            return {
                type: 'BoldTag',
                value: token.value,
                body
            }
        }

        if (token.type === 'brace' && token.value === '[') {
  
            current++
            let nodes = []

            while (current < tokens.length && tokens[current].type !== 'brace' && tokens[current].value !== ']') {
                nodes.push(walk())
            }
    
            
            if (
                (current >= tokens.length - 3) ||
                (tokens[current].type !== 'brace' || tokens[current].value !== ']') ||
                (tokens[current + 1].type !== 'paren' || tokens[current + 1].value !== '(') ||
                (tokens[current + 2].type !== 'text') ||
                (tokens[current + 3].type !== 'paren' || tokens[current + 3].value !== ')')
               ) {
                return [
                    {
                        type: 'TextNode',
                        value: '['
                    },
                    ...nodes
                ]
            }

            let url = tokens[current + 2].value
            current = current + 4
            return {
                type: 'LinkTag',
                value: url,
                body: nodes
            }
        }

        current++
    }

    while (current < tokens.length) {
        const node = walk()
        Array.isArray(node) ? ast.body.push(...node) : ast.body.push(node)

    }
    
    return ast
}