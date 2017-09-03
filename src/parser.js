import {
    TOKEN_AST_MAP, TERMINATORS, MARKDOWN, TEXT, EOL, HEADER, BOLD, ITALIC,
    PAREN, LEFT_PAREN, RIGHT_PAREN, LEFT_BRACE, RIGHT_BRACE
} from './constants'

export default function parser(tokens) {
    let current = 0
    const root = MARKDOWN

    const isFinished = () => current >= tokens.length
    const tokensLeft = () => tokens.length - current

    const move = (steps = 1) => current += steps
    const moveThen = (func, args) => {
        move()
        return func(...args)
    }

    const is = (token, schema) => Array.isArray(schema)
        ? schema.some(schema => is(token, schema))
        : (schema.type ? schema.type === token.type : true) &&
        (schema.value ? schema.value === token.value : true)

    const isSequence = (sequence) => tokensLeft() >= sequence.length
        ? sequence.every((schema, index) => is(tokens[current + index], schema))
        : false

    const createNode = ({ type, value }, body) =>
        body ? { type: TOKEN_AST_MAP[type], value, body }
            : { type: TOKEN_AST_MAP[type], value }

    const createChildNodes = ({ type }) => {
        let nodes = []
        while (!isFinished() && !is(tokens[current], TERMINATORS[type])) {
            const node = walk()
            Array.isArray(node) ? nodes.push(...node) : nodes.push(node)
        }
        return nodes
    }

    const walk = () => {
        const token = tokens[current]

        if (is(token, [TEXT, EOL, PAREN, RIGHT_BRACE])) {
            return moveThen(createNode, [token])
        }

        if (is(token, [HEADER, ITALIC, BOLD])) {
            const nodes = moveThen(createChildNodes, [token])
            return moveThen(createNode, [token, nodes])
        }

        if (is(token, LEFT_BRACE)) {
            const nodes = moveThen(createChildNodes, [token])

            if (isSequence([RIGHT_BRACE, LEFT_PAREN, TEXT, RIGHT_PAREN])) {
                const value = tokens[current + 2].value
                move(4)
                return createNode({ type: 'link', value }, nodes)
            } else {
                // Can't create link node, create text node instead
                // and reuse already created AST tree for performance
                return [createNode(LEFT_BRACE), ...nodes]
            }
        }
    }

    return createNode(root, createChildNodes(root))
}
