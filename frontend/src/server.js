let server, backend_url;

if (process.env.NODE_ENV === "production") {
  server = "https://matrix-react-app.azurewebsites.net/api/v2";
  backend_url = "https://matrix-react-app.azurewebsites.net/";
} else {
  server = "http://localhost:8000/api/v2";
  backend_url = "http://localhost:8000";
}

export { server, backend_url };
