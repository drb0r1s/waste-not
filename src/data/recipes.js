import { recipeImages } from "./recipeImages";

export const recipes = [
    {
        name: "Pasta Primavera",
        description: "A colorful mix of pasta and fresh vegetables tossed in a light garlic and olive oil sauce, topped with Parmesan cheese.",
        fullDescription: "Cook penne pasta according to the package instructions. While the pasta is cooking, heat olive oil in a large skillet over medium heat. Sauté minced garlic until fragrant, then add chopped cherry tomatoes, zucchini, and bell peppers. Cook until the vegetables are tender. Drain the pasta and toss it into the skillet with the vegetables. Sprinkle with grated Parmesan cheese and serve warm.",
        ingredients: [
            "Penne pasta",
            "Cherry tomatoes",
            "Zucchini",
            "Bell peppers",
            "Garlic",
            "Olive oil",
            "Parmesan cheese"
        ],
        tag: "main dish",
        icon: recipeImages.pastaPrimavera
    },

    {
        name: "Chicken Stir-Fry",
        description: "Tender chicken and crisp vegetables cooked in a savory soy sauce blend with hints of garlic and ginger.",
        fullDescription: "Cut chicken breast into bite-sized pieces. Heat sesame oil in a wok or large skillet over high heat. Sear the chicken until cooked through, then remove and set aside. In the same pan, add broccoli and carrots and stir-fry until tender. Add minced garlic and ginger, and cook until aromatic. Return the chicken to the pan, pour in soy sauce, and stir everything together. Serve with steamed rice or noodles.",
        ingredients: [
            "Chicken breast",
            "Broccoli",
            "Carrots",
            "Soy sauce",
            "Garlic",
            "Ginger",
            "Sesame oil"
        ],
        tag: "main dish",
        icon: recipeImages.chickenStirFry
    },

    {
        name: "Vegetarian Tacos",
        description: "A plant-based twist on a classic, filled with black beans, fresh veggies, and creamy avocado.",
        fullDescription: "Warm tortillas in a skillet or microwave. Mash black beans and spread them as the base on the tortillas. Top with corn, diced tomatoes, shredded lettuce, and slices of avocado. Add a dollop of sour cream for extra flavor. Optional: Sprinkle with shredded cheese or hot sauce before serving.",
        ingredients: [
            "Tortillas",
            "Black beans",
            "Corn",
            "Avocado",
            "Tomato",
            "Lettuce",
            "Sour cream"
        ],
        tag: "snack",
        icon: recipeImages.vegetarianTacos
    },

    {
        name: "Grilled Cheese Sandwich",
        description: "Golden-brown bread with gooey melted cheddar cheese, perfect for a quick and comforting meal.",
        fullDescription: "Butter one side of each bread slice. Heat a skillet over medium heat. Place one slice, buttered side down, in the skillet. Add cheddar cheese slices on top, then cover with the second bread slice, buttered side up. Cook until the bread is golden and crispy, then flip and cook the other side until the cheese melts. Serve immediately.",
        ingredients: [
            "Bread",
            "Cheddar cheese",
            "Butter"
        ],
        tag: "snack",
        icon: recipeImages.grilledCheeseSandwich
    },

    {
        name: "Beef Stew",
        description: "A hearty dish of slow-cooked beef, potatoes, and carrots simmered in a rich, savory broth.",
        fullDescription: "Cut beef into chunks and season with salt and pepper. In a large pot, brown the beef in batches. Remove and set aside. In the same pot, sauté diced onions, then add chopped carrots and potatoes. Return the beef to the pot, pour in beef broth, and add thyme and a bay leaf. Bring to a boil, then reduce to a simmer. Cover and cook for 1.5-2 hours, or until the beef is tender. Remove the bay leaf before serving.",
        ingredients: [
            "Beef chunks",
            "Potatoes",
            "Carrots",
            "Onions",
            "Beef broth",
            "Thyme",
            "Bay leaf"
        ],
        tag: "main dish",
        icon: recipeImages.beefStew
    },

    {
        name: "Tomato Basil Soup",
        description: "A creamy and flavorful soup made with roasted tomatoes and fresh basil, served warm.",
        fullDescription: "Roast fresh tomatoes in the oven with a drizzle of olive oil until soft. In a large pot, sauté minced garlic, then add the roasted tomatoes and vegetable broth. Simmer for 10 minutes. Blend the soup until smooth using an immersion blender. Stir in heavy cream and chopped basil. Season with salt and pepper to taste. Serve with crusty bread or croutons.",
        ingredients: [
            "Tomatoes",
            "Basil",
            "Garlic",
            "Vegetable broth",
            "Cream"
        ],
        tag: "appetizer",
        icon: recipeImages.tomatoBasilSoup
    },

    {
        name: "Chocolate Mug Cake",
        description: "A quick dessert that's rich and moist, ready in minutes, perfect for satisfying your sweet tooth.",
        fullDescription: "In a microwave-safe mug, mix flour, sugar, cocoa powder, and baking powder. Add milk and oil, stirring until smooth. Microwave on high for 1-2 minutes, or until the cake is set. Let cool slightly before eating. Optional: Top with whipped cream or chocolate chips.",
        ingredients: [
            "Flour",
            "Sugar",
            "Cocoa powder",
            "Milk",
            "Oil",
            "Baking powder"
        ],
        tag: "dessert",
        icon: recipeImages.chocolateMugCup
    },

    {
        name: "Shrimp Alfredo",
        description: "Creamy fettuccine pasta paired with sautéed shrimp in a rich garlic Alfredo sauce.",
        fullDescription: "Cook fettuccine pasta according to package instructions. In a skillet, sauté shrimp in butter with minced garlic until pink and cooked through. Add heavy cream and grated Parmesan cheese, stirring until the sauce thickens. Toss the pasta in the sauce until evenly coated. Serve warm with parsley garnish.",
        ingredients: [
            "Fettuccine pasta",
            "Shrimp",
            "Heavy cream",
            "Garlic",
            "Parmesan cheese"
        ],
        tag: "main dish",
        icon: recipeImages.shrimpAlfredo
    },

    {
        name: "Caprese Salad",
        description: "Fresh tomatoes, mozzarella, and basil drizzled with olive oil and balsamic glaze for a refreshing bite.",
        fullDescription: "Slice fresh tomatoes and mozzarella cheese. Arrange them alternately on a plate. Top with fresh basil leaves and drizzle with olive oil and balsamic glaze. Sprinkle with salt and freshly ground pepper to taste. Serve chilled.",
        ingredients: [
            "Tomatoes",
            "Mozzarella",
            "Basil",
            "Balsamic vinegar",
            "Olive oil"
        ],
        tag: "appetizer",
        icon: recipeImages.capreseSalad
    },

    {
        name: "Spaghetti Carbonara",
        description: "A creamy pasta dish with crispy pancetta, eggs, Parmesan, and a touch of black pepper.",
        fullDescription: "Cook spaghetti according to package instructions. In a skillet, cook diced pancetta until crispy. In a bowl, whisk together eggs and grated Parmesan cheese. Drain the pasta, reserving some cooking water. Quickly toss the hot pasta with the pancetta and egg mixture, adding a splash of reserved water to create a creamy sauce. Serve immediately with black pepper and extra Parmesan on top.",
        ingredients: [
            "Spaghetti",
            "Pancetta",
            "Eggs",
            "Parmesan cheese",
            "Black pepper"
        ],
        tag: "main dish",
        icon: recipeImages.spaghettiCarbonara
    },

    {
        name: "Lemon Garlic Salmon",
        description: "Tender salmon fillets cooked with a tangy lemon and garlic butter sauce.",
        fullDescription: "Season salmon fillets with salt and pepper. In a skillet, melt butter and sauté minced garlic until fragrant. Add lemon juice and place the salmon fillets in the skillet. Cook for 3-4 minutes per side, spooning the sauce over the fish. Garnish with chopped parsley and serve warm.",
        ingredients: [
            "Salmon fillets",
            "Lemon",
            "Garlic",
            "Butter",
            "Parsley"
        ],
        tag: "main dish",
        icon: recipeImages.lemonGarlicSalmon
    },

    {
        name: "Veggie Fried Rice",
        description: "A quick and delicious mix of rice, vegetables, and soy sauce, perfect for any meal.",
        fullDescription: "Heat sesame oil in a large skillet or wok. Add mixed vegetables and sauté until tender. Push the vegetables to one side and scramble eggs on the other side of the skillet. Add cooked rice and soy sauce, mixing everything together. Cook for a few minutes until heated through. Garnish with chopped green onions before serving.",
        ingredients: [
            "Cooked rice",
            "Mixed vegetables",
            "Soy sauce",
            "Sesame oil",
            "Green onions",
            "Eggs"
        ],
        tag: "main dish",
        icon: recipeImages.veggieFriedRice
    },

    {
        name: "BBQ Chicken Pizza",
        description: "A smoky, tangy pizza topped with BBQ chicken, red onions, and melted mozzarella.",
        fullDescription: "Spread BBQ sauce over prepared pizza dough. Top with shredded cooked chicken, sliced red onions, and shredded mozzarella cheese. Bake in a preheated oven at 220°C (425°F) for 12-15 minutes or until the crust is golden and the cheese is melted. Sprinkle with chopped cilantro before serving.",
        ingredients: [
            "Pizza dough",
            "BBQ sauce",
            "Cooked chicken",
            "Red onion",
            "Mozzarella cheese",
            "Cilantro"
        ],
        tag: "main dish",
        icon: recipeImages.bbqChickenPizza
    },

    {
        name: "Caesar Salad",
        description: "A classic salad with crisp romaine lettuce, creamy Caesar dressing, croutons, and Parmesan.",
        fullDescription: "Chop romaine lettuce and place it in a large bowl. Add croutons and grated Parmesan cheese. Toss with Caesar dressing until well coated. Optionally, top with grilled chicken or shrimp for a complete meal.",
        ingredients: [
            "Romaine lettuce",
            "Caesar dressing",
            "Croutons",
            "Parmesan cheese"
        ],
        tag: "appetizer",
        icon: recipeImages.caesarSalad
    },

    {
        name: "French Onion Soup",
        description: "A rich, caramelized onion soup topped with crusty bread and melted Gruyère cheese.",
        fullDescription: "Thinly slice onions and caramelize them in a pot with butter over low heat. Add white wine, beef broth, thyme, and a bay leaf. Simmer for 30 minutes. Ladle the soup into bowls, top with a slice of crusty bread and grated Gruyère cheese, then broil until the cheese is melted and bubbly. Serve hot.",
        ingredients: [
            "Onions",
            "Beef broth",
            "White wine",
            "Thyme",
            "Bay leaf",
            "Bread",
            "Gruyère cheese"
        ],
        tag: "appetizer",
        icon: recipeImages.frenchOnionSoup
    },

    {
        name: "Blueberry Muffins",
        description: "Soft and fluffy muffins bursting with sweet and juicy blueberries, perfect for breakfast or snacks.",
        fullDescription: "In a mixing bowl, combine flour, sugar, and baking powder. In a separate bowl, whisk together milk, eggs, and melted butter. Gradually mix the wet ingredients into the dry ingredients, then fold in fresh blueberries. Divide the batter into a muffin tin and bake at 190°C (375°F) for 20-25 minutes or until golden brown. Let cool before serving.",
        ingredients: [
            "Flour",
            "Sugar",
            "Baking powder",
            "Milk",
            "Eggs",
            "Butter",
            "Blueberries"
        ],
        tag: "dessert",
        icon: recipeImages.blueberryMuffins
    },

    {
        name: "Vegetable Curry",
        description: "A fragrant and creamy curry loaded with seasonal vegetables, cooked in coconut milk and spices.",
        fullDescription: "Heat oil in a large pot and sauté onions, garlic, and ginger until fragrant. Add curry powder, turmeric, and cumin, and cook for a minute. Stir in chopped vegetables like potatoes, carrots, and bell peppers. Add coconut milk and simmer until the vegetables are tender. Serve with steamed rice or naan bread.",
        ingredients: [
            "Onions",
            "Garlic",
            "Ginger",
            "Curry powder",
            "Turmeric",
            "Cumin",
            "Coconut milk",
            "Seasonal vegetables"
        ],
        tag: "main dish",
        icon: recipeImages.vegetableCurry
    },

    {
        name: "Lemon Bars",
        description: "Tangy and sweet lemon filling on a buttery shortbread crust, dusted with powdered sugar.",
        fullDescription: "Preheat the oven to 175°C (350°F). Mix flour, sugar, and butter to form a crumbly dough. Press into a baking dish and bake until lightly golden. Whisk together eggs, sugar, lemon juice, and a bit of flour for the filling. Pour over the baked crust and bake until set. Cool completely and dust with powdered sugar before cutting into squares.",
        ingredients: [
            "Flour",
            "Sugar",
            "Butter",
            "Eggs",
            "Lemon juice"
        ],
        tag: "dessert",
        icon: recipeImages.lemonBars
    },

    {
        name: "Chicken Curry",
        description: "A rich and flavorful curry with tender chicken pieces simmered in a spiced coconut milk sauce.",
        fullDescription: "Heat oil in a large pan and sauté chopped onions until golden. Add minced garlic, ginger, and curry powder, cooking until fragrant. Add chicken pieces and cook until lightly browned. Pour in coconut milk and simmer until the chicken is cooked through and the sauce thickens. Garnish with cilantro and serve with rice or naan bread.",
        ingredients: [
            "Chicken",
            "Onion",
            "Garlic",
            "Ginger",
            "Curry powder",
            "Coconut milk",
            "Cilantro"
        ],
        tag: "main dish",
        icon: recipeImages.chickenCurry
    },

    {
        name: "Bruschetta",
        description: "Toasted bread topped with a fresh mixture of tomatoes, garlic, and basil.",
        fullDescription: "Toast slices of baguette until golden. In a bowl, mix diced tomatoes, minced garlic, chopped basil, olive oil, and balsamic vinegar. Spoon the mixture onto the toasted bread and serve immediately.",
        ingredients: [
            "Baguette",
            "Tomatoes",
            "Garlic",
            "Basil",
            "Olive oil",
            "Balsamic vinegar"
        ],
        tag: "snack",
        icon: recipeImages.bruschetta
    },

    {
        name: "Popcorn",
        description: "A quick and light snack, perfect for movie nights or casual gatherings.",
        fullDescription: "Heat oil in a pot over medium heat. Add popcorn kernels and cover with a lid. Shake the pot occasionally until the popping slows. Remove from heat and season with salt, butter, or your favorite toppings.",
        ingredients: [
            "Popcorn kernels",
            "Oil",
            "Salt"
        ],
        tag: "snack",
        icon: recipeImages.popcorn
    },

    {
        name: "Avocado Toast",
        description: "Simple and satisfying toast topped with creamy avocado and optional seasonings.",
        fullDescription: "Toast slices of bread to your desired crispness. Mash ripe avocado and spread it over the toast. Sprinkle with salt, pepper, and optional toppings like chili flakes or a poached egg.",
        ingredients: [
            "Bread",
            "Avocado",
            "Salt",
            "Pepper"
        ],
        tag: "snack",
        icon: recipeImages.avocadoToast
    },

    {
        name: "Trail Mix",
        description: "A healthy and customizable mix of nuts, dried fruits, and chocolate chips.",
        fullDescription: "Combine your choice of nuts, dried fruits, seeds, and chocolate chips in a bowl. Store in an airtight container for a quick and portable snack.",
        ingredients: [
            "Nuts",
            "Dried fruits",
            "Seeds",
            "Chocolate chips"
        ],
        tag: "snack",
        icon: recipeImages.trailMix
    },

    {
        name: "Hummus and Veggies",
        description: "Creamy hummus paired with fresh vegetable sticks for a refreshing snack.",
        fullDescription: "Serve hummus in a bowl surrounded by sliced carrots, celery, cucumbers, and bell peppers. Sprinkle hummus with olive oil and paprika if desired.",
        ingredients: [
            "Hummus",
            "Carrots",
            "Celery",
            "Cucumbers",
            "Bell peppers"
        ],
        tag: "snack",
        icon: recipeImages.hummusAndVeggies
    },

    {
        name: "Deviled Eggs",
        description: "Classic stuffed eggs with a creamy and tangy yolk mixture.",
        fullDescription: "Hard boil eggs and let them cool. Cut in half and remove the yolks. Mix yolks with mayonnaise, mustard, and seasoning. Spoon or pipe the mixture back into the egg whites and sprinkle with paprika.",
        ingredients: [
            "Eggs",
            "Mayonnaise",
            "Mustard",
            "Paprika"
        ],
        tag: "snack",
        icon: recipeImages.deviledEggs
    },

    {
        name: "Fruit Salad",
        description: "A colorful and refreshing mix of seasonal fruits.",
        fullDescription: "Chop a variety of fresh fruits into bite-sized pieces. Mix them in a bowl and optionally drizzle with honey or a splash of lime juice.",
        ingredients: [
            "Assorted fruits",
            "Honey",
            "Lime juice"
        ],
        tag: "snack",
        icon: recipeImages.fruitSalad
    },

    {
        name: "Brownies",
        description: "Rich and fudgy chocolate brownies, perfect for dessert lovers.",
        fullDescription: "Melt butter and chocolate in a bowl over simmering water. Mix in sugar, eggs, and vanilla extract. Fold in flour and cocoa powder until combined. Pour into a greased baking pan and bake at 175°C (350°F) for 20-25 minutes. Let cool before slicing.",
        ingredients: [
            "Butter",
            "Chocolate",
            "Sugar",
            "Eggs",
            "Vanilla extract",
            "Flour",
            "Cocoa powder"
        ],
        tag: "dessert",
        icon: recipeImages.brownies
    },

    {
        name: "Panna Cotta",
        description: "A silky and creamy Italian dessert topped with fresh berries or fruit sauce.",
        fullDescription: "Heat cream, sugar, and vanilla extract in a pot until sugar dissolves. Remove from heat and stir in gelatin until fully dissolved. Pour into molds and refrigerate for 4-6 hours until set. Serve with berries or fruit sauce.",
        ingredients: [
            "Cream",
            "Sugar",
            "Vanilla extract",
            "Gelatin",
            "Berries"
        ],
        tag: "dessert",
        icon: recipeImages.pannaCotta
    },

    {
        name: "Apple Pie",
        description: "A classic dessert featuring a flaky crust filled with spiced apple slices.",
        fullDescription: "Prepare a pie crust and fill it with sliced apples mixed with sugar, cinnamon, and nutmeg. Cover with another layer of crust, seal the edges, and cut slits on top. Bake at 200°C (400°F) for 40-50 minutes or until golden brown.",
        ingredients: [
            "Pie crust",
            "Apples",
            "Sugar",
            "Cinnamon",
            "Nutmeg"
        ],
        tag: "dessert",
        icon: recipeImages.applePie
    },

    {
        name: "Lemon Tart",
        description: "A zesty and sweet tart with a buttery crust and smooth lemon filling.",
        fullDescription: "Bake a tart crust until lightly golden. In a bowl, whisk together eggs, sugar, lemon juice, and zest. Pour the mixture into the crust and bake at 175°C (350°F) until set. Chill before serving.",
        ingredients: [
            "Tart crust",
            "Eggs",
            "Sugar",
            "Lemon juice",
            "Lemon zest"
        ],
        tag: "dessert",
        icon: recipeImages.lemonTart
    },

    {
        name: "Tiramisu",
        description: "A no-bake Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
        fullDescription: "Dip ladyfingers into brewed coffee and layer them in a dish. Spread mascarpone cream mixture on top and repeat the layers. Dust with cocoa powder and refrigerate for at least 4 hours before serving.",
        ingredients: [
            "Ladyfingers",
            "Coffee",
            "Mascarpone cheese",
            "Sugar",
            "Cocoa powder"
        ],
        tag: "dessert",
        icon: recipeImages.tiramisu
    },

    {
        name: "Stuffed Mushrooms",
        description: "Bite-sized mushrooms stuffed with a savory cheese and herb filling.",
        fullDescription: "Remove stems from mushrooms and fill the caps with a mixture of cream cheese, Parmesan, garlic, and herbs. Bake at 200°C (400°F) for 20 minutes until golden.",
        ingredients: [
            "Mushrooms",
            "Cream cheese",
            "Parmesan",
            "Garlic",
            "Herbs"
        ],
        tag: "appetizer",
        icon: recipeImages.stuffedMushrooms
    },

    {
        name: "Spring Rolls",
        description: "Crispy rolls filled with a mix of vegetables and optionally shrimp or chicken.",
        fullDescription: "Fill spring roll wrappers with a mixture of shredded vegetables and optional protein. Roll tightly and seal the edges. Deep fry until golden and serve with dipping sauce.",
        ingredients: [
            "Spring roll wrappers",
            "Vegetables",
            "Shrimp or chicken",
            "Dipping sauce"
        ],
        tag: "appetizer",
        icon: recipeImages.springRolls
    },

    {
        name: "Caprese Skewers",
        description: "Mini skewers with fresh mozzarella, cherry tomatoes, and basil.",
        fullDescription: "Thread mozzarella balls, cherry tomatoes, and fresh basil leaves onto skewers. Drizzle with olive oil and balsamic glaze before serving.",
        ingredients: [
            "Mozzarella",
            "Cherry tomatoes",
            "Basil",
            "Olive oil",
            "Balsamic glaze"
        ],
        tag: "appetizer",
        icon: recipeImages.capreseSkewers
    },

    {
        name: "Shrimp Cocktail",
        description: "Chilled shrimp served with a tangy cocktail sauce.",
        fullDescription: "Boil shrimp in salted water until pink and cooked through. Chill in an ice bath. Serve with cocktail sauce made from ketchup, horseradish, lemon juice, and Worcestershire sauce.",
        ingredients: [
            "Shrimp",
            "Ketchup",
            "Horseradish",
            "Lemon juice",
            "Worcestershire sauce"
        ],
        tag: "appetizer",
        icon: recipeImages.shrimpCocktail
    },

    {
        name: "Mini Quiches",
        description: "Savory mini pies filled with eggs, cheese, and vegetables or meat.",
        fullDescription: "Prepare a pie crust and cut into small rounds. Fit them into a muffin tin. Fill with a mixture of beaten eggs, cheese, and chopped vegetables or cooked meat. Bake at 190°C (375°F) for 20-25 minutes until set.",
        ingredients: [
            "Pie crust",
            "Eggs",
            "Cheese",
            "Vegetables or meat"
        ],
        tag: "appetizer",
        icon: recipeImages.miniQuiches
    },

    {
        name: "Crostini",
        description: "Toasted bread slices topped with various spreads or toppings, perfect for any occasion.",
        fullDescription: "Toast baguette slices until crispy. Top with your choice of spreads like ricotta, pesto, or tapenade, and finish with fresh herbs or a drizzle of olive oil.",
        ingredients: [
            "Baguette",
            "Toppings of choice",
            "Olive oil"
        ],
        tag: "appetizer",
        icon: recipeImages.crostini
    }
];