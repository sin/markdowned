import { readFile } from 'fs'
import lexer from './lexer'

readFile('markdown', 'utf8', (err, data) => {
    console.log(data)
    console.log(lexer(data))
})