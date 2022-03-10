# Maximum-News



## About 

In this project I have created  an API for a news website, that allows viewing, posting, uodating and deleting articles and comments of news data from a databse using node-postgress.  

A hosted version of this can be found at https://maximum-news.herokuapp.com/

## Cloning the repository =

If you would like to work on this repository locally, you will ned to clone it to your local machine

git clone 

  

## Set-Up

This repo makes use of some other packages that need to be installed locally. To do this run the following command in your terminal 

npm i 

 
 Create two new files in the main directory .env.test and .env.development. Add one linee of code to each file, PGDATABASE=nc_news_test for the test file, and PGDATABAASE=nc_news to the development file  
 
 Seed the databse by inputting these commands in order:
 
      npm run setup-dbs
      npm run seed

To seed the database with test data and run tests, input the following command:
                    
      npm test


## System Requirements

You will need to installl NOde v16.9.1 and PSQL v12.9 to run this repository
