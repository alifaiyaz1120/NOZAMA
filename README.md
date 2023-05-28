# NOZAMA

[Demo Video](https://youtu.be/OmStX00KRp4)

Nozama is a E-Commerce platform designed to provide a user-friendly and enjoyable shopping experience for our customers. 

Built using React JS, the site features a modern and responsive design. Users can shop for products directly through the homepage or search for specific products using our search bar or filter products using the category sidebar. 

Nozama pulls product data via API calls to [Dummy JSON](https://dummyjson.com/docs/products). API calls are made in the backend which is written in ExpressJS. React Router serves as a middle man to handle client and server-side routing in our React application.

The app was dockerized inorder to host on an AWS EC2 Instance. 

## Utilization of AWS
AWS Cognito was used to help Nozama authenticate its new/returning users. 

AWS DynamoDB was used to help Nozama store user cart data. When a logged-in user decides to add/remove an item from their cart, their updated cart is stored in DynamoDB. If the user decides to log out and log back in sometime in the future, their cart data will be re-rendered and allow them to continue their shopping right where they left off! 

AWS EC2 was used to host Nozama and allow users to access the site through an IPv4 address publicly. 

AWS S3 was used to store static images for our application. The images could be displayed on the site by calling the specific S3 Bucket object URL links. 

AWS IAM was used for role/permission management for the AWS services used.  

### Technologies Used:
- ReactJS
- ExpressJS
- React Router 
- CSS/SASS
- MongoDB (Replaced by AWS' DynamoDB)
- Docker
- [AWS EC2](https://aws.amazon.com/ec2/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/?nc2=h_ql_prod_db_ddb)
- [AWS S3](https://aws.amazon.com/s3/) 
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [AWS IAM](https://aws.amazon.com/iam/)
- [AWS Amplify](https://aws.amazon.com/amplify/) (Replaced by AWS EC2 for hosting)
 
### Architecture Map:
![Screen Shot 2023-05-15 at 5 26 51 PM](https://github.com/nozama-cloud/E-Commerce-Nozama/assets/71999538/b32d5b96-76d0-4bcd-b7b3-35ca9f5770c8)
