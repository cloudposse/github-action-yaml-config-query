FROM alpine:3.16.2

RUN apk add --no-cache bash

ENTRYPOINT ["/bin/bash"]

COPY entrypoint.sh /usr/local/bin/entrypoint

CMD [ "-c", "entrypoint" ]