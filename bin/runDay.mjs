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

const folderSrcPath = path.join(process.cwd(), 'src', 'day-' + day, 'part-' + part, 'src')

const files = fs.readdirSync(folderSrcPath)

if (files.includes('index.js')) {
  const route = path.join(folderSrcPath, 'index.js')
  $`node ${route}`
} else {
  console.log(chalk.red('No index.js file was found on ' + folderSrcPath))
  process.exit()
}
