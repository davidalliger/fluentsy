# Fluentsy
Fluentsy is a social network for language learners, inspired in part by language exchange apps like Hello Talk and language tutoring apps like italki. Users can create attractive and informative profiles, list which languages they speak, and message other users in real time. 

Fluentsy makes it easy to find suitable conversation partners for practice with writing and speaking skills in a target language. Using Fluentsy, someone learning Spanish may find a native speaker in search of a language exchange or a fellow student who's looking for a chance to put their knowledge to use.

The app was created using a React frontend, a Flask backend, and a PostgreSQL database. At the time of this writing, Fluentsy has three full-CRUD features, but I plan on implementing additional features like search and calendar invites in the future.

## Screenshots

### Splash Page

When first visiting, users are greeted by a splash page that offers brief descriptions of the sorts of interactions they can expect to have on the app. There is also a charming image created by pikisuperstar and downloaded from www.freepik.com which features cartoon people greeting one another in various languages. The splash page also has clearly accessible buttons for signing up or logging in if one already has an account.

## Features

### Authentication
- A user can sign up for an account
- A registered user can log in
- A registered and logged-in user can log out

### Profiles
- A registered and logged-in user can create a user profile.
- A registered and logged-in user can view user profiles.
- A registered and logged-in user can edit his or her profile.
- A registered and logged-in user can delete his or her profile.

### Messages
- A registered and logged-in user with a profile can send a message to another user who has a profile.
- A registered and logged-in user with a profile can receive a message from another user who has a profile.
- A registered and logged-in user with a profile can edit a message he or she sent.
- A registered and logged-in user with a profile can delete a message he or she sent.

### Languages
- A registered and logged-in user with a profile can add a language.
- A registered and logged-in user can view languages.
- A registered and logged-in user with a profile can edit a language.
- A registered and logged-in user with a profile can delete a language.

## Technologies
This app utilizes the following technologies:
- PostgreSQL
- Flask
- Flask-SQLAlchemy
- WTForms
- React
- Redux
- Flask-SocketIO
- Socket.IO

Upon signing up, users are prompted to create their profiles. User profiles display basic information like username, location, and a brief decription of the user or their personal interests. Profiles can be edited and deleted, as well.

Users creating their profiles are asked to specify which languages they speak. Each user with a profile is required to list at least one native language and one target language, as well their level of proficiency in said target language. Fluentsy uses a system of levels based on the Common European Framework of Reference, which ranges from "A1: Beginner" to "C2: Proficient." After creating a profile, a user may add, edit, or delete languages as they see fit, with the caveat that they must always display one native language and one target language on their profile, as mentioned before.

When viewing a user's profile, each of the user's listed languages is accompanied by a small progress bar graphic that indicates their level of prociency in the language. A progress bar that is completely green indicates a native language, while a progress bar with only a little green suggests that the speaker is still a beginner.

Users can use the messages feature to chat with one another in real time or make plans for future practice, perhaps using an agreed-upon third-party video conferencing tool. A user can send and receive messages, as well as edit and delete the messages they've sent.
