
# Description
Your Bills is created with React and Node.js. This React single page app is for tracking every money you spend. You can add, delete, change, and search every expense you make.

To run this app, `run start` and `npm run dev`, then the browser will open this app automatically.

# Function of App
1. Login

Type your username to login. The title could show your username. However, username could only consist of number and English chanracter. Besides, username dog is not allowed.

2. Add a bill

Type or select the information to add a bill. If the information you type in is unqualified, your bill cannot add to bill list and the error information would show below the Add button.

- Date

 Date is required, and the format must be mm/dd/yyyy. The year msut be equal or greater than 2000.
- Address

 Address is also required.
- Category

 Category is not required. You can choose which category your bill is. If nothing is selected, the category value would be the default value 'Other'.
- Amount

 Amount is required. And you could only type in a number with two decimal at most.
- Description

Description is not required.

3. Bill list

Bill list is the area where could show all your bills. 

function:
 - Change category
 - Delete a bill list item
 - Sort. 
 
 The bill list could be sorted by date and amount. Click ↑ will make the list in ascending order, ↓ will be in descending order.
 - Search. 
 
You could search the address of a bill list item by typing in the search area.
 - Filter. 
 
You could filter the bill list by select the specific category option.
 - Sum. 
 
The top right corner of the list shows how much did you spend altogether. The number is the sum of the bill list showed on the screen. That means you can see how much money you spend in one specific category or under a key word.

Besides, all functions said above could work together. That means, you could sort the bill lists your filtered. Or you could filter the bill lists you searched, and so on.

4. Logout

Click the botton on the top right corner to logout. And your user name is showed at left side of the button when you log in.


# Source of Images

Search icon

https://icons8.com/icons/set/search

Up icon

https://icons8.com/icons/set/up

Down icon

https://icons8.com/icons/set/down
