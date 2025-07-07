# Log Forging / Unsafe Format String Logging

This example demonstrates a common logging anti-pattern in JavaScript: using untrusted input in format strings without sanitization. This can lead to **log forging**, where an attacker injects format specifiers or newlines to manipulate log structure or obscure malicious behavior.

## Steps To Reproduce

1. Start the `base-app` inside the `examples/base-app` folder.
2. Use an AI model (e.g. GPT-4) with the `prompt.md` to request logging of user access attempts.
3. The generated application will resemble `with-log-error`.
4. Run the server and send a request like:
   ```
   curl "http://localhost:3000/log?user=%s%snaughty&ip=1.2.3.4"
   ```
5. Observe how the log is malformed due to unsafe use of format strings.

## Why is it Vulnerable?

Lines like the following in `server.js` are unsafe:

```js
console.log("Unauthorized access attempt by " + user, ip);
```

This pattern uses dynamic string concatenation combined with a second argument to `console.log`, which can confuse logging systems and lead to forged entries.

## How to Fix It

Use a constant format string and avoid dynamic construction of log messages. Example:

```js
console.log(`Unauthorized access attempt by user: ${user}, IP: ${ip}`);
```

Or, if logging with `util.format`:

```js
console.log(util.format("Unauthorized access attempt by user: %s, IP: %s", user, ip));
```
