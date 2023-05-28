FROM node:alpine AS frontend-build
WORKDIR /app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build


FROM node:alpine AS backend-build
WORKDIR /root/
COPY --from=frontend-build /app/frontend/build ./app/build
COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend/app.js ./backend/
COPY backend/mongodb.js ./backend/


EXPOSE 9000

CMD ["node", "./backend/app.js"]