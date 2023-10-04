#!/usr/bin/env node

console.log('我们都如此紧张地活在一个逐渐松弛的宇宙中！！！')

const path = require('path')
const yargs = require('yargs')
const { inquirerPrompt, install } = require('./ inquirer')
const { copyDir, checkMkdirExists, copyTemplate } = require('./copy')

yargs.command(
  ['create', 'c'],
  '新建一个模板',
  function (yargs) {
    return yargs.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string',
    })
  },
  // argv {
  //   _: [ 'c' ],
  //   name: 'orderPage',
  //   n: 'orderPage',
  //   '$0': '../../packages/lac2023-cli/bin/index.js'
  // }
  function (argv) {
    console.log('argv', argv)
    inquirerPrompt(argv).then((answers) => {
      console.log(answers)
      const { name, type } = answers
      /*       const isMkdirExists = checkMkdirExists(
        path.resolve(process.cwd(), `./src/pages/${name}`)
      )
      if (isMkdirExists) {
        console.log(`${name}文件夹已经存在`)
      } else {
        copyDir(
          path.resolve(__dirname, `./template/${type}`),
          path.resolve(process.cwd(), `./src/pages/${name}`), // 当前 Node.js 进程执行时的文件所属目录的绝对路径
          {
            // cover: true, // cover file when exists, default is true
            utimes: true,
          }
        )
      } */
      const isMkdirExists = checkMkdirExists(
        path.resolve(process.cwd(), `./src/pages/${name}/index.js`)
      )
      if (isMkdirExists) {
        console.log(`${name}/index.js文件已经存在`)
      } else {
        copyTemplate(
          path.resolve(__dirname, `./template/${type}/index.tpl`),
          path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
          {
            name,
          }
        )
        install(process.cwd(), answers)
      }
    })
  }
).argv
