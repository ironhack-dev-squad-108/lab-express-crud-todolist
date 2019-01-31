![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Express Basic CRUD | Ironmatch with Bootstrap

## Introduction

Now you have real developer skills and you have decided to create a website for you and your friends to report all the sport matches you do.

## Iteration 0 | Setup

Just run `$ irongenerate ironmatch`

## Iteration 1 | Create the layout with Bootstrap

First, install Bootstrap this way:
```sh
$ npm install bootstrap
```

Replace the file `public/stylesheets/style.scss` by this:
```scss
// Change the default primary color to a light blue
$primary: #2eb4ee;

@import '../../node_modules/bootstrap/scss/bootstrap.scss';

// Write your own SCSS here:
```

Now, in the `views/layout.hbs`, insert a navbar from Bootstrap. You can use the following code:

```html
<nav class="navbar navbar-expand navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand" href="#">Ironmatch</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ranking">Ranking</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

You can also update `views/index.hbs`

```html
<h1>Welcome to Ironmatch</h1>
<button class="btn btn-primary">Test</button>
```

Now run your server (`npm run dev`) and try it.

## Iteration 2 | Model `Match`

Create a file `models/Match.js`

Each document of the collection `matches` must contain the following fields:
- `sport`: The name of the sport (ex: 'football', 'basketball', 'tennis')
- `player1`: The name of the player 1 (ex: 'Alice')
- `player2`: The name of the player 2 (ex: 'Bob')
- `score1`: The score of the player 1 (ex: 10)
- `score2`: The score of the player 1 (ex: 13)

# Iteration 3 | Add a match

On the home page, add a POST form, with the right Bootstrap classes, to let users adding a match. 

# Iteration 4 | Display all matches on the Home Page

Display all the match on the home page in a Bootstrap table.

# Iteration 5 | Create a search on the home page to filter the match

Create a search input on the home page. Every time the user is typing a search, we will be redirected to the home page but will only see the matches where one of the player has the same name.

# Iteration 6 | Create a ranking page

Create a page `/ranking` that displays a table with the names of everyone and their total score. 

To count the score, you should follow this rule:
- Win = 2 points
- Draw = 1 point
- Lose = 0 point