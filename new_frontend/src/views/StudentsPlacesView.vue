<template>
    <div class="room">
        <div class="flexSB">
            <h1>Disposition des Tables</h1>
            <button class="simpleBtn" @click="randomize">Refresh</button>
        </div>
        <div class="Flex">
            <div v-for="(table, tableIndex) in tables" :key="tableIndex" class="table">
                <h2>Table {{ tableIndex + 1 }}</h2>
                <ul>
                    <li v-for="(student, studentIndex) in table.students" :key="student.student_id">
                        <strong>{{ getSeatNumber(tableIndex, studentIndex) }}:</strong> {{ student.name }}
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
