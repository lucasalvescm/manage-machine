function apiLocation() {
  let url = "http://localhost:3001/api/"
  if (process.env.NODE_ENV === "production") {
    url = "http://managemachine.ddns.net/api/"
  }
  return url
}
module.exports = {
  API_LOCATION: apiLocation()
}