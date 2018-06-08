if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
   echo "1- unit test success"
fi

if [ "$TRAVIS_PULL_REQUEST" = "false" ] ; then
   echo "2- unit test success"
fi