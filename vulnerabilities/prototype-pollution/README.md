# Prototype Pollution Example

The sub folders below are used to demonstrate prototype pollution.

## Steps To Reproduce Prototype Pollution

1. Use the `base-app` folder to start.
2. Open it with cursor and make the following request: `complete the deepMerge implementation`
3. Once the code is generated, you will get a project similar to `with-deep-merge-implementated` folder.
4. You can start the server (see the `README.md` in the `base-app` or `with-deep-merge-implementated`  folders).
5. Make an API requests wich contains a prototype pollution payload. See `README.md` in the `with-deep-merge-implementated` folder for the payload.
6. You will see the prototype pollution in action.
7. As a personal challenge, try to implement the `deepMerge` function in the `base-app` folder so it's not vulnerable to prototype pollution. You can ask the AI to do it for you.

## Why is it Vulnerable?

Lines 65 in `with-deep-merge-implementated\index.js` is vulnerable to prototype pollution: 

```js
target[key] = source[key];
```

Blindly assigning a value to a key in the target object is vulnerable to prototype pollution, when that key is controlled by the user input.

## How to fix it?

Avoid copying sensative attributes like `__proto__` to the target object.

## Tested On

The following frameworks produce vulnerable code:

* Cursor 
* Claude Sonnet 4

## Extra Resources

None.
