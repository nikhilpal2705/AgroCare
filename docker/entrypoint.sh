#!/usr/bin/env sh
set -eu

PORT="${PORT:-10000}"
SERVER_PORT="${SERVER_PORT:-8080}"
DATABASE_HOST="${DATABASE_HOST:-}"
DATABASE_PORT="${DATABASE_PORT:-3306}"

export PORT SERVER_PORT

# Inject runtime env into frontend so Render env vars can be used without rebuild.
cat > /app/frontend/env-config.js <<EOF
window.__APP_CONFIG__ = {
  API_BASE_URL: "${API_BASE_URL:-/api}",
  CLIENT_BASE_URL: "${CLIENT_BASE_URL:-}",
  RENDER_EXTERNAL_URL: "${RENDER_EXTERNAL_URL:-}"
};
EOF

# Render nginx config with runtime ports.
envsubst '${PORT} ${SERVER_PORT}' < /app/nginx.conf.template > /etc/nginx/sites-available/default

if [ -n "$DATABASE_HOST" ]; then
  /app/wait-for-it.sh "$DATABASE_HOST:$DATABASE_PORT" -- java -jar /app/app.jar &
else
  java -jar /app/app.jar &
fi

nginx -g "daemon off;"
