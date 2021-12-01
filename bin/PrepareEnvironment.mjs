import { $, chalk, question} from 'zx'
import fs from 'fs'
import path from 'path'

$.verbose = false

const CURRENT_PATH = process.cwd()
const SRC_PATH = path.join(CURRENT_PATH, 'src')

let confirmExecution = null

do {

    confirmExecution = await question(chalk.redBright('All folders and files inside src will be removed to prepare the structure for advent of code. Are u sure? (y, n) '), {choices: ['y', 'n']});

} while(confirmExecution === null || confirmExecution === '' || !['y', 'yes', 'n', 'no'].includes(confirmExecution))


if(confirmExecution === 'n' || confirmExecution === 'no') {
    process.exit()
}

fs.rmSync(SRC_PATH, {force: true, recursive: true});

if(!checkDirExists(SRC_PATH)) {
    console.log(chalk.green('Creating src folder..'));
    fs.mkdirSync(SRC_PATH)
}

for(let i = 1; i<=25; i++) {
    const currentDayPath = path.join(SRC_PATH, 'day-' + i)

    console.log(chalk.yellow('Creating stuff for advent day ' + i));


    fs.mkdirSync(currentDayPath)
    fs.mkdirSync(path.join(currentDayPath, 'part-1' , 'src'), {recursive: true})
    fs.mkdirSync(path.join(currentDayPath, 'part-1' , 'tests'), {recursive: true})

    fs.mkdirSync(path.join(currentDayPath, 'part-2' , 'src'), {recursive: true})
    fs.mkdirSync(path.join(currentDayPath, 'part-2' , 'tests'), {recursive: true})

    fs.writeFileSync(path.join(currentDayPath, 'part-1' , 'src', 'index.js'), '');
    fs.writeFileSync(path.join(currentDayPath, 'part-1', 'src', 'input.js'), '');
    fs.writeFileSync(path.join(currentDayPath, 'part-1', 'src', 'input.txt'), '');
    fs.writeFileSync(path.join(currentDayPath, 'part-1', 'tests', 'index.test.js'), '');

    fs.writeFileSync(path.join(currentDayPath, 'part-2' , 'src', 'index.js'), '');
    fs.writeFileSync(path.join(currentDayPath, 'part-2', 'src', 'input.js'), '');
    fs.writeFileSync(path.join(currentDayPath, 'part-2', 'src', 'input.txt'), '');
    fs.writeFileSync(path.join(currentDayPath, 'part-2', 'tests', 'index.test.js'), '');

    if(i === 1) {
        fs.appendFileSync(
            path.join(currentDayPath, 'part-1', 'src', 'index.js'), 
            'function sum (a, b) {\n  return a + b\n}\nmodule.exports = sum\n'
            );
            
        fs.appendFileSync(
            path.join(currentDayPath, 'part-1', 'tests', 'index.test.js'), 
            "const sum = require('../src/index')\n\ntest('1 + 2 equal to 3', () => {\n  expect(sum(1, 2)).toBe(3)\n})\n"
            );

    }
}

console.log(chalk.green('All done check the src folder and start coding!'));


function checkDirExists(dir) {
    if (fs.existsSync(dir)) {
        return true
    }

    return false
}