Wishlist+ is a personal wishlist management application that allows users to create separate lists and track games based on custom themes.

This app requires a local JSON Server API to be running. The API is maintained in a separate repository and must be cloned and started before running the frontend.

1. Clone the API repo:

git clone git@github.com:kennypanyavong/wishlist-api.git

2. Navigate into the API directory:

cd wishlist-api

3. Install JSON Server:

npm install -g json-server

4. Start the API on port 8088:

json-server -p 8088 -w database.json
