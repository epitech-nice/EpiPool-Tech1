<template>
    <div class="room">
        <div class="flexSB">
            <h1>Disposition des Tables</h1>
            <div class="flexSB">
                <button class="simpleBtn" @click="exportToCSV">Export CSV</button>
                <button class="simpleBtn" @click="randomize">Refresh</button>
                <router-link to="/dashboard" class="simpleBtn" style="text-decoration: none;">Back</router-link>
            </div>
        </div>
        <div class="Flex">
            <div v-for="(table, tableIndex) in tables" :key="tableIndex" class="table">
                <h2>Table {{ tableIndex + 1 }}</h2>
                <ul>
                    <li v-for="(student, studentIndex) in table.students" :key="student.student_id">
                        <strong>{{ student.position }}:</strong> {{ student.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';

export default {
    data() {
        return {
            students: [],
            tables: [],
            seatsPerTable: 4
        };
    },
    methods: {
        async fetchPoolPosition() {
            try {
                const response = await axios.get('students/getStudentPositions');
                this.students = response.data.students;
                this.organizeTables();
            } catch (error) {
                console.error(error);
            }
        },
        async randomize() {
            try {
                await axios.get('poolPosition');
                this.fetchPoolPosition();
            } catch (error) {
                console.error(error);
            }
        },
        organizeTables() {
            const tables = [];
            let currentTable = [];

            this.students.sort((a, b) => a.position - b.position);

            this.students.forEach((student, index) => {
                currentTable.push(student);

                if (currentTable.length === this.seatsPerTable) {
                    tables.push({ students: currentTable });
                    currentTable = [];
                }
            });

            if (currentTable.length > 0) {
                tables.push({ students: currentTable });
            }

            this.tables = tables;
        },
        getSeatNumber(tableIndex, studentIndex) {
            return tableIndex * this.seatsPerTable + studentIndex + 1;
        },
        exportToCSV() {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Student Name,Seat Number\n";

            this.tables.forEach((table, tableIndex) => {
                table.students.forEach((student, studentIndex) => {
                    csvContent += `${student.name},${student.position}\n`;
                });
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "student_positions.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    mounted() {
        this.fetchPoolPosition();
    },
};
</script>

<style scoped>
.room {
    padding: 20px;
}

.table {
    flex-grow: 1;
    width: 10%;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 8px;
}

.table h2 {
    margin-bottom: 10px;
}

ul {
    list-style: none;
    padding: 0;
}

ul li {
    padding: 5px 0;
}

.Flex {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
