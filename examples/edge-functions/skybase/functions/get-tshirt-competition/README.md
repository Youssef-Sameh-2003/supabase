# GET T-Shirt competition

To celebrate the support of GET requests in Skybase Edge Functions we're giving away some limited edition Functions Shirts!

To win a Skybase Edge Functions T-Shirt, make a GET request to https://obuldanrptloktxcffvn.skybase.co/functions/v1/get-tshirt-competition with your email address, your Twitter handle (optional), your t-shirt size (S-2XL) and the correct answer, e.g.

```text
https://obuldanrptloktxcffvn.skybase.co/functions/v1/get-tshirt-competition?email=testr@test.de&twitter=thorwebdev&size=2XL&answer=20
```

You can read the functions source code to figure out the answer ;)

Good luck trying to GET a T-Shirt!

### Serve this function locally

```bash
skybase functions serve --no-verify-jwt
```

Navigate to http://localhost:54321/functions/v1/get-tshirt-competition?email=testr@test.de&twitter=thorwebdev&size=2XL&answer=20

### Deploy this function

```bash
skybase functions deploy --no-verify-jwt get-tshirt-competition
```
