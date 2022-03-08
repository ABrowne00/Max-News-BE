# Maximum-News



Project Summary

    This is an API that allows viewing, posting, updating and deleting articles and comments of news data froom a database using node-postgres. Hosted at https://maximum-news.herokuapp.com/

Set-Up

    Clone this repository by typing into your temrminal, then typing npm i to install dependicies
    Creatte two new files in the main directory .env.test and .env.development. Add one linee of code to each file, PGDATABASE=nc_news_test forr the test file, and PGDATABAASE=nc_news to the development file
    Seed the database by first typing npm run setup-dbs then npm run seed
    To seed the database with test datta and run tests, input npm t into tthe command line

