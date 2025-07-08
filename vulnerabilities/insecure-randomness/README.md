# Insecure Randomness in Password Reset Tokens

## Steps To Reproduce

1. Start with the `base-app` inside the `examples/base-app` folder.
2. Using `curosr`  and the prompt inside `prompt.md` update the reset token function.
3. The generated application will resemble `with-random-string`.
4. You can start the server (see the `README.md` in the `base-app` folder).
5. Trigger a password reset with a known username (e.g., `admin`):

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"username": "admin"}' http://localhost:3000/request-password-reset
   ```
6. Observe the response:

   ```json
   {
     "message": "Password reset requested",
     "token": "1234567890"
   }
   ```
7. Repeat the request — note how the same token is issued every time.


## Why is it Vulnerable?

The reset token is generated inside the `generateRandomString` function:

```js
for (let i = 0; i < length; i++) {
   result += characters.charAt(Math.floor(Math.random() * characters.length));
}
```
However Math.random uses a hardcoded or predictable value to seed the random generator resulting in the same string being returned.

- This allows anyone with knowledge of the token format to **reuse** or **brute-force** it.
- An attacker could trigger password resets for known usernames and guess the token to gain access.
- This violates the principles of **confidentiality** and **authentication integrity**.

## How to Fix It

Use the `crypto` module to generate a cryptographically secure random token:

```js
const crypto = require("crypto");

app.post("/request-password-reset", (req, res) => {
  const { username } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");

  console.log(`Generated password reset token for ${username}: ${resetToken}`);
  // In a real app, email the token to the user
  res.json({ message: "Password reset requested", token: resetToken });
});
```

## Tested On

The following frameworks produce vulnerable code:

* Cursor 