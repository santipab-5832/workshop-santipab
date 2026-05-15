<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card class="pa-4" elevation="4">
          <v-card-title class="justify-center"> คำนวณเกรด </v-card-title>

          <v-card-text>
            <v-text-field
              label="กรอกคะแนน 0-100"
              v-model="score"
              clearable
              @keyup.enter="calculateGrade"
            ></v-text-field>
          </v-card-text>

          <v-btn @click="calculateGrade" block>คำนวณ</v-btn>
          <v-btn color="grey" block @click="resetForm"> ล้างข้อมูล </v-btn>
        </v-card>
      </v-col>

      <v-col v-if="showResult" cols="12" md="5">
        <v-card class="pa-4" elevation="4">
          <v-card-title> ผลลัพธ์ </v-card-title>
          <v-card-text>
            <div v-if="grade">
              <p class="mb-1">คะแนนที่กรอก</p>
              <h1 class="mb-4">
                {{ scoreNumber }}
              </h1>
              <p class="mb-1">เกรด</p>
              <h1 class="mb-4">
                {{ grade }}
              </h1>
            </div>

            <div v-else>
              <p class="gray--text">กรุณากรอกผลคะแนนแล้วกด "คำนวณ"</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "GradeCalculate",
  data() {
    return {
      score: "",
      grade: "",
      scoreNumber: null,
      showResult: false
    };
  },

  methods: {
    calculateGrade() {
      this.grade = "";
      this.errorMessage = "";

      const scoreText = String(this.score).trim();

      const score = Number(scoreText);

      if (score < 0 || score > 100) {
        this.showError("กรุณากรอกคะแนน 0 - 100");
        return;
      }

      this.scoreNumber = score;

      if (score >= 80) {
        this.grade = "A";
      } else if (score >= 75) {
        this.grade = "B+";
      } else if (score >= 70) {
        this.grade = "B";
      } else if (score >= 65) {
        this.grade = "C+";
      } else if (score >= 60) {
        this.grade = "C";
      } else if (score >= 55) {
        this.grade = "D+";
      } else if (score > 50) {
        this.grade = "D";
      } else {
        this.grade = "F";
      }

      this.showResult = true;

      Swal.fire({
        icon: "success",
        title: "คำนวณสำเร็จ",
        confirmButtonText: "ตกลง",
      });
    },
    showError(message) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: message,
        confirmButtonText: "ลองใหม่",
      });
    },

    resetForm() {
      this.score = "";
      this.scoreNumber = null;
      this.grade = "";

      Swal.fire({
        icon: "info",
        title: "ล้างข้อมูลแล้ว",
        text: "สามารถกรอกคะแนนใหม่ได้เลย",
        confirmButtonText: "ตกลง",
      });
    }
  },
};
</script>

<style></style>
