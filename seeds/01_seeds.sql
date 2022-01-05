INSERT INTO users (name, email, password) VALUES 
('Slerm Mackenzie', 'slerm@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Duff Man', 'duff@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Rick Sanchez', 'c130rick@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, numver_of_bedrooms, country, street, city, province, post_code, active) VALUES
(1, 'Chill zone', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 80, 2, 2, 2, 'Canada', 'Bloor', 'Toronto', 'Ontario', 'M2K 1Z4', TRUE),
(2, 'DUFF zone', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 100, 3, 1, 1, 'Canada', 'Danforth', 'Toronto', 'Ontario', 'M2K 1Z4', TRUE),
(3, 'Rick garage', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 200, 0, 1, 1, 'Canada', 'Spadina', 'Toronto', 'Ontario', 'M2K 1Z4', TRUE); 

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES 
('2016-07-17', '2016-08-01', 1, 1), 
('2019-01-04', '2019-02-01', 2, 2), 
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES 
(1, 1, 1, 5, 'message'), 
(2, 2, 2, 4, 'message'), 
(3, 3, 3, 5, 'message');