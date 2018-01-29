The Web App is deployed on the Heroku server. The Web App is connected to a Mongodb database. 
The four data table are exported to the mLAb( https://mlab.com/home) database online under my account. 

The Web App address is https://evening-escarpment-63030.herokuapp.com/ 

## Bug: The Renew List might not work in phone due to the button is calling refresh function. The phone didn't send the same post route request to the server.
---- Bug fixed----

1.	In this app, I realized that in the food-ens data, fgid is "da", but in servings_per_day-ens’, fgid is "mi" instead of "da". Therefore, I link the two dataset in the backend site.
2.	In the people table, servings_per_day-ens data can be exported as “7 to 10”, etc.  I decided to export the largest number for the data (i.e. 10).
3.	In the future, the code could be improved for refracting some data request to be a function. In addition, a good error handler can be added for the project.
