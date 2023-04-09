const { spawn } = require("child_process");

describe("Order processing app", () => {
  let app;

  beforeAll(() => {
    app = spawn("node", ["app.js"]);
  });

  afterAll(() => {
    app.kill("SIGINT");
  });

  test("New order shows up in PENDING area and new VIP order shows up in front of normal orders", (done) => {
    app.stdout.once("data", () => {
      // add new normal orders
      app.stdin.write("n\n");
      app.stdin.write("n\n");

      // add new vip orders
      app.stdin.write("v\n");
      app.stdin.write("v\n");

      // check pending area
      app.stdin.write("p\n");

      app.stdout.on("data", (data) => {
        expect(data.toString()).toContain("New Normal order added with order number 1 and status PENDING");
        expect(data.toString()).toContain("New Normal order added with order number 2 and status PENDING");
        expect(data.toString()).toContain("New VIP order added with order number 3 and status PENDING");
        expect(data.toString()).toContain("New VIP order added with order number 4 and status PENDING");
        expect(data.toString()).toContain("Order No : 3(VIP)");
        expect(data.toString()).toContain("Order No : 4(VIP)");
        expect(data.toString()).toContain("Order No : 1(Normal)");
        expect(data.toString()).toContain("Order No : 2(Normal)");

        done();
      });
    });
  });

//   test("No bots available when no bot created", (done) => {
//     app.stdout.once("data", () => {
//       // check bot status
//       app.stdin.write("b\n");

//       app.stdout.once("data", (data) => {
//         expect(data.toString()).toContain("There are no bots");

//         done();
//       });
//     });
//   });

//   test("Bots start processing orders in PENDING area", (done) => {
//     app.stdout.once("data", () => {
//       // add new bots
//       app.stdin.write("+\n");
//       app.stdin.write("+\n");

//       // wait for 1 second to let bots start processing orders
//       setTimeout(() => {
//         // check bot status
//         app.stdin.write("b\n");

//         app.stdout.once("data", (data) => {
//           expect(data.toString()).toContain("Bot 1 is processing order 3 (VIP)");
//           expect(data.toString()).toContain("Bot 2 is processing order 4 (VIP)");

//           done();
//         });
//       }, 1000);
//     });
//   });

//   test("Bots start processing new orders when finished previous orders", (done) => {
//     // wait for 10 seconds to let bots finish processing previous orders
//     setTimeout(() => {
//       // check bot status
//       app.stdin.write("b\n");

//       app.stdout.once("data", (data) => {
//         expect(data.toString()).toContain("Bot 1 is processing order 1 (Normal)");
//         expect(data.toString()).toContain("Bot 2 is processing order 2 (Normal)");

//         done();
//       });
//     }, 10000);
//   });

//   test("Bots become idle when there are no more orders in PENDING area", (done) => {
//     // wait for 20 seconds to let bots become idle
//     setTimeout(() => {
//       // check bot status
//       app.stdin.write("b\n");

//       app.stdout.once("data", (data) => {
//         expect(data.toString()).toContain("Bot 1 is idle");
//         expect(data.toString()).toContain("Bot 2 is idle");

//         done();
//       });
//     }, 20000);
//   });

})