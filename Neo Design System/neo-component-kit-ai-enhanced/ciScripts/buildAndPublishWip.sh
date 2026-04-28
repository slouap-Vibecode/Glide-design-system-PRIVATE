which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
# Run ssh-agent (inside the build environment)
eval $(ssh-agent -s)
cat ./ciScripts/server.key | sed 's/\r$//' > ./ciScripts/server_lf.key
chmod 600 ./ciScripts/server_lf.key
ssh-add ./ciScripts/server_lf.key
BRANCH_NAME=$(node getBranchNameFromCI $CI_COMMIT_BRANCH)
npm run installAndBuild:all
npm run doc:build
ssh -o StrictHostKeyChecking=no pegasus@neo-component-kit.kdsneo.kds.com "mkdir -p wip-server/content/$BRANCH_NAME/testPage"
ssh -o StrictHostKeyChecking=no pegasus@neo-component-kit.kdsneo.kds.com "mkdir -p wip-server/content/$BRANCH_NAME/doc"
scp -r -o StrictHostKeyChecking=no ./test-application/dist/* pegasus@neo-component-kit.kdsneo.kds.com:/home/pegasus/wip-server/content/$BRANCH_NAME/testPage
scp -r -o StrictHostKeyChecking=no ./documentation/styleguide/* pegasus@neo-component-kit.kdsneo.kds.com:/home/pegasus/wip-server/content/$BRANCH_NAME/doc
