-- Insert default admin
INSERT IGNORE INTO echoboard_db.admins (username, password) VALUES
('admin', '$2b$10$8K1p/a0dCJ2n6tn5b5jFa.VH6rZXCBl9X8xaS7fJeJzGc8K2LxU7a');

-- Insert sample feedback
INSERT IGNORE INTO echoboard_db.feedback (name, email, product_name, rating, comment) VALUES
('John Doe', 'john@example.com', 'EchoBoard App', 5, 'Great product! Very easy to use.'),
('Jane Smith', 'jane@example.com', 'Mobile App', 4, 'Good features but could be faster.'),
('Mike Johnson', 'mike@example.com', 'Web Dashboard', 3, 'Decent but needs improvement in UI.');