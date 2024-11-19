FROM node:20

WORKDIR /flicks-standalone

COPY package*.json ./

RUN npm install

COPY . .


ENV PORT=4700
ENV TMDB_API_KEY=
ENV MOVIES_DL_PATH=/downloads/complete/MOVIES
ENV SERIES_DL_PATH=/downloads/complete/SERIES
ENV TRANS_HOST=192.168.0.10
ENV TRANS_PORT=9091
ENV TRANS_USER=
ENV TRANS_PASS=
ENV TRANS_SSL=false
ENV TRANS_URL=


EXPOSE 4700

CMD ["node", "--no-deprecation", "index.js"]