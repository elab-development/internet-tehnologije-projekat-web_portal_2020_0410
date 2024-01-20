<p align="center">
  <img src="https://lh3.googleusercontent.com/A2doAJk9Ah0HXBEHvpoZRXzEYk8WnEXbSM6R1tJ5_54o4sR_lld5e4DXqq5YQ7omsOugA5_kVPFfgG_mZ2qmmoU=w640-h400-e365-rj-sc0x00ffffff" width="400" height="200"> 
</p>  

This is a full stack web application made with [React](https://react.dev/) as a frontend library and [FastApi](https://fastapi.tiangolo.com/) as a backend framework.  

***
# **Features!**
* A fully working login and signup system
* Reddit API and AniChan API communication
* Three different roles quest, admin and normal user
* Admin can download csv containing reports on all users
* Quest can browse and see top/hot reddit news
* Users can rate animes and check latest reviews for some anime
* Users can also see public opionion on some topic (opinion is based on posts in r/anime)
* Account dashboard contains profile informations, top 5 best rated animes on this platform, information about genres of all animes in Postgress db and option to change password (for admin there is a report option) 
***

# **How to use**
First configure the .env file on your local machine so the PostgreSQL database can connect.
Open the backend project in PyCharm, and then start the reddit_wrapper main function, as well as the app main function. This will enable the frontend to connect to the backend. Run npm dev build from the /vite-project directory to start the frontend.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/1IMeAlJr)
