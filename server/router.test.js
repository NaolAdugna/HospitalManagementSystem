import request from "supertest";
import express from "express";
import router from "./router/router";

// Setup the express app and use the router
const app = express();
app.use(express.json());
app.use("/", router);

describe("API tests", () => {
  test("POST /registerMail", async () => {
    const response = await request(app).post("/registerMail").send({
      username: "test",
      userEmail: "test@example.com",
      text: "testtext",
      subject: "testsubject",
    });
    expect(response.statusCode).toBe(200);
  });

  // User and role retrieval tests
  test("GET /username", async () => {
    const response = await request(app).get("/username").send({ userId: "2" });
    expect(response.statusCode).toBe(200);
  });

  test("GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });

  test("GET /users/:id", async () => {
    const response = await request(app).get("/users/1");
    expect(response.statusCode).toBe(200);
  });

  test("GET /users/:username", async () => {
    const response = await request(app).get("/users/testuser");
    expect(response.statusCode).toBe(200);
  });

  // // Update user and patient profiles
  // test("PUT /update-user-profile/", async () => {
  //   const response = await request(app).put("/update-user-profile/").send({
  //     Name: "Updatedname",
  //     Email: "test@gmail.com",
  //     id: "3",
  //     chatpassword: "32",
  //   });
  //   expect(response.statusCode).toBe(200);
  // });

  test("PUT /update-patient-profile/", async () => {
    const response = await request(app).put("/update-patient-profile/").send({
      Name: "Updated Patient Name",
      Email: "test@gmail.com",
      Age: "11",
      id: "3",
    });
    expect(response.statusCode).toBe(200);
  });

  // // User attendance tests
  test("POST /user-attendance", async () => {
    const response = await request(app).post("/user-attendance").send({
      UserName: "testname",
      id: "3",
      Morning_Status: "present",
      Afternoon_Status: "present",
    });
    expect(response.statusCode).toBe(201);
  });

  test("PUT /user-afternoon-attendance/:id", async () => {
    const response = await request(app)
      .put("/user-afternoon-attendance/1")
      .send({ Afternoon_Status2: "present" });
    expect(response.statusCode).toBe(201);
  });

  test("GET /fetch-attendance", async () => {
    const response = await request(app).get("/fetch-attendance");
    expect(response.statusCode).toBe(200);
  });

  test("GET /view-patient", async () => {
    const response = await request(app).get("/view-patient");
    expect(response.statusCode).toBe(200);
  });

  test("GET /get-patient/:id", async () => {
    const response = await request(app).get("/get-patient/1");
    expect(response.statusCode).toBe(200);
  });
});
