--ENDPOINTS--
## POST /register
## POST /login
## POST /googleLogin
## GET /get-events
## GET /get-events/search/:keyword
## GET /wishlist
## POST /wishlist
## DELETE /wishlist/:name
-------------## POST /register--request body
{
    "username": string,
    "email": string,
    "password": string
}--response(201)
```json
{
    "message": "successfully registered",
    "data": {
        "id": 6,
        "username": "ismatullah",
        "email": "otorigami@gmail.com",
        "password": "$2b$10$tRW.UcxDbH/PayrYxQqehe.hcgemv7NuDEZ.vk7lFze59qrsfbG36",
        "updatedAt": "2020-08-06T22:04:55.538Z",
        "createdAt": "2020-08-06T22:04:55.538Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzbWF0Y2hhbiIsImVtYWlsIjoib3RvcmlnYW1pQGdtYWlsLmNvbSIsImlhdCI6MTU5Njc1MTQ5NX0.PTZ5HhEn2v5aap7nqH9JosU3Z2Qaop9Ib_NX_W2h8Co"
}
```## POST /login--response(200)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzbWF0dWxsYWgiLCJlbWFpbCI6Im90b3JpZ2FtaUBnbWFpbC5jb20iLCJpYXQiOjE1OTY3NzE1MTh9.UqT9RlAKZolYC8ypP98ZvsMd88y219mZEQxZJgzPSbQ",
    "email": "otorigami@gmail.com",
    "username": "ismatullah"
}
```## POST /googleLogin--response(200)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzbWF0dWxsYWgiLCJlbWFpbCI6Im90b3JpZ2FtaUBnbWFpbC5jb20iLCJpYXQiOjE1OTY3NzE1MTh9.UqT9RlAKZolYC8ypP98ZvsMd88y219mZEQxZJgzPSbQ"
}
```## GET /get-events--request headers
access_token--response(200)
```json
{
    "data": [
        {
            "name": "Harry Styles - Love On Tour",
            "type": "event",
            "id": "Z698xZ2qZaAFN",
            "test": false,
            "url": "https://www.ticketmaster.es/event/harry-styles-love-on-tour-tickets/21027?language=en-us",
            "locale": "en-us",
            "...": "..."
                    }
                ]
            }
        }
    ]
}
```## GET /get-events/search/:keyword--request headers
access_token--response(200)
```json
{
    "data": [
        {
            "name": "Harry Styles - Love On Tour",
            "type": "event",
            "id": "Z698xZ2qZaAFN",
            "test": false,
            "url": "https://www.ticketmaster.es/event/harry-styles-love-on-tour-tickets/21027?language=en-us",
            "locale": "en-us",
            "...": "..."
                    }
                ]
            }
        }
    ]
}
```## GET /wishlist--request headers
access_token--response(200)
```json
[
    {
        "id": 1,
        "name": "Harry Styles - Love On Tour",
        "venue": "Wizink Center",
        "date": "2021-02-15",
        "country": "Europe/Madrid",
        "price": "25 EUR (standard)",
        "UserId": 3,
        "updatedAt": "2020-08-06T22:04:55.538Z",
        "createdAt": "2020-08-06T22:04:55.538Z"
    },
    {
        "id": 2,
        "name": "Niall Horan - Platinum",
        "venue": "Sant Jordi Club",
        "date": "2020-11-14",
        "country": "Europe/Madrid",
        "price": "30 EUR (standard)",
        "UserId": 3,
        "updatedAt": "2020-08-06T22:04:55.538Z",
        "createdAt": "2020-08-06T22:04:55.538Z"
    }
]
```## POST /wishlist--request headers
access_token--request body
{
    "name": string,
    "venue": string,
    "date": string,
    "country": string,
    "price": string,
    "UserId": Foreign Key from Users
}--response(200)
```json
[
    {
        "id": 1,
        "name": "Harry Styles - Love On Tour",
        "venue": "Wizink Center",
        "date": "2021-02-15",
        "country": "Europe/Madrid",
        "price": "25 EUR (standard)",
        "UserId": 3,
        "updatedAt": "2020-08-06T22:04:55.538Z",
        "createdAt": "2020-08-06T22:04:55.538Z"
    },
    {
        "id": 2,
        "name": "Niall Horan - Platinum",
        "venue": "Sant Jordi Club",
        "date": "2020-11-14",
        "country": "Europe/Madrid",
        "price": "30 EUR (standard)",
        "UserId": 3,
        "updatedAt": "2020-08-06T22:04:55.538Z",
        "createdAt": "2020-08-06T22:04:55.538Z"
    }
]
```## DELETE /wishlist/:name--request headers
access_token--request params
name--response(200)
