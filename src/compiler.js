import lexer from './lexer'
import parser from './parser'
import traverser from './traverser'
import transformer from './transformer'
import codeGenerator from './codeGenerator'

const compiler = (markdown) => {
    const tokens = lexer(markdown)
    const ast = parser(tokens)
    const htmlAst = transformer(ast)
    return codeGenerator(htmlAst)
}

export default compiler
export {
    lexer,
    parser,
    traverser,
    transformer,
    codeGenerator,
    compiler
}
