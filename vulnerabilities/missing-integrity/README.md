# Missing Integrity Example

The sub folders below are used to demonstrate missing integrity.

## Steps To Reproduce Prototype Pollution

1. Use the `base-app` folder to start.
2. Open it with cursor and make the following request: `Add the missing mermaid.js`
3. Once the code is generated, you will get a project similar to `vulnerable-app` folder.

BTW, this vulnerability would happen with just about any script you add / use in your web application.

## Why is it Vulnerable?

Line 7 in `vulnerable-app/index.html` is downloading a script without any integrity check:

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
```

It is possible for an attacker to modify the content of the script at `https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js` and inject malicious code.

## How to fix it?

To fix this vulnerability, you should add an integrity attribute to the script tag in `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"
        integrity="sha256-<hash>"></script>

## Tested On

The following frameworks produce vulnerable code:

* Cursor 
* Claude Sonnet 4

## Extra Resources

None.
