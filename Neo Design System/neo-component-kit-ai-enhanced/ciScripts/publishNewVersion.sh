set -e
npm config set //nexus.prod.build.kds.com/repository/npm-hosted/:_authToken ${NPM_TOKEN}
# Run ssh-agent (inside the build environment)
eval $(ssh-agent -s)
echo "${SSH_PRIVATE_KEY:1:-1}" | ssh-add -
mkdir ~/.ssh
touch ~/.ssh/known_hosts
echo "${SERVER_HASH:1:-1}" >> ~/.ssh/known_hosts
npm run installAndBuild:all
npm publish
npm run doc:publish -- --auto-confirm
npm config set //repos.gbt.gbtad.com/repository/ntg-npm/:_authToken ${GBT_NPM_TOKEN}
mv .npmrc .npmrc.old
mv .npmrc.gbt .npmrc
npm publish