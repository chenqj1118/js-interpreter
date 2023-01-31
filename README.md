# js-interpreter
js-interpreter is developed on the basis of 'https://github.com/NeilFraser/JS-Interpreter'

js执行器

JavaScript中的沙盒JavaScript解释器。在隔离和安全的情况下逐行执行任意JavaScript代码。

相关`demo`：https://neil.fraser.name/software/JS-Interpreter/
相关文档：https://neil.fraser.name/software/JS-Interpreter/docs.html

相关`gitbub`地址：https://github.com/NeilFraser/JS-Interpreter

## Installation
```
npm i js-interpreter
```

```
// git子模块使用
git submodule init
git submodule update

// 或者
git submodule update --init --recursive
执行后，子模块目录下就有了源码
```

```
// 子模块更新
进入到子模块目录下，执行 git pull更新，查看git log查看相应提交
```



## API

```javascript
sandboxRunScript()
```

> ```javascript
> /**
>  * @caption 执行不被信任的脚本
>  * @param {string} scriptStr 脚本字符串 例: 'var x = "a";'
>  * @param {object} options 定制参数 例: {config: getValue() => {}, name: 'zhangsan', microseconds: 2000}
>  * @return 无返回值
>  */
> const sandboxRunScript = (scriptStr, options) => {
>   if (Interpreter) {
>     const defaultOpts = {
>       log: {
>         log (...msgs) { // 不定个数的参数
>           console.log(...msgs)
>         }
>       }
>     };
>     options = Object.assign(defaultOpts, options || {});
>     const myInterpreter = new Interpreter(scriptStr, (interpreter, globalObject) => {
>       Object.keys(options).forEach(key => { // 默认options均传入沙箱
>         if (key.endsWith('Async')) {
>           interpreter.setProperty(globalObject, key, interpreter.createAsyncFunction(options[key]));
>         } else {
>           interpreter.setProperty(globalObject, key, interpreter.nativeToPseudo(options[key]));
>         }
>       })
>     });
>     const runScript = () => {
>       myInterpreter.run() && setTimeout(runScript, options.microseconds || 1000); // 异步等待时间
>     }
>     runScript();
>   } else {
>     throw new Error('Interpreter解析器不存在，请检查并重试！');
>   }
> }
> ```
>
> 

## Usage
```javascript
const { sandboxRunScript } = require('js-interpreter');
const scriptStr = 'var txt = "hello word!";log.log(txt);var val = context.value;';
const options = { // 所有可能传入trigger的变量和方法
    context: {
        value: '',
        getValue (keys) { // keys: captcha.type
            // todo
        },
        setValue (val) {
            // todo
        },
        setVisible (val) {
            // todo
        }，
        requireValidateAsync（）{
          // todo ‘Async’结尾的方法即为异步方法，比如"检查端口是否已被占用"等
        }
    }，
    microseconds: 1000 // 异步等待时间
};
sandboxRunScript(scriptStr, options);
```





