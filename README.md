# Matchr.pl

![Site](https://i.imgur.com/KkhR3BE.png)

[Link](http://matchr.pl/)

[GitHub](https://github.com/JackLee9355/Polinder)

[Devpost](https://devpost.com/software/matchr-pl/)

## Inspiration
One of the main reasons people do not vote in local elections is because they do not know who to vote for. These people may not be interested in politics and/or do not have the time to research candidates and their positions. According to CNBC, the younger generation often does not vote because of this reason. Furthermore, they get their news primarily from social media, and do not feel very informed about the candidates. In order to appeal to the younger generation and make it easier for them to choose a candidate to vote for, we created **matchr.pl**. A gamification of the electorate education process.

## What it Does
Matchr.pl is a web-app that chooses a candidate for the user to vote for. First, the user chooses an upcoming election that they would like to participate in. Then, they are presented with a series of quotes from their chosen election’s candidates that best represent their beliefs. The user ranks how much they agree with the quote. Afterwards, their ideal candidate is generated.

matchr.pl is supposed to be a political spin-off of Tinder, an app that most young people are familiar with and would respond well to. We added the swiping animation to be similar to Tinder’s; however, we strayed from actually allowing swiping as it would get confusing between the four choices. We needed 4 choices (Strongly Disagree, Disagree, Agree and Strongly Agree) in order to make our match accurate. We were also inspired to create a ‘Strongly’ agree or disagree option by Tinder’s ‘Super Like’ button. Lastly, the most important aspect of the two apps: the matchmaking. Just like how Tinder matches you with a perfect partner, **matchr.pl** matches you with a perfect candidate who most closely aligns with your values. After a couple research-free minutes of swiping, the user is ready to head on over to the polls and make their vote. Better yet, this app is so quick and easy to use that you can figure out who to vote for as you are standing in line for the polls.

## Infrastructure
The frontend is **Node.js (React)** with **Chakra UI** for most of the components and **Figma** for design. We used the npm react module **react-tinder-card** to create the swipe-away animation of the cards. We also used **JS Confetti** library to create the emoji confetti animations when the user votes on how they feel about the given quote. 
The backend is in **Rust** using the **Rocket.rs** web framework and **MongoDB NoSQL** Database for persistence.
Hosted on **Amazon Web Services (AWS) EC2** with **Google Domains** for DNS services.

![infra](https://i.imgur.com/aU3P6ES.png)

## Challenges. . .
 - We didn’t really know **Rust** going into this…
 - **Rocket.rs** has inconsistent advice on help forums such as Stack Overflow due to recent breaking updates
 - **Docker-Compose** ran into firewall Issues when attempting to map ports on **EC2**
 - Stray new line characters accidentally being inserted into **MongoDB** caused many headaches
 - The last minute headache of the description not being shown due to the Collapse component not register a state change.
 - It was hard to find quotes and information on the candidates that was unbiased. We made an effort to find credible sources. We tried to use the candidate’s personal websites as much as possible.

## What We Learned
Katya learned how to use **React JS** and **Chakra UI** in order to work on the front end. She also learned how to route pages and use hooks. Jack learned about **Rust** ownership and database drivers. Andy learned how to create animations in **React JS** and how to use **Figma**. Ryan did all of our research, and learned about upcoming elections, candidates and their stances.

## What’s Next
More election data needs to be added to the system. Ideally, we would have updated information of all the upcoming elections and candidates in the nation. In addition, user experience could be streamlined through automatic detection of nearby elections coming up through geospatial information. 

## Citations
CatClifford. “'I Don't Plan to Vote Ever Again': The Psychology of Why so Many People Don't Vote, Even in 2020.” CNBC, CNBC, 6 Nov. 2020, https://www.cnbc.com/2020/10/30/why-people-choose-not-to-vote.html. 

# Run it
1. docker-compose build
2. docker-compose up
3. cd scripts
4. python3 setuMongo.py
