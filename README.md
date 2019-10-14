# UrlShortener
#### Required environment variables
- HOST = api server e.g. localhost:3000

#### To start run
- npm install
- HOST=localhost:3000 npm run start:prod

#### Example requests
##### Get all urls
```
curl -X GET http://localhost:3000/urls
```
##### Get url by shortUrl
```
curl -X GET localhost:3000/urls/1Mkh
```
##### Shortening url
```
curl -X POST \
  http://localhost:3000/urls \
  -H 'Content-Type: application/json' \
  -d '{
	"url": "google.com"
}'
```
##### Shortening url with custom requestedUrl
```
curl -X POST \
  http://localhost:3000/urls \
  -H 'Content-Type: application/json' \
  -d '{
	"url": "google.com",
	"requestedUrl": "customUrl"
}'
```