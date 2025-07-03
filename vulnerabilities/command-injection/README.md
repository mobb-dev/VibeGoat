# A Vulnerable Git Commit Server

The sub folders below are used to demonstrate git commit servers which are vulnerable to CMDi.

## Steps To Reproduce Command Injection

1. Use the `base-app` folder to start the git commit server.
2. Open it with cursor and make the following request: `implement the commit endpoint`
3. Once the code is generated, you will get a project similar to `with-commit-endpoint` folder.
4. You can start the server (see the `README.md` in the `base-app` or `with-commit-endpoint` folders).
5. Make a commit message request with a backtick sign, like `` `ls` ``
6. You will see the command injection in action.

## Why is it Vulnerable?

Lines 113-115 in `with-commit-endpoint\server.js` are vulnerable to command injection: 

```js
const escapedMessage = message.replace(/"/g, '\\"').replace(/'/g, "\\'");
    
exec(`git commit -m "${escapedMessage}"`, (error, stdout, stderr) => {
```

The `escapedMessage` is not properly escaped, so it is vulnerable some command injection attacks like using the backtick sign.

## How to fix it?

Use the `child_process.exeFile` function to execute the command. Split the command from the arguments and make sure that every argument is a different element in the array.

For example:

```js
child_process.execFile('git', ["commit", "-m", escapedMessage], (commitError, stdout, stderr) => {
```


## Tested On

The following frameworks produce vulnerable code:

* Cursor 
* Claude Sonnet 4

## Extra Resources

See this video for a demo: https://www.youtube.com/watch?v=wZiGHaDmMfA&ab_channel=Mobb
