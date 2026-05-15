<template>
  <div>
    <div><Navbar /></div>
      <v-container>
        <!-- Card แสดงชื่อ -->
        <v-card class="mx-auto">
          <v-card-title class="justify-center"> สันติภาพ สันหมาด </v-card-title>
          <v-card-subtitle class="text-center">
            Software Engineer
          </v-card-subtitle>
        </v-card>
        <br />

        <v-row class="justify-center">
          <!-- ประวัติส่วนตัว -->
          <v-col cols="flex">
            <v-card class="mx-auto" width="500">
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/488886951_2903314713170317_386521289181369054_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGEOP1j8STO0cKVlrvjA8iWgxRYhuMi4J6DFFiG4yLgnie6-7JiQbZ8MVsgrn_r7YVGSg0q1cN0B5FEErfWKxZb&_nc_ohc=kOz7QX6_gyUQ7kNvwFc6x6o&_nc_oc=AdrYXOf-HJZx_Qqfhh1Xj0s-Zz9z122Sj38OjgPawOGK0Nl4bnGNrx0JG3rYR_TdGik&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=1_xkPyl7_uhxMNNyhR_kwg&_nc_ss=7b2a8&oh=00_Af6oHWcz7B-yl_7C1-luZC8YxLgJrHo3YA0yRY8FJFG0sw&oe=6A0A07BC"
              >
              </v-img>
              <v-card-title class="justify-center">
                <strong> ประวัติส่วนตัว </strong>
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn icon @click="showInfo1 = !showInfo1">
                  <v-icon>{{
                    showInfo1 ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-card-text v-if="showInfo1">
                <p><strong>ชื่อเล่น:</strong> บี้</p>
                <p><strong>อายุ:</strong> 23</p>
                <v-spacer></v-spacer>
                <p><strong>งานอดิเรก</strong></p>
                <p>
                  <v-chip-group
                    v-model="selection"
                    active-class="blue white--text"
                  >
                    <v-chip> อ่านหนังสือ </v-chip>
                    <v-chip> เดินห้าง </v-chip>
                    <v-chip> งานบ้าน </v-chip>
                  </v-chip-group>
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- ประวัติการศึกษา -->
          <v-col :cols="flex">
            <v-card class="mx-auto" width="500">
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://centrepointschools.com/blogs/wp-content/uploads/2025/03/What-you-need-to-know-about-higher-education.jpg"
              >
              </v-img>
              <v-card-title class="justify-center">
                <strong> ประวัติการศึกษา </strong>
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn icon @click="showInfo2 = !showInfo2">
                  <v-icon>{{
                    showInfo2 ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-text v-if="showInfo2">
                <div class="font-weight-bold ml-8 mb-2">Today</div>

                <v-timeline align-top dense>
                  <v-timeline-item
                    v-for="education in educationList"
                    :key="education.year"
                    :color="education.color"
                    small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ education.from }}</strong>
                        {{ education.degree }}
                      </div>

                      <div>{{ education.year }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- สิ่งที่ชอบ/ไม่ชอบ -->
          <v-col :cols="flex">
            <v-card class="mx-auto" width="500">
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://img.freepik.com/premium-vector/like-dislike-love-icons-buttons-thumbs-up-thumb-down-icon-social-media-notification-icons_248162-1144.jpg"
              >
              </v-img>

              <v-card-title class="justify-center">
                <strong>สิ่งที่ชอบ/ไม่ชอบ</strong>
              </v-card-title>

              <v-card-actions class="justify-center">
                <v-btn icon @click="showInfo3 = !showInfo3">
                  <v-icon>
                    {{ showInfo3 ? "mdi-chevron-up" : "mdi-chevron-down" }}
                  </v-icon>
                </v-btn>
              </v-card-actions>

              <v-card-text v-if="showInfo3">
                <!-- ปุ่มสิ่งที่ชอบ / ไม่ชอบ -->
                <div class="text-center mb-4">
                  <v-btn
                    color="blue"
                    class="white--text mr-2"
                    @click="showLike = !showLike"
                  >
                    สิ่งที่ชอบ
                  </v-btn>

                  <v-btn
                    color="red"
                    class="white--text"
                    @click="showDislike = !showDislike"
                  >
                    สิ่งที่ไม่ชอบ
                  </v-btn>
                </div>

                <v-row>
                  <!-- รูปแมว -->
                  <v-col cols="6" v-if="showLike">
                    <v-card>
                      <v-img
                        height="180"
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
                      ></v-img>

                      <v-card-title class="justify-center"> แมว </v-card-title>

                      <v-card-subtitle class="text-center">
                        สิ่งที่ชอบ
                      </v-card-subtitle>
                    </v-card>
                  </v-col>

                  <!-- รูปแมงมุม -->
                  <v-col cols="6" v-if="showDislike">
                    <v-card>
                      <v-img
                        height="180"
                        src="https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                      ></v-img>

                      <v-card-title class="justify-center">
                        แมงมุม
                      </v-card-title>

                      <v-card-subtitle class="text-center">
                        สิ่งที่ไม่ชอบ
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <br />
        <hr />
        <br />

        <!-- จุดแข็ง -->
        <v-card-actions class="justify-center">
          <v-btn icon @click="twitter = !twitter">
            <v-icon>{{
              twitter ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row class="justify-center" v-if="twitter">
          <v-col cols="flex">
            <v-card class="mx-auto" color="black" dark max-width="500">
              <v-card-title>
                <v-icon large left> mdi-twitter </v-icon>
                <span class="text-h6 font-weight-light">จุดแข็ง</span>
              </v-card-title>

              <v-card-text class="text-h5 font-weight-bold">
                " ชอบเรียนรู้อะไรใหม่ๆอยู่ตลอด
                พร้อมรับความรู้ไม่ว่าจะเป็นใครก็ตาม เพราะความรู้คือ
                การขจัดความไม่รู้ "
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      alt=""
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBePo8X7AhlM890QeGumMlbA6eE9WiFbdI_Q&s"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Santipab Sanmad</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">16.3K</span>

                    <span class="mr-1">·</span>

                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">45M</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- จุดอ่อน -->
          <v-col cols="flex">
            <v-card class="mx-auto" color="black" dark max-width="500">
              <v-card-title>
                <v-icon large left> mdi-twitter </v-icon>
                <span class="text-h6 font-weight-light">จุดอ่อน</span>
              </v-card-title>

              <v-card-text class="text-h5 font-weight-bold text">
                " ใจเย็น = ช้าแต่ชัวร์ <br />
                ใจร้อน = มั่วแล้วพัง "
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      alt=""
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_xWKbRY9f2k0cCan-y697eziGJg6KrmLmsQ&s"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Santipab Sanmad</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">-16.3K</span>

                    <span class="mr-1">·</span>

                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">-45M</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      showInfo1: false,
      showInfo2: false,
      showInfo3: false,
      showLike: false,
      showDislike: false,
      selection: null,
      twitter: false,
      educationList: [
        {
          from: "มหาวิทยาลัยสงขลานครินทร์",
          degree: "ป.ตรี",
          year: "2024-2025",
          color: "green",
        },
        {
          from: "วิทยาลัยเทคนิคหาดใหญ่",
          degree: "ปวส.",
          year: "2021-2022",
          color: "blue lighten-3",
        },
        {
          from: "วิทยาลัยเทคนิคหาดใหญ่",
          degree: "ปวช.",
          year: "2018-2020",
          color: "blue lighten-3",
        },
      ],
    };
  },
};
</script>

<style></style>
