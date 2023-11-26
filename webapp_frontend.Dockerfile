########################################################################

FROM node:20-bullseye-slim as base
RUN mkdir /app 
WORKDIR /app
# RUN groupadd groupuserfe
# RUN useradd -g groupuserfe userfe
COPY --chown=root:root ./frontend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    vim \
    tini \
    htop && \
    ln -fs /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
    rm -rf /var/lib/apt/lists/*

########################################################################

FROM base as source
COPY --chown=root:root . .

########################################################################

FROM base as prod
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install && npm cache clean --force
CMD ["npm", "start"]
RUN chmod 700 * -Rf
# EXPOSE 8085
# USER userfe

########################################################################



