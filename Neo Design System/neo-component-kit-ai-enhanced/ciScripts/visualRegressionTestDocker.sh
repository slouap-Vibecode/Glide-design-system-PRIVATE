docker build -t nck-vrt -f ./ciImages/visualRegressionTest.dockerfile .
docker run -v $(pwd)/test-application/automatic_tests:/app/test-application/automatic_tests nck-vrt