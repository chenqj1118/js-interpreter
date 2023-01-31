global.acorn = require('./acorn');
const Interpreter = require('./interpreter').Interpreter; // https://github.com/NeilFraser/JS-Interpreter

/**
 * @caption 执行不被信任的脚本
 * @param {string} scriptStr 脚本字符串 例: 'var x = "a";'
 * @param {object} options 定制参数 例: {config: getValue() => {}, name: 'zhangsan'}
 * @return 无返回值
 */
const sandboxRunScript = (scriptStr, options) => {
  if (Interpreter) {
    const defaultOpts = {
      log: {
        log (...msgs) { // 不定个数的参数
          console.log(...msgs)
        }
      }
    };
    options = Object.assign(defaultOpts, options || {});
    const myInterpreter = new Interpreter(scriptStr, (interpreter, globalObject) => {
      Object.keys(options).forEach(key => { // 默认options均传入沙箱
        if (key.endsWith('Async')) {
          interpreter.setProperty(globalObject, key, interpreter.createAsyncFunction(options[key]));
        } else {
          interpreter.setProperty(globalObject, key, interpreter.nativeToPseudo(options[key]));
        }
      })
    });
    const runScript = () => {
      myInterpreter.run() && setTimeout(runScript, options.microseconds || 1000);
    }
    runScript();
  } else {
    throw new Error('Interpreter解析器不存在，请检查并重试！');
  }
}

module.exports = {
  sandboxRunScript
}
