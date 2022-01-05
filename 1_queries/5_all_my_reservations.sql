SELECT properties.* , reservations.* , AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = property_id
JOIN property_reviews ON properties.id = property_id
JOIN users ON users.id = owner_id
WHERE users.id = 1 AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date 
LIMIT 10;
