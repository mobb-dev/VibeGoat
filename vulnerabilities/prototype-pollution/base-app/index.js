import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';

const app = express();
const port = 3000;

// Default address structure
const defaultAddress = {
  address_line_1: {
    street: '',
  },
  address_line_2: {
    building_name: '',
    unit_number: '',
    floor_number: '',
    room_number: ''
  },
  city: '',
  state: '',
  zip: ''
};

// In-memory user store (for demo purposes)
let userDetails = {
  name: '',
  age: 0,
  address: { ...defaultAddress }
};

app.use(bodyParser.json());

app.post('/update-details', (req, res) => {
  const { name, age, address } = req.body;

  // Parse address if it's a string
  let parsedAddress = address;
  if (typeof address === 'string') {
    try {
      parsedAddress = JSON.parse(address);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid address format' });
    }
  }

  // Deep merge with default address
  const mergedAddress = deepMerge({ ...defaultAddress }, parsedAddress);

  // Update user details
  userDetails = {
    name: name || userDetails.name,
    age: typeof age === 'number' ? age : userDetails.age,
    address: mergedAddress
  };

  res.json({ message: 'User details updated', userDetails });
});

function deepMerge(target, source) {
  // a simple deep merge function. for each enumerable property in the source object, copy it to the target, recursively.
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
    }
  }

  return target;
}

app.get('/user-details', (req, res) => {
  res.json({ userDetails });
});

app.get('/is-admin', (req, res) => {
  const emptyDict = {};

  if (emptyDict.isAdmin === true) {
    res.json({ message: 'You were hacked!' });
  } else {
    res.json({ message: 'User is not admin' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 
