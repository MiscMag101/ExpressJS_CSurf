
# How to test it

## Download prototype

```console
$ git clone https://github.com/MiscMag101/ExpressJS_CSurf.git
```

* Install NPM Packages required for the back end

```console
$ cd Back\ End
$ npm install
```

## Create a self-signed certificat for the back end

```console
$ cd Back\ End
$ mkdir tls
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 \ 
-keyout tls/key.pem -out tls/cert.pem
```

For this certificat, a hostname will be required (such as app.example.com).
/!\ This self-signed certificat should be used only for testing purpose.

## Start the back end

```console
$ cd Back\ End
$ npm start
```

## Test in your browser

Open [http://app.example.com:3000](http://app.example.com:3000) and open devtools to see what happens (cookie and request).


## Test with curl

* Send a POST request without CSRF token

```console
$ curl --request POST --insecure --head https://app.example.com:3000/api

HTTP/1.1 403 Forbidden
```

* Fetch XSRF Token

```console
$ curl --insecure --head --cookie cookie.txt https://app.example.com:3000/api

HTTP/1.1 200 OK
X-Powered-By: Express
Set-Cookie: _csrf=Js_UZRnPCc4joNHXRni6NC7g; Path=/; Secure; SameSite=Strict
Set-Cookie: XSRF-TOKEN=Hf2igNq5-j0hEx7PlLmiBYWbBRwVoHVT7kKs; Path=/
Content-Type: text/html; charset=utf-8
Content-Length: 23
ETag: W/"17-dz3lQFWsvaILP0XWy2YesfdbyNA"
Date: Sun, 30 Sep 2018 17:56:40 GMT
Connection: keep-alive
```

* Send a POST request with XSRF token (Cookie double submit)

```console
$ curl --request POST --cookie cookie.txt --header "X-XSRF-TOKEN: Hf2igNq5-j0hEx7PlLmiBYWbBRwVoHVT7kKs" --insecure --head https://app.example.com:3000/api
```

Copy the value of XSRF-TOKEN cookie in X-XSRF-TOKEN HTTP header.



# How I did it

## Create ExpressJS App

Following instructions from [https://github.com/MiscMag101/ExpressJS_Https](https://github.com/MiscMag101/ExpressJS_Https) (or just fork it).
In this prototype, HTTPS is mandatory to issue Secure Cookie.

## CSurf

* Install middleware

```console
$ npm install --save csurf
```

* Configure middleware

```javascript
// Load middleware
const csrf = require('csurf');

// Set up secret storage in a cookie
app.use(csrf({ cookie: {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
}}));

// Send token in a cookie
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { path: '/', secure: true, maxAge: 600000, sameSite: 'strict'});
  next();
});
```

## Angular

* Add HttpClientXsrfModule in app module

