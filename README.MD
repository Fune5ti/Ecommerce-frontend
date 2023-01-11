# Ecommerce Frontend

This is the frontend application for the Devnology developer test.
It was built using ant.design UI components, redux store using redux toolkit and react router v6.

## How to run?

In order to run this application you must:

- Have the laravel backend running.
- Set the variable `VITE_BACKEND_URL` in the file `.env.local` to point to the backend like in the file `.env.example` .
- Run `yarn` to install dependecies.
- Run `yarn dev` to start the application.
- Open the link shown in the terminal in your browser.

# Decision Making

I decided to have a paginated list of all the products to improve performance an UX for the user, i also created a selectable filter and search, where the user can basically search between almost all of the attributes of each Product.
For the details view there is a simple card with all the relevant informations about the product, and also a carousel to see all the images that the product has.
All the cart state, and the filter state is managed by a redux store which makes it easier and more intuitive to manage those state that in my opinion should be global to the application.
