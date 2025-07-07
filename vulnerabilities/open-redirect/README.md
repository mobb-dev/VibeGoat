# A Vulnerable Login Server

This folder demonstrates how a seemingly harmless redirect feature can become an **open redirect** vulnerability.

## Steps To Reproduce Open Redirect

1. Start with the `base-app` directory in this folder.
2. Use a codegen model (such as GPT) and prompt it with the contents of `prompt-template.md`.
3. The generated application will resemble what's in the `with-redirect-endpoint` folder.
4. Run the application (`node server.js`).
5. Make a request to the `/redirect?target=https://malicious.com` endpoint.
6. You will be redirected to the attacker-controlled site.

## Why is it Vulnerable?

In the file `with-redirect-endpoint/server.js` we can see the vulnerable issue being setup on line 47.

```js
const redirectUrl = req.query.redirect || "/dashboard"; // Default to dashboard if no redirect URL provided
```

On line 69 we can see where the issue is finalized.

```js
// Redirect after successful login
res.redirect(redirectUrl);
```

## How to fix it?
Only allow redirection to a predefined set of trusted domains or paths. Here’s one example of a fix:

```js
const allowedHosts = ['example.com', 'myapp.com'];
try {
    const url = new URL(req.query.target);
    if (allowedHosts.includes(url.hostname)) {
        res.redirect(url.href);
    } else {
        res.status(400).send('Invalid redirect target');
    }
} catch (err) {
    res.status(400).send('Malformed redirect target');
}
```