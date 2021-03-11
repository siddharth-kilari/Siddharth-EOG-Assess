
## The examples demonstrates the working dashboard which visualizes the real time and historical values of a hypothetical set of equipment in the field. The equipment publishes its data every 1.3 seconds.

Implemented code review comments and made some changes in the code to improve performance and ADA (Accessibility)
As suggested implemented redux/toolkit, have rewritten the whole redux logic. Removed hard code values.
Added Metrics and Measurements code inside the feature folder similar to Weather (which was generated) for better consistency.
Changed the whole logic of Graph using Dygraph, felt its providing more features like handling huge data, different colors for data representation and meeting ADA compliance. Will be exploring D3 charts as well in future.
In the previous assignment review one of the inputs was usage of graphql, so tried that as well.

## How to use:

Clone the repository.
Go to the folder.
Run npm install
Run npm start
URL : http://localhost:3000/


## Built With:

React
React Hook
Redux
Redux-Saga
GraphQL
urql
GraphQL subscriptions
material UI
semantic UI



## Create React App Visualization

This assessment was bespoke handcrafted for Siddharth.

Read more about this assessment [here](https://react.eogresources.com)

![image](https://user-images.githubusercontent.com/80046960/110825170-c399b080-8261-11eb-81aa-1045f85f01bf.png)

