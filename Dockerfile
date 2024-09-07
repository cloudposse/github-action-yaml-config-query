FROM public.ecr.aws/docker/library/alpine:3.20.3

# Install the cloudposse alpine repository
ADD https://apk.cloudposse.com/ops@cloudposse.com.rsa.pub /etc/apk/keys/
RUN echo "@cloudposse https://apk.cloudposse.com/3.11/vendor" >> /etc/apk/repositories

ENV YQ_VERSION=4.30.1-r0
ENV JQ_VERSION=1.6-r0
RUN apk add --no-cache bash \
    jq@cloudposse==${JQ_VERSION} \
    yq@cloudposse==${YQ_VERSION}

ENTRYPOINT ["/bin/bash"]

COPY entrypoint.sh /usr/local/bin/entrypoint

CMD [ "-c", "entrypoint" ]
