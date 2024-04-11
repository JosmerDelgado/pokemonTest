This project part of an interview process 
The requirement includes: 
- Create an app that interacts with https://pokeapi.co/
- List pokemons
- Search by Name
- Create a new page with details
- Paginate the listed pokemons

Aclarations: 
After some review notice the rest version of the api do not allow to search, so I use the graphql implementation of the same API.
Using route handling to avoid direct conection with the external api and adding cache.

## Getting Started

Install all dependencies
```bash
  npm install
```


In order to run the development server:

```bash
  npm run dev
```

The aplication will be running at [http://localhost:3000](http://localhost:3000) open with your browser to see the result.

## Pages

### Main
---
On main page you will be able to see the list of pokemons with a search input to search by names, and a butons to change the pagination. Click on any pokemon to see the Pokemon page

### Pokemon 
---
On This route you can see the details of the pokemon based id.