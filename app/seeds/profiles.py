from app.models import db, Profile
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_profiles():
    demo_profile = Profile(
        user_id=1, country='United States', state='California', timezone='Pacific Standard Time (GMT-8:00)', about='Hello! I am a Demo User! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus non purus gravida vestibulum. Sed in ante vel velit blandit cursus eget eget nisi. Quisque vel tellus eu lacus cursus ullamcorper. Maecenas lacus elit, aliquam sit amet sem ut, ullamcorper pretium mauris. Fusce eget quam lacus. Mauris sed tortor imperdiet, fermentum quam at, fermentum lorem. Duis nec lacus rhoncus, euismod augue eget, eleifend mi. Ut quis ornare quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim ac dui et vehicula. Ut dapibus metus vel erat hendrerit, ut faucibus lorem accumsan.', birthday="1970, 7, 4", display_age=True, img_url='https://live.staticflickr.com/3372/3572948635_16f324d0d0_b.jpg')
    marnie_profile = Profile(
        user_id=2, country='France', timezone='Central European Time (GMT+1:00)', about='Bonjour! My name is Marnie! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus non purus gravida vestibulum. Sed in ante vel velit blandit cursus eget eget nisi. Quisque vel tellus eu lacus cursus ullamcorper. Maecenas lacus elit, aliquam sit amet sem ut, ullamcorper pretium mauris. Fusce eget quam lacus. Mauris sed tortor imperdiet, fermentum quam at, fermentum lorem. Duis nec lacus rhoncus, euismod augue eget, eleifend mi. Ut quis ornare quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim ac dui et vehicula. Ut dapibus metus vel erat hendrerit, ut faucibus lorem accumsan.', birthday="1990, 12, 25", display_age=True, img_url='https://images.pexels.com/photos/2156416/pexels-photo-2156416.jpeg')
    bobbie_profile = Profile(
        user_id=3, country='Mexico', timezone='Pacific Standard Time (GMT-8:00)', about='Hola! My name is Bobbie! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus non purus gravida vestibulum. Sed in ante vel velit blandit cursus eget eget nisi. Quisque vel tellus eu lacus cursus ullamcorper. Maecenas lacus elit, aliquam sit amet sem ut, ullamcorper pretium mauris. Fusce eget quam lacus. Mauris sed tortor imperdiet, fermentum quam at, fermentum lorem. Duis nec lacus rhoncus, euismod augue eget, eleifend mi. Ut quis ornare quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim ac dui et vehicula. Ut dapibus metus vel erat hendrerit, ut faucibus lorem accumsan.', birthday="1985, 10, 31", display_age=True, img_url='https://images.pexels.com/photos/1820919/pexels-photo-1820919.jpeg')
    tim_profile = Profile(
        user_id=4, country='Germany', timezone='Central European Time (GMT+1:00)', about='Guten tag! My name is Tim! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus non purus gravida vestibulum. Sed in ante vel velit blandit cursus eget eget nisi. Quisque vel tellus eu lacus cursus ullamcorper. Maecenas lacus elit, aliquam sit amet sem ut, ullamcorper pretium mauris. Fusce eget quam lacus. Mauris sed tortor imperdiet, fermentum quam at, fermentum lorem. Duis nec lacus rhoncus, euismod augue eget, eleifend mi. Ut quis ornare quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim ac dui et vehicula. Ut dapibus metus vel erat hendrerit, ut faucibus lorem accumsan.', birthday="2001, 6, 24", display_age=True, img_url='https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg')
    zack_profile = Profile(
        user_id=5, country='Kenya', timezone='Eastern African Time (GMT+3:00)', about='Jambo! My name is Zack! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus non purus gravida vestibulum. Sed in ante vel velit blandit cursus eget eget nisi. Quisque vel tellus eu lacus cursus ullamcorper. Maecenas lacus elit, aliquam sit amet sem ut, ullamcorper pretium mauris. Fusce eget quam lacus. Mauris sed tortor imperdiet, fermentum quam at, fermentum lorem. Duis nec lacus rhoncus, euismod augue eget, eleifend mi. Ut quis ornare quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim ac dui et vehicula. Ut dapibus metus vel erat hendrerit, ut faucibus lorem accumsan.', birthday="1995, 4, 15", display_age=True, img_url='https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg')
    lisa_profile = Profile(
        user_id=6, country='Vietnam', timezone='Vietnam Standard Time (GMT+7:00)', about='Xin chào! My name is Lisa! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus non purus gravida vestibulum. Sed in ante vel velit blandit cursus eget eget nisi. Quisque vel tellus eu lacus cursus ullamcorper. Maecenas lacus elit, aliquam sit amet sem ut, ullamcorper pretium mauris. Fusce eget quam lacus. Mauris sed tortor imperdiet, fermentum quam at, fermentum lorem. Duis nec lacus rhoncus, euismod augue eget, eleifend mi. Ut quis ornare quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim ac dui et vehicula. Ut dapibus metus vel erat hendrerit, ut faucibus lorem accumsan.', birthday="1987, 7, 6", display_age=True, img_url='https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg')
    carl_profile = Profile(
        user_id=7, country='India', timezone='India Standard Time (GMT+5:30)', about='Namaste! My name is Carl! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus non purus gravida vestibulum. Sed in ante vel velit blandit cursus eget eget nisi. Quisque vel tellus eu lacus cursus ullamcorper. Maecenas lacus elit, aliquam sit amet sem ut, ullamcorper pretium mauris. Fusce eget quam lacus. Mauris sed tortor imperdiet, fermentum quam at, fermentum lorem. Duis nec lacus rhoncus, euismod augue eget, eleifend mi. Ut quis ornare quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim ac dui et vehicula. Ut dapibus metus vel erat hendrerit, ut faucibus lorem accumsan.', birthday="1998, 9, 18", display_age=True, img_url='https://images.pexels.com/photos/2033447/pexels-photo-2033447.jpeg')

    db.session.add(demo_profile)
    db.session.add(marnie_profile)
    db.session.add(bobbie_profile)
    db.session.add(tim_profile)
    db.session.add(zack_profile)
    db.session.add(lisa_profile)
    db.session.add(carl_profile)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_profiles():
    db.session.execute('TRUNCATE profiles RESTART IDENTITY CASCADE;')
    db.session.commit()
