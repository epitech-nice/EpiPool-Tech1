<template>
    <div class="room">
        <div class="flexSB">
            <h1>Disposition des Tables</h1>
            <button class="simpleBtn" @click="fetchPoolPosition">Refresh</button>
        </div>
        <div class="Flex">
            <div v-for="(table, index) in tables" :key="index" class="table">
                <h2>Table {{ table.tableNumber }}</h2>
                <ul>
                    <li v-for="(student, studentIndex) in table.students" :key="studentIndex">
                        <strong>{{ getSeatNumber(index, studentIndex) }}:</strong> {{ student }}
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
            tables: [],
        };
    },
    mounted() {
        this.fetchPoolPosition();
    },
    methods: {
        async fetchPoolPosition() {
            try {
                const rep = await axios.get('poolPosition');
                this.tables = await this.parseOutput(rep.data.output);
            } catch (error) {
                console.error(error);
            }
        },
        getSeatNumber(tableIndex, studentIndex) {
            const seatNumber = tableIndex * 4 + studentIndex + 1;
            return seatNumber.toString().padStart(2, '0');
        },
        async parseOutput(output) {
            const lines = output.split('\n');
            const tables = [];

            lines.forEach((line) => {
                const tableMatch = line.match(/Table (\d+): \[(.+)\]/);
                if (tableMatch) {
                    const tableNumber = tableMatch[1];
                    const students = tableMatch[2].split(', ').map(student => student.replace(/['"]+/g, ''));
                    tables.push({ tableNumber, students });
                }
            });

            return tables;
        }
    }
};
</script>

<style>
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
