#Pizza delivery website test credentials

Customer Id - qwerty202316@gmail.com/pass1234

Admin id - pizza202321@gmail.com/pass1234

Responsive pizza delivery website

#Customer functionalities

Customer has to Register using mail id and password while visiting site for the first time

Once registration is successful, customer can login, select pizza(s) of their choice and add it to the cart

Items can be removed from the cart at any time

Customer can either choose home delivery or pickup service

Home delivery - cutomer has to enter the address in the popup box

Pickup - customer has to select the branch from the navigation bar

Test mode of Razorpay API is used for making payment

Once payment is done, cutomer will be directed to order history page

Customer can navigate to order history page any time from the user button in the navigation bar

Once order is placed, customer will get notified in the navigation bar(bell icon) on order preparation for every 10 secs untill the order is delivered

Customer can also reset password using "Forgot Password?" option in the login page


#Admin functionalities

Admin can add/delete/edit item details

Admin functionalities are secured with JSON Web Token

Admin can also see the existing menus/items in the home page

Once customer has placed order successfully, admin will receive order details in the mail (nodemailer module)

