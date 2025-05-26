#  TABLE role:

1. Purpose:
Stores different user roles such as "user", "admin", etc.

2. Columns:
id: Unique identifier for each role.
role_name: Name of the role (e.g., "user", "admin"), must be unique.

3. Seed Data: 
Adds default roles: "user" and "admin".

# TABLE user:

1. Purpose:
Stores user information.

2. Columns:
id: Unique identifier for each user.
name: Full name of the user.
email: User's email (must be unique).
role_id: Foreign key to roles.id, default is 1 (i.e., 'user').
created_at: Timestamp of creation.
updated_at: Timestamp of last update.

# TABLE product:

1. Purpose:
Stores product details for which feedback is collected.

2. Columns:
id: Unique product ID.
name: Name of the product.
description: Optional detailed description.
created_at / updated_at: Timestamps for tracking.

# TABLE feedback:

1. Purpose:
Stores feedback entries submitted by users for products.

2. Columns:
id: Unique feedback ID.
user_id: Foreign key to users.id.
product_id: Foreign key to products.id.
created_at / updated_at: Timestamps.
ON DELETE CASCADE: If the user or product is deleted, associated feedback is automatically removed.

# TABLE feedback_ratings:

1. Purpose:
Stores numeric ratings (1 to 5) for feedback entries.

2. Columns:
id: Unique rating ID.
feedback_id: Foreign key to feedback.id.
rating: Integer rating (must be between 1 and 5).

# TABLE feedback_comment:

1. Purpose:
Stores textual comments associated with a feedback entry.

2. Columns:
id: Unique comment ID.
feedback_id: Foreign key to feedback.id.
comment: Text comment provided by the user.

# THE REASON FOR CREATING TWO DIFFERENT TABLES feedback_rating AND feedback_comment :

1. Reason: 
To follow the Single Responsibility Principle (SRP) from software engineering and database design.

2. Explanation:

By separating them:

You simplify future updates (e.g., adding emojis or sentiment analysis to comments, while changing rating scale separately).

You allow independent indexing, optimization, and querying (e.g., fetching average ratings without dealing with text fields).

You maintain a cleaner schema that is easier to scale, test, and extend.