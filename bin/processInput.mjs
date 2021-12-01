import { $, chalk } from 'zx'
import fs from 'fs'
import path from 'path'

let day = process.argv[2]

let part = process.argv[3]

if (day === undefined) {
  day = new Date().getDate()
}

if (part === undefined) {
  part = 1
}

if (isNaN(day)) {
  console.log(chalk.red('Pass as argument only the day of the folder. Default current day( ' + new Date().getDate() + ' )'))
  process.exit()
}

if (isNaN(part)) {
  console.log(chalk.red('Pass as argument only the part number of the folder. Default part(1)'))
  process.exit()
}

const srcPath = path.join(process.cwd(), 'src', 'day-' + day, 'part-' + part, 'src')
const inputFilePath = path.join(srcPath, 'input.txt')
const inputJsPath = path.join(srcPath, 'input.js')

let inputFile = null

try {
  inputFile = fs.readFileSync(inputFilePath, { encoding: 'utf-8' })
} catch (err) {

}

if (!inputFile) {
  console.log(chalk.red('No input.txt found on ' + srcPath))
  process.exit()
}

console.log(chalk.yellow('Writing input into the file'))

fs.writeFileSync(inputJsPath, 'const input = [\n')

const length = inputFile.split('\n').length

inputFile.split('\n').forEach((line, index) => {
  if (index + 1 === length) {
    fs.appendFileSync(inputJsPath, "  '" + line + "'\n]\n\nmodule.exports = input\n")
  } else {
    fs.appendFileSync(inputJsPath, "  '" + line + "',\n")
  }
})

console.log(chalk.green('input.js ready to work with!'))
