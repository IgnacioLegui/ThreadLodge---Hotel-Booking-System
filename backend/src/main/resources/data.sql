-- =============================================
-- Hotel Booking System - Initial Data Seed
-- =============================================

-- Room Categories
INSERT INTO room_categories (nombre, precio_base, capacidad_maxima)
SELECT 'Suite Deluxe', 250.00, 4
WHERE NOT EXISTS (SELECT 1 FROM room_categories WHERE nombre = 'Suite Deluxe');

INSERT INTO room_categories (nombre, precio_base, capacidad_maxima)
SELECT 'Habitacion Estandar', 120.00, 2
WHERE NOT EXISTS (SELECT 1 FROM room_categories WHERE nombre = 'Habitacion Estandar');

-- Hotel Rooms
INSERT INTO hotel_rooms (numero_habitacion, estado, id_categoria)
SELECT '101', 'AVAILABLE', (SELECT id FROM room_categories WHERE nombre = 'Suite Deluxe')
WHERE NOT EXISTS (SELECT 1 FROM hotel_rooms WHERE numero_habitacion = '101');

INSERT INTO hotel_rooms (numero_habitacion, estado, id_categoria)
SELECT '102', 'AVAILABLE', (SELECT id FROM room_categories WHERE nombre = 'Suite Deluxe')
WHERE NOT EXISTS (SELECT 1 FROM hotel_rooms WHERE numero_habitacion = '102');

INSERT INTO hotel_rooms (numero_habitacion, estado, id_categoria)
SELECT '201', 'AVAILABLE', (SELECT id FROM room_categories WHERE nombre = 'Habitacion Estandar')
WHERE NOT EXISTS (SELECT 1 FROM hotel_rooms WHERE numero_habitacion = '201');

INSERT INTO hotel_rooms (numero_habitacion, estado, id_categoria)
SELECT '202', 'AVAILABLE', (SELECT id FROM room_categories WHERE nombre = 'Habitacion Estandar')
WHERE NOT EXISTS (SELECT 1 FROM hotel_rooms WHERE numero_habitacion = '202');

INSERT INTO hotel_rooms (numero_habitacion, estado, id_categoria)
SELECT '301', 'AVAILABLE', (SELECT id FROM room_categories WHERE nombre = 'Suite Deluxe')
WHERE NOT EXISTS (SELECT 1 FROM hotel_rooms WHERE numero_habitacion = '301');
