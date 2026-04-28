FROM backstopjs/backstopjs:6.3.25

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
ENV PUPPETEER_EXECUTABLE_PATH=

WORKDIR /app/
COPY . .
RUN rm -r /app/test-application/automatic_tests/

RUN npm run installAndBuild:all

ENTRYPOINT [ "npm", "run", "test:vrt:docker:ci" ]