rm -rf ./build && \
yarn build && \
scp -rp ./build/ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}
