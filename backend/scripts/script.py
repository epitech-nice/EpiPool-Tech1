#!/usr/bin/env python3

import csv
import random
import os

# Get the current directory of the script
current_dir = os.path.dirname(os.path.abspath(__file__))

def read_csv_rooms(file):
    with open(file, mode='r') as f:
        csv_reader = csv.DictReader(f)
        for row in csv_reader:
            return {
                "number_of_rooms": int(row["nombre_salles"]),
                "number_of_tables_per_room": int(row["nombre_tables_salle"]),
                "number_of_chairs_per_table": int(row["nombre_chaises_table"]),
            }

def read_csv_students(file):
    with open(file, mode='r') as f:
        csv_reader = csv.DictReader(f)
        students = [row["name"] for row in csv_reader]
    return students

def generate_rooms(number_of_rooms, number_of_tables_per_room, number_of_chairs_per_table):
    rooms = {}
    for i in range(1, number_of_rooms + 1):
        rooms[f'Room {i}'] = {
            f'Table {j}': ['Empty' for _ in range(number_of_chairs_per_table)] 
            for j in range(1, number_of_tables_per_room + 1)
        }
    return rooms

def place_students(rooms, students):
    random.shuffle(students)
    student_index = 0
    for room, tables in rooms.items():
        for table, chairs in tables.items():
            for i in range(len(chairs)):
                if student_index < len(students):
                    chairs[i] = students[student_index]
                    student_index += 1
                else:
                    break
            if student_index >= len(students):
                break
        if student_index >= len(students):
            break
    return rooms

def display_rooms(rooms):
    for room, tables in rooms.items():
        print(f"{room}:")
        for table, chairs in tables.items():
            print(f"  {table}: {chairs}")
        print()

def update_student_count(room_file_csv, student_count):
    with open(room_file_csv, mode='r') as f:
        csv_reader = csv.DictReader(f)
        lines = [row for row in csv_reader]
    
    for line in lines:
        line['nombre_etudiants'] = student_count

    with open(room_file_csv, mode='w', newline='') as f:
        fieldnames = ['nombre_salles', 'nombre_tables_salle', 'nombre_chaises_table', 'nombre_etudiants']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(lines)

room_file_csv = os.path.join(current_dir, 'roomConfig.csv')
student_file_csv = os.path.join(current_dir, 'students.csv')

student_names = read_csv_students(student_file_csv)
update_student_count(room_file_csv, len(student_names))
room_info = read_csv_rooms(room_file_csv)
rooms = generate_rooms(room_info['number_of_rooms'], room_info['number_of_tables_per_room'], room_info['number_of_chairs_per_table'])
rooms_with_students = place_students(rooms, student_names)
display_rooms(rooms_with_students)
